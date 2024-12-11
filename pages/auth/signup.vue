<template>
  <div class="w-full h-full flex justify-center items-center bg-slate-800">
    <div class="w-[28rem] bg-slate-700 py-6 px-8 rounded-lg shadow-lg">
      <p class="text-xl font-medium tracking-wide text-center text-slate-300 mb-4">Sign Up</p>

      <form @submit.prevent="handleSubmit" class="space-y-4">
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

        <!-- Confirm Password Field -->
        <div>
          <label for="confirmPassword" class="block text-xs font-medium text-slate-300">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            v-model="form.confirmPassword"
            class="w-full h-10 mt-1 bg-slate-600 rounded-md px-4 text-xs placeholder:italic placeholder:text-slate-500"
            placeholder="Confirm your password"
          />
          <p v-if="errors.confirmPassword" class="text-red-500 text-xs mt-1">{{ errors.confirmPassword }}</p>
        </div>

        <!-- Submit Button -->
        <div class="flex justify-center mt-4">
          <button
            type="submit"
            class="h-10 px-6 rounded-md bg-blue-500 text-xs font-medium text-white hover:bg-blue-600"
          >
            Create Account
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const form = ref({
  email: 'sam@gmail.com',
  password: 'admin123',
  confirmPassword: 'admin123',
});

const errors = ref({
  email: '',
  password: '',
  confirmPassword: '',
});

const validate = () => {
  errors.value.email = '';
  errors.value.password = '';
  errors.value.confirmPassword = '';

  if (!form.value.email) {
    errors.value.email = 'Email is required.';
  } else if (!/^\S+@\S+\.\S+$/.test(form.value.email)) {
    errors.value.email = 'Please enter a valid email address.';
  }

  if (!form.value.password) {
    errors.value.password = 'Password is required.';
  } else if (form.value.password.length < 8) {
    errors.value.password = 'Password must be at least 8 characters long.';
  }

  if (!form.value.confirmPassword) {
    errors.value.confirmPassword = 'Please confirm your password.';
  } else if (form.value.password !== form.value.confirmPassword) {
    errors.value.confirmPassword = 'Passwords do not match.';
  }

  return !errors.value.email && !errors.value.password && !errors.value.confirmPassword;
};

const handleSubmit = async () => {
  if (!validate()) return;

  try {
    // Send plaintext password to the server over HTTPS
    const response = await fetch('/api/auth/create-user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: form.value.email,
        password: form.value.password,
      }),
    });

    if (response.ok) {
      alert('Account created successfully!');
    } else {
      const errorData = await response.json();
      alert(`Error: ${errorData.message}`);
    }
  } catch (error) {
    console.error('Error during signup:', error);
    alert('An unexpected error occurred. Please try again.');
  }
};
</script>
