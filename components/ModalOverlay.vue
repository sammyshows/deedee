<template>
  <transition name="fade">
    <div
      v-if="show"
      class="fixed inset-0 bg-black/50 backdrop-blur-[2px] flex justify-center items-center z-50"
      role="dialog"
      aria-hidden="false"
      @click.self="$emit('close')"
    >
      <div>
        <slot />
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
defineProps({
  show: {
    type: Boolean,
    required: true,
  },
});

defineEmits(['close'])
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
