<script setup>
import { RouterView } from 'vue-router';
import { useCountriesStore } from '@/stores/countries';
import TheHeader from './components/TheHeader.vue';

const store = useCountriesStore();

const loadData = async () => {
  await store.fetchData('https://restcountries.com/v3.1/all');
};

loadData();
</script>

<template>
  <div class="flex flex-col bg-app-gray-300 dark:bg-app-blue-800 min-h-screen transition-colors">
    <TheHeader />

    <main class="container mx-auto px-5 md:px-4">
      <RouterView />
    </main>
  </div>
</template>
