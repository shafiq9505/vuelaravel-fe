<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> Shoppify Simplify Your Purchase </q-toolbar-title>

        <!-- Shopping Cart Button -->
        <q-btn
          flat
          dense
          round
          icon="shopping_cart"
          aria-label="Shopping Cart"
          @click="goToCart"
        >
          <q-tooltip>Go to Cart</q-tooltip>
        </q-btn>

        <!-- Checkout Button -->
        <q-btn
          flat
          dense
          round
          icon="credit_card"
          aria-label="Checkout"
          @click="goToCheckout"
        >
          <q-tooltip>Proceed to Checkout</q-tooltip>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Side Bar </q-item-label>

        <q-item
          clickable
          v-for="link in linksList"
          :key="link.title"
          @click="link.action"
        >
          <q-item-section avatar>
            <q-icon :name="link.icon" />
          </q-item-section>

          <q-item-section>
            <q-item-label>{{ link.title }}</q-item-label>
            <q-item-label caption>{{ link.caption }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import { useApi } from 'src/api/useApi';

defineOptions({
  name: 'MainLayout',
});
const router = useRouter();
const $q = useQuasar();
const { getCSRFToken, logoutApi } = useApi();

const linksList = [
  {
    title: 'User',
    caption: 'User',
    icon: 'person',
    action: goToUser, //
  },
  {
    title: 'list Item',
    caption: 'List Item',
    icon: 'inventory',
    action: goToCheckout, //
  },
  {
    title: 'Logout',
    caption: 'Logout',
    icon: 'logout',
    action: logout, // Call the logout function
  },
];

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

function goToUser() {
  router.push({ name: 'user' });
}

function goToCart() {
  router.push({ name: 'user' });
}

function goToCheckout() {
  router.push({ name: 'user' });
}

async function logout() {
  try {
    await getCSRFToken();
    const response = await logoutApi();

    if (response.status === 200) {
      $q.localStorage.clear();
      router.push({ name: 'login' }); // Redirect to the user route
    }
  } catch (error) {
    console.error(error);
  }
}
</script>
