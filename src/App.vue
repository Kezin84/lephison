<template>
  <div class="admin-layout">
    <!-- Nút toggle -->
    <div class="toggle-container">
      <div class="toggle-wrap">
        <input
          type="checkbox"
          class="toggle-input"
          id="holo-toggle"
          v-model="isCollapsed"
        />
        <label class="toggle-track" for="holo-toggle">
          <div class="track-lines"><div class="track-line"></div></div>
          <div class="toggle-thumb">
            <div class="thumb-core"></div>
            <div class="thumb-inner"></div>
            <div class="thumb-scan"></div>
            <div class="thumb-particles">
              <div class="thumb-particle"></div>
              <div class="thumb-particle"></div>
              <div class="thumb-particle"></div>
              <div class="thumb-particle"></div>
              <div class="thumb-particle"></div>
            </div>
          </div>
          <div class="toggle-data">
            <div class="data-text off">Menu</div>
            <div class="data-text on">Hide</div>
            <div class="status-indicator off"></div>
            <div class="status-indicator on"></div>
          </div>
          <div class="energy-rings">
            <div class="energy-ring"></div>
            <div class="energy-ring"></div>
            <div class="energy-ring"></div>
          </div>
          <div class="interface-lines">
            <div class="interface-line"></div>
            <div class="interface-line"></div>
            <div class="interface-line"></div>
            <div class="interface-line"></div>
            <div class="interface-line"></div>
            <div class="interface-line"></div>
          </div>
          <div class="toggle-reflection"></div>
          <div class="holo-glow"></div>
        </label>
      </div>
    </div>

    <!-- Sidebar -->
    <div :class="['sidebar', { collapsed: isCollapsed }]">
      <transition name="fade">
        <div class="nav-links" v-if="!isCollapsed">
          <router-link to="/datalist" style="font-size: 20px;">
            <i class="fa-solid fa-database fa-xl"></i>
            <span>DATABASE</span>
          </router-link>
          <router-link to="/customers" style="font-size: 20px;">
            <i class="fa-solid fa-users fa-xl"></i>
            <span>QUẢN LÝ KHÁCH HÀNG</span>
          </router-link>
          <router-link to="/" style="font-size: 20px;">
            <i class="fa-solid fa-pen-to-square fa-xl"></i>
            <span>BÁO GIÁ</span>
          </router-link>
          <router-link to="/dealreg" style="font-size: 20px;">
            <i class="fa-solid fa-file-word fa-xl"></i>
            <span>ĐĂNG KÍ DEALREG</span>
          </router-link>
          <router-link to="/import-excel" style="font-size: 20px;">
            <i class="fa-solid fa-file-invoice-dollar fa-xl"></i>
            <span>ĐỀ XUẤT MUA HÀNG</span>
          </router-link>
        </div>
      </transition>
    </div>

    <!-- Nội dung -->
    <div class="main-content">
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" :key="$route.fullPath" />
        </keep-alive>
      </router-view>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const isCollapsed = ref(false)
</script>

<style>
/* From Uiverse.io by reglobby */ 
.toggle-container {
  position: relative;
  width: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  perspective: 800px;
  z-index: 5;
}

.toggle-wrap {
  position: relative;
  width: 100%;
  height: 60px;
  transform-style: preserve-3d;
}

.toggle-input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.toggle-track {
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0, 30, 60, 0.4);
  border-radius: 30px;
  cursor: pointer;
  box-shadow:
    0 0 20px rgba(0, 150, 255, 0.5),
    inset 0 0 10px rgba(0, 0, 0, 0.8);
  overflow: hidden;
  backdrop-filter: blur(5px);
  transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
   border: 1px solid rgba(0, 150, 255, 0.4); /* xanh dương sáng */
}

.toggle-track::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(
      ellipse at center,
      rgba(0, 80, 255, 0.1) 0%,
      rgba(0, 0, 0, 0) 70%
    ),
    linear-gradient(90deg, rgba(0, 60, 120, 0.1) 0%, rgba(0, 30, 60, 0.2) 100%);
  opacity: 0.6;
  transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
}

.toggle-track::after {
  content: "";
  position: absolute;
  top: 2px;
  left: 2px;
  right: 2px;
  height: 10px;
  background: linear-gradient(
    90deg,
    rgba(0, 170, 255, 0.3) 0%,
    rgba(0, 80, 255, 0.1) 100%
  );
  border-radius: 30px 30px 0 0;
  opacity: 0.7;
  filter: blur(1px);
}

.track-lines {
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: 1px;
  transform: translateY(-50%);
  overflow: hidden;
}

.track-line {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: repeating-linear-gradient(
    90deg,
    rgba(0, 150, 255, 0.3) 0px,
    rgba(0, 150, 255, 0.3) 5px,
    transparent 5px,
    transparent 15px
  );
  animation: track-line-move 3s linear infinite;
}

@keyframes track-line-move {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(20px);
  }
}

.toggle-thumb {
  position: absolute;
  width: 54px;
  height: 54px;
  left: 3px;
  top: 3px;
   background: radial-gradient(circle, rgba(0, 100, 255, 1) 0%, rgba(0, 50, 130, 0.8) 100%);
  border-radius: 50%;
  box-shadow: inset 0 0 12px rgba(0, 150, 255, 0.8);
  transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
  z-index: 2;
  border: 1px solid rgba(0, 170, 255, 0.6);
  overflow: hidden;
  transform-style: preserve-3d;
   border-color: rgba(0, 200, 255, 0.6);
}

.thumb-core {
  position: absolute;
  width: 40px;
  height: 40px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: radial-gradient(
    circle,
    rgba(0, 180, 255, 0.6) 0%,
    rgba(0, 50, 120, 0.2) 100%
  );
  border-radius: 50%;
  box-shadow: 0 0 20px rgba(0, 150, 255, 0.5);
  opacity: 0.9;
  transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
}

.thumb-inner {
  position: absolute;
  width: 25px;
  height: 25px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: radial-gradient(
    circle,
    rgba(255, 255, 255, 0.8) 0%,
    rgba(100, 200, 255, 0.5) 100%
  );
  border-radius: 50%;
  box-shadow: 0 0 10px rgba(100, 200, 255, 0.7);
  opacity: 0.7;
  transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
  animation: pulse 2s infinite alternate;
}

@keyframes pulse {
  0% {
    opacity: 0.5;
    transform: translate(-50%, -50%) scale(0.9);
  }
  100% {
    opacity: 0.8;
    transform: translate(-50%, -50%) scale(1.1);
  }
}

.thumb-scan {
  position: absolute;
  width: 100%;
  height: 5px;
  background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 150, 255, 0.5) 20%,
    rgba(255, 255, 255, 0.8) 50%,
    rgba(0, 150, 255, 0.5) 80%,
    rgba(0, 0, 0, 0) 100%
  );
  top: 0;
  left: 0;
  filter: blur(1px);
  animation: thumb-scan 2s linear infinite;
  opacity: 0.7;
}

@keyframes thumb-scan {
  0% {
    top: -5px;
    opacity: 0;
  }
  20% {
    opacity: 0.7;
  }
  80% {
    opacity: 0.7;
  }
  100% {
    top: 54px;
    opacity: 0;
  }
}

.thumb-particles {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  overflow: hidden;
}

.thumb-particle {
  position: absolute;
  width: 3px;
  height: 3px;
  background: rgba(100, 200, 255, 0.8);
  border-radius: 50%;
  box-shadow: 0 0 5px rgba(100, 200, 255, 0.8);
  animation: thumb-particle-float 3s infinite ease-out;
  opacity: 0;
}

.thumb-particle:nth-child(1) {
  top: 70%;
  left: 30%;
  animation-delay: 0.2s;
}

.thumb-particle:nth-child(2) {
  top: 60%;
  left: 60%;
  animation-delay: 0.6s;
}

.thumb-particle:nth-child(3) {
  top: 50%;
  left: 40%;
  animation-delay: 1s;
}

.thumb-particle:nth-child(4) {
  top: 40%;
  left: 70%;
  animation-delay: 1.4s;
}

.thumb-particle:nth-child(5) {
  top: 80%;
  left: 50%;
  animation-delay: 1.8s;
}

@keyframes thumb-particle-float {
  0% {
    transform: translateY(0) scale(1);
    opacity: 0;
  }
  20% {
    opacity: 0.8;
  }
  100% {
    transform: translateY(-30px) scale(0);
    opacity: 0;
  }
}

.toggle-data {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.data-text {
  position: absolute;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: all 0.5s ease;
}

.data-text.off {
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  opacity: 1;
   color: rgba(0, 150, 255, 0.8); /* xanh dương */
  text-shadow: 0 0 5px rgba(0, 100, 255, 0.4);
}

.data-text.on {
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  opacity: 0;
   color: rgba(0, 255, 0, 0.9); /* xanh lá */
  text-shadow: 0 0 10px rgba(0, 255, 0, 0.6);
}

.status-indicator {
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(0, 180, 255, 0.8) 0%,
    rgba(0, 80, 200, 0.4) 100%
  );
  box-shadow: 0 0 10px rgba(0, 150, 255, 0.5);
  animation: blink 2s infinite alternate;
  transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
}

.status-indicator.off {
  top: 25px;
  right: 15px;
}

.status-indicator.on {
  top: 25px;
  left: 15px;
  opacity: 0;
  background: radial-gradient(
    circle,
    rgba(0, 255, 150, 0.8) 0%,
    rgba(0, 200, 80, 0.4) 100%
  );
  box-shadow: 0 0 10px rgba(0, 255, 150, 0.5);
}

@keyframes blink {
  0%,
  100% {
    opacity: 0.5;
    transform: scale(0.9);
  }
  50% {
    opacity: 1;
    transform: scale(1.1);
  }
}

.energy-rings {
  position: absolute;
  width: 54px;
  height: 54px;
  left: 3px;
  top: 3px;
  pointer-events: none;
  z-index: 1;
  transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
}

.energy-ring {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  border: 2px solid transparent;
  opacity: 0;
}

.energy-ring:nth-child(1) {
  width: 50px;
  height: 50px;
  border-top-color: rgba(0, 150, 255, 0.5);
  border-right-color: rgba(0, 150, 255, 0.3);
  animation: spin 3s linear infinite;
}

.energy-ring:nth-child(2) {
  width: 40px;
  height: 40px;
  border-bottom-color: rgba(0, 150, 255, 0.5);
  border-left-color: rgba(0, 150, 255, 0.3);
  animation: spin 2s linear infinite reverse;
}

.energy-ring:nth-child(3) {
  width: 30px;
  height: 30px;
  border-left-color: rgba(0, 150, 255, 0.5);
  border-top-color: rgba(0, 150, 255, 0.3);
  animation: spin 1.5s linear infinite;
}

@keyframes spin {
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

.interface-lines {
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.interface-line {
  position: absolute;
  background: rgba(0, 150, 255, 0.3);
  transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
}

.interface-line:nth-child(1) {
  width: 15px;
  height: 1px;
  bottom: -5px;
  left: 20px;
}

.interface-line:nth-child(2) {
  width: 1px;
  height: 8px;
  bottom: -12px;
  left: 35px;
}

.interface-line:nth-child(3) {
  width: 25px;
  height: 1px;
  bottom: -12px;
  left: 35px;
}

.interface-line:nth-child(4) {
  width: 15px;
  height: 1px;
  bottom: -5px;
  right: 20px;
}

.interface-line:nth-child(5) {
  width: 1px;
  height: 8px;
  bottom: -12px;
  right: 35px;
}

.interface-line:nth-child(6) {
  width: 25px;
  height: 1px;
  bottom: -12px;
  right: 10px;
}

.toggle-reflection {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.1) 0%,
    rgba(255, 255, 255, 0) 40%
  );
  border-radius: 30px;
  pointer-events: none;
}

.toggle-label {
  position: relative;
  margin-top: 20px;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 2px;
  text-align: center;
  color: rgba(0, 150, 255, 0.7);
  text-shadow: 0 0 10px rgba(0, 100, 255, 0.5);
  transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
}

.holo-glow {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 30px;
  background: radial-gradient(
    ellipse at center,
    rgba(0, 150, 255, 0.2) 0%,
    rgba(0, 0, 0, 0) 70%
  );
  filter: blur(10px);
  opacity: 0.5;
  transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
  z-index: 0;
}

.toggle-input:checked + .toggle-track {
   background: rgba(0, 100, 30, 0.6); /* nền xanh lá đậm */
  border-color: rgba(0, 255, 0, 0.8);
  box-shadow:
    0 0 30px rgba(0, 255, 0, 0.8),
    inset 0 0 15px rgba(0, 255, 0, 0.6);
}

.toggle-input:checked + .toggle-track::before {
  background: radial-gradient(
      ellipse at center,
      rgba(0, 255, 150, 0.1) 0%,
      rgba(0, 0, 0, 0) 70%
    ),
    linear-gradient(90deg, rgba(0, 120, 60, 0.1) 0%, rgba(0, 60, 30, 0.2) 100%);
}

.toggle-input:checked + .toggle-track::after {
  background: linear-gradient(
    90deg,
    rgba(0, 255, 150, 0.3) 0%,
    rgba(0, 160, 80, 0.1) 100%
  );
}

.toggle-input:checked + .toggle-track .track-line {
  background: repeating-linear-gradient(
    90deg,
    rgba(0, 255, 150, 0.3) 0px,
    rgba(0, 255, 150, 0.3) 5px,
    transparent 5px,
    transparent 15px
  );
  animation-direction: reverse;
}

.toggle-input:checked + .toggle-track .toggle-thumb {
  left: calc(100% - 57px);
    background: radial-gradient(circle, rgba(50, 255, 50, 0.9) 0%, rgba(0, 100, 0, 0.8) 100%);
 border-color: rgba(0, 255, 100, 1);
   box-shadow: inset 0 0 20px rgba(0, 255, 100, 0.8);
}

.toggle-input:checked + .toggle-track .thumb-core {
 background: radial-gradient(circle, rgba(0, 255, 0, 0.7) 0%, rgba(0, 120, 50, 0.3) 100%);
  box-shadow: 0 0 20px rgba(0, 255, 100, 0.6);
}

.toggle-input:checked + .toggle-track .thumb-inner {
   background: radial-gradient(circle, rgba(255, 255, 255, 0.8) 0%, rgba(100, 255, 100, 0.5) 100%);
  box-shadow: 0 0 10px rgba(100, 255, 100, 0.7);
}

.toggle-input:checked + .toggle-track .thumb-scan {
  background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 255, 150, 0.5) 20%,
    rgba(255, 255, 255, 0.8) 50%,
    rgba(0, 255, 150, 0.5) 80%,
    rgba(0, 0, 0, 0) 100%
  );
}

.toggle-input:checked + .toggle-track .thumb-particle {
  background: rgba(100, 255, 200, 0.8);
  box-shadow: 0 0 5px rgba(100, 255, 200, 0.8);
}

.toggle-input:checked + .toggle-track .data-text.off {
  opacity: 0;
}

.toggle-input:checked + .toggle-track .data-text.on {
  opacity: 1;
}

.toggle-input:checked + .toggle-track .status-indicator.off {
  opacity: 0;
}

.toggle-input:checked + .toggle-track .status-indicator.on {
  opacity: 1;
}

.toggle-input:checked + .toggle-track .energy-rings {
  left: calc(100% - 57px);
}

.toggle-input:checked + .toggle-track .energy-ring {
  opacity: 1;
}

.toggle-input:checked + .toggle-track .energy-ring:nth-child(1) {
  border-top-color: rgba(0, 255, 150, 0.5);
  border-right-color: rgba(0, 255, 150, 0.3);
}

.toggle-input:checked + .toggle-track .energy-ring:nth-child(2) {
  border-bottom-color: rgba(0, 255, 150, 0.5);
  border-left-color: rgba(0, 255, 150, 0.3);
}

.toggle-input:checked + .toggle-track .energy-ring:nth-child(3) {
  border-left-color: rgba(0, 255, 150, 0.5);
  border-top-color: rgba(0, 255, 150, 0.3);
}

.toggle-input:checked + .toggle-track .interface-line {
  background: rgba(0, 255, 150, 0.3);
}

.toggle-input:checked ~ .toggle-label {
  color: rgba(0, 255, 150, 0.7);
  text-shadow: 0 0 10px rgba(0, 255, 150, 0.5);
}

.toggle-input:checked + .toggle-track .holo-glow {
  background: radial-gradient(
    ellipse at center,
    rgba(0, 255, 150, 0.2) 0%,
    rgba(0, 0, 0, 0) 70%
  );
}

.toggle-input:hover + .toggle-track {
  box-shadow:
    0 0 20px rgba(0, 150, 255, 0.3),
    inset 0 0 10px rgba(0, 0, 0, 0.8);
}

.toggle-input:checked:hover + .toggle-track {
  box-shadow:
    0 0 20px rgba(0, 255, 150, 0.3),
    inset 0 0 10px rgba(0, 0, 0, 0.8);
}

/* ĐẢO LOGIC: màu xanh lá cây khi OFF (chưa checked) và màu xanh dương khi ON (checked) */

.toggle-input:not(:checked) + .toggle-track {
  background: rgba(0, 100, 30, 0.6);
  border-color: rgba(0, 255, 0, 0.8);
  box-shadow:
    0 0 30px rgba(0, 255, 0, 0.8),
    inset 0 0 15px rgba(0, 255, 0, 0.6);
}

.toggle-input:not(:checked) + .toggle-track .toggle-thumb {
  left: 3px;
  background: radial-gradient(circle, rgba(50, 255, 50, 0.9) 0%, rgba(0, 100, 0, 0.8) 100%);
  border-color: rgba(0, 255, 100, 1);
  box-shadow: inset 0 0 20px rgba(0, 255, 100, 0.8);
}

.toggle-input:not(:checked) + .toggle-track .thumb-core {
  background: radial-gradient(circle, rgba(0, 255, 0, 0.7) 0%, rgba(0, 120, 50, 0.3) 100%);
  box-shadow: 0 0 20px rgba(0, 255, 100, 0.6);
}

.toggle-input:not(:checked) + .toggle-track .thumb-inner {
  background: radial-gradient(circle, rgba(255, 255, 255, 0.8) 0%, rgba(100, 255, 100, 0.5) 100%);
  box-shadow: 0 0 10px rgba(100, 255, 100, 0.7);
}

.toggle-input:not(:checked) + .toggle-track .track-line {
  background: repeating-linear-gradient(
    90deg,
    rgba(0, 255, 150, 0.3) 0px,
    rgba(0, 255, 150, 0.3) 5px,
    transparent 5px,
    transparent 15px
  );
  animation-direction: reverse;
}

.toggle-input:not(:checked) + .toggle-track .data-text.off {
  opacity: 1;
}
.toggle-input:not(:checked) + .toggle-track .data-text.on {
  opacity: 0;
}

.toggle-input:not(:checked) + .toggle-track .status-indicator.off {
  opacity: 1;
}
.toggle-input:not(:checked) + .toggle-track .status-indicator.on {
  opacity: 0;
}

.toggle-input:not(:checked) + .toggle-track .energy-rings {
  left: 3px;
}
.toggle-input:not(:checked) + .toggle-track .energy-ring {
  opacity: 1;
}


/* Khi ON (checked): màu xanh dương */
.toggle-input:checked + .toggle-track {
  background: rgba(0, 30, 60, 0.4);
  border-color: rgba(0, 150, 255, 0.4);
  box-shadow:
    0 0 20px rgba(0, 150, 255, 0.5),
    inset 0 0 10px rgba(0, 0, 0, 0.8);
}

.toggle-input:checked + .toggle-track .toggle-thumb {
  left: calc(100% - 57px);
  background: radial-gradient(circle, rgba(0, 100, 255, 1) 0%, rgba(0, 50, 130, 0.8) 100%);
  border-color: rgba(0, 200, 255, 0.6);
  box-shadow: inset 0 0 12px rgba(0, 150, 255, 0.8);
}

.toggle-input:checked + .toggle-track .thumb-core {
  background: radial-gradient(circle, rgba(0, 180, 255, 0.6) 0%, rgba(0, 50, 120, 0.2) 100%);
}
.toggle-input:checked + .toggle-track .thumb-inner {
  background: radial-gradient(circle, rgba(255, 255, 255, 0.8) 0%, rgba(100, 200, 255, 0.5) 100%);
  box-shadow: 0 0 10px rgba(100, 200, 255, 0.7);
}

.toggle-input:checked + .toggle-track .data-text.off {
  opacity: 0;
}
.toggle-input:checked + .toggle-track .data-text.on {
  opacity: 1;
}

.toggle-input:checked + .toggle-track .status-indicator.off {
  opacity: 0;
}
.toggle-input:checked + .toggle-track .status-indicator.on {
  opacity: 1;
}

.toggle-input:checked + .toggle-track .energy-rings {
  left: calc(100% - 57px);
}
.toggle-input:checked + .toggle-track .energy-ring {
  opacity: 1;
}

</style>

<style scoped>
/* Layout chính */
.admin-layout {
  display: flex;
  min-height: 100vh;
  background-color: #121212;
  color: white;
}

.sidebar {
  transition: all 0.4s ease;
  overflow: hidden;
  white-space: nowrap;
  width: 450px;
  min-width: 260px;
  background: linear-gradient(to left, #141e30, #243b55);
  backdrop-filter: blur(6px);
  padding: 20px 10px 20px 20px;
  display: flex;
  flex-direction: column;
  border-radius: 0 12px 12px 0;
  box-shadow: 6px 0 15px rgba(0, 0, 0, 0.3);
  position: relative;
}

.sidebar.collapsed {
  width: 70px;
  min-width: 70px;
}

.nav-links {
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.sidebar a {
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 600;
  font-size: 16px;
  color: rgb(255, 255, 255);
  text-decoration: none;
  padding: 10px 12px;
  border-radius: 8px;
  transition: all 0.3s ease;
  transform-origin: left;
  position: relative;
}

.sidebar a::after {
  content: '';
  position: absolute;
  bottom: 6px;
  left: 0;
  height: 2px;
  background-color: #2bff00;
  width: 100%;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s ease;
}

.sidebar a:hover,
.sidebar a.router-link-exact-active {
  transform: scale(1.4);
  color: #48ff00;
}

.sidebar a:hover::after,
.sidebar a.router-link-exact-active::after {
  transform: scaleX(1);
}

.main-content {
  flex: 1;
  padding: 30px 40px;
  background: linear-gradient(to right, #141e30, #243b55);
}

.toggle-container {
  position: fixed; /* luôn nổi phía trên sidebar */
  top: 25px;
  left: 25px;
  width: 150px;
  z-index: 1000;
}

.sidebar a::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 10px;
  border: 2px solid transparent;
  background: linear-gradient(270deg, #2bff00, #00ffee, #2bff00);
  background-size: 600% 600%;
  z-index: 0;
  opacity: 0;
  transition: opacity 0.4s ease;
  pointer-events: none;
  mask: 
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  -webkit-mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  mask-composite: exclude;
  -webkit-mask-composite: destination-out;
  animation: borderGlow 4s linear infinite;
}

</style>
