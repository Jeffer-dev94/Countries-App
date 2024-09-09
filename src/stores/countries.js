import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useCountriesStore = defineStore('countries', () => {
  const countriesList = ref([]);
  const regionList = ref([]);
  const isFetching = ref(true);

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
    countriesList.value = newData;

    const regionsName = newData.map((el) => ({ name: el.region }));
    const uniqueIds = new Set();
    const regions = regionsName.filter((item) => {
      if (uniqueIds.has(item.name)) return false;
      uniqueIds.add(item.name);
      return true;
    });
    regionList.value = regions.sort((a, b) => a.name.localeCompare(b.name));
  };

  return {
    countriesList,
    regionList,
    isFetching,
    fetchData,
    setData
  };
});
