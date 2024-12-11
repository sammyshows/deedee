<template>
  <div class="h-full w-16 flex flex-col justify-center items-center gap-3 bg-slate-900">
    <NuxtLink
      v-for="item in navItems"
      :key="item.name"
      :to="`/${item.name}`"
      :class="[
        'p-2 rounded-full duration-100 flex items-center justify-center',
        currentPath === `/${item.name}` ? 'bg-blue-500/20' : 'hover:bg-slate-700/50',
      ]"
    >
      <component
        :is="item.icon"
        class="size-7 text-slate-400"
        :class="{ 'text-blue-500': currentPath === `/${item.name}` }"
      />
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { KeyIcon, PlusCircleIcon, UsersIcon, DocumentTextIcon, CogIcon } from '@heroicons/vue/24/outline';
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const currentPath = ref(router.currentRoute.value.path);

// Watch for route changes to update `currentPath`
watch(
  () => router.currentRoute.value.path,
  (newPath) => {
    currentPath.value = newPath;
  }
);

const navItems = [
  { name: 'secrets', icon: KeyIcon },
  { name: 'share', icon: UsersIcon },
  { name: 'logs', icon: DocumentTextIcon },
  { name: 'settings', icon: CogIcon },
];
</script>
