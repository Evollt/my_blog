<script setup lang="ts">
import { IArticle } from "@/types/IArticle";
import ArticlesItem from "@/components/Articles/Item.vue";

defineProps<{
  articles: IArticle[];
  isOwner?: boolean;
}>();
</script>

<template>
  <div class="articles-list grid gap-[40px]">
    <ArticlesItem
      :is-owner="isOwner ?? false"
      :article="article"
      v-for="article in articles"
      :key="article.id"
    />
  </div>
</template>

<style scoped lang="scss"></style>
