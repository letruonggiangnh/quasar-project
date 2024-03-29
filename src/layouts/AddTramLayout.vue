<template>
  <q-layout view="lHh Lpr lFf">
    <MainHeader />
    <div class="row">
      <h5 class="text-blue text-h5 q-mb-xs q-pt-md q-pl-md">
        <span>
          <router-link :to="{ name: 'home' }" class="text-blue cursor-pointer">
            <q-icon
              class="text-blue q-pa-sm cursor-pointer"
              name="arrow_back"
            />
          </router-link>
        </span>
        Danh Sách Trạm <span class="q-pa-sm text-black">#</span>Thêm mới
      </h5>
    </div>
    <q-separator />
    <div class="q-pa-md" style="max-width: 1200px">
      <p class="q-pa-xs text-weight-bolder" style="">THÔNG TIN TRẠM</p>
      <q-form class="q-gutter-md">
        <div class="row">
          <q-input
            class="col q-pa-xs"
            outlined
            v-model="matram"
            label="Mã Trạm"
          ></q-input>
          <q-input
            class="col q-pa-xs"
            outlined
            type="number"
            v-model="kinhdo"
            label="Kinh Độ"
          ></q-input>
        </div>
        <div class="row">
          <q-input
            class="col q-pa-xs"
            outlined
            v-model="tentram"
            label="Tên Trạm"
          ></q-input>
          <q-input
            class="col q-pa-xs"
            outlined
            type="number"
            v-model="vido"
            label="Vĩ Độ"
          ></q-input>
        </div>
        <div class="row">
          <q-select
            class="col q-pa-xs"
            outlined
            v-model="tinhModel"
            :options="tinh"
            label="Tỉnh"
          ></q-select>
          <q-select
            class="col q-pa-xs"
            outlined
            v-model="loaiTramModel"
            :options="loaiTram"
            label="Loại Trạm"
          ></q-select>
        </div>
        <div class="row">
          <q-input
            class="col q-pa-xs"
            outlined
            v-model="diachi"
            label="Địa Chỉ"
          ></q-input>
          <q-select
            class="col q-pa-xs"
            outlined
            v-model="khuvucModel"
            :options="khuvuc"
            label="Khu Vực"
          ></q-select>
        </div>
        <div class="row">
          <q-select
            class="col q-pa-xs"
            outlined
            v-model="phanCapTramModel"
            :options="phanCapTram"
            label="Phân Cấp Trạm"
          ></q-select>
          <div class="col"></div>
        </div>
      </q-form>
      <q-page-sticky position="bottom-right" :offset="[18, 18]">
        <q-fab
          color="blue"
          text-color="white"
          icon="keyboard_arrow_left"
          direction="left"
        >
          <div>
            <q-fab-action
              color="red"
              label="Lưu"
              text-color="white"
              @click="submitForm"
              icon="save"
            ></q-fab-action>
          </div>
        </q-fab>
      </q-page-sticky>
    </div>
  </q-layout>
</template>

<script setup>
import MainHeader from "components/MainHeader.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { useQuasar } from "quasar";
const $q = useQuasar();

const router = useRouter();
var tinhModel = ref("");
var matram = ref("");
var kinhdo = ref("");
var tentram = ref("");
var vido = ref("");
var vido = ref("");
var loaiTramModel = ref("");
var diachi = ref("");
var khuvucModel = ref("");
var phanCapTramModel = ref("");

const tinh = [
  "Hà Nội",
  "Hồ Chí Minh",
  "Hải Phòng",
  "Cần Thơ",
  "Đà Nẵng",
  "Biên Hòa",
  "Nha Trang",
  "Huế",
  "Buôn Ma Thuột",
  "Long Xuyên",
  "Vũng Tàu",
  "Bạc Liêu",
  "Bắc Giang",
  "Bắc Kạn",
  "Bắc Ninh",
  "Bến Tre",
  "Bình Dương",
  "Bình Định",
  "Bình Phước",
  "Bình Thuận",
  "Cà Mau",
  "Cao Bằng",
  "Đắk Lắk",
  "Đắk Nông",
  "Điện Biên",
  "Đồng Nai",
  "Đồng Tháp",
  "Gia Lai",
  "Hà Giang",
  "Hà Nam",
  "Hà Tĩnh",
  "Hải Dương",
  "Hậu Giang",
  "Hòa Bình",
  "Hưng Yên",
  "Khánh Hòa",
  "Kiên Giang",
  "Kon Tum",
  "Lai Châu",
  "Lâm Đồng",
  "Lạng Sơn",
  "Lào Cai",
  "Nam Định",
  "Nghệ An",
  "Ninh Bình",
  "Ninh Thuận",
  "Phú Thọ",
  "Quảng Bình",
  "Quảng Nam",
  "Quảng Ngãi",
  "Quảng Ninh",
  "Quảng Trị",
  "Sóc Trăng",
  "Sơn La",
  "Tây Ninh",
  "Thái Bình",
  "Thái Nguyên",
  "Thanh Hóa",
  "Thừa Thiên Huế",
  "Tiền Giang",
  "Trà Vinh",
  "Tuyên Quang",
  "Vĩnh Long",
  "Vĩnh Phúc",
  "Yên Bái",
];
const loaiTram = ["Khách Hàng", "Test"];
const khuvuc = ["Miền Bắc", "Miền Trung"];
const phanCapTram = ["Nội hạt", "Test"];
const api_add_tram = import.meta.env.API_ADD_TRAM;
const submitForm = () => {
  let data = JSON.stringify({
    maTram: matram.value,
    kinhDo: kinhdo.value,
    tenTram: tentram.value,
    viDo: vido.value,
    tenTinh: tinhModel.value,
    loaiTram: loaiTramModel.value,
    diaChi: diachi.value,
    khuVuc: khuvucModel.value,
    phanCapTram: phanCapTramModel.value,
    ghiChu: "",
  });

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "http://localhost:5000/api/Tram/addtram",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };
  axios.request(config).then((response) => {
    if (response.status >= 200 && response.status <= 299) {
      $q.notify("Thêm mới thành công", "Indigo-10");
    }
  });
};
</script>
