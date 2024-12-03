<template>
  <div class="q-pa-md"></div>
</template>

<script>
import { useRouter } from 'vue-router';
import { useApi } from 'src/api/useApi';

import { ref } from 'vue';

export default {
  setup() {
    const name = ref(null);
    const age = ref(null);
    const email = ref(null);

    const router = useRouter();

    return {
      name,
      age,
      email,

      onSubmit() {
        console.log(name, age, email);
        useApi().updateApi();
      },

      onReset() {
        name.value = null;
        age.value = null;
        email.value = null;
      },

      goTo() {
        router.push({ name: 'book' });
      },
    };
  },
};
</script>
