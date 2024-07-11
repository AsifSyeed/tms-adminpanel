<script setup>
    const route = useRouter();

</script>

<template>
  <div class="px-2 py-2 sm:px-3 lg:px-4">
    Event no: {{ $route.params.id }}
  </div>
</template>
