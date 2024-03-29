<template>
  <q-page>
    <q-form
      class="q-gutter-md"
    >
      <div>
        <q-btn label="Submit" type="submit" color="primary"></q-btn>
        <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm"></q-btn>
      </div>
    </q-form>
  </q-page>
</template>

<script setup>
  import { ref } from 'vue'

  var add = ref(true);
  const bookName = ref(null);
  const bookPrice = ref(0);
  const discount = ref(0);
  const bookDiscountedPrice = ref(0);
  const imgae = ref("");


</script>
