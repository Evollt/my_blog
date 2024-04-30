<script setup lang="ts">
import { RouterLink, useRoute } from "vue-router";
const route = useRoute();

defineProps<{
  link: string;
  title: string;
}>();
</script>

<template>
  <RouterLink
    :to="link"
    :class="{
      'font-medium py-1 hover:text-gray-100 decoration-gray-600 text-gray-100':
        route.path == link,
      'font-medium py-1 hover:text-gray-100 text-gray-500 border-transparent':
        route.path != link,
    }"
  >
    {{ title }}
  </RouterLink>
</template>

<style scoped lang="scss"></style>
