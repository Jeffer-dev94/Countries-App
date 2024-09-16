<template>
  <Listbox v-model="selectedOption" @update:modelValue="(value) => emit('update-input', value)">
    <div class="relative w-full">
      <ListboxButton
        class="relative w-full cursor-default rounded bg-white dark:bg-app-blue-700 py-4 pl-[30px] pr-6 text-app-blue-900 dark:text-white text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
      >
        <span class="block truncate">{{ selectedOption?.text ?? placeholder }}</span>
        <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-6">
          <ChevronDownIcon class="h-5 w-5" aria-hidden="true" />
        </span>
      </ListboxButton>

      <transition
        leave-active-class="transition duration-100 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <ListboxOptions
          class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-app-blue-700 py-1 text-base text-app-blue-900 dark:text-white shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
        >
          <ListboxOption
            v-slot="{ active, selected }"
            v-for="item in items"
            :key="item.text"
            :value="item"
            as="template"
          >
            <li
              :class="[
                active ? 'font-bold' : 'font-normal',
                'relative cursor-default select-none py-2 pl-8 pr-6'
              ]"
            >
              <span :class="[selected ? 'font-medium' : 'font-normal', 'block truncate']">{{
                item.text
              }}</span>
              <span
                v-if="selected"
                class="absolute inset-y-0 left-0 flex items-center pl-2 text-current"
              >
                <CheckIcon class="size-4" aria-hidden="true" />
              </span>
            </li>
          </ListboxOption>
          <ListboxOption as="template" v-if="items.length === 0">
            <li class="font-normal relative cursor-default select-none py-2 pl-8 pr-6">
              <span class="font-normal block truncate">No options available</span>
            </li>
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </div>
  </Listbox>
</template>

<script setup>
import { ref, defineProps, watch } from 'vue';
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/vue';
import { CheckIcon, ChevronDownIcon } from '@heroicons/vue/20/solid';

const emit = defineEmits(['update-input']);

const props = defineProps({
  items: {
    type: Array,
    required: true,
    default: () => []
  },
  placeholder: {
    type: String,
    default: 'Select an option'
  },
  defaultValue: {
    type: String
  }
});

const selectedOption = ref(null);

watch(
  () => props.defaultValue,
  (newValue) => {
    const defaultOption = props.items.find((el) => el.value === newValue);
    selectedOption.value = defaultOption ?? null;
  }
);
</script>
