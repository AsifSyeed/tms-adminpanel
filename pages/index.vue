<template>
  <div class="px-2 py-2 sm:px-3 lg:px-4 w-full">
    <h2 class="text-2xl font-bold">Dashboard</h2>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'auth'
})
</script>