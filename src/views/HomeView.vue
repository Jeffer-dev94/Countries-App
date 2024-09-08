<script setup>
import CountryCard from '@/components/CountryCard.vue';
import SearchInput from '@/components/SearchInput.vue';
import SelectInput from '@/components/SelectInput.vue';

import { useCountriesStore } from '@/stores/countries';
import { storeToRefs } from 'pinia';

const store = useCountriesStore();
const { countriesList, regionList } = storeToRefs(store);
</script>

<template>
  <section class="flex flex-col gap-10 md:gap-12 py-[30px]">
    <div class="flex flex-col md:flex-row gap-[50px] md:gap-6 justify-between">
      <div class="w-full md:w-3/5 lg:w-[480px]">
        <SearchInput />
      </div>
      <div class="w-full sm:w-3/5 md:w-52 md:max-w-[40%]">
        <SelectInput :items="regionList" placeholder="Filter by Region" />
      </div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-[72px]">
      <CountryCard v-for="item in countriesList" :key="item.name.common" :name="item.name" :population="item.population"
        :region="item.region" :capital="item.capital" :flags="item.flags" />
    </div>
  </section>
</template>
