<template>
    <div class="container py-5">
      <h2 class="mb-4 text-center" style="color: aliceblue;font-weight: bold;">📚 DANH SÁCH CÁC SHEET DỮ LIỆU</h2>
  
      <div class="row g-4">
        <div class="col-md-6" v-for="item in links" :key="item.label">
          <div class="card shadow-sm border-0 h-100">
            <div class="card-body d-flex flex-column justify-content-between">
              <div>
                <h5 class="card-title fw-bold text-primary">{{ item.label }}</h5>
                <p class="card-text text-muted" style="font-size: 14px;">{{ item.note }}</p>
              </div>
              <a :href="item.url" class="btn btn-outline-primary mt-3 fw-bold" target="_blank">
                🔗 Mở Google Sheet
              </a>
            </div>
          </div>
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
    }
  ]
  </script>
  
  <style scoped>
  h2 {
    font-weight: bold;
  }
  
  .card {
    transition: transform 0.2s ease-in-out;
  }
  
  .card:hover {
    transform: translateY(-4px);
  }
  </style>
  