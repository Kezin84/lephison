<template>
   
  <div class="container py-4">
    <h2 class="mb-4 text-center" style="color: white;">BÁO GIÁ 💻</h2>
    
    <div class="row">
      <div class="col-md-4">
        <div class="card shadow-sm p-3 mb-4 bg-body rounded">
          <h5 class="mb-3">Nhập thông tin</h5>

          <div class="mb-3">
  <label class="form-label" style="color: red;font-weight: bold;">Tên Công Ty</label>
  <input
    v-model="companyName"
    list="companyOptions"
    @input="autoFillCustomerInfo"
    class="form-control"
    placeholder="Nhập hoặc chọn công ty..."
  />
  <datalist id="companyOptions">
  <option
    v-for="(c, index) in customerList"
    :key="index"
    :value="c.company"
  />
</datalist>
</div>


          <div class="mb-3">
            <label class="form-label" style="color: red;font-weight: bold;">Tên Người Nhận</label>
            <input v-model="receiverName" type="text" class="form-control"  placeholder="Nhập tên người nhận"/>
          </div>

          <div class="mb-3">
            <label class="form-label" style="color: red;font-weight: bold;">Địa Chỉ Người Nhận</label>
            <input v-model="receiverAddress" type="text" class="form-control"  placeholder="Nhập địa chỉ người nhận"/>
          </div>

          <div class="mb-3">
            <label class="form-label" style="color: blue;font-weight: bold;">Chọn Model (Thiết bị)</label>
            <select v-model="selectedModelName" class="form-select" @change="onSelectModel">
              <option value="" disabled>-- Chọn thiết bị --</option>
              <option v-for="model in models" :key="model.modelName" :value="model.modelName">
                {{ model.modelName }}
              </option>
            </select>
          </div>

          <div class="mb-3">
            <label class="form-label" style="color: blue;font-weight: bold;" >Chọn License</label>
            <select v-model="selectedLicenseName" class="form-select">
              <option value="" disabled>-- Chọn license --</option>
              <option v-for="license in availableLicenses" :key="license.licenseName" :value="license.licenseName">
                {{ license.licenseName }}
              </option>
            </select>
          </div>
          <div class="mb-3">
  <label class="form-label" style="color: green;font-weight: bold;">Chọn loại tiền</label>
  <select v-model="currency" class="form-select" style="background-color: red;color: aliceblue;font-weight: bold;">
    <option value="VND">VNĐ</option>
    <option value="USD">USD</option>
  </select>
</div>

          <div class="row g-2">
            <div class="col-6">
              <label class="form-label" style="color: blue;font-weight: bold;">Số lượng</label>
              <input v-model.number="form.quantity" type="number" min="1" class="form-control" />
            </div>
            <div class="col-6">
              <label class="form-label" style="color: blue;font-weight: bold;">VAT (%)</label>
              <input v-model.number="form.vat" type="number" min="0" class="form-control" />
            </div>
            <div class="mb-3">
  <label class="form-label" style="color: blue;font-weight: bold;">Mức Off (%)</label>
  <input v-model.number="form.offPercent" type="number" min="0" max="100" class="form-control" />
</div>

          </div>

          <button @click="addProduct" class="btn btn-success w-100 mt-3" style="background-color: blue;">
             THÊM✅
          </button>
          <div class="text-end mt-3">
  <button @click="exportToGoogleSheet" class="btn btn-primary" style="background-color: green;">
    <strong>(1)</strong> Xuất báo giá sang Google Sheet📤
  </button><br>
  <a
  href="https://docs.google.com/spreadsheets/d/1J8-2PioiG1JEumeQ5k90B-Jux9M1noRXSOwJsuPlghM/export?format=xlsx"
  target="_blank"
  download
  class="btn btn-success"
  style="margin-top: 1rem;"
>
<strong>(2)</strong> DOAWLOAD EXCEL⬇️
</a><br>
<a
    href="https://docs.google.com/spreadsheets/d/1J8-2PioiG1JEumeQ5k90B-Jux9M1noRXSOwJsuPlghM/export?format=pdf&gid=1649674712"
    target="_blank"
    download
    class="btn btn-danger"
    style="margin-top: 0.5rem;"
  >
    <strong>(3)</strong> DOAWLOAD PDF 📑
  </a>
<button @click="goToDealReg" class="btn btn-warning w-100 mt-2" style="color:blue;font-weight: bold;">
   SEND PRICE TO DEALREG✅
</button>

</div>

        </div>
      </div>

      <div class="col-md-8">
        <button @click="goToUpdateModel" class="btn btn-success btn-lg">
        📦 Cập nhật giá Model
      </button>

      <button @click="goToUpdateLicense" class="btn btn-primary btn-lg">
        🛡️ Cập nhật giá License
      </button>

      <button @click="goToCurrentForm" class="btn btn-warning btn-lg">
        📝 Form báo giá hiện tại
      </button>
        <table class="table table-bordered text-center align-middle fixed-table">
          <thead class="table-light">
            <tr >
              <th style="width: 50px;background-color: #198754;color:aliceblue">STT</th>
    <th style="width: 150px;background-color: #198754;color:aliceblue">Tên hàng hóa</th>
    <th style="width: 400px;background-color: #198754;color:aliceblue">Diễn giải</th>
    <th style="width: 80px;background-color: #198754;color:aliceblue">Hãng</th>
    <th style="width: 80px;background-color: #198754;color:aliceblue">Đơn vị tính</th>
    <th style="width: 50px;background-color: #198754;color:aliceblue">S.L</th>
    <th style="width: 120px;background-color: #198754;color:aliceblue">Giá List </th> <!-- ⭐ mới -->
    <th style="width: 120px;background-color: #198754;color:aliceblue">Đơn giá </th>
    <th style="width: 120px;background-color: #198754;color:aliceblue">Tổng Giá List</th> <!-- ⭐ mới -->
    <th style="width: 120px;background-color: #198754;color:aliceblue">Thành tiền</th>
    <th style="width: 100px;background-color: #198754;color:aliceblue">VAT</th>
    <th style="width: 140px;background-color: #198754;color:aliceblue">Thành tiền + VAT</th>
            </tr>
          </thead>
          <tbody>
            <tr class="tRow" v-for="(product, index) in productList" :key="index" @click="selectProduct(product, index)" :class="{ 'selected-row': editingIndex === index }" style="cursor: pointer">
              <td>{{ index + 1 }}</td>
    <td>{{ product.name }}</td>
    <td class="text-start">{{ product.description }}</td>
    <td>{{ product.type }}</td>
    <td>{{ product.unit }}</td>
    <td>{{ product.quantity }}</td>
    <td>{{ formatPrice(product.originPrice) }}</td> <!-- ⭐ Giá list -->
    <td>{{ formatPrice(product.price) }}</td>         <!-- Giá sau Off -->
    <td>{{ formatPrice(product.originPrice * product.quantity) }}</td> <!-- ⭐ Tổng giá list -->
    <td>{{ formatPrice(product.total) }}</td>
    <td>{{ formatPrice(product.vatAmount) }}</td>
    <td>{{ formatPrice(product.grandTotal) }}</td>
            </tr>
            <tr class="bg-warning fw-bold">
  <td colspan="8" class="text-end">TỔNG CỘNG + THUẾ</td>
  <td>{{ formatPrice(totalTongGiaList) }}</td> <!-- Tổng giá list -->
  <td>{{ formatPrice(totalThanhTien) }}</td> <!-- Thành tiền sau off -->
  <td>{{ formatPrice(totalVAT) }}</td>
  <td>{{ formatPrice(totalGrandTotal) }}</td>
</tr>
          </tbody>
        </table>
        <div class="mt-3 text-end" style="color: greenyellow; font-size: large;">
  Chênh lệch tổng giá list: 
  <strong><span style="font-weight: bold;font-size: large;">{{ formatPrice(differenceThanhTienVsGiaList) }}</span></strong>
</div>

      </div>
    </div>

    <div v-if="showModal" class="modal-backdrop">
      <div class="modal-content">
        <h5 class="modal-title">Chỉnh sửa thông tin</h5>
        <div class="mb-2">
          <label class="form-label" >Tên hàng hóa</label>
          <input disabled v-model="editingProduct.name" class="form-control" />
        </div>
        <div class="mb-2">
          <label class="form-label" style="color: blue;font-weight: bold;">Diễn giải</label>
          <textarea style="height: 200px;" v-model="editingProduct.description" class="form-control"></textarea>
        </div>
        <div class="row g-2">
          <div class="col-6">
            <label class="form-label"style="color: blue;font-weight: bold;">Hãng</label>
            <input v-model="editingProduct.type" class="form-control" />
          </div>
          <div class="col-6">
            <label class="form-label"style="color: blue;font-weight: bold;">Đơn vị</label>
            <input v-model="editingProduct.unit" class="form-control" />
          </div>
        </div>
        <div class="row g-2 mt-2">
          <div class="col-6">
            <label class="form-label"style="color: blue;font-weight: bold;">Số lượng</label>
            <input v-model.number="editingProduct.quantity" type="number" min="1" class="form-control" />
          </div>
          <div class="col-6">
            <label class="form-label"style="color: blue;font-weight: bold;">Đơn giá</label>
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
    <label class="form-label" style="color: blue;font-weight: bold;">Mức Off (%)</label>
    <input v-model.number="editingProduct.offPercent" type="number" min="0" max="100" class="form-control" />
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
  <div v-if="showAlert" class="custom-alert">
  <div class="custom-alert-box">
    <p>{{ alertMessage }}</p>
  </div>
</div>


</template>

<script setup>

import { ref, computed, onMounted,watch } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
defineOptions({ name: 'Home' })

const backendUrl = 'https://script.google.com/macros/s/AKfycbxYoVdYvA0QNanulci7YUegMka45bPzLQuut40k9piW4U1ss9v6cnpNTE9iwPAk3VuI5A/exec'
const excelDownloadUrl = 'https://docs.google.com/spreadsheets/d/1J8-2PioiG1JEumeQ5k90B-Jux9M1noRXSOwJsuPlghM/export?format=xlsx';

const router = useRouter()
const companyName = ref('')
const receiverName = ref('')
const receiverAddress = ref('')
const currency = ref('VND') // 🟡 ComboBox: VND hoặc USD
const products = ref([])
const licenses = ref([])
const models = ref([])
const productList = ref([])
const selectedModelName = ref('')
const selectedLicenseName = ref('')
const form = ref({ quantity: 1, vat: 10, offPercent: 0 })
const showModal = ref(false)
const editingProduct = ref({})
let editingIndex = -1
const showAlert = ref(false)
const alertMessage = ref('')

const customerList = ref([])
const customAlert = (msg) => {
  alertMessage.value = msg
  showAlert.value = true
  setTimeout(() => {
    showAlert.value = false
  }, 500) // ⏱️ 0.5 giây
}


const fetchCustomerList = async () => {
  try {
    const sheetURL = 'https://docs.google.com/spreadsheets/d/1JIr9UbcCEwQ-rEyUjVrS7tFLX-REQT3LmEejRY-RhbY/gviz/tq?tqx=out:json&sheet=CUSTOMER_MANAGER'
    const res = await fetch(sheetURL)
    const text = await res.text()
    const json = JSON.parse(text.substring(47).slice(0, -2))

    customerList.value = json.table.rows.map(row => ({
      company: row.c[2]?.v || '',    // Cột C
      receiver: row.c[8]?.v || '',   // Cột I
      address: row.c[5]?.v || ''     // Cột F
    }))

    console.log('✅ Danh sách công ty:', customerList.value)
  } catch (error) {
    console.error('❌ Lỗi lấy danh sách công ty:', error)
  }
}


const autoFillCustomerInfo = () => {
  const input = companyName.value?.trim().toLowerCase()
  if (!input) return

  const matched = customerList.value.find(c =>
    c.company?.trim().toLowerCase() === input
  )

  if (matched) {
    receiverName.value = matched.receiver
    receiverAddress.value = matched.address
  }
}

const fetchProducts = async () => {
  try {
    const response = await axios.get(`${backendUrl}?action=getProducts`)
    products.value = response.data.products || []
    licenses.value = response.data.licenses || []
    updateModels()
  } catch (error) {
    console.error('Lỗi lấy dữ liệu:', error)
  }
}

// ✅ Update lại models khi currency thay đổi
const updateModels = () => {
  models.value = products.value.map(product => ({
    modelName: product.modelName,
    description: product.description,
    price: currency.value === 'USD' ? product.priceUSD : product.priceVND
  }))
}

watch(currency, updateModels) // 🔁 tự cập nhật lại model khi đổi tiền

const availableLicenses = computed(() => {
  if (!selectedModelName.value) return []
  return licenses.value.filter(license =>
    license.models.some(model => model.model === selectedModelName.value)
  )
})

const findPrice = (licenseName, modelName) => {
  const license = licenses.value.find(l => l.licenseName === licenseName);
  if (!license) return 0;
  const model = license.models.find(m => m.model === modelName);
  if (!model) return 0;
  return currency.value === 'USD' ? (model.priceUSD || model.price) : model.price;
};


const addProduct = () => {
  if (!selectedModelName.value) {
    alert('Vui lòng chọn thiết bị')
    return
  }

  let price = 0
  let type = 'SOPHOS'
  let name = selectedModelName.value
  let description = ''

  // ✅ LẤY GIÁ THEO CURRENCY
  const modelInfo = products.value.find(m => m.modelName === selectedModelName.value)
  if (modelInfo) {
    description = modelInfo.description
    price = currency.value === 'USD' ? modelInfo.priceUSD : modelInfo.priceVND
  }

  // ✅ Nếu chọn license thì override giá
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

  // ✅ OFF, VAT, TOTAL
  const finalPrice = Math.round(price * (1 - (form.value.offPercent || 0) / 100))
  const total = finalPrice * form.value.quantity
  const vatAmount = (total * form.value.vat) / 100
  const grandTotal = total + vatAmount

  productList.value.push({
    name,
    description,
    type,
    unit: 'Bộ',
    quantity: form.value.quantity,
    price: finalPrice,
    total,
    vatAmount,
    grandTotal,
    vatPercent: form.value.vat,
    offPercent: form.value.offPercent || 0,
    originPrice: price // ⭐ Giá gốc để hiển thị cột "Giá List"
  })

  selectedModelName.value = ''
  selectedLicenseName.value = ''
  form.value.quantity = 1
  form.value.vat = 10

  customAlert('✅ Đã thêm vào danh sách thành công!')

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

const differenceThanhTienVsGiaList = computed(() =>
  totalTongGiaList.value - totalThanhTien.value
)

const totalTongGiaList = computed(() =>
  productList.value.reduce((sum, item) => {
    const origin = item.originPrice || 0
    const qty = item.quantity || 0
    return sum + origin * qty
  }, 0)
)

const formatPrice = (value) => {
  if (isNaN(value)) return '0 ₫'
  return value.toLocaleString('vi-VN')
}

const selectProduct = (product, index) => {
  editingProduct.value = {
    ...product,
    offPercent: product.offPercent || 0,
    originPrice: product.originPrice || product.price
  }
  editingIndex = index
  showModal.value = true
}

const updateProduct = () => {
  const vatRate = editingProduct.value.vatPercent ?? 10
  const offMultiplier = 1 - (editingProduct.value.offPercent || 0) / 100
  const finalPrice = Math.round(editingProduct.value.originPrice * offMultiplier)

  const total = finalPrice * editingProduct.value.quantity
  const vatAmount = (total * vatRate) / 100
  const grandTotal = total + vatAmount

  editingProduct.value.price = finalPrice
  editingProduct.value.total = total
  editingProduct.value.vatAmount = vatAmount
  editingProduct.value.grandTotal = grandTotal

  productList.value[editingIndex] = { ...editingProduct.value }
  showModal.value = false
  customAlert('✅ Đã lưu ')

}

const deleteProduct = () => {
  productList.value.splice(editingIndex, 1)
  showModal.value = false
  customAlert('🗑️ Đã xóa sản phẩm khỏi danh sách!')

}

onMounted(() => {
  fetchProducts()
  fetchCustomerList()
})

const formatNumberInput = (value) => {
  if (!value) return ''
  return Number(value).toLocaleString('vi-VN')
}

const updatePriceFormatted = (event) => {
  let input = event.target.value.replace(/[^\d]/g, '')
  editingProduct.price = Number(input) || 0
}

const exportToGoogleSheet = async () => {
  if (productList.value.length === 0) {
    alert('Danh sách hàng hóa trống, không thể xuất!')
    return
  }
  if (!companyName.value || !receiverName.value || !receiverAddress.value) {
    alert('Vui lòng nhập đầy đủ thông tin Công ty, Người nhận, Địa chỉ!')
    return
  }

  try {
    alert('⏳ Đang xuất dữ liệu, vui lòng chờ...')

    await fetch('https://script.google.com/macros/s/AKfycbzp7MVJpNIMSaa29fsa3aCD81wJVLKElCaAKOQ4WBLb38bh13CCfsrGV8uQKSh3F0QQcw/exec', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      mode: 'no-cors',
      body: JSON.stringify({
        action: 'exportBaoGia',
        data: productList.value,
        companyName: companyName.value,
        receiverName: receiverName.value,
        receiverAddress: receiverAddress.value
      })
    })

    setTimeout(() => {
      alert('✅ OK RỒI CHÚ SƠN CU BỰ')
      window.open('https://docs.google.com/spreadsheets/d/1J8-2PioiG1JEumeQ5k90B-Jux9M1noRXSOwJsuPlghM/edit?gid=1649674712', '_blank');

    }, 500)
  } catch (error) {
    console.error('Lỗi xuất Google Sheet:', error)
    alert('❌ Lỗi kết nối khi xuất Google Sheet!')
  }
}

const goToUpdateModel = () => {
  window.open('https://docs.google.com/spreadsheets/d/11TL444ExNL6A5bh5qnSHmRonewpLvUoXLOYTRfyQLAQ/edit?gid=1535002389', '_blank')
}

const goToUpdateLicense = () => {
  window.open('https://docs.google.com/spreadsheets/d/11TL444ExNL6A5bh5qnSHmRonewpLvUoXLOYTRfyQLAQ/edit?gid=1744217475', '_blank')
}

const goToCurrentForm = () => {
  window.open('https://docs.google.com/spreadsheets/d/1J8-2PioiG1JEumeQ5k90B-Jux9M1noRXSOwJsuPlghM/edit?gid=1649674712', '_blank')
}

window.alert = (msg) => {
  alertMessage.value = msg
  showAlert.value = true
  setTimeout(() => {
    showAlert.value = false
  }, 500)
}


const goToDealReg = () => {
  if (productList.value.length === 0) {
    alert('⚠️ Vui lòng thêm ít nhất 1 sản phẩm trước khi điền!')
    return
  }
  localStorage.setItem('dealProducts', JSON.stringify(productList.value))

  // ✅ Thông báo chép thành công
  alert('✅ Đã chép dữ liệu thành công!')

  setTimeout(() => {
    router.push('/dealreg')
  }, 500)
}

</script>



<style scoped>
.form-control {
  border-color: black;
}

.container {
  max-width: 1600px;
  margin: 0 auto; /* 🔥 thêm dòng này để container ra giữa */
  
}

.fixed-table {
  table-layout: fixed;
  width: 100%;
}

.fixed-table th, .fixed-table td {
  white-space: normal;
  word-break: break-word;
  padding: 8px;
  height: 80px;
}

.text-start {
  text-align: left !important;
}

.selected-row {
  background-color: #fff3cd !important;
}

.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  max-height: 90vh;
  overflow-y: auto;
  color: black;
}

/* 🔥 Thêm chặn scroll ngang toàn bộ */
body {
  overflow-x: hidden;
}
.custom-alert {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
}

.custom-alert-box {
  background: rgb(11, 180, 19);
  color: rgb(255, 255, 255);
  font-weight: bold;
  font-size: large;
  padding: 20px 30px;
  border-radius: 8px;
  box-shadow: 0 0 10px #000;
  max-width: 400px;
  text-align: center;
}
.tRow:hover{
  opacity: 0.8;
}
</style>

