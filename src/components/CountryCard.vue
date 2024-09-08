<template>
  <div class="bg-white dark:bg-app-blue-700 grid rounded-lg overflow-hidden shadow">
    <figure class="w-full h-auto aspect-[264/160] flex">
      <img :src="flags.png" alt="" class="size-full object-cover object-center" />
    </figure>

    <div class="px-8 pt-9 pb-14 text-app-blue-900 dark:text-white">
      <h2 class="text-xl font-bold mb-5">{{ name.common }}</h2>
      <p class="py-1"><strong>Population:</strong> {{ (population.toLocaleString('es-CO')) }}</p>
      <p class="py-1"><strong>Region:</strong> {{ region }}</p>
      <p v-if="capital" class="py-1"><strong>Capital:</strong> {{ capital?.join(',') }}</p>
    </div>
  </div>
</template>

<script setup>
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
