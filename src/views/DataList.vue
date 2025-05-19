<template>
  <div class="container-sheet animate-fade-in">
    <h2 class="title">📚 DANH SÁCH CÁC SHEET DỮ LIỆU</h2>

    <div class="grid">
      <div v-for="item in links" :key="item.label" class="card-sheet">
        <div class="card-header">
          <h5 class="sheet-title">{{ item.label }}</h5>
        </div>
        <p class="sheet-note">{{ item.note }}</p>
        <a :href="item.url" class="open-button" target="_blank">
          <i class="fa-solid fa-up-right-from-square me-2"></i> MỞ GOOGLE SHEET
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
const links = [
  {
    label: 'THÔNG TIN GIÁ MODEL SOPHOS',
    url: 'https://docs.google.com/spreadsheets/d/11TL444ExNL6A5bh5qnSHmRonewpLvUoXLOYTRfyQLAQ/edit?gid=1535002389#gid=1535002389',
    note: 'Danh sách giá theo từng model thiết bị Sophos.'
  },
  {
    label: 'THÔNG TIN GIÁ LICENSE SOPHOS',
    url: 'https://docs.google.com/spreadsheets/d/11TL444ExNL6A5bh5qnSHmRonewpLvUoXLOYTRfyQLAQ/edit?gid=1744217475#gid=1744217475',
    note: 'Bảng giá license (Standard/Xstream) của Sophos theo từng năm.'
  },
  {
    label: 'THÔNG TIN KHÁCH HÀNG',
    url: 'https://docs.google.com/spreadsheets/d/1JIr9UbcCEwQ-rEyUjVrS7tFLX-REQT3LmEejRY-RhbY/edit?gid=0#gid=0',
    note: 'Danh sách khách hàng và thông tin liên hệ.'
  },
  {
    label: 'THÔNG TIN XUẤT DEAL REG',
    url: 'https://docs.google.com/spreadsheets/d/1FQv4WbpyUaniwHt3q3fD1v947-52NU669904L89XGpk/edit?gid=0#gid=0',
    note: 'Sheet dùng để lưu thông tin đăng ký Deal Reg từ website.'
  },
  {
    label: 'FORM DEALREG',
    url: 'https://docs.google.com/spreadsheets/d/1FQv4WbpyUaniwHt3q3fD1v947-52NU669904L89XGpk/edit?gid=1210225152#gid=1210225152',
    note: 'Form xuất chi tiết Deal Registration từ website.'
  },
  {
    label: 'FORM BÁO GIÁ',
    url: 'https://docs.google.com/spreadsheets/d/1J8-2PioiG1JEumeQ5k90B-Jux9M1noRXSOwJsuPlghM/edit?gid=1649674712#gid=1649674712',
    note: 'Mẫu xuất file báo giá từ bảng sản phẩm.'
  },
  {
    label: 'THÔNG TIN PO',
    url: 'https://docs.google.com/spreadsheets/d/1bWH-k5Hb_L-fCnAL6hosK78tHcpS-oHMkTlh9JptrHQ/edit?gid=0#gid=0',
    note: 'Thông tin chi tiết về các đơn PO đã tạo từ hệ thống.'
  },
  {
    label: 'THÔNG TIN ĐẶT HÀNG',
    url: 'https://docs.google.com/spreadsheets/d/1bWH-k5Hb_L-fCnAL6hosK78tHcpS-oHMkTlh9JptrHQ/edit?gid=1882388898#gid=1882388898',
    note: 'Danh sách chi tiết các đơn hàng đã đặt, kèm mã PO và sản phẩm.'
  }
]
</script>

<style scoped>
/* Layout container */
.container-sheet {
  max-width: 1400px;
  margin: auto;
  padding: 60px 20px;
  font-family: 'Segoe UI', sans-serif;
}

/* Title */
.title {
  color: #ffffff;
  font-size: 2.4rem;
  font-weight: 800;
  text-align: center;
  margin-bottom: 50px;
  animation: fadeInDown 0.6s ease-out both;
}

/* Grid Layout */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(330px, 1fr));
  gap: 30px;
}

/* Card styles */
.card-sheet {
  background: linear-gradient(135deg, #3a7bd5, #00d2ff);
  color: white;
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.25);
  transition: transform 0.4s ease, box-shadow 0.4s ease;
  transform-origin: center;
}

.card-sheet:hover {
  transform: scale(1.4);
  z-index: 10;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.4);
}

/* Card content */
.sheet-title {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 10px;
  color: #ffe082;
}

.sheet-note {
  font-size: 14px;
  color: #f5f5f5;
  min-height: 50px;
}

/* Button */
.open-button {
  display: inline-block;
  margin-top: 20px;
  background: #ffffff;
  color: #3a7bd5;
  font-weight: bold;
  padding: 10px 18px;
  border-radius: 10px;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 10px rgba(0,0,0,0.2);
}

.open-button:hover {
  background: #3a7bd5;
  color: #ffffff;
  transform: scale(1.1);
}

/* Animation */
@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeInDown 0.7s ease-in-out both;
}
</style>
