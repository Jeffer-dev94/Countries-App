<template>
  <div class="relative flex items-center">
    <button class="absolute w-[86px] flex justify-center">
      <MagnifyingGlassIcon class="size-5 text-app-gray-900 dark:text-white" />
    </button>

    <input
      type="text"
      placeholder="Search for a country..."
      v-model="searchQuery"
      class="w-full shadow py-4 px-3 pl-[90px] border border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 rounded bg-white dark:bg-app-blue-700 text-app-gray-900 dark:text-white"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline';

const searchQuery = ref('');
</script>
