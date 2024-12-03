<template>
  <div class="q-pa-md">
    <q-card class="my-card" flat bordered>
      <q-card-section>
        <div class="text-h6">List Of Books</div>
        <div class="text-subtitle2">by</div>
      </q-card-section>

      <q-markup-table>
        <thead>
          <tr>
            <th class="text-left">Id</th>
            <th class="text-left">Name</th>
            <th class="text-left">Author</th>
            <th class="text-left">Publish Date</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="book in books" :key="book.id">
            <td class="text-left">{{ book.id }}</td>
            <td class="text-left">{{ book.name }}</td>
            <td class="text-left">{{ book.author }}</td>
            <td class="text-left">{{ book.publish_date }}</td>
          </tr>
        </tbody>
      </q-markup-table>
    </q-card>

    <q-btn @click="goBack()" class="q-mt-sm" color="primary" label="Back" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useApi } from 'src/api/useApi';

interface IBook {
  id: number;
  name: string;
  author: string;
  publish_date: string;
}

const router = useRouter();
const books = ref<IBook[]>([]);
const { getApi } = useApi();
function goBack() {
  router.back();
}

onMounted(async () => {
  try {
    const response = await getApi('books');
    console.log('CHECK response', response);
    books.value = response;
    console.log('CHECK BOOKS VALUE', books);
  } catch (error) {
    console.error('Error fetching books:', error);
  }
});
</script>

<style></style>
