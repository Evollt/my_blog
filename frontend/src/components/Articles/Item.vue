<script setup lang="ts">
import { IArticle } from "@/types/IArticle";
defineProps<{
  article: IArticle;
}>();

let options = {
  month: "long",
  day: "numeric",
  timezone: "UTC",
  hour: "numeric",
  minute: "numeric",
};
</script>

<template>
  <div class="article-item grid gap-[10px]">
    <div class="article-item__date text-sm text-gray-500">
      {{ new Date(article.created_at).toLocaleString("ru", options) }}
    </div>
    <div class="article-item__title text-2xl">
      {{ article.title }}
    </div>
    <div class="article-item__desc text-gray-500">
      {{ article.description.slice(0, 200) + "..." }}
    </div>
    <div class="article-item__user text-gray-500">
      Автор: {{ article.user.name }}
    </div>
    <div
      class="article-item__btns text-gray-500 hover:underline cursor-pointer"
    >
      Читать пост →
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
