<template>
  <div class="app-wrapper">
    <nav class="d-flex gap-3 mb-4">
      <router-link to="/" class="btn btn-outline-primary">📦 Quản lý hàng hóa</router-link>
      <router-link to="/dealreg" class="btn btn-outline-success">📋 Deal Registration</router-link>
    </nav>

    <!-- ✅ Bọc router-view trong keep-alive đúng cách -->
    <router-view v-slot="{ Component }">
  <keep-alive include="Home,DealReg">
    <component :is="Component" />
  </keep-alive>
</router-view>

  </div>
</template>



<script setup>

</script>

<style scoped>
/* 📌 FULL SCREEN BACKGROUND DARK */
html, body, #app {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  background-color: #121212 !important;
  color: #ffffff;
}

/* 📌 TRANG BAO BỌC CHÍNH */
.app-wrapper {
  min-height: 100vh;
  width: 100vw;
  background-color: #121212;
  padding: 20px 40px;
  box-sizing: border-box;
}

/* 📌 CÁC COMPONENT CHUNG */
input, select, textarea {
  background-color: #1e1e1e !important;
  color: #ffffff !important;
  border: 1px solid #444 !important;
}

input:focus, select:focus, textarea:focus {
  border-color: #4fd1c5 !important;
  box-shadow: none !important;
  outline: none !important;
}

.form-label {
  color: #9ae6b4 !important;
}

.card, .table {
  background-color: #1e1e1e;
  color: #ffffff;
}

.table thead {
  background-color: #2a2a2a !important;
  color: #ffffff;
}

.table-bordered td, .table-bordered th {
  border-color: #444 !important;
}

.btn {
  color: #ffffff !important;
}

.btn-outline-primary {
  background-color: #1e3a8a;
  border-color: #1e3a8a;
}

.btn-outline-success {
  background-color: #15803d;
  border-color: #15803d;
}

.btn-outline-warning {
  background-color: #ca8a04;
  border-color: #ca8a04;
}

.modal-content {
  background-color: #1e1e1e;
  color: white;
  border: 1px solid #555;
}

.custom-alert-box {
  background: #1e1e1e;
  color: #ffffff;
  border: 1px solid #444;
}
</style>
