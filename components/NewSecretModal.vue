<template>
  <ModalOverlay :show="showNewSecretModal" @close="close">  
    <div class="w-[32rem] h-96 py-4 px-6 bg-slate-800 rounded-lg">
      <p class="text-xl font-medium tracking-wide">New Secret</p>

      <div class="w-full mt-3 flex flex-col items-center gap-2 text-xs">
        <div class="w-full">
          <label for="name" class="block font-medium text-slate-300">Name</label>
          <input type="text" id="name" class="w-full h-7 mt-0.5 bg-slate-700/50 rounded-md px-4 placeholder:italic placeholder:text-slate-500" placeholder="e.g. App API Key" />
        </div>

        <div class="w-full">
          <label for="secret" class="block font-medium text-slate-300">Secret</label>
          <input type="text" id="secret" class="w-full h-7 mt-0.5 bg-slate-700/50 rounded-md px-4" />
        </div>

        <div class="w-full">
          <label for="project" class="block font-medium text-slate-300">Project</label>
          <input type="text" id="project" class="w-full h-7 mt-0.5 bg-slate-700/50 rounded-md px-4 placeholder:italic placeholder:text-slate-500" placeholder="e.g. Auth API" />
        </div>

        <div class="w-full">
          <label for="expiry" class="block font-medium text-slate-300">Expiry</label>
          <input
            type="date"
            id="expiry"
            class="w-full h-7 mt-0.5 bg-slate-700/50 rounded-md px-4"
            :value="defaultDate"
          />
        </div>
      </div>

      <div class="flex justify-center mt-6">
        <button class="h-8 px-6 rounded-md bg-green-600 text-xs">Save Secret</button>
      </div>
    </div>
  </ModalOverlay>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const utilityStore = useUtilityStore();
const { showNewSecretModal } = toRefs(utilityStore);

const close = () => utilityStore.showNewSecretModal = false;

// Get today's date in the format YYYY-MM-DD
const defaultDate = ref(new Date().toISOString().split('T')[0]);
</script>
