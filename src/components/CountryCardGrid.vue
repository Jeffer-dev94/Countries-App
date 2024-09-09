<template>
  <div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-[72px]">
      <CountryCard v-for="item in currentContentItems" :key="item.name.common" :name="item.name"
        :population="item.population" :region="item.region" :capital="item.capital" :flags="item.flags" />
    </div>

    <VPagination :current-page="currentPage" :page-range="3" :total-pages="contentItems.length"
      :update-page="updatePage" />
  </div>
</template>

<script setup>
import CountryCard from '@/components/CountryCard.vue';
import VPagination from '@/components/VPagination.vue';

import { useCountriesStore } from '@/stores/countries';
import { storeToRefs } from 'pinia';
import { ref, watch } from 'vue';

const store = useCountriesStore();
const { countriesList } = storeToRefs(store);

const contentItems = ref([]);
const currentContentItems = ref([]);
// const queryString = ref('');
const currentPage = ref(1);

watch(countriesList, (newValue) => {
  if (newValue.length > 0) {
    const itemsByPage = 9;
    const mappedData = newValue?.reduce((result, _value, index) => {
      if (index % itemsByPage === 0) {
        result.push(newValue?.slice(index, index + itemsByPage));
      }
      return result;
    }, []);

    contentItems.value = mappedData;
    currentContentItems.value = mappedData[currentPage.value - 1];
  }
});

const updatePage = (val) => {
  currentPage.value = val;
  currentContentItems.value = contentItems?.value[currentPage.value - 1];
};
</script>
