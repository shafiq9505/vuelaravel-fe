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
      <div class="text-h2 text-blue q-mb-md text-center">Register Page</div>
      <!-- Wrap the form inside a container -->
      <q-form @submit="onSubmit">
        <q-input
          filled
          v-model="name"
          label="Your name *"
          lazy-rules
          :rules="[
            (val) => (val && val.length > 0) || 'Please enter your name',
          ]"
        />

        <q-input
          filled
          type="username"
          v-model="username"
          label="Your username"
          lazy-rules
          :rules="usernameRules"
        />

        <q-input
          filled
          type="email"
          v-model="email"
          label="Your email *"
          lazy-rules
          :rules="emailRule"
        />

        <q-input
          filled
          type="password"
          v-model="password"
          label="Password"
          :rules="passwordRules"
        />

        <q-input
          filled
          type="password"
          v-model="confirmPassword"
          label="Password Confirmation"
          :rules="passwordRules"
        />

        <div class="flex justify-center q-mt-md q-gutter-md">
          <q-btn label="back" type="button" color="primary" @click="goBack" />
          <q-btn label="submit" type="submit" color="primary" />
        </div>
      </q-form>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useApi } from 'src/api/useApi';
import {
  passwordRules,
  usernameRules,
  emailRule,
} from 'src/constants/validation';
import { useQuasar } from 'quasar';
export default {
  setup() {
    const name = ref(null);
    const email = ref(null);
    const username = ref(null);
    const password = ref(null);
    const confirmPassword = ref(null);
    const { getCSRFToken, registerApi } = useApi();
    const $q = useQuasar();

    const router = useRouter();
    return {
      name,
      email,
      username,
      password,
      passwordRules,
      usernameRules,
      emailRule,
      confirmPassword,
      async onSubmit() {
        try {
          await getCSRFToken();

          const response = await registerApi({
            name: name.value,
            username: username.value,
            email: email.value,
            password: password.value,
            password_confirmation: confirmPassword.value,
          });

          if (response.status === 200) {
            $q.localStorage.set('token', response.data.access_token);
            $q.localStorage.set('user', response.data.user);
            router.push({ name: 'main-layout' });
          }
        } catch (error) {
          console.error('Failed register:', safeStringify(error));
        }
      },

      goBack() {
        router.back();
      },
    };
  },
};
</script>
