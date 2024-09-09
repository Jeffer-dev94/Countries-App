<template>
  <div class="block w-full my-10">
    <ul class="flex flex-row items-center justify-center w-full gap-4">
      <li>
        <button @click="handleOnClick(currentPage - 1)"
          class="flex flex-nowrap items-center gap-3 text-app-blue-800 hover:text-cyan-800 dark:text-white dark:hover:text-slate-300 whitespace-nowrap disabled:text-[#C6C6C6] transition-colors duration-500 group"
          :disabled="currentPage < 2" title="Previous Page">
          <ChevronLeftIcon class="size-4 text-current group-hover:-translate-x-0.5 transition-transform duration-500" />
          <span class="hidden md:inline-block text-[17px] font-medium leading-[1.2]">Previous</span>
        </button>
      </li>

      <li class="flex gap-2">
        <button v-if="currentPage > 2 && pageRange < totalPages" @click="handleOnClick(backNumber)"
          class="text-app-blue-800 dark:text-white">
          ...
        </button>

        <div class="flex gap-2">
          <button v-for="page in range(startPage, lastPage)" :key="page" :class="[
            'text-app-blue-800 hover:text-cyan-800 dark:text-white dark:hover:text-slate-300 px-2 py-1 text-[17px] leading-[1.2] transition-colors duration-500',
            page.toString() === currentPage.toString()
              ? 'font-bold'
              : 'font-medium hover:-translate-y-px'
          ]" @click="handleOnClick(page)">
            {{ page }}
          </button>
        </div>
        <button v-if="currentPage + pageRange < totalPages" @click="handleOnClick(forwardNumber)"
          class="text-app-blue-800 dark:text-white">
          ...
        </button>
      </li>

      <li>
        <button @click="handleOnClick(currentPage + 1)"
          class="flex flex-nowrap items-center gap-3 text-app-blue-800 hover:text-cyan-800 dark:text-white dark:hover:text-slate-300 whitespace-nowrap disabled:text-[#C6C6C6] transition-colors duration-500 group"
          :disabled="currentPage === totalPages" title="Next Page">
          <span class="hidden md:inline-block text-[17px] font-medium leading-[1.2]">Next</span>
          <ChevronRightIcon class="size-4 text-current group-hover:translate-x-0.5 transition-transform duration-500" />
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/24/outline';

const props = defineProps({
  currentPage: {
    type: Number,
    default: 1,
    required: true
  },
  pageRange: {
    type: Number,
    default: 3
  },
  totalPages: {
    type: Number,
    required: true
  },
  updatePage: {
    type: Function,
    default() { }
  }
});

const startPage = computed(() => {
  if (props.totalPages - props.currentPage < props.pageRange) {
    const startPage = props.totalPages - props.pageRange;
    return startPage > 0 ? startPage : 1;
  } else return props.currentPage;
});

const lastPage = computed(() => {
  const lastPage = props.currentPage + props.pageRange;
  if (lastPage < props.totalPages) return lastPage;
  else return props.totalPages;
});

const backNumber = computed(() => {
  if (props.currentPage <= props.pageRange) return 1;
  else return props.currentPage - props.pageRange;
});

const forwardNumber = computed(() => {
  if (props.currentPage + props.pageRange > props.totalPages) return props.totalPages;
  else return props.currentPage + props.pageRange + 1;
});

const range = (start, end) => {
  const arr = [];
  let num = start;

  while (num <= end) {
    arr.push(num);
    num++;
  }
  return arr;
};

const handleOnClick = (value) => {
  window.scrollTo(0, 0);
  props.updatePage(value);
};

// if (!props.totalPages || props.totalPages < 2) return;
</script>
