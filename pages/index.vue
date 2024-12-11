<template>
  <div class="h-full flex">
    <Navbar />

    <div class="w-0 flex flex-col h-full grow">
      <NuxtPage />
    </div>

    
    <NewSecretModal v-show="showNewSecretModal" />
  </div>
</template>

<script setup lang="ts">
const utilityStore = useUtilityStore()
const { showNewSecretModal } = toRefs(utilityStore)
</script>