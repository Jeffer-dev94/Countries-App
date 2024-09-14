import { useRoute, useRouter } from 'vue-router';

export const useRouterHelper = () => {
  const router = useRouter();
  const route = useRoute();

  const navigateWithQuery = (path, query = {}, options = {}) => {
    router.push({ path, query, ...options });
  }

  const replaceWithQuery = (path, query = {}, options = {}) => {
    router.replace({ path, query, ...options });
  }

  const updateQueryParams = (newParams) => {
    const updatedQuery = { ...route.query, ...newParams };
    router.push({ query: updatedQuery });
  }

  const replaceQueryParams = (newParams) => {
    const updatedQuery = { ...route.query, ...newParams };
    router.replace({ query: updatedQuery });
  }

  return {
    navigateWithQuery,
    replaceWithQuery,
    updateQueryParams,
    replaceQueryParams
  };
};