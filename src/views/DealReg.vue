<template>
    <div class="deal-container">
      <div class="deal-container">
    <h2 class="mb-4 text-center" style="color: white;">📋 Deal Registration Form</h2>

    <div class="row g-4">
  <!-- 🔷 VÙNG 1: COMPANY INFO -->
  <div class="col-12">
    <div class="card shadow-sm p-3 border-0 rounded-3">
      <h5 class="text-primary fw-bold mb-3">📁 End User Company Info</h5>
      <div class="row g-3">
        <div class="col-md-6">
          <label class="form-label fw-bold" style="color: blue;">End User Company Name (EN)</label>
          <input v-model="form.companyNameEN" list="companyENOptions" class="form-control" placeholder="Enter company name in English" />
          <datalist id="companyENOptions">
            <option v-for="c in customerList" :key="c.companyEN" :value="c.companyEN" />
          </datalist>
        </div>
        <div class="col-md-6">
          <label class="form-label fw-bold text-danger" style="color: blue;">End User Company Name Vietnamese*</label>
          <input v-model="form.companyNameVN" list="companyVNOptions" class="form-control" placeholder="Nhập tên công ty bằng tiếng Việt" />
          <datalist id="companyVNOptions">
            <option v-for="c in customerList" :key="c.companyVN" :value="c.companyVN" />
          </datalist>
        </div>
       
        <div class="col-md-6">
          <label class="form-label fw-bold" style="color: red;">Company Address*</label>
          <input v-model="form.address" type="text" class="form-control" placeholder="Số nhà, đường, quận/huyện, tỉnh/thành" />
        </div>
        <div class="col-md-6">
          <label class="form-label fw-bold"  style="color: red;">End User Website*</label>
          <input v-model="form.userWebsite" type="text" class="form-control" placeholder="www.example.com" />
        </div>
      </div>
    </div>
  </div>

  <!-- 🔷 VÙNG 2: CONTACT INFO -->
  <div class="col-12">
    <div class="card shadow-sm p-3 border-0 rounded-3">
      <h5 class="text-success fw-bold mb-3">👤 End User Contact Info</h5>
      <div class="row g-3">
        <div class="col-md-6">
          <label class="form-label fw-bold"  style="color: green;">End User Name</label>
          <input v-model="form.userName" type="text" class="form-control" placeholder="Tên người liên hệ" />
        </div>
        <div class="col-md-6">
          <label class="form-label fw-bold" style="color: green;">End User Email*</label>
          <input v-model="form.userEmail" type="email" class="form-control" placeholder="example@domain.com" />
        </div>
        <div class="col-md-6">
          <label class="form-label fw-bold" style="color: green;">End User Phone*</label>
          <input v-model="form.userPhone" type="text" class="form-control" placeholder="Số điện thoại liên hệ" />
        </div>
        <div class="col-md-6">
          <label class="form-label fw-bold" style="color: green;">Existing Sophos Customer?</label>
          <div class="form-check mt-2">
            <input class="form-check-input" type="checkbox" v-model="form.isExistingSophos" id="existingCustomer" />
            <label class="form-check-label" for="existingCustomer">Yes</label>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- 🔷 VÙNG 3: PROJECT INFO -->
  <div class="col-12">
    <div class="card shadow-sm p-3 border-0 rounded-3">
      <h5 class="text-warning fw-bold mb-3">📊 Project Details</h5>
      <div class="row g-3">
        <div class="col-md-6">
          <label class="form-label fw-bold" style="color: blue;">Project Name (Vietnamese)/*GHI CHÚ</label>
          <input v-model="form.projectNameVN" type="text" class="form-control" placeholder="Tên dự án tiếng Việt" />
        </div>
        <div class="col-md-6">
          <label class="form-label fw-bold" style="color: blue;">Project Name (English)/*NOTE</label>
          <input v-model="form.projectNameEN" type="text" class="form-control" placeholder="Project name in English" />
        </div>
        <div class="col-md-6">
          <label class="form-label fw-bold" style="color: blue;">Company Size <span class="fst-italic">(no. of employees)</span></label>
          <input v-model="form.companySize" type="number" class="form-control" placeholder="Ví dụ: 50" />
        </div>
        <div class="col-md-6">
          <label class="form-label fw-bold" style="color: blue;">Country*</label>
          <input v-model="form.country" type="text" class="form-control" placeholder="Nhập quốc gia" />
        </div>
        <div class="col-md-6">
          <label class="form-label fw-bold" style="color: blue;">Estimated Customer Budget (in USD)</label>
          <input v-model="form.budget" type="text" class="form-control" placeholder="Ví dụ: 50000" />
        </div>
        <div class="col-md-6">
          <label class="form-label fw-bold" style="color: blue;">Competition*</label>
          <input v-model="form.competition" type="text" class="form-control" placeholder="Tên đối thủ cạnh tranh" />
        </div>
        <div class="col-md-6">
          <label class="form-label fw-bold" style="color: blue;">Estimated Closure Date <span class="fst-italic">(DD/MM/YYYY)</span></label>
          <input v-model="form.closureDate" type="date" class="form-control" />
        </div>
        <div class="col-12">
          <label class="form-label fw-bold" style="color: blue;">Proposed POC Schedule</label>
          <textarea v-model="form.pocSchedule" rows="2" class="form-control" placeholder="Thời gian triển khai thử nghiệm dự kiến (POC)"></textarea>
        </div>
      </div>
    </div>
  </div>
</div>

    <div class="text-end mt-4">
      <button @click="submitForm" class="btn btn-primary">SEND ✅ </button>
    </div>
    <div class="text-end mt-3">
  <button @click="exportDealReg" class="btn btn-success">📤 Xuất DealReg sang Google Sheet</button>
</div>
<div class="text-end mt-2">
  <a
    href="https://docs.google.com/spreadsheets/d/1FQv4WbpyUaniwHt3q3fD1v947-52NU669904L89XGpk/export?format=pdf&gid=1210225152"
    target="_blank"
    download
    class="btn btn-danger"
  >
    📄 Tải file PDF DealReg
  </a>
</div>


  </div>

  
      <div v-if="submitted" class="mt-5">
        <h4 class="text-info mb-3">🧾 Deal Registration Summary</h4>
  
        <table class="table table-bordered text-white">
          <thead class="bg-light text-dark">
            <tr style="color: aliceblue;"><th colspan="4">Deal Registration Form</th></tr>
          </thead>
          <tbody>
            <tr><td>End user Company Name*</td><td>{{ form.companyNameEN }}</td><td>End User Name*</td><td>{{ form.userName }}</td></tr>
            <tr><td class="text-danger">End User Company Name Vietnamese*</td><td>{{ form.companyNameVN }}</td><td>End User Email*</td><td>{{ form.userEmail }}</td></tr>
            <tr><td>Company Address*</td><td>{{ form.address }}</td><td>End User Phone*</td><td>{{ form.userPhone }}</td></tr>
            <tr><td></td><td></td><td>End User Website*</td><td>{{ form.userWebsite }}</td></tr>
            <tr><td>Country*</td><td>{{ form.country }}</td><td>Existing Sophos Customer?</td><td>{{ form.isExistingSophos ? 'Yes' : 'No' }}</td></tr>
            <tr><td>Company Size <span class="fst-italic">(no. of employees)</span></td><td>{{ form.companySize }}</td><td>Estimated Customer Budget (in USD)</td><td>{{ form.budget }}</td></tr>
            <tr><td>Estimated Closure Date <span class="fst-italic">(DD/MM/YYYY)</span></td><td>{{ form.closureDate }}</td><td>Competition*</td><td>{{ form.competition }}</td></tr>
            <tr><td>Proposed POC Schedule</td><td colspan="3">{{ form.pocSchedule }}</td></tr>
          </tbody>
  
          <thead class="table-warning text-dark">
            <tr><th colspan="4">Partner Information</th></tr>
          </thead>
          <tbody>
            <tr><td class="text-primary">Partner Company Name*</td><td><strong>Nam Truong Son System Integration Corp (NTSSI)</strong></td><td class="text-primary">Account Manager Email*</td><td>Son-le.phi@nts.com.vn</td></tr>
            <tr><td class="text-primary">Partner Address*</td><td>20 Tang Bat Ho, Ward 11, Binh Thanh District, Ho Chi Minh City</td><td></td><td></td></tr>
            <tr><td class="text-primary">Account Manager Name*</td><td>Le Phi Son</td><td class="text-danger">Account Manager Phone*</td><td>+84 908137488</td></tr>
          </tbody>
  
          <thead class="table-secondary text-dark">
            <tr><th colspan="4">Remarks<br>  (Any comments/ details/ requirements/ project name / tender specifications and etc. For government bids, its mandatory to indicate project name, procuring entity, project background/used case e.g. if one lot.)</th></tr>
          </thead>
          <tbody>
            <tr>
              <td colspan="4"><strong>{{ form.projectNameEN }} <br>{{ form.projectNameVN }}</strong></td>
            </tr>
          </tbody>
  
          <thead class="table-success text-dark">
            <tr><th colspan="4">Bill of Materials</th></tr>
            <tr><th>SKU/ Product/ Description*</th><th>Qty*</th><th colspan="2">Estimated Value (in USD)</th></tr>
          </thead>
          <tbody>
            <tr
  v-for="(item, index) in products"
  :key="index"
  @click="openEditModal(item)"
  style="cursor: pointer;"
>
  <td>{{ item.name }} – {{ item.description }}</td>
  <td>{{ item.quantity }}</td>
  <td colspan="2">{{ formatPrice(item.grandTotal) }}</td>
</tr>

<tr class="fw-bold">
  <td colspan="2">Total:</td>
  <td colspan="2">{{ formatPrice(totalEstimatedValue) }}</td>
</tr>
          </tbody>
        </table>
      </div>

       <!-- MODAL BOX -->
    <div
      class="modal fade"
      id="editModal"
      tabindex="-1"
      aria-labelledby="editModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="editModalLabel">✏️ Chỉnh sửa thông tin Deal</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="row g-4">
              <!-- VÙNG 1: COMPANY INFO -->
              <div class="col-12">
                <div class="card">
                  <h6 class="text-primary fw-bold">📁 End User Company Info</h6>
                  <div class="row g-3">
                    <div class="col-md-6">
                      <label class="form-label">Company Name (EN)</label>
                      <input v-model="editForm.companyNameEN" type="text" class="form-control" />
                    </div>
                    <div class="col-md-6">
                      <label class="form-label">Company Name Vietnamese*</label>
                      <input v-model="editForm.companyNameVN" type="text" class="form-control" />
                    </div>
                    <div class="col-md-6">
                      <label class="form-label">Company Address*</label>
                      <input v-model="editForm.address" type="text" class="form-control" />
                    </div>
                    <div class="col-md-6">
                      <label class="form-label">Website*</label>
                      <input v-model="editForm.userWebsite" type="text" class="form-control" />
                    </div>
                  </div>
                </div>
              </div>

              <!-- VÙNG 2: CONTACT INFO -->
              <div class="col-12">
                <div class="card">
                  <h6 class="text-success fw-bold">👤 Contact Info</h6>
                  <div class="row g-3">
                    <div class="col-md-6">
                      <label class="form-label">Name</label>
                      <input v-model="editForm.userName" type="text" class="form-control" />
                    </div>
                    <div class="col-md-6">
                      <label class="form-label">Email*</label>
                      <input v-model="editForm.userEmail" type="email" class="form-control" />
                    </div>
                    <div class="col-md-6">
                      <label class="form-label">Phone*</label>
                      <input v-model="editForm.userPhone" type="text" class="form-control" />
                    </div>
                    <div class="col-md-6">
                      <label class="form-label">Existing Sophos Customer?</label>
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          v-model="editForm.isExistingSophos"
                        />
                        <label class="form-check-label">Yes</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- VÙNG 3: PROJECT INFO -->
              <div class="col-12">
                <div class="card">
                  <h6 class="text-warning fw-bold">📊 Project Details</h6>
                  <div class="row g-3">
                    <div class="col-md-6">
                      <label class="form-label">Project Name (VN)</label>
                      <input v-model="editForm.projectNameVN" type="text" class="form-control" />
                    </div>
                    <div class="col-md-6">
                      <label class="form-label">Project Name (EN)</label>
                      <input v-model="editForm.projectNameEN" type="text" class="form-control" />
                    </div>
                    <div class="col-md-6">
                      <label class="form-label">Company Size</label>
                      <input v-model="editForm.companySize" type="number" class="form-control" />
                    </div>
                    <div class="col-md-6">
                      <label class="form-label">Country*</label>
                      <input v-model="editForm.country" type="text" class="form-control" />
                    </div>
                    <div class="col-md-6">
                      <label class="form-label">Budget (USD)</label>
                      <input v-model="editForm.budget" type="text" class="form-control" />
                    </div>
                    <div class="col-md-6">
                      <label class="form-label">Competition*</label>
                      <input v-model="editForm.competition" type="text" class="form-control" />
                    </div>
                    <div class="col-md-6">
                      <label class="form-label">Closure Date</label>
                      <input v-model="editForm.closureDate" type="date" class="form-control" />
                    </div>
                    <div class="col-12">
                      <label class="form-label">POC Schedule</label>
                      <textarea v-model="editForm.pocSchedule" rows="2" class="form-control"></textarea>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
            <button type="button" class="btn btn-primary" @click="saveEdit">Lưu thay đổi</button>
          </div>
        </div>
      </div>
    </div>

<div v-if="showPopup" class="popup-notify show">
  {{ popupMessage }}
</div>

    </div>
    
  </template>
  
  <script setup>
import { ref, computed, onMounted,watch } from 'vue'
const editForm = ref({})
const showPopup = ref(false)
const popupMessage = ref('')

const triggerPopup = (message) => {
  popupMessage.value = message
  showPopup.value = true
  setTimeout(() => {
    showPopup.value = false
  }, 2000)
}

const openEditModal = (item) => {
  editForm.value = { ...item }
  const modal = new bootstrap.Modal(document.getElementById('editModal'))
  modal.show()
}

const saveEdit = () => {
  alert('💾 Lưu thay đổi thành công (test)')
  const modal = bootstrap.Modal.getInstance(document.getElementById('editModal'))
  modal.hide()
}
const form = ref({
  projectNameEN: '',
  projectNameVN: '',
  companyNameEN: '',
  companyNameVN: '',
  address: '',
  country: 'Viet Nam',
  companySize: '',
  userName: '',
  userEmail: '',
  userPhone: '',
  userWebsite: '',
  isExistingSophos: false,
  budget: '',
  competition: '',
  closureDate: '',
  pocSchedule: ''
})

const submitted = ref(false)
const products = ref([])
const customerList = ref([])

const fetchCustomerList = async () => {
  try {
    const sheetURL = 'https://docs.google.com/spreadsheets/d/1JIr9UbcCEwQ-rEyUjVrS7tFLX-REQT3LmEejRY-RhbY/gviz/tq?tqx=out:json&sheet=CUSTOMER_MANAGER'
    const res = await fetch(sheetURL)
    const text = await res.text()
    const json = JSON.parse(text.substring(47).slice(0, -2))

    customerList.value = json.table.rows.map(row => ({
      companyVN: row.c[2]?.v || '',  // C
      companyEN: row.c[3]?.v || '',  // D
      website: row.c[4]?.v || '',    // E
      address: row.c[5]?.v || '',    // F
      userName: row.c[8]?.v || '',   // I
      userEmail: row.c[9]?.v || '',  // J
      userPhone: row.c[10]?.v || ''  // K
    }))
  } catch (error) {
    console.error('❌ Lỗi lấy danh sách khách hàng:', error)
  }
}


onMounted(() => {
  const saved = localStorage.getItem('dealProducts')
  if (saved) {
    products.value = JSON.parse(saved)
  }
  fetchCustomerList()
})

watch(() => form.value.companyNameEN, (newName) => {
  const matched = customerList.value.find(c =>
    c.companyEN?.trim().toLowerCase() === newName?.trim().toLowerCase()
  )
  if (matched) {
    form.value.companyNameVN = matched.companyVN
    form.value.userName = matched.userName
    form.value.userEmail = matched.userEmail
    form.value.userPhone = matched.userPhone
    form.value.address = matched.address
    form.value.userWebsite = matched.website
  }
})




const formatPrice = val => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val || 0)
}

const totalEstimatedValue = computed(() => {
  return products.value.reduce((sum, item) => sum + item.grandTotal, 0)
})

const submitForm = () => {
  submitted.value = true
  triggerPopup('✅ Đã gửi đăng ký thành công!')
}

const exportDealReg = async () => {
  try {
    await fetch('https://script.google.com/macros/s/AKfycbwG_WQktgkFQMgtkxxuKYUPrNyazoquP3zjodbJA-5Xc0YY5mK2MfKVxdXbNcg51tkT9w/exec', {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        action: 'exportDealReg',
        form: form.value,
        products: products.value
      })
    })
    alert(' Ô KÊ ✅')
    window.open('https://docs.google.com/spreadsheets/d/1FQv4WbpyUaniwHt3q3fD1v947-52NU669904L89XGpk/edit?gid=1210225152#gid=1210225152', '_blank');
  } catch (err) {
    alert('❌ Gửi thất bại!')
    console.error(err)
  }
}


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
.deal-container {
  max-width: 1000px;
  margin: auto;
  padding: 20px;
  background-color: #464646; /* Nền trắng */
  color: #000000;            /* Chữ đen */
  font-family: "Segoe UI", sans-serif;
}

.card {
  background-color: #ffffff; /* Nền vùng form nhạt */
  color: #000000;
  border: 1px solid #ddd;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

.card h5 {
  font-size: 1.1rem;
  font-weight: bold;
  margin-bottom: 16px;
}

label.form-label {
  color: #000000;
  font-weight: 600;
}

input.form-control,
textarea.form-control {
  background-color: #ffffff;
  color: #000000;
  border: 1px solid #ccc;
  border-radius: 6px;
}

input.form-control::placeholder,
textarea.form-control::placeholder {
  color: #999;
}

input.form-control:focus,
textarea.form-control:focus {
  border-color: #007bff;
  box-shadow: 0 0 4px #007bff44;
  outline: none;
}

.form-check-input {
  border: 1px solid #ccc;
}

.form-check-label {
  color: #000000;
}

/* Buttons */
button.btn-primary,
button.btn-success {
  font-weight: bold;
  padding: 10px 20px;
  border: none;
}

button.btn-primary {
  background-color: #007bff;
  color: #fff;
}

button.btn-primary:hover {
  background-color: #0056b3;
}

button.btn-success {
  background-color: #28a745;
  color: #fff;
}

button.btn-success:hover {
  background-color: #1e7e34;
}

/* Summary table */
.table-bordered {
  background-color: #ffffff;
  color: #000000;
}

.table-bordered th,
.table-bordered td {
  border: 1px solid #ccc;
}
.modal-content {
  background-color: #fdfdfd;
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

</style>

