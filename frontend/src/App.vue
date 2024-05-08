<script setup lang="ts">
import Header from "@/components/Header/index.vue";
import { onMounted } from "vue";
import { User } from "./composables/useUser";

onMounted(() => {
  User.get();
});
</script>

<template>
  <div class="pb-[100px]">
    <Header />
    <div class="container mx-auto">
      <RouterView></RouterView>
    </div>
  </div>
</template>

<style scoped></style>
