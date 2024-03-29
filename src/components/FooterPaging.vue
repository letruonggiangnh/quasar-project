<template>
  <q-footer style="background-color: #fffafa">
    <q-toolbar>
      <q-icon
        cursor-pointer
        class="text-blue q-ma-md cursor-pointer"
        name="skip_previous"
      />
      <q-icon
        cursor-pointer
        class="text-blue q-ma-md cursor-pointer"
        name="fast_rewind"
      />
      <p class="text-caption text-black q-ma-none">Trang</p>
      <q-input dense outlined class="q-ma-md" />
      <p class="text-caption text-black q-ma-none">của</p>
      <p class="text-caption text-black q-ma-xs">1</p>
      <q-icon
        cursor-pointer
        @clicked="onClickNext"
        class="text-blue q-ma-md cursor-pointer"
        name="fast_forward"
      />
      <q-icon
        cursor-pointer
        class="text-blue q-ma-md cursor-pointer"
        name="skip_next"
      />
      <q-select dense outlined display-value="10" />
      <p class="text-caption text-black q-ma-md">mục mỗi trang</p>
    </q-toolbar>
  </q-footer>
</template>

<script setup>
defineOptions({
  name: "FooterPaging",
});
</script>
