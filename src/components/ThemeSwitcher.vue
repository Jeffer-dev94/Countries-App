<template>
  <button @click="toggleTheme" class="flex items-center gap-2 group">
    <MoonIconSolid
      class="size-4 text-white group-hover:text-gray-200 transition-colors duration-500"
      v-if="isDark"
    />
    <MoonIconOutline
      class="size-4 text-app-blue-900 fill-white group-hover:fill-app-blue-800 transition-colors duration-500"
      v-else
    />
    <span
      class="text-app-blue-900 dark:text-white group-hover:text-blue-900 dark:group-hover:text-gray-200 transition-colors duration-500"
    >
      Dark Mode
    </span>
  </button>
</template>

<script setup>
import { ref } from 'vue';
import { MoonIcon as MoonIconSolid } from '@heroicons/vue/24/solid';
import { MoonIcon as MoonIconOutline } from '@heroicons/vue/24/outline';

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
