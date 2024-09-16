<template>
  <div class="flex flex-col md:flex-row gap-[50px] md:gap-6 justify-between py-4">
    <div class="w-full md:w-3/5 lg:w-[480px]">
      <SearchInput @update-input="updateInput" :default-value="queryParams?.text" />
    </div>
    <div class="w-full sm:w-3/5 md:w-52 md:max-w-[40%]">
      <SelectInput
        :items="regionList"
        :default-value="searchQuery?.region"
        placeholder="Filter by Region"
        @update:modelValue="updateSelect"
      />
    </div>
  </div>
</template>

<script setup>
import SearchInput from '@/components/SearchInput.vue';
import SelectInput from '@/components/SelectInput.vue';
import { useRouterHelper } from '@/shared/composables/useRouterHelper';

import { useCountriesStore } from '@/stores/countries';
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const searchQuery = ref(null);

const store = useCountriesStore();
const { regionList, queryParams } = storeToRefs(store);
const { updateQueryParams } = useRouterHelper();

const updateInput = (value) => {
  updateQueryParams({ text: value, page: 1 });
  store.setQueryParams({ text: value });
};

const updateSelect = (input) => {
  updateQueryParams({ region: input.value, page: 1 });
  store.setQueryParams({ region: input.value });
};

onMounted(() => {
  searchQuery.value = route.query;
  store.setQueryParams(searchQuery.value);
});
</script>
