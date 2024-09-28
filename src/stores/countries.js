import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import { searchInObjects } from '@/shared/utils';

export const useCountriesStore = defineStore('countries', () => {
  const countriesData = ref([]);
  const regionList = ref([]);
  const isFetching = ref(true);
  const queryParams = ref({
    text: '',
    region: '',
    page: 1
  });

  function setQueryParams(newParams) {
    queryParams.value = { ...queryParams.value, ...newParams };
  }

  const fetchData = async (url) => {
    isFetching.value = true;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      isFetching.value = false;
    }
  };

  const setData = (newData) => {
    countriesData.value = newData;

    const regionsName = newData.map((el) => ({ text: el.region, value: el.region }));
    const uniqueIds = new Set();
    const regions = regionsName.filter((item) => {
      if (uniqueIds.has(item.text)) return false;
      uniqueIds.add(item.text);
      return true;
    });
    const regionSorted = regions.sort((a, b) => a.text.localeCompare(b.text));
    const allOptions = [{ text: 'All regions', value: null }];
    regionList.value = [...allOptions, ...regionSorted];
  };

  const countriesList = computed(() => {
    const region = queryParams.value.region;
    const text = queryParams.value.text;

    const filteredByRegion = region
      ? countriesData.value.filter((el) => el.region === region)
      : countriesData.value;

    const filteredByText = text
      ? searchInObjects(filteredByRegion, text, ['name.common', 'capital'])
      : filteredByRegion;

    return filteredByText;
  });

  return {
    countriesData,
    countriesList,
    regionList,
    queryParams,
    isFetching,
    fetchData,
    setData,
    setQueryParams
  };
});
