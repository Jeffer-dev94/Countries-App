<script setup>
import CountryCardGrid from '@/components/CountryCardGrid.vue';
import CountryFilters from '@/components/CountryFilters.vue';
</script>

<template>
  <section class="flex flex-col gap-6 md:gap-8 py-[30px]">
    <CountryFilters />
    <CountryCardGrid />
  </section>
</template>
