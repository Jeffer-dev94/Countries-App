<template>
  <header class="bg-white dark:bg-app-blue-700 py-4">
    <div class="container mx-auto flex flex-nowrap justify-between gap-4">
      <h1 class="text-xl font-bold text-app-blue-900 dark:text-white">Where in the world?</h1>
      <ThemeSwitcher />
    </div>
  </header>
</template>

<script setup>
import ThemeSwitcher from './ThemeSwitcher.vue';
</script>
