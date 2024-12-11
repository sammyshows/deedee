<template>
  <div class="w-full h-full pt-4 px-6 bg-slate-800">
    <div class="flex">
      <p class="grow text-xl font-medium tracking-wide select-none">Secrets</p>

      <div class="relative">
        <input type="text" class="h-full w-60 bg-slate-600 rounded-full focus:outline-4 pl-4 text-xs" placeholder="Search..." />
        <MagnifyingGlassIcon class="absolute top-1/2 right-2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
      </div>

      <button @click="utilityStore.showNewSecretModal = true" class="flex items-center gap-1 ml-4 px-4 rounded-full bg-blue-500">
        <PlusIcon class="size-4" />
        <p class="text-xs">New</p>
      </button>
    </div>

    <div class="mt-3 py-1">
      <div class="flex gap-4 text-tiny text-slate-300">
        <div class="w-60">Name</div>
        <div class="w-96">Secret</div>
        <div class="w-28">Expiry</div>
      </div>
    </div>

    <div class="flex flex-col divide-y divide-slate-700">
      <div v-for="secret in secrets" :key="secret.name" class="h-10 flex items-center gap-4 text-xs">
        <div class="w-60">{{ secret.name }}</div>
        <div class="w-96">{{ secret.secret }}</div>
        <div class="w-28">{{ secret.expiry }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PlusIcon, MagnifyingGlassIcon } from '@heroicons/vue/16/solid';
const utilityStore = useUtilityStore()
const { showNewSecretModal } = utilityStore

const secrets = [
  {
    name: 'API Key - Stripe',
    secret: 'sk_tes**************************',
    createdAt: '2023-12-01',
    expiry: '2024-12-01',
  },
  {
    name: 'SSH Key - Server',
    secret: 'ssh-ed**************************',
    createdAt: '2023-10-15',
    expiry: 'Never',
  },
  {
    name: 'JWT Token - User Auth',
    secret: 'eyJhbG**************************',
    createdAt: '2023-11-25',
    expiry: '2023-12-25',
  },
  {
    name: 'SQL Database Password',
    secret: 'p@ssw0**************************',
    createdAt: '2023-08-01',
    expiry: '2024-08-01',
  },
];
</script>
