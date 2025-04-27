<template>
  <div class="container py-4">
    <h2 class="mb-4 text-center">Quản lý Hàng hóa</h2>

    <div class="row">
      <div class="col-md-4">
        <div class="card shadow-sm p-3 mb-4 bg-body rounded">
          <h5 class="mb-3">Nhập thông tin</h5>

          <div class="mb-3">
            <label class="form-label">Chọn Model (Thiết bị)</label>
            <select v-model="selectedModelName" class="form-select" @change="onSelectModel">
              <option value="" disabled>-- Chọn thiết bị --</option>
              <option v-for="model in models" :key="model.modelName" :value="model.modelName">
                {{ model.modelName }}
              </option>
            </select>
          </div>

          <div class="mb-3">
            <label class="form-label">Chọn License</label>
            <select v-model="selectedLicenseName" class="form-select">
              <option value="" disabled>-- Chọn license --</option>
              <option v-for="license in availableLicenses" :key="license.licenseName" :value="license.licenseName">
                {{ license.licenseName }}
              </option>
            </select>
          </div>

          <div class="row g-2">
            <div class="col-6">
              <label class="form-label">Số lượng</label>
              <input v-model.number="form.quantity" type="number" min="1" class="form-control" />
            </div>
            <div class="col-6">
              <label class="form-label">VAT (%)</label>
              <input v-model.number="form.vat" type="number" min="0" class="form-control" />
            </div>
          </div>

          <button @click="addProduct" class="btn btn-success w-100 mt-3">
            ➕ Thêm vào danh sách
          </button>
          <div class="text-center mt-4">
  <button @click="exportInvoice" class="btn btn-primary btn-lg">
    🧾 Xuất hóa đơn
  </button>
</div>

        </div>
      </div>

      <div class="col-md-8">
        <table class="table table-bordered text-center align-middle fixed-table">
          <thead class="table-light">
            <tr>
              <th style="width: 50px;">STT</th>
              <th style="width: 150px;">Tên hàng hóa</th>
              <th style="width: 400px;">Diễn giải</th>
              <th style="width: 80px;">Hãng</th>
              <th style="width: 80px;">Đơn vị tính</th>
              <th style="width: 50px;">S.L</th>
              <th style="width: 120px;">Đơn giá (VNĐ)</th>
              <th style="width: 120px;">Thành tiền</th>
              <th style="width: 100px;">VAT</th>
              <th style="width: 140px;">Thành tiền + VAT</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(product, index) in productList" :key="index" @click="selectProduct(product, index)" :class="{ 'selected-row': editingIndex === index }" style="cursor: pointer">
              <td>{{ index + 1 }}</td>
              <td>{{ product.name }}</td>
              <td class="text-start">{{ product.description }}</td>
              <td>{{ product.type }}</td>
              <td>{{ product.unit }}</td>
              <td>{{ product.quantity }}</td>
              <td>{{ formatPrice(product.price) }}</td>
              <td>{{ formatPrice(product.total) }}</td>
              <td>{{ formatPrice(product.vatAmount) }}</td>
              <td>{{ formatPrice(product.grandTotal) }}</td>
            </tr>
            <tr class="bg-warning fw-bold">
              <td colspan="7" class="text-end">TỔNG CỘNG + THUẾ</td>
              <td>{{ formatPrice(totalThanhTien) }}</td>
              <td>{{ formatPrice(totalVAT) }}</td>
              <td>{{ formatPrice(totalGrandTotal) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div v-if="showModal" class="modal-backdrop">
      <div class="modal-content">
        <h5 class="modal-title">Chỉnh sửa thông tin</h5>
        <div class="mb-2">
          <label class="form-label">Tên hàng hóa</label>
          <input disabled v-model="editingProduct.name" class="form-control" />
        </div>
        <div class="mb-2">
          <label class="form-label">Diễn giải</label>
          <textarea style="height: 200px;" v-model="editingProduct.description" class="form-control"></textarea>
        </div>
        <div class="row g-2">
          <div class="col-6">
            <label class="form-label">Hãng</label>
            <input v-model="editingProduct.type" class="form-control" />
          </div>
          <div class="col-6">
            <label class="form-label">Đơn vị</label>
            <input v-model="editingProduct.unit" class="form-control" />
          </div>
        </div>
        <div class="row g-2 mt-2">
          <div class="col-6">
            <label class="form-label">Số lượng</label>
            <input v-model.number="editingProduct.quantity" type="number" min="1" class="form-control" />
          </div>
          <div class="col-6">
            <label class="form-label">Đơn giá</label>
            <input
  type="text"
  class="form-control"
  :value="formatNumberInput(editingProduct.price)"
  @input="updatePriceFormatted($event)"
/>

          </div>
        </div>
        <div class="row g-2 mt-2">
          <div class="col-6">
            <label class="form-label">VAT (%)</label>
            <input v-model.number="editingProduct.vatPercent" type="number" min="0" class="form-control" />
          </div>
        </div>
        <div class="mt-3 text-end">
          <button @click="updateProduct" class="btn btn-primary">Lưu</button>
          <button @click="deleteProduct" class="btn btn-danger mx-2">Xóa</button>
          <button @click="showModal = false" class="btn btn-secondary">Huỷ</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

const backendUrl = 'https://script.google.com/macros/s/AKfycbx27h7ia2gV8shUCNHw5chR0Y3VwC4csZHnjBZrJmVu-H7kwaBZ9A2v1UKA7xR5jLdeFQ/exec'

const products = ref([])
const licenses = ref([])
const models = ref([])
const productList = ref([])
const selectedModelName = ref('')
const selectedLicenseName = ref('')
const form = ref({ quantity: 1, vat: 10 })
const showModal = ref(false)
const editingProduct = ref({})
let editingIndex = -1

const fetchProducts = async () => {
  try {
    const response = await axios.get(`${backendUrl}?action=getProducts`)
    products.value = response.data.products || []
    licenses.value = response.data.licenses || []
    models.value = products.value.map(product => ({
      modelName: product.modelName,
      description: product.description,
      price: product.price
    }))
  } catch (error) {
    console.error('Lỗi lấy dữ liệu:', error)
  }
}

const availableLicenses = computed(() => {
  if (!selectedModelName.value) return []
  return licenses.value.filter(license =>
    license.models.some(model => model.model === selectedModelName.value)
  )
})

const findPrice = (licenseName, modelName) => {
  const license = licenses.value.find(l => l.licenseName === licenseName)
  if (!license) return 0
  const model = license.models.find(m => m.model === modelName)
  return model ? model.price : 0
}

const addProduct = () => {
  if (!selectedModelName.value) {
    alert('Vui lòng chọn thiết bị')
    return
  }

  let price = 0
  let type = 'SOPHOS'
  let name = selectedModelName.value
  let description = ''

  const modelInfo = models.value.find(m => m.modelName === selectedModelName.value)
  if (modelInfo) {
    description = modelInfo.description
    price = modelInfo.price
  }

  if (selectedLicenseName.value) {
    price = findPrice(selectedLicenseName.value, selectedModelName.value)
    if (price === 0) {
      alert('Không tìm thấy giá license cho model này!')
      return
    }
    type = 'SOPHOS'
    name = selectedLicenseName.value
    const licenseObj = licenses.value.find(l => l.licenseName === selectedLicenseName.value)
    description = licenseObj?.description || ''
  }

  const total = price * form.value.quantity
  const vatAmount = (total * form.value.vat) / 100
  const grandTotal = total + vatAmount

  productList.value.push({
    name,
    description,
    type,
    unit: 'Bộ',
    quantity: form.value.quantity,
    price,
    total,
    vatAmount,
    grandTotal,
    vatPercent: form.value.vat
  })

  selectedModelName.value = ''
  selectedLicenseName.value = ''
  form.value.quantity = 1
  form.value.vat = 10
}

const totalThanhTien = computed(() =>
  productList.value.reduce((sum, item) => sum + item.total, 0)
)
const totalVAT = computed(() =>
  productList.value.reduce((sum, item) => sum + item.vatAmount, 0)
)
const totalGrandTotal = computed(() =>
  productList.value.reduce((sum, item) => sum + item.grandTotal, 0)
)

const formatPrice = (value) => {
  if (isNaN(value)) return '0 ₫'
  return value.toLocaleString('vi-VN') 
}

const selectProduct = (product, index) => {
  editingProduct.value = { ...product }
  editingIndex = index
  showModal.value = true
}

const updateProduct = () => {
  const vatRate = editingProduct.value.vatPercent ?? 10
  const total = editingProduct.value.price * editingProduct.value.quantity
  editingProduct.value.total = total
  editingProduct.value.vatAmount = (total * vatRate) / 100
  editingProduct.value.grandTotal = editingProduct.value.total + editingProduct.value.vatAmount
  productList.value[editingIndex] = { ...editingProduct.value }
  showModal.value = false
}

const deleteProduct = () => {
  productList.value.splice(editingIndex, 1)
  showModal.value = false
}

onMounted(fetchProducts)
const formatNumberInput = (value) => {
  if (!value) return '';
  return Number(value).toLocaleString('vi-VN');
};

const updatePriceFormatted = (event) => {
  let input = event.target.value.replace(/[^\d]/g, ''); // chỉ giữ số
  editingProduct.price = Number(input) || 0;
};

const exportInvoice = async () => {
  if (productList.value.length === 0) {
    alert('Danh sách sản phẩm trống!');
    return;
  }

  const payload = {
    action: 'exportInvoice',
    data: productList.value.map((product, index) => ({
      stt: index + 1,
      name: product.name,
      description: product.description,
      type: product.type,
      unit: product.unit,
      quantity: product.quantity,
      price: product.price,
      total: product.total,
      vatAmount: product.vatAmount,
      grandTotal: product.grandTotal,
    })),
    totalThanhTien: totalThanhTien.value,
    totalVAT: totalVAT.value,
    totalGrandTotal: totalGrandTotal.value
  };

  try {
    const response = await axios.post(backendUrl, payload, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.data.success) {
      alert('✅ Xuất hóa đơn thành công!');
    } else {
      alert('❌ Xuất thất bại: ' + response.data.message);
    }
  } catch (error) {
    console.error('Lỗi khi xuất hóa đơn:', error);
    alert('❌ Lỗi kết nối!');
  }
};

</script>

<style scoped>
.container { max-width: 1600px; }
.fixed-table { table-layout: fixed; width: 100%; }
.fixed-table th, .fixed-table td { white-space: normal; word-break: break-word; padding: 8px; height: 80px; }
.text-start { text-align: left !important; }
.selected-row { background-color: #fff3cd !important; }
.modal-backdrop { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; }
.modal-content { background: #fff; padding: 20px; border-radius: 8px; width: 400px; max-height: 90vh; overflow-y: auto; color:black}
</style>
