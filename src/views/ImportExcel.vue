<template>
  <div class="container-wrapper">
    <div class="container py-4 animate-fade">
      <h2 class="text-center text-light mb-4 animate-pop">🗓️ ĐỀ XUẤT MUA HÀNG - IMPORT EXCEL</h2>

      <!-- THÔNG BÁO CHUYÊN NGHIỆP -->
      <div v-if="notifyMessage" class="custom-toast animate-toast">
        <i class="fa-solid fa-circle-check"></i> {{ notifyMessage }}
      </div>

      <!-- Upload Sheet PO -->
      <div class="mb-3">
        <label class="form-label fw-bold text-info">📄 IMPORT FILE EXCEL (LƯU Ý UPLOAD FILE 2 LẦN ĐỂ ĐỌC 2 SHEET)</label>
        <input type="file" class="form-control file-upload" @change="handleFileUploadPO" />
      </div>

      <!-- Upload Sheet Don_Hang -->
      <div class="mb-3">
        <label class="form-label fw-bold text-warning">IMPORT FILE EXCEL (LƯU Ý UPLOAD FILE 2 LẦN ĐỂ ĐỌC 2 SHEET)</label>
        <input type="file" class="form-control file-upload" @change="handleFileUploadDonHang" />
      </div>

      <!-- Nút xuất sang Google Sheet -->
      <div class="mt-4 d-flex flex-column gap-3 align-items-start animate-slide-in" v-if="Object.keys(poData).length && donHangList.length">
        <button class="btn btn-gradient-blue" @click="submitToGoogleSheet">
          <i class="fa-solid fa-floppy-disk fa-xl"></i> LƯU VÀO GOOGLESHEET  
        </button>

         <button class="btn btn-gradient-purple" @click="saveCustomerToSheet">
          <i class="fa-solid fa-user-plus fa-xl"></i> Lưu thông tin khách hàng
        </button>

        <button class="btn btn-gradient-green" @click="sendToBaoGia">
          <i class="fa-solid fa-file-export fa-xl"></i> Chuyển sang Báo Giá
        </button>

       
      </div>

     <!-- KHUNG TÌM KIẾM MÃ PO CHUYÊN NGHIỆP -->
<div class="search-wrapper animate-fade-in">
 
  <div class="search-box">
    <i class="fa-solid fa-magnifying-glass search-icon"></i>
    <input
      v-model="searchPO"
      class="search-input"
      placeholder="NHẬP MÃ PO/HỢP ĐỒNG"
    />
    <button class="search-button" @click="fetchPOData" :disabled="isLoading">
  <span v-if="isLoading" class="spinner"></span>
  <span v-else>Tìm kiếm</span>
</button>

  </div>
</div>


      <!-- Render PO -->
      <div v-if="Object.keys(poData).length" class="mt-5 animate-pop">
        <h4 class="text-info mb-3">📟 Thông tin PO</h4>
        <table class="table table-bordered bg-white rounded">
          <tbody>
            <template v-for="(section, index) in poSections" :key="index">
              <tr class="table-primary fw-bold">
                <td colspan="2">{{ section.title }}</td>
              </tr>
              <tr v-for="(value, label, i) in section.items" :key="i">
                <td class="fw-bold text-primary">{{ label }}</td>
                <td>{{ value }}</td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>

      <!-- Render Don_Hang -->
      <div v-if="donHangList.length" class="mt-4 animate-fade-in">
        <h4 class="text-success mb-3">📦 Danh sách sản phẩm</h4>
        <table class="table table-bordered bg-white rounded">
          <thead class="table-success">
            <tr>
              <th>Mã SKU</th>
              <th>Tên hàng hóa</th>
              <th>Nhà cung cấp</th>
              <th>SL</th>
              <th>List Price (USD)</th>
              <th>Mức off</th>
              <th>Đơn giá</th>
              <th>Thành tiền</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in donHangList" :key="index">
              <td>{{ item.maSKU }}</td>
              <td>{{ item.tenHang }}</td>
              <td>{{ item.nhaCungCap }}</td>
              <td>{{ item.sl }}</td>
              <td>{{ item.listPrice }}</td>
              <td>{{ item.mucOff }}</td>
              <td>{{ item.donGia }}</td>
              <td>{{ item.thanhTien }}</td>
            </tr>
            <tr class="fw-bold bg-warning">
              <td colspan="7" class="text-center">TỔNG CỘNG</td>
              <td>{{ totalThanhTien }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import * as XLSX from 'xlsx'
import { ref, computed } from 'vue'

const poData = ref({})
const donHangList = ref([])
const isLoading = ref(false)

const poSections = computed(() => [
  {
    title: 'I. THÔNG TIN KHÁCH HÀNG',
    items: {
      'PO/HĐ': poData.value['PO/HĐ'],
      'Hãng': poData.value['Hãng'],
      'Độ ưu tiên': poData.value['Độ ưu tiên'],
      'Trạng thái đơn hàng': poData.value['Trạng thái đơn hàng'],
      'Company (*)': poData.value['Company (*)'],
      'Address (*)': poData.value['Address (*)'],
      'Tel (*)': poData.value['Tel (*)'],
      'Fax': poData.value['Fax'],
      'Contact (*)': poData.value['Contact (*)'],
      'Email (*)': poData.value['Email (*)'],
      'Mobile': poData.value['Mobile'],
      'Website': poData.value['Website']
    }
  },
  {
    title: 'II. THÔNG TIN XUẤT HÓA ĐƠN, THANH LÝ & CHỨNG TỬ KHÁC',
    items: {
      'Công ty (*)': poData.value['Công ty (*)'],
      'Địa chỉ (*)': poData.value['Địa chỉ (*)'],
      'MST (*)': poData.value['MST (*)'],
      'Email (*) (HĐ)': poData.value['Email (*) (HĐ)'],
      'Thanh lý': poData.value['Thanh lý'],
      'ĐN thanh toán': poData.value['ĐN thanh toán'],
      'CO/CQ (*)': poData.value['CO/CQ (*)']
    }
  },
  {
    title: 'III. THÔNG TIN GIAO HÀNG TRIỂN KHAI',
    items: {
      'Giao hàng và hóa đơn ngay khi có hàng': poData.value['Giao hàng và hóa đơn ngay khi có hàng'],
      'Giao hàng và có kỹ thuật triển khai dự án': poData.value['Giao hàng và có kỹ thuật triển khai dự án'],
      'Liên hệ Kinh Doanh trước khi giao hàng': poData.value['Liên hệ Kinh Doanh trước khi giao hàng'],
      'Người nhận hàng (*)': poData.value['Người nhận hàng (*)'],
      'Địa chỉ (*) (giao hàng)': poData.value['Địa chỉ (*) (giao hàng)'],
      'Số điện thoại (*)': poData.value['Số điện thoại (*)'],
      'Người liên hệ triển khai (*)': poData.value['Người liên hệ triển khai (*)']
    }
  },
  {
    title: 'IV. THÔNG TIN THANH TOÁN',
    items: {
        'Ngày đặt cọc': poData.value['Ngày đặt cọc'],   
      'Tỉ lệ đặt cọc (%)': poData.value['Tỉ lệ đặt cọc (%)'],
      'Công nợ (ngày)': poData.value['Công nợ (ngày)'],
      'Ngày có hàng dự kiến': poData.value['Ngày có hàng dự kiến']
    }
  }
])

const totalThanhTien = computed(() => {
  return donHangList.value.reduce((sum, item) => sum + (Number(item.thanhTien) || 0), 0)
})

const handleFileUploadPO = (e) => {
  const file = e.target.files[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = (evt) => {
    const data = new Uint8Array(evt.target.result)
    const workbook = XLSX.read(data, { type: 'array' })
    const sheet = workbook.Sheets['PO']
    if (!sheet) return showToast('Không tìm thấy sheet PO!')

    const cell = (addr) => sheet[addr]?.v || ''

   poData.value = {
  'PO/HĐ': cell('B2'),
  'Hãng': cell('C2'),
  'Độ ưu tiên': cell('C3'),
  'Trạng thái đơn hàng': cell('F2'),
  'Company (*)': cell('C5'),
  'Address (*)': cell('C6'),
  'Tel (*)': cell('C7'),
  'Fax': cell('C8'),
  'Contact (*)': cell('C9'),
  'Email (*)': cell('C10'),
  'Mobile': cell('C11'),
  'Website': cell('C12'),
  'Công ty (*)': cell('C15'),
  'Địa chỉ (*)': cell('C16'),
  'MST (*)': cell('C17'),
  'Email (*) (HĐ)': cell('C18'),
  'Thanh lý': cell('C19'),
  'ĐN thanh toán': cell('C20'),
  'CO/CQ (*)': cell('C21'),
  'Giao hàng và hóa đơn ngay khi có hàng': cell('E5'),
  'Giao hàng và có kỹ thuật triển khai dự án': cell('E6'),
  'Liên hệ Kinh Doanh trước khi giao hàng': cell('E7'),
  'Người nhận hàng (*)': cell('F9'),
  'Địa chỉ (*) (giao hàng)': cell('F10'),
  'Số điện thoại (*)': cell('F11'),
  'Người liên hệ triển khai (*)': cell('F12'),
'Ngày đặt cọc': cell('F15'),   
  'Tỉ lệ đặt cọc (%)': cell('F16'),
  'Công nợ (ngày)': cell('F17'),
  'Ngày có hàng dự kiến': cell('F18')
}

  }
  reader.readAsArrayBuffer(file)
}

const handleFileUploadDonHang = (e) => {
  const file = e.target.files[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = (evt) => {
    const data = new Uint8Array(evt.target.result)
    const workbook = XLSX.read(data, { type: 'array' })
    const sheet = workbook.Sheets['Don_Hang']
    if (!sheet) return showToast('Không tìm thấy sheet Don_Hang!')

    const range = XLSX.utils.decode_range(sheet['!ref'])
    const list = []
    for (let row = 5; row <= range.e.r; row++) {
      const b = sheet[`B${row}`]?.v
      if (!b) continue

      list.push({
        maSKU: sheet[`B${row}`]?.v || '',
        tenHang: sheet[`C${row}`]?.v || '',
        nhaCungCap: sheet[`D${row}`]?.v || '',
        sl: sheet[`E${row}`]?.v || 0,
        listPrice: sheet[`F${row}`]?.v || 0,
        mucOff: sheet[`G${row}`]?.v || 0,
        donGia: sheet[`H${row}`]?.v || 0,
        thanhTien: sheet[`I${row}`]?.v || 0
      })
    }
    donHangList.value = list
  }
  reader.readAsArrayBuffer(file)
}

const submitToGoogleSheet = async () => {
  const scriptURL = 'https://script.google.com/macros/s/AKfycbxyYFiXE7TISpkTB2blDwm7LaXaVvJSr_3eg-gy9I43P-9LfsXPjauNm-01x2zzXbOlgg/exec'

  const body = {
    action: 'submitPO',
    po: poData.value,
    orders: donHangList.value
  }

  try {
    await fetch(scriptURL, {
      method: 'POST',
      mode: 'no-cors',
      body: JSON.stringify(body)
    })
    showToast('✅ Đã gửi dữ liệu lên Google Sheet!')
  } catch (err) {
    showToast('❌ Lỗi khi gửi dữ liệu: ' + err.message)
  }
}

const sendToBaoGia = () => {
  const dataToSend = {
    // Dành cho trang Báo Giá
    companyName: poData.value['Company (*)'] || '',
    receiverName: poData.value['Người nhận hàng (*)'] || '',
    receiverAddress: poData.value['Địa chỉ (*) (giao hàng)'] || '',

    // Danh sách sản phẩm chung
    productList: donHangList.value.map(item => ({
      name: item.maSKU,
      description: item.tenHang,
      type: item.nhaCungCap,
      unit: 'Bộ',
      quantity: item.sl,
      originPrice: item.listPrice,
      price: item.donGia,
      total: item.donGia * item.sl,
      vatAmount: 0,
      grandTotal: item.donGia * item.sl,
      vatPercent: 0,
      offPercent: item.mucOff || 0
    }))
  }

  localStorage.setItem('dataFromDXMH', JSON.stringify(dataToSend))
  showToast('✅ Đã chuyển dữ liệu sang trang Báo Giá!')
  setTimeout(() => {
    window.location.href = '/' // nếu có dùng vue-router thì thay bằng: router.push('/home')
  }, 300)
}

const saveCustomerToSheet = async () => {
const body = {
  action: 'saveFromDXMH',
  data: {
    MST: poData.value['MST (*)'] || '',
    companyVN: poData.value['Công ty (*)'] || '',
    companyEN: poData.value['Company (*)'] || '',
    website: poData.value['Website'] || '',
    address: poData.value['Address (*)'] || '',
    
    // Gán số điện thoại cá nhân làm số điện thoại công ty luôn
    fax: poData.value['Fax'] || '',
    contact: poData.value['Contact (*)'] || '',
    email: poData.value['Email (*)'] || '',
    mobile: poData.value['Mobile'] || '',
    
    // Thêm trường SDT Cty = mobile
    'SDT Cty': poData.value['Mobile'] || ''
  }
};


  try {
    await fetch('https://script.google.com/macros/s/AKfycbwzOmeME_EM5fKHfqRKCm8kMScgRvGJafZxHCEQT1SjUgBcsbUPdW6136Ww1s68Njd00Q/exec', {
      method: 'POST',
      mode: 'no-cors',
      body: JSON.stringify(body)
    });
    showToast('✅ Đã lưu thông tin khách hàng vào Google Sheet!');
  } catch (err) {
    showToast('❌ Lỗi khi lưu khách hàng!');
    console.error(err);
  }
};


const searchPO = ref('') // PO cần tìm

const fetchPOData = async () => {
  if (!searchPO.value) {
    showToast('⚠️ Vui lòng nhập mã PO/HĐ để tìm kiếm!')
    return
  }

  isLoading.value = true

  try {
    const response = await fetch(`https://script.google.com/macros/s/AKfycbxyYFiXE7TISpkTB2blDwm7LaXaVvJSr_3eg-gy9I43P-9LfsXPjauNm-01x2zzXbOlgg/exec?action=getPO&poCode=${encodeURIComponent(searchPO.value)}`)
    const result = await response.json()

    if (!result.success) {
      showToast('❌ Không tìm thấy mã PO/HĐ này!')
    } else {
      poData.value = { ...(result.po || {}) }
      donHangList.value = result.orders || []
      showToast('✅ Đã tìm thấy và hiển thị dữ liệu thành công!')
    }
  } catch (err) {
    showToast('❌ Lỗi khi tìm kiếm: ' + err.message)
  } finally {
    isLoading.value = false
  }
}


// Thêm biến cho thông báo popup chuyên nghiệp
const notifyMessage = ref('')

function showToast(msg) {
  notifyMessage.value = msg
  setTimeout(() => notifyMessage.value = '', 2500)
}

</script>

<style scoped>
.custom-toast {
  position: fixed;
  top: 40px;
  right: 40px;
  background: linear-gradient(to right, #00c9ff, #92fe9d);
  padding: 14px 24px;
  color: black;
  font-weight: bold;
  font-size: 16px;
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  gap: 12px;
  z-index: 9999;
}

.animate-toast {
  animation: toastIn 0.4s ease, toastOut 0.4s ease 2.1s;
}

@keyframes toastIn {
  0% { opacity: 0; transform: translateX(100%); }
  100% { opacity: 1; transform: translateX(0); }
}

@keyframes toastOut {
  0% { opacity: 1; transform: translateX(0); }
  100% { opacity: 0; transform: translateX(100%); }
}

.container-wrapper {
  background: transparent;
  padding: 40px 20px;
  color: white;
}

h2 {
  font-weight: bold;
  font-size: 2rem;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
}

.file-upload {
  background-color: #1f1f1f;
  border: 1px solid #444;
  color: white;
}

.btn-gradient-blue {
  background: linear-gradient(to right, #36d1dc, #5b86e5);
  
  color: white;
  font-weight: bold;
  border: none;
  padding: 12px 20px;
  border-radius: 8px;
  transition: transform 0.2s;
}

.btn-gradient-blue:hover {
  transform: scale(1.05);
}

.btn-gradient-green {
  background: linear-gradient(to right, #56ab2f, #a8e063);
  color: white;
  font-weight: bold;
  border: none;
  padding: 12px 20px;
  border-radius: 8px;
  transition: transform 0.2s;
}

.btn-gradient-purple {
  background: linear-gradient(to right, #8e2de2, #4a00e0);
  color: white;
  font-weight: bold;
  border: none;
  padding: 12px 20px;
  border-radius: 8px;
  transition: transform 0.2s;
}

.btn-gradient-green:hover,
.btn-gradient-purple:hover {
  transform: scale(1.05);
}

input.form-control::placeholder {
  font-weight: bold;
  color: #bbb;
}

.animate-fade {
  animation: fadeIn 0.8s ease-out both;
}

.animate-pop {
  animation: popIn 0.5s ease-out both;
}

.animate-fade-in {
  animation: fadeInUp 0.8s ease-out both;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes popIn {
  0% { opacity: 0; transform: scale(0.9); }
  100% { opacity: 1; transform: scale(1); }
}

@keyframes fadeInUp {
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
}

input:hover{
    transform: scale(1.05);
  transition: transform 0.3s ease;
}
input:focus{
     transform: scale(1.05);
  transition: transform 0.3s ease;
}
.btn {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  border-radius: 20px;
}

.btn:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 15px rgba(0, 255, 0, 0.3); /* hiệu ứng bóng đẹp */
}

.search-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;
}

.search-label {
  color: #ff6b6b;
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 10px;
  align-self: flex-start;
}

.search-box {
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 50px;
  padding: 10px 20px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  max-width: 600px;
  width: 100%;
  transition: all 0.3s ease;
}

.search-box:hover {
  box-shadow: 0 0 20px rgba(79, 209, 197, 0.4);
}

.search-icon {
  color: #4fd1c5;
  font-size: 20px;
  margin-right: 10px;
}

.search-input {
  flex: 1;
  border: none;
  background: transparent;
  color: white;
  font-size: 16px;
  font-weight: bold;
  outline: none;
  padding: 8px;
}

.search-input::placeholder {
  color: #ccc;
  font-weight: normal;
}

.search-button {
  background: linear-gradient(to right, #ff416c, #ff4b2b);
  border: none;
  padding: 8px 18px;
  color: white;
  font-weight: bold;
  border-radius: 20px;
  margin-left: 10px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.search-button:hover {
  transform: scale(1.05);
  box-shadow: 0 0 12px rgba(255, 75, 43, 0.5);
}

.search-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.spinner {
  width: 18px;
  height: 18px;
  border: 3px solid white;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.search-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

</style>

