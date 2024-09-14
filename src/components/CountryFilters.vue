<template>
  <div class="flex flex-col md:flex-row gap-[50px] md:gap-6 justify-between py-4">
    <div class="w-full md:w-3/5 lg:w-[480px]">
      <SearchInput @update-input="updateInput" />
    </div>
    <div class="w-full sm:w-3/5 md:w-52 md:max-w-[40%]">
      <SelectInput :items="regionList" placeholder="Filter by Region" @update:modelValue="updateSelect" />
    </div>
  </div>
</template>

<script setup>
import SearchInput from '@/components/SearchInput.vue';
import SelectInput from '@/components/SelectInput.vue';
import { useRouterHelper } from '@/shared/composables/useRouterHelper';

import { useCountriesStore } from '@/stores/countries';
import { storeToRefs } from 'pinia';

const store = useCountriesStore();
const { regionList } = storeToRefs(store);
const { updateQueryParams } = useRouterHelper();

const updateInput = (value) => {
  updateQueryParams({ term: value });
};

const updateSelect = (value) => {
  updateQueryParams({ region: value.name });
};
</script>