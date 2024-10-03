<template>
  <RouterLink :to="{ name: 'country', params: { name: name.common } }">
    <article
      class="bg-white dark:bg-app-blue-700 hover:bg-slate-50/20 dark:hover:bg-slate-700 flex flex-col rounded-lg overflow-hidden shadow transition-all duration-500 hover:-translate-y-1"
    >
      <div class="flex">
        <figure class="w-full h-auto aspect-[264/160] flex relative overflow-hidden">
          <img :src="flags.png" :alt="flags.alt" class="size-full object-cover object-center" />
        </figure>
      </div>

      <div class="px-8 pt-9 pb-14 text-app-blue-900 dark:text-white">
        <h2 class="text-xl font-bold mb-5">{{ name.common }}</h2>
        <p class="py-1"><strong>Population:</strong> {{ population.toLocaleString('es-CO') }}</p>
        <p class="py-1"><strong>Region:</strong> {{ region }}</p>
        <p v-if="capital" class="py-1"><strong>Capital:</strong> {{ capital?.join(',') }}</p>
      </div>
    </article>
  </RouterLink>
</template>

<script setup>
import { RouterLink } from 'vue-router';

defineProps({
  name: {
    type: Object,
    required: true
  },
  population: {
    type: Number,
    required: true
  },
  region: {
    type: String,
    required: true
  },
  capital: {
    type: Array
  },
  flags: {
    type: Object,
    required: true
  }
});
</script>
