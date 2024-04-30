<script setup lang="ts">
import Header from "@/components/Header/index.vue";
</script>

<template>
  <div>
    <Header />
    <div class="container mx-auto">
      <RouterView></RouterView>
    </div>
  </div>
</template>

<style scoped></style>
