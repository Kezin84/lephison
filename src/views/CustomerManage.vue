<template>
  <div class="container-wrapper">
    <div class="container py-4 animate-fade">
      <h2 class="text-center text-light mb-4 animate-pop">📋 Quản lý Khách hàng</h2>
      <!-- TÌM KIẾM -->
      <div class="d-flex justify-content-center mb-4">
        <div class="search-box">
          <input
            v-model="searchQuery"
            class="form-control search-input"
            placeholder="🔍 Tìm theo MST, Công ty (VN), Công ty (EN), Contact..."
          />
        </div>
      </div>

      <!-- VÙNG 1 -->
      <div class="border rounded p-3 mb-3 bg-light animate-fade-in">
        <h5 class="mb-3 text-primary">Thông tin công ty</h5>
        <div class="row g-3">
          <div class="col-md-4" v-for="(ph, key) in group1" :key="key">
            <label class="form-label fw-bold" style="color:blue">{{ key }}</label>
            <input v-model="form[key]" :placeholder="ph" class="form-control input-animated" />
          </div>
        </div>
      </div>

      <!-- VÙNG 2 -->
      <div class="border rounded p-3 mb-4 bg-light animate-fade-in">
        <h5 class="mb-3 text-primary" style="color:green">Thông tin liên hệ</h5>
        <div class="row g-3">
          <div class="col-md-4" v-for="(ph, key) in group2" :key="key">
            <label class="form-label fw-bold" style="color:green">{{ key }}</label>
            <input v-model="form[key]" :placeholder="ph" class="form-control input-animated" />
          </div>
        </div>
      </div>

      <div class="text-end mb-4">
        <button class="btn btn-primary px-4 py-2 fw-bold btn-animated" style="min-width: 150px; background: linear-gradient(to right, #52c234,#061700) !important;color: whitesmoke;" @click="handleAdd">
          <i class="fa-solid fa-square-plus fa-2xl"></i>
        </button>
      </div>

      <!-- BẢNG -->
      <table class="table table-bordered border-dark text-center animate-pop">
        <thead style="background-color: green; color: white;">
          <tr>
            <th style="background-color: green;color: antiquewhite;">STT</th>
            <th style="background-color: green;color: antiquewhite;">MST</th>
            <th style="background-color: green;color: antiquewhite;">Company (VN)</th>
            <th style="background-color: green;color: antiquewhite;">Company (EN)</th>
            <th style="background-color: green;color: antiquewhite;">Website</th>
            <th style="background-color: green;color: antiquewhite;">Địa chỉ</th>
            <th style="background-color: green;color: antiquewhite;">SDT Cty</th>
            <th style="background-color: green;color: antiquewhite;">Fax</th>
            <th style="background-color: green;color: antiquewhite;">Contact Info</th>
            <th style="background-color: green;color: antiquewhite;">Email</th>
            <th style="background-color: green;color: antiquewhite;">SDT cá nhân</th>
          </tr>
        </thead>
        <tbody>
          <tr class="tRow"
            v-for="(row, index) in filteredCustomers"
            :key="index"
            @click="openModal(row, index)"
            :style="{ backgroundColor: index % 2 === 0 ? '#f8f9fa' : 'white', cursor: 'pointer' }">
            <td>{{ index + 1 }}</td>
            <td>{{ row.MST }}</td>
            <td>{{ row['COMPANY (VN)'] }}</td>
            <td>{{ row['COMPANY (EN)'] }}</td>
            <td>{{ row.Website }}</td>
            <td>{{ row.Address }}</td>
            <td>{{ row['SDT Cty'] }}</td>
            <td>{{ row.Fax }}</td>
            <td>{{ row.Contact }}</td>
            <td>{{ row.Email }}</td>
            <td>{{ row['SDT Cá Nhân'] }}</td>
          </tr>
        </tbody>
      </table>

      <!-- MODAL -->
      <div v-if="modalVisible" class="modal-backdrop">
        <div class="modal-content-custom">
          <h5 class="mb-3">📝 Cập nhật / Xóa khách hàng</h5>
          <div class="row g-3 mb-3">
            <div class="col-md-6" v-for="(val, key) in modalData" :key="key">
              <label class="form-label fw-bold" style="color:blue">{{ key }}</label>
              <input v-model="modalData[key]" type="text" class="form-control input-animated" />
            </div>
          </div>
          <div>
            <button class="btn btn-success me-2 btn-animated" @click="handleUpdate">CẬP NHẬT ✅</button>
            <button class="btn btn-danger me-2 btn-animated" @click="handleDelete">XÓA KHÁCH ⚠️</button>
            <button class="btn btn-secondary btn-animated" @click="closeModal">CLOSE </button>
          </div>
        </div>
      </div>

      <!-- POPUP THÔNG BÁO -->
      <div v-if="showPopup" class="popup-notify show animate-fade-in">
        {{ popupMessage }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'

const customers = ref([])
const modalData = ref({})
const selectedIndex = ref(null)
const modalVisible = ref(false)
const searchQuery = ref('')
const showPopup = ref(false)
const popupMessage = ref('')

function triggerPopup(msg) {
  popupMessage.value = msg
  showPopup.value = true
  setTimeout(() => {
    showPopup.value = false
  }, 2000)
}

const sheetUrl = 'https://docs.google.com/spreadsheets/d/1JIr9UbcCEwQ-rEyUjVrS7tFLX-REQT3LmEejRY-RhbY/gviz/tq?tqx=out:json&sheet=CUSTOMER_MANAGER'
const submitUrl = 'https://script.google.com/macros/s/AKfycbwzOmeME_EM5fKHfqRKCm8kMScgRvGJafZxHCEQT1SjUgBcsbUPdW6136Ww1s68Njd00Q/exec'

const form = ref({
  MST: '', 'COMPANY (VN)': '', 'COMPANY (EN)': '', Website: '', Address: '',
  'SDT Cty': '', Fax: '', Contact: '', Email: '', 'SDT Cá Nhân': ''
})

const group1 = {
  MST: 'Nhập mã số thuế',
  'COMPANY (VN)': 'Tên công ty tiếng Việt',
  'COMPANY (EN)': 'Tên công ty tiếng Anh',
  Website: 'www.tencongty.com',
  Address: 'Địa chỉ công ty',
  'SDT Cty': 'Số điện thoại công ty',
  Fax: 'Số fax'
}

const group2 = {
  Contact: 'Người liên hệ',
  Email: 'email@tencongty.com',
  'SDT Cá Nhân': 'SĐT cá nhân'
}

const filteredCustomers = computed(() =>
  customers.value.filter(row => {
    const q = searchQuery.value.toLowerCase()
    return (
      row.MST?.toLowerCase().includes(q) ||
      row['COMPANY (VN)']?.toLowerCase().includes(q) ||
      row['COMPANY (EN)']?.toLowerCase().includes(q) ||
      row.Contact?.toLowerCase().includes(q)
    )
  })
)

function fetchData() {
  fetch(sheetUrl)
    .then(res => res.text())
    .then(text => {
      const json = JSON.parse(text.substr(47).slice(0, -2))
      customers.value = json.table.rows.map(row => {
        const c = row.c
        return {
          MST: c[1]?.v || '',
          'COMPANY (VN)': c[2]?.v || '',
          'COMPANY (EN)': c[3]?.v || '',
          Website: c[4]?.v || '',
          Address: c[5]?.v || '',
          'SDT Cty': c[6]?.v || '',
          Fax: c[7]?.v || '',
          Contact: c[8]?.v || '',
          Email: c[9]?.v || '',
          'SDT Cá Nhân': c[10]?.v || ''
        }
      })
    })
}

function handleAdd() {
  fetch(submitUrl, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'add', data: form.value })
  })
  triggerPopup('✅ Thêm khách hàng thành công!')
  Object.keys(form.value).forEach(key => form.value[key] = '')
  setTimeout(fetchData, 1000)
}

function openModal(row, index) {
  modalData.value = { ...row }
  selectedIndex.value = index + 2
  modalVisible.value = true
}
function closeModal() {
  modalVisible.value = false
}
function handleUpdate() {
  fetch(submitUrl, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'update', index: selectedIndex.value, data: modalData.value })
  })
  triggerPopup('✅ Cập nhật thành công!')
  closeModal()
  setTimeout(fetchData, 1000)
}
function handleDelete() {
  fetch(submitUrl, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'delete', index: selectedIndex.value })
  })
  triggerPopup('🗑️ Xóa khách hàng thành công!')
  closeModal()
  setTimeout(fetchData, 1000)
}

onMounted(fetchData)


const showScrollTop = ref(false)

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function scrollToBottom() {
  window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
}

function handleScroll() {
  showScrollTop.value = window.scrollY > 300
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-content-custom {
  background: white;
  padding: 24px;
  border-radius: 10px;
  width: 90%;
  max-width: 900px;
}
.tRow:hover {
  opacity: 0.7;
}

/* POPUP */
.popup-notify {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0.9);
  background: #28a745;
  color: white;
  padding: 16px 32px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  font-size: 1.2rem;
  font-weight: bold;
  opacity: 0;
  transition: all 0.3s ease-in-out;
  z-index: 9999;
}

.popup-notify.show {
  opacity: 1;
  transform: translate(-50%, -50%) scale(1);
}

.scroll-buttons {
  width: 100px;
  height:100px;
  position: fixed;
  right: 30px;
  bottom: 30px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  z-index: 9999;
}

.scroll-btn {
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 50%;
  padding: 12px 16px;
  font-size: 20px;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  transition: background-color 0.3s ease;
}

.scroll-btn:hover {
  background-color: #0056b3;
}

.search-box {
  width: 100%;
  max-width: 600px;
  position: relative;
  transition: transform 0.3s ease;
}

.search-input {
  padding: 12px 20px;
  border-radius: 50px;
  border: 2px solid #28a745;
  transition: all 0.3s ease;
  font-size: 1rem;
  box-shadow: 0 4px 15px rgba(40, 167, 69, 0.3);
  background-color: #ffffff;
  transform: scale(1.2);
}

.search-input:focus {
  border-color: #007bff;
  box-shadow: 0 0 10px rgba(0, 123, 255, 0.4);
  outline: none;
  transform: scale(1.4);
}

.search-input:hover {
  transform: scale(1.4);
}
.btn:hover{
  transform: scale(1.4);
  transition: transform 0.3s ease;
}
input:hover{
    transform: scale(1.1);
  transition: transform 0.3s ease;
}
input:focus{
     transform: scale(1.1);
  transition: transform 0.3s ease;
}
::placeholder {
  font-weight: bold;
  color:rgb(122, 122, 122);
  opacity: 1; /* Giữ màu rõ nếu trình duyệt tự làm mờ */
}
@keyframes fadeInUp {
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
}
.animate-fade-in {
  animation: fadeInUp 0.6s ease-out both;
}
.animate-pop {
  animation: popIn 0.5s ease-out both;
}
@keyframes popIn {
  0% { transform: scale(0.9); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}
.input-animated {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.input-animated:hover,
.input-animated:focus {
  transform: scale(1.05);
  box-shadow: 0 0 12px rgba(0, 123, 255, 0.3);
}
.btn-animated:hover {
  transform: scale(1.05);
  box-shadow: 0 0 10px rgba(50, 255, 50, 0.5);
}
</style>
