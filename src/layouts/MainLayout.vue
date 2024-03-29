<template>
  <q-layout view="hHh Lpr hFf">
    <MainHeader />

    <h5 class="text-blue text-h5 q-mb-xs q-pt-md q-pl-md">Danh Sách Trạm</h5>
    <q-separator />
    <div class="row q-gutter-sm q-pa-md">
      <q-input class="col-4" outlined dense placeholder="Lọc dữ liệu" />
      <q-btn
        icon="search"
        style="text-transform: none"
        label="Lấy dữ liệu"
      ></q-btn>
      <q-space></q-space>
      <q-btn flat dense @click="filterDisplay" icon="tune"></q-btn>
    </div>
    <div>
      <q-table
        :rows="rows"
        :columns="columns"
        dense
        class="sticky-header col-10"
        :rows-per-page-options="[0]"
        separator="cell"
        row-key="matram"
        :hide-pagination="true"
        rows-per-page-label="Số mục mỗi trang"
        no-data-label="Không có dữ liệu"
        no-results-label="The filter didn't uncover any results"
        virtual-scroll="true"
        style="max-height: 65vh"
      >
        <template v-slot:body-cell-ThaoTac="props">
          <q-td :props="props" style="height: fit-content" dense>
            <q-icon
              size="18px"
              class="cursor-pointer q-pa-md text-blue"
              name="edit"
            ></q-icon>
            <q-icon
              size="18px"
              class="cursor-pointer text-danger text-red"
              name="delete"
            ></q-icon>
          </q-td>
        </template>
        <template v-slot:body-cell-matram="props">
          <q-td :props="props">
            <router-link
              :to="{
                name: 'chitiet',
                params: { matram: props.row.matram },
              }"
            >
              <p>{{ props.row.matram }}</p>
            </router-link>
          </q-td>
        </template>
      </q-table>
      <q-footer class="col" style="background-color: #fffafa">
        <q-toolbar>
          <q-icon
            cursor-pointer
            class="text-blue q-ma-md cursor-pointer"
            name="skip_previous"
            style="font-size: large"
          />
          <q-icon
            cursor-pointer
            @click="prevPage"
            class="text-blue q-ma-md cursor-pointer"
            name="fast_rewind"
            style="font-size: large"
          />
          <p class="text-caption text-black q-ma-none gt-md">Trang</p>
          <q-field dense outlined class="q-ma-md gt-md">
            <template v-slot:control>
              <div class="self-center full-width no-outline">
                {{ pageIndex }}
              </div>
            </template>
          </q-field>
          <p class="text-caption text-black q-ma-none gt-md">của</p>
          <p class="text-caption text-black q-ma-xs gt-md">{{ length }}</p>
          <q-icon
            @click="nextPage"
            cursor-pointer
            class="text-blue q-ma-md cursor-pointer"
            name="fast_forward"
            style="font-size: large"
          />
          <q-icon
            cursor-pointer
            class="text-blue q-ma-md cursor-pointer"
            name="skip_next"
            style="font-size: large"
          />
          <q-select dense outlined v-model="pageSize" :options="size" />
          <p class="text-caption text-black q-ma-md">mục mỗi trang</p>
        </q-toolbar>
      </q-footer>
    </div>

    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-fab
        color="blue"
        text-color="white"
        icon="keyboard_arrow_left"
        direction="left"
      >
        <div class="q-pa-sm">
          <router-link exact :to="{ name: 'addtram' }">
            <q-fab-action
              class="q-pa-sm"
              color="blue"
              label="Thêm mới"
              text-color="white"
              @click="onClick"
              icon="add"
            ></q-fab-action>
          </router-link>
        </div>
        <div class="q-pa-sm">
          <q-fab-action
            class="q-pa-sm"
            color="blue"
            label="Xuất Excel"
            text-color="white"
            @click="onClick"
            icon="description"
          ></q-fab-action>
        </div>
      </q-fab>
    </q-page-sticky>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import MainHeader from "components/MainHeader.vue";
import { ref, watch } from "vue";
import axios from "axios";

const size = [5, 10, 20, 30, 50];
const length = ref(0);
const rows = ref([]);

const khuvucModel = ref("");
const phanCapTramModel = ref("");
const tinhModel = ref("");
const loaiTramModel = ref("");
const pageIndex = ref(1);
const pageSize = ref(5);
const columns = [
  {
    name: "matram",
    required: true,
    label: "Mã trạm",
    field: "matram",
    align: "center",
  },
  {
    name: "tentram",
    align: "center",
    label: "Tên Trạm",
    field: "tentram",
  },
  { name: "khuvuc", label: "Khu Vực", align: "center", field: "khuvuc" },
  { name: "tentinh", label: "Tên Tỉnh", align: "center", field: "tentinh" },
  { name: "loaitram", label: "Loại Trạm", align: "center", field: "loaitram" },
  {
    name: "phancaptram",
    label: "Phân Cấp Trạm",
    align: "center",
    field: "phancaptram",
  },
  { name: "kinhdo", label: "Kinh Độ", align: "center", field: "kinhdo" },
  { name: "vido", label: "Vĩ Độ", align: "center", field: "vido" },
  { name: "diachi", label: "Địa Chỉ", align: "center", field: "diachi" },
  { name: "ghichu", label: "Ghi Chú", align: "center", field: "ghichu" },
  { name: "ThaoTac", label: "Chức Năng", align: "center" },
];

const body = {
  TenTinh: "Tất Cả",
  LoaiTram: "Tất Cả",
  KhuVuc: "Tất Cả",
  PhanCapTram: "Tất Cả",
  pageIndex: 1,
  pageSize: 5,
};

axios
  .post("http://localhost:5000/api/Tram/filteredTram", body)
  .then(function (response) {
    length.value = response.data.total;
    pageSize.value = 5;
    if (pageIndex.value > length.value) {
      pageIndex.value = 1;
    }
    rows.value = response.data.trams.map((tram) => ({
      matram: tram.maTram,
      tentram: tram.tenTram,
      khuvuc: tram.khuVuc,
      tentinh: tram.tenTinh,
      loaitram: tram.loaiTram,
      phancaptram: tram.phanCapTram,
      kinhdo: tram.kinhDo,
      vido: tram.viDo,
      diachi: tram.diaChi,
      ghichu: tram.ghiChu,
    }));
  })
  .catch((res) => {
    console.log(res);
  });

watch([pageIndex, pageSize], async (newValue, oldValue) => {
  const body = {
    TenTinh: "Tất Cả",
    LoaiTram: "Tất Cả",
    KhuVuc: "Tất Cả",
    PhanCapTram: "Tất Cả",
    pageIndex: newValue[0],
    pageSize: newValue[1],
  };
  axios
    .post("http://localhost:5000/api/Tram/filteredTram", body)
    .then(function (response) {
      length.value = response.data.total;
      if (pageIndex.value > length.value) {
        pageIndex.value = 1;
      }

      rows.value = response.data.trams.map((tram) => ({
        matram: tram.maTram,
        tentram: tram.tenTram,
        khuvuc: tram.khuVuc,
        tentinh: tram.tenTinh,
        loaitram: tram.loaiTram,
        phancaptram: tram.phanCapTram,
        kinhdo: tram.kinhDo,
        vido: tram.viDo,
        diachi: tram.diaChi,
        ghichu: tram.ghiChu,
      }));
    })
    .catch((res) => {
      console.log(res);
    });
});

function FilterTram() {
  let data = JSON.stringify({
    tenTinh: tinhModel.value,
    loaiTram: loaiTramModel.value,
    khuVuc: khuvucModel.value,
    phanCapTram: phanCapTramModel.value,
  });

  let config = {
    method: "POST",
    maxBodyLength: Infinity,
    url: "http://localhost:59663/api/Tram/filteredTram",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };
  axios.request(config).then((response) => {
    length.value = response.data.total;
    pageSize.value = 3;
    rows.value = response.data.trams.map((tram) => ({
      matram: tram.maTram,
      tentram: tram.tenTram,
      khuvuc: tram.khuVuc,
      tentinh: tram.tenTinh,
      loaitram: tram.loaiTram,
      phancaptram: tram.phanCapTram,
      kinhdo: tram.kinhDo,
      vido: tram.viDo,
      diachi: tram.diaChi,
      ghichu: tram.ghiChu,
    }));
  });
}
function nextPage() {
  if (pageIndex.value < length.value) pageIndex.value++;
}

function prevPage() {
  if (pageIndex.value > 1) {
    pageIndex.value--;
  }
}
</script>
<style>
.q-table thead th {
  position: sticky;
  top: 0;
  z-index: 999;
  background-color: #c0c0c0;
}
</style>
