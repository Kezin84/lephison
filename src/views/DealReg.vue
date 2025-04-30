<template>
    <div class="deal-container">
      <h2 class="mb-4 text-center">📋 Deal Registration Form</h2>
  
      <div class="row g-3">
        <!-- Thêm input tên dự án -->
        <div class="col-md-6">
          <label class="form-label fw-bold">Project Name (English)</label>
          <input v-model="form.projectNameEN" type="text" class="form-control" />
        </div>
        <div class="col-md-6">
          <label class="form-label fw-bold">Project Name (Vietnamese)</label>
          <input v-model="form.projectNameVN" type="text" class="form-control" />
        </div>
  
        <!-- Form inputs -->
        <div class="col-md-6">
          <label class="form-label fw-bold">End User Company Name (EN)</label>
          <input v-model="form.companyNameEN" type="text" class="form-control" />
        </div>
        <div class="col-md-6">
          <label class="form-label fw-bold">End User Name</label>
          <input v-model="form.userName" type="text" class="form-control" />
        </div>
        <div class="col-md-6">
          <label class="form-label fw-bold text-danger">End User Company Name Vietnamese*</label>
          <input v-model="form.companyNameVN" type="text" class="form-control" />
        </div>
        <div class="col-md-6">
          <label class="form-label fw-bold">End User Email*</label>
          <input v-model="form.userEmail" type="email" class="form-control" />
        </div>
        <div class="col-md-6">
          <label class="form-label fw-bold">Company Address*</label>
          <input v-model="form.address" type="text" class="form-control" />
        </div>
        <div class="col-md-6">
          <label class="form-label fw-bold">End User Phone*</label>
          <input v-model="form.userPhone" type="text" class="form-control" />
          <label class="form-label fw-bold mt-2">End User Website*</label>
          <input v-model="form.userWebsite" type="text" class="form-control" />
        </div>
        <div class="col-md-6">
          <label class="form-label fw-bold">Country*</label>
          <input v-model="form.country" type="text" class="form-control" />
        </div>
        <div class="col-md-6">
          <label class="form-label fw-bold">Company Size <span class="fst-italic">(no. of employees)</span></label>
          <input v-model="form.companySize" type="number" class="form-control" />
        </div>
        <div class="col-md-6">
          <label class="form-label fw-bold">Estimated Customer Budget (in USD)</label>
          <input v-model="form.budget" type="text" class="form-control" />
        </div>
        <div class="col-md-6">
          <label class="form-label fw-bold">Competition*</label>
          <input v-model="form.competition" type="text" class="form-control" />
        </div>
        <div class="col-md-6">
          <label class="form-label fw-bold">Estimated Closure Date <span class="fst-italic">(DD/MM/YYYY)</span></label>
          <input v-model="form.closureDate" type="date" class="form-control" />
        </div>
        <div class="col-md-12">
          <label class="form-label fw-bold">Proposed POC Schedule</label>
          <textarea v-model="form.pocSchedule" rows="2" class="form-control"></textarea>
        </div>
        <div class="col-md-12">
          <label class="form-label fw-bold">Existing Sophos Customer?</label>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" v-model="form.isExistingSophos" />
            <label class="form-check-label">Yes</label>
          </div>
        </div>
      </div>
  
      <div class="text-end mt-4">
        <button @click="submitForm" class="btn btn-primary">✅ Gửi Đăng Ký</button>
      </div>
      <button @click="exportDealReg" class="btn btn-success mt-2">
  📤 Xuất DealReg sang Google Sheet
</button>

  
      <div v-if="submitted" class="mt-5">
        <h4 class="text-info mb-3">🧾 Deal Registration Summary</h4>
  
        <table class="table table-bordered text-white">
          <thead class="bg-light text-dark">
            <tr><th colspan="4">Deal Registration Form</th></tr>
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
            <tr v-for="(item, index) in products" :key="index">
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
    </div>
  </template>
  
  <script setup>
import { ref, computed, onMounted } from 'vue'

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

onMounted(() => {
  const saved = localStorage.getItem('dealProducts')
  if (saved) {
    products.value = JSON.parse(saved)
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
  alert('✅ Đã gửi đăng ký thành công!')
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

</script>

  
  <style scoped>
  .deal-container {
    max-width: 1000px;
    margin: auto;
    color: white;
  }
  </style>
  