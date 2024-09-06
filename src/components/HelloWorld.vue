<script setup>
defineProps({
  msg: {
    type: String,
    required: true
  }
});
</script>

<template>
  <div class="greetings">
    <h1 class="text-3xl text-app-blue-900 dark:text-white font-bold underline">{{ msg }}</h1>
  </div>
</template>
