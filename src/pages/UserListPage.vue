<template>
  <q-page class="q-pa-md">
    <div v-if="loading">Loading...</div>
      <q-btn icon="add" @click="add = true" style="margin-bottom: 30px;" color="primary" label="Thêm sản phẩm"></q-btn>
      <q-table
        title="Danh Sách Sản Phẩm"
        :rows="rows"
        :columns="columns"
        row-key="name"
        padd
      >
        <template v-slot:body-cell-Image="{ value }">
          <span v-html="value"></span>
        </template>
        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <q-btn icon="mode_edit"  @click="onEdit(props.row)"></q-btn>
            <q-btn icon="delete"  @click="onDelete(props.row)"></q-btn>
          </q-td>
        </template>
      </q-table>
      <q-dialog v-model="add">
  <q-card style="width:300px">
    <q-card-section>
      <q-form class="q-gutter-md">
        <q-input v-model="productName" label="Tên sản phẩm"></q-input>
        <q-input v-model="productPrice" label="Giá sản phẩm"></q-input>
        <q-input v-model="imageUrl" label="Hình ảnh"></q-input>
      </q-form>
    </q-card-section>
    <q-card-actions align="right" class="bg-white text-teal">
      <q-btn flat label="Thêm" @click="addProduct"></q-btn>
      <q-btn flat label="Hủy" v-close-popup></q-btn>
    </q-card-actions>
  </q-card>
</q-dialog>
  </q-page>
</template>

<script setup>
  import { ref } from "vue";
  import axios from "axios";

  var add = ref(false);
  var productName = ref("");
  var productPrice = ref("");
  var imageUrl = ref("");
  var rows = ref([]);
  const loading = ref(true);
  const api_url_user = import.meta.env.VITE_API_URL;
  const api_add_product = import.meta.env.VITE_API_ADD_PRODUCT;
  const api_delete_product = import.meta.env.VITE_API_DELETE_PRODUCT;
  const columns = [
          {
            name: 'BookId',
            required: true,
            label: 'Book Id',
            align: 'left',
            field:'id'
          },
          {
            name:'Book',
            required: true,
            label: 'Book',
            align: 'left',
            field: 'bookName',
            format: val => `${val}`,
            sortable: true
          },
          {
            name:'BookPrice',
            required: true,
            label: 'BookPrice',
            align: 'left',
            field: 'bookPrice'
          },
          {
            name: 'Image',
            required: true,
            label: 'Image',
            align:'left',
            field: 'image',
            format: val => `<img src="${val}" alt="Book Image" style="width: 70px; height: 70px;">`
          },
          {
            name: 'actions',
            label: 'Action',
            required: true,
            align: 'left',
          }
  ];

  axios.get(api_url_user).then((response) => {
      loading.value = false;
      response.data.forEach(row => {
        var row = {
          id : row.id,
          bookName: row.bookName,
          bookPrice:row.bookPrice,
          image: row.image,
        };
        rows.value.push(row);
      });
  });

  function onDelete(row) {
    rows.value.forEach((item, index) => {
        if (item.id === row.id) {
            rows.value.splice(index, 1);
            return;
        }
    });
    const params = new URLSearchParams([['id', row.id]]);
    axios.get(api_delete_product, {params});
  }

  async function addProduct() {
    const data = {

      bookName: productName.value,
      bookPrice: productPrice.value,
      image: imageUrl.value
    };
    try
    {
        await axios.post(api_add_product, data);
        rows.value.push(data);
    } catch (error) {
        console.error(error);
    }
}
</script>
<style scoped>
</style>
