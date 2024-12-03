<template>
  <q-page padding>
    <q-card class="q-pa-md" flat bordered>
      <div class="row items-center q-mb-md">
        <q-avatar
          size="100px"
          @click="triggerFileUpload"
          style="cursor: pointer"
        >
          <img :src="user.avatar" alt="User Avatar" />
        </q-avatar>
        <q-uploader
          ref="fileUploader"
          class="hidden"
          url=""
          @added="onFileAdded"
          accept=".jpg, image/*"
          auto-upload
        />
        <div class="q-ml-md">
          <div class="text-h6">{{ user.name }}</div>
          <div class="text-subtitle1 text-grey">{{ user.email }}</div>
        </div>
      </div>

      <q-separator />

      <div class="q-mt-md">
        <q-list>
          <q-item>
            <q-item-section>
              <q-item-label caption>Name</q-item-label>
              <q-item-label>{{ user.name }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label caption>Email</q-item-label>
              <q-item-label>{{ user.email }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label caption>Joined</q-item-label>
              <q-item-label>{{ user.joinedDate }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </q-card>

    <q-card class="q-pa-md q-mt-md" flat bordered>
      <div class="text-h6 q-mb-md">Purchase History</div>
      <q-table :rows="rows" row-key="name" flat bordered>
        <template v-slot:body-cell-actions="props">
          <q-td class="flex justify-center items-center">
            <q-btn
              flat
              dense
              round
              icon="visibility"
              color="primary"
              @click="viewPurchase(props.row)"
            />
          </q-td>
        </template>
      </q-table>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useQuasar } from 'quasar';
import _ from 'lodash';

const $q = useQuasar();

// Retrieve user data from localStorage
const localStorageUser = $q.localStorage.getItem('user');

// Trigger file input dialog
const triggerFileUpload = () => {
  fileUploader.value?.pickFiles();
};

const user = ref({
  name: _.get(localStorageUser, 'name', 'John Doe'),
  email: _.get(localStorageUser, 'email', 'john.doe@example.com'),
  avatar: _.get(
    localStorageUser,
    'profilePicture',
    'https://via.placeholder.com/100'
  ),
  joinedDate: _.get(localStorageUser, 'joinedDate', 'January 15, 2021'),
  bio: 'A passionate developer who loves coding and coffee.',
});

const rows = [
  {
    name: 'Frozen Yogurt',
    calories: 159,
    fat: 6.0,
    carbs: 24,
    protein: 4.0,
    sodium: 87,
    calcium: '14%',
    iron: '1%',
  },
  {
    name: 'Ice cream sandwich',
    calories: 237,
    fat: 9.0,
    carbs: 37,
    protein: 4.3,
    sodium: 129,
    calcium: '8%',
    iron: '1%',
  },
  {
    name: 'Eclair',
    calories: 262,
    fat: 16.0,
    carbs: 23,
    protein: 6.0,
    sodium: 337,
    calcium: '6%',
    iron: '7%',
  },
  {
    name: 'Cupcake',
    calories: 305,
    fat: 3.7,
    carbs: 67,
    protein: 4.3,
    sodium: 413,
    calcium: '3%',
    iron: '8%',
  },
  {
    name: 'Gingerbread',
    calories: 356,
    fat: 16.0,
    carbs: 49,
    protein: 3.9,
    sodium: 327,
    calcium: '7%',
    iron: '16%',
  },
  {
    name: 'Jelly bean',
    calories: 375,
    fat: 0.0,
    carbs: 94,
    protein: 0.0,
    sodium: 50,
    calcium: '0%',
    iron: '0%',
  },
  {
    name: 'Lollipop',
    calories: 392,
    fat: 0.2,
    carbs: 98,
    protein: 0,
    sodium: 38,
    calcium: '0%',
    iron: '2%',
  },
  {
    name: 'Honeycomb',
    calories: 408,
    fat: 3.2,
    carbs: 87,
    protein: 6.5,
    sodium: 562,
    calcium: '0%',
    iron: '45%',
  },
  {
    name: 'Donut',
    calories: 452,
    fat: 25.0,
    carbs: 51,
    protein: 4.9,
    sodium: 326,
    calcium: '2%',
    iron: '22%',
  },
  {
    name: 'KitKat',
    calories: 518,
    fat: 26.0,
    carbs: 65,
    protein: 7,
    sodium: 54,
    calcium: '12%',
    iron: '6%',
  },
];

// Reference to the file uploader
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fileUploader = ref<any>(null);

// Handle file upload
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const onFileAdded = (files: readonly any[]) => {
  // Accept an array of files
  if (files.length) {
    const reader = new FileReader();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    reader.onload = (event: any) => {
      user.value.avatar = event.target.result; // Set the base64 image as the avatar
      $q.localStorage.set('user', JSON.stringify(user.value)); // Save the updated user to localStorage
    };

    reader.readAsDataURL(files[0]); // Convert the first file in the array to a base64 string
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const viewPurchase = (row: any) => {
  console.log('Viewing purchase:', row);
};
</script>

<style scoped>
.text-h6 {
  font-weight: bold;
}
.text-subtitle1 {
  color: #757575;
}
.hidden {
  display: none;
}
</style>
