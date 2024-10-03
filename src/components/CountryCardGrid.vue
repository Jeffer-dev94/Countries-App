<template>
  <div>
    <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-12 lg:gap-16 xl:gap-[72px]">
      <template v-if="isFetching">
        <CountryCardSkeleton v-for="item in [1, 2, 3]" :key="item" />
      </template>
      <template v-else>
        <CountryCard
          v-for="item in currentContentItems"
          :key="item.name.common"
          :name="item.name"
          :population="item.population"
          :region="item.region"
          :capital="item.capital"
          :flags="item.flags"
        />
      </template>
    </div>
    <VPagination
      v-if="contentItems.length > 1"
      :current-page="currentPage"
      :page-range="3"
      :total-pages="contentItems.length"
      :update-page="updatePage"
    />

    <div
      v-if="countriesList.length === 0 && !isFetching"
      class="max-w-72 p-4 text-app-blue-900 border border-blue-400 rounded-lg bg-blue-100 dark:bg-gray-800 dark:text-white dark:border-blue-900"
      role="alert"
    >
      <p class="text-lg">No results</p>
    </div>
  </div>
</template>

<script setup>
import CountryCard from '@/components/CountryCard.vue';
import CountryCardSkeleton from '@/components/CountryCardSkeleton.vue';
import VPagination from '@/components/VPagination.vue';
import { useRouterHelper } from '@/shared/composables/useRouterHelper';

import { useCountriesStore } from '@/stores/countries';
import { storeToRefs } from 'pinia';
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const store = useCountriesStore();
const { countriesList, isFetching } = storeToRefs(store);
const { updateQueryParams } = useRouterHelper();

const contentItems = ref([]);
const currentContentItems = ref([]);
const currentPage = ref(1);

const updateList = (content) => {
  const itemsByPage = 12;
  const mappedData = content?.reduce((result, _value, index) => {
    if (index % itemsByPage === 0) {
      result.push(content?.slice(index, index + itemsByPage));
    }
    return result;
  }, []);

  contentItems.value = mappedData;
  currentContentItems.value = mappedData[currentPage.value - 1];
};

const updatePage = (val) => {
  currentPage.value = val;
  currentContentItems.value = contentItems?.value[val - 1];
  updateQueryParams({ page: val });
};

watch(countriesList, (newValue) => {
  updateList(newValue);
});

onMounted(() => {
  currentPage.value = parseInt(route.query.page ?? '1');
  updateList(countriesList.value);
});
</script>
