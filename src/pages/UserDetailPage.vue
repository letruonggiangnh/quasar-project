<template>
    <q-item style="height: 450px; width: 200px">
      <q-item-section class="column">
        <q-item-label class=" col"><p>PostId: </p>{{ postId }}</q-item-label>
        <q-item-label class=" col"><p>UserId: </p>{{ userId }}</q-item-label>
        <q-item-label class=" col"><p>Title: </p>{{ title }}</q-item-label>
        <q-item-label class=" col"><p>Body:</p>{{ body }}</q-item-label>
      </q-item-section>
    </q-item>

</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

const route = useRoute();

var body = ref("")
var title = ref("");
var postId = ref(0);



const api_detail_user = import.meta.env.VITE_API_URL;



</script>
