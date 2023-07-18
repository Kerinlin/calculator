<template>
  <div data-tauri-drag-region class="titlebar">
    <div id="titlebar-minimize" class="titlebar-button">
      <img
        src="https://api.iconify.design/mdi:window-minimize.svg"
        alt="minimize"
      />
    </div>
    <div id="titlebar-maximize" class="titlebar-button">
      <img
        src="https://api.iconify.design/mdi:window-maximize.svg"
        alt="maximize"
      />
    </div>
    <div id="titlebar-close" class="titlebar-button">
      <img src="https://api.iconify.design/mdi:close.svg" alt="close" />
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.titlebar {
  height: 30px;
  background: #329ea3;
  user-select: none;
  display: flex;
  justify-content: flex-end;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
}
.titlebar-button {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
}
.titlebar-button:hover {
  background: #5bbec3;
}
</style>
