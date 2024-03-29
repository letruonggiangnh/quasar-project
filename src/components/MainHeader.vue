<template>
  <q-header>
    <q-toolbar class="bg-white text-blue shadow-2 q-hidden-sm">
      <q-btn
        flat
        @click="drawerLeft = !drawerLeft"
        round
        dense
        icon="menu"
        class="lt-sm"
      ></q-btn>
      <q-img
        src="../assets/logo.png"
        style="height: 40px; max-width: 150px"
      ></q-img>
      <q-tabs
        class="gt-md"
        gt-sm
        v-model="tab"
        style="font-family: 'Arial', sans-serif"
      >
        <q-tab
          name="tab1"
          label="Trang chủ"
          style="font-size: small; text-transform: none"
        ></q-tab>
        <q-tab
          name="tab2"
          label="Nghiệp vụ"
          style="font-size: small; text-transform: none"
        ></q-tab>
        <q-tab
          name="tab3"
          label="Danh mục"
          style="font-size: small; text-transform: none"
        ></q-tab>
        <q-tab
          name="tab3"
          label="Báo cáo"
          style="font-size: small; text-transform: none"
        ></q-tab>
      </q-tabs>
      <q-space></q-space>
      <q-btn class="gt-md" flat round dense icon="help_outline"></q-btn>
      <q-btn class="gt-md" flat round dense icon="notifications"></q-btn>
      <q-btn class="gt-md" flat round dense icon="apps"></q-btn>
      <q-btn class="gt-md" flat round dense icon="account_circle"></q-btn>
    </q-toolbar>
  </q-header>
  <div class="lt-sm">
    <q-drawer v-model="drawerLeft" show-if-above>
      <q-scroll-area class="fit">
        <q-list padding class="menu-list">
          <q-item clickable v-ripple class="q-ma-sm center">
            <q-btn round>
              <q-avatar size="42px">
                <img src="https://cdn.quasar.dev/img/avatar2.jpg" />
              </q-avatar>
            </q-btn>
            <div class="text-h5 text-subtitle1 text-blue q-ma-md">
              Le Truong Giang
            </div>
          </q-item>
          <q-separator />
          <q-item active clickable v-ripple class="q-ma-sm">
            <q-item-section avatar>
              <q-icon name="home"></q-icon>
            </q-item-section>

            <q-item-section> Trang chủ </q-item-section>
          </q-item>

          <q-item clickable v-ripple class="q-ma-sm text-blue">
            <q-item-section avatar>
              <q-icon name="share"></q-icon>
            </q-item-section>

            <q-item-section> Nghiệp vụ </q-item-section>
          </q-item>

          <q-item clickable v-ripple class="q-ma-sm text-blue">
            <q-item-section avatar>
              <q-icon name="list"></q-icon>
            </q-item-section>

            <q-item-section> Danh mục </q-item-section>
          </q-item>
          <q-item clickable v-ripple class="q-ma-sm text-blue">
            <q-item-section avatar>
              <q-icon name="summarize"></q-icon>
            </q-item-section>

            <q-item-section> Báo cáo </q-item-section>
          </q-item>
          <q-separator />
          <q-item clickable v-ripple class="q-ma-sm text-blue">
            <q-item-section avatar>
              <q-icon name="help_outline"></q-icon>
            </q-item-section>

            <q-item-section> Trợ giúp</q-item-section>
          </q-item>
          <q-item clickable v-ripple class="q-ma-sm text-blue">
            <q-item-section avatar>
              <q-icon name="logout"></q-icon>
            </q-item-section>

            <q-item-section>Đăng Xuất</q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>
  </div>
</template>

<script setup>
defineOptions({
  name: "MainHeader",
});
import { ref } from "vue";
var drawerLeft = ref(false);
</script>
