<template>
  <section class="flex flex-col gap-16 md:gap-20 py-[30px]">
    <div class="flex">
      <button
        class="bg-white text-app-blue-900 dark:bg-app-blue-700 dark:text-white shadow-md px-6 py-1 rounded-sm flex flex-nowrap items-center gap-3 group"
        @click="goBack"
      >
        <ArrowLeftIcon
          class="size-4 text-current transition-transform duration-500 group-hover:-translate-x-1"
        />
        <span>Back</span>
      </button>
    </div>

    <div
      v-if="countryData"
      class="flex flex-nowrap flex-col md:flex-row gap-20 md:gap-16 xl:gap-[120px] text-app-blue-900 dark:text-white"
    >
      <div class="w-full lg:w-1/2 lg:max-w-[560px]">
        <figure class="w-full aspect-[560/400]">
          <img
            :src="countryData.flags.png"
            :alt="countryData.flags.alt"
            class="w-full object-center object-cover"
          />
        </figure>
      </div>

      <div class="w-full lg:w-[calc(50%+40px)] lg:grow">
        <h1 class="text-3xl font-bold mb-8">{{ countryData.name.common }}</h1>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-5 mb-10">
          <ul>
            <li><strong>Native name:</strong> {{ nativeName }}</li>
            <li>
              <strong>Population:</strong> {{ countryData.population.toLocaleString('es-CO') }}
            </li>
            <li><strong>Region:</strong> {{ countryData.region }}</li>
            <li v-if="countryData.subregion">
              <strong>Sub region:</strong> {{ countryData.subregion }}
            </li>
            <li v-if="countryData.capital">
              <strong>Capital:</strong> {{ countryData.capital?.join(',') }}
            </li>
          </ul>
          <ul>
            <li><strong>Top Level Domain:</strong> {{ countryData?.tld?.join('/') }}</li>
            <li><strong>Currencies:</strong> {{ currencies }}</li>
            <li><strong>Languages:</strong> {{ languages }}</li>
          </ul>
        </div>

        <div class="flex flex-col lg:flex-row gap-5" v-if="borderCountries.length > 0">
          <p class="text-lg whitespace-nowrap"><strong>Border Countries</strong>:</p>
          <div class="flex flex-wrap gap-3 items-center">
            <RouterLink
              class="bg-white dark:bg-app-blue-700 dark:text-white shadow-md px-6 py-1 rounded-sm flex-1 sm:flex-initial text-center"
              v-for="country in borderCountries"
              :key="country.name.common"
              :to="{ name: 'country', params: { name: country.name.common } }"
            >
              {{ country.name.common }}
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
    <div
      v-else-if="!countryData && isFetching"
      class="flex flex-nowrap flex-col md:flex-row gap-20 md:gap-16 xl:gap-[120px] animate-pulse"
    >
      <div class="w-full lg:w-1/2 lg:max-w-[560px]">
        <div class="w-full aspect-[560/400] bg-gray-200 dark:bg-slate-600 rounded"></div>
      </div>

      <div class="w-full lg:w-[calc(50%+40px)] lg:grow">
        <div class="h-9 rounded w-full bg-gray-200 dark:bg-slate-600 mb-9"></div>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-5 mb-10">
          <ul class="flex flex-col gap-1">
            <li class="h-5 rounded w-full bg-gray-200 dark:bg-slate-600"></li>
            <li class="h-5 rounded w-5/6 bg-gray-200 dark:bg-slate-600"></li>
            <li class="h-5 rounded w-4/6 bg-gray-200 dark:bg-slate-600"></li>
            <li class="h-5 rounded w-5/6 bg-gray-200 dark:bg-slate-600"></li>
            <li class="h-5 rounded w-3/6 bg-gray-200 dark:bg-slate-600"></li>
          </ul>
          <ul class="flex flex-col gap-2">
            <li class="h-5 rounded w-4/6 bg-gray-200 dark:bg-slate-600"></li>
            <li class="h-5 rounded w-5/6 bg-gray-200 dark:bg-slate-600"></li>
            <li class="h-5 rounded w-3/6 bg-gray-200 dark:bg-slate-600"></li>
          </ul>
        </div>
      </div>
    </div>
    <div
      v-else
      class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
      role="alert"
    >
      <span class="block font-bold pr-2">Oops!</span>
      <span class="sm:inline"
        >No data available for the country <strong>{{ countryName }}</strong></span
      >
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import { RouterLink, useRoute, useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { ArrowLeftIcon } from '@heroicons/vue/24/outline';
import { useCountriesStore } from '@/stores/countries';

const router = useRouter();
const route = useRoute();
const countryName = ref(route.params.name);

const store = useCountriesStore();
const { countriesData, isFetching } = storeToRefs(store);

const countryData = ref(null);
const nativeName = ref(null);
const currencies = ref(null);
const languages = ref(null);
const borderCountries = ref(null);

const goBack = () => {
  const hasHistory = window?.history?.length > 1;

  if (hasHistory) {
    const previousPath = window.history.state?.back;
    previousPath.split('?')?.[0] === '/' ? router.back() : router.push({ path: '/', query: {} });
  } else {
    router.push({ path: '/', query: {} });
  }
};

const setCountry = () => {
  countryData.value = countriesData?.value?.find((el) => el.name.common === countryName.value);
  borderCountries.value = countriesData?.value?.filter((el) =>
    countryData.value.borders?.includes(el.cca3)
  );

  const nativeNameKey = Object.keys(countryData.value.name.nativeName)[0];
  nativeName.value = countryData.value.name.nativeName[nativeNameKey].common;

  const currenciesKey = Object.keys(countryData.value.currencies)[0];
  currencies.value = countryData.value.currencies[currenciesKey].name;

  languages.value = Object.values(countryData.value.languages).join(', ');
};

watch(
  () => route.params.name,
  (newName) => {
    countryName.value = newName;
    setCountry();
  }
);

watch(
  () => countriesData.value,
  () => {
    setCountry();
  }
);

onMounted(() => {
  if (countriesData.value.length) setCountry();
});
</script>
