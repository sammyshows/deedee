<template>
  <div class="w-full h-full flex justify-center items-center bg-slate-800">
    <div class="w-[28rem] bg-slate-700 py-6 px-8 rounded-lg shadow-lg">
      <p class="text-xl font-medium tracking-wide text-center text-slate-300 mb-4">Login</p>

      <form @submit.prevent="handleLogin" class="space-y-4">
        <!-- Email Field -->
        <div>
          <label for="email" class="block text-xs font-medium text-slate-300">Email</label>
          <input
            type="email"
            id="email"
            v-model="form.email"
            class="w-full h-10 mt-1 bg-slate-600 rounded-md px-4 text-xs placeholder:italic placeholder:text-slate-500"
            placeholder="Enter your email"
          />
          <p v-if="errors.email" class="text-red-500 text-xs mt-1">{{ errors.email }}</p>
        </div>

        <!-- Password Field -->
        <div>
          <label for="password" class="block text-xs font-medium text-slate-300">Password</label>
          <input
            type="password"
            id="password"
            v-model="form.password"
            class="w-full h-10 mt-1 bg-slate-600 rounded-md px-4 text-xs placeholder:italic placeholder:text-slate-500"
            placeholder="Enter your password"
          />
          <p v-if="errors.password" class="text-red-500 text-xs mt-1">{{ errors.password }}</p>
        </div>

        <div class="w-full flex justify-center">
          <NuxtLink to="/auth/signup" class="text-xs text-center underline underline-offset-2">
            Don't have an account? Signup
          </NuxtLink>
        </div>

        <!-- Submit Button -->
        <div class="flex justify-center mt-4">
          <button
            type="submit"
            class="h-10 px-6 rounded-md bg-blue-500 text-xs font-medium text-white hover:bg-blue-600"
          >
            Log In
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const form = ref({
  email: '',
  password: '',
});

const errors = ref({
  email: '',
  password: '',
});

const validateLogin = () => {
  errors.value.email = '';
  errors.value.password = '';

  if (!form.value.email) {
    errors.value.email = 'Email is required.';
  } else if (!/^\S+@\S+\.\S+$/.test(form.value.email)) {
    errors.value.email = 'Please enter a valid email address.';
  }

  if (!form.value.password) {
    errors.value.password = 'Password is required.';
  }

  return !errors.value.email && !errors.value.password;
};

const handleLogin = async () => {
  if (!validateLogin()) return;

  try {
    // Send credentials to the server
    const response = await $fetch('/api/auth/login', {
      method: 'POST',
      body: {
        email: form.value.email,
        password: form.value.password,
      },
    });

    // Handle response
    if (response.success) {
      useRouter().push('/secrets');
      // Redirect or perform further actions
    } else {
      errors.value.email = 'Invalid email or password.';
    }
  } catch (error) {
    console.error('Error during login:', error);
    alert('An unexpected error occurred. Please try again.');
  }
};
</script>
