<script setup>
import CountryCardGrid from '@/components/CountryCardGrid.vue';
import SearchInput from '@/components/SearchInput.vue';
import SelectInput from '@/components/SelectInput.vue';

import { useCountriesStore } from '@/stores/countries';
import { storeToRefs } from 'pinia';

const store = useCountriesStore();
const { regionList } = storeToRefs(store);
</script>

<template>
  <section class="flex flex-col gap-6 md:gap-8 py-[30px]">
    <div
      class="flex flex-col md:flex-row gap-[50px] md:gap-6 justify-between py-4 sticky top-0 -mx-2 px-2 bg-app-gray-300 dark:bg-app-blue-800">
      <div class="w-full md:w-3/5 lg:w-[480px]">
        <SearchInput />
      </div>
      <div class="w-full sm:w-3/5 md:w-52 md:max-w-[40%]">
        <SelectInput :items="regionList" placeholder="Filter by Region" />
      </div>
    </div>
    <CountryCardGrid />
  </section>
</template>
