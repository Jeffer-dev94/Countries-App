import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useCountriesStore = defineStore('countries', () => {
  const countriesList = ref([]);

  const fetchData = async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const setData = (newData) => {
    countriesList.value = newData;
  };

  return {
    countriesList,
    fetchData,
    setData
  };
});
