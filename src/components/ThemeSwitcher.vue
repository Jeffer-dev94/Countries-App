<template>
  <div>
    <button @click="toggleTheme" class="flex gap-2">
      <span class="text-app-blue-900 dark:text-white">Dark Mode</span>
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const isDark = ref(false);

const toggleTheme = () => {
  isDark.value = !isDark.value;
  document.documentElement.classList.toggle('dark', isDark.value);
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light');
};

if (localStorage.getItem('theme') === 'dark') {
  isDark.value = true;
  document.documentElement.classList.add('dark');
}
</script>
