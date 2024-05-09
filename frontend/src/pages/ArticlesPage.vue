<script setup lang="ts">
import PageTitle from "@/components/PageTitle.vue";
import { onMounted } from "vue";
import ArticlesList from "@/components/Articles/List.vue";
import { Article } from "@/composables/useArticle";
import { useArticleStore } from "@/stores/article";

const articleStore = useArticleStore();

onMounted(() => {
  Article.getAll();
});
</script>

<template>
  <div>
    <PageTitle>Посты</PageTitle>
    <ArticlesList :articles="articleStore.articles" />
  </div>
</template>

<style scoped lang="scss"></style>
