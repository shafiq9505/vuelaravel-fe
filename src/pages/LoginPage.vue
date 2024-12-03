<template>
  <div
    class="q-pa-none"
    style="
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
    "
  >
    <div class="q-gutter-md" style="max-width: 400px; width: 100%">
      <div class="text-h2 text-blue q-mb-md text-center">Login Page</div>
      <!-- Wrap the form inside a container -->

      <!-- Error Banner -->
      <q-banner
        v-if="errorMessage"
        color="negative"
        class="q-mb-md text-center"
        style="background-color: red; color: white"
      >
        <q-icon name="warning" size="md" />
        {{ errorMessage }}

        <q-btn
          flat
          icon="close"
          size="sm"
          class="q-ml-md"
          @click="errorMessage = null"
        />
      </q-banner>
      <q-form @submit="onSubmit" @reset="onReset">
        <q-input
          filled
          v-model="username"
          label="Username"
          lazy-rules
          :rules="usernameRules"
          class="q-mb-md"
        />

        <q-input
          filled
          type="password"
          v-model="password"
          label="Password"
          lazy-rules
          :rules="passwordRules"
        />

        <div class="flex justify-center q-mt-md q-gutter-md">
          <q-btn label="login" type="submit" color="primary" />
          <q-btn
            label="register"
            type="button"
            color="primary"
            @click="goToRegister"
          />
        </div>
      </q-form>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useApi } from 'src/api/useApi';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import { passwordRules, usernameRules } from 'src/constants/validation';

export default {
  setup() {
    const username = ref(null);
    const password = ref(null);
    const errorMessage = ref(null);
    const { getCSRFToken, loginApi } = useApi();
    const $q = useQuasar();

    const router = useRouter();
    return {
      username,
      password,
      errorMessage,
      passwordRules,
      usernameRules,
      async onSubmit() {
        try {
          await getCSRFToken();
          const response = await loginApi({
            username: username.value,
            password: password.value,
          });

          if (response.status === 200) {
            console.log('HEY MADER IM HERE');
            $q.localStorage.set('token', response.data.access_token);
            $q.localStorage.set('user', response.data.user);
            // Redirect or save login token as needed
            router.push({ name: 'user' });
          }
        } catch (error) {
          if (
            error.response &&
            error.response.data &&
            error.response.data.message
          ) {
            console.log('CHECK ERROR MESSAGE', error);
            errorMessage.value = error.response.data.message;
          } else {
            errorMessage.value = 'Login failed. Please try again later.'; // Generic error message
          }
        }
      },

      goToRegister() {
        router.push({ name: 'register' });
      },
    };
  },
};
</script>
