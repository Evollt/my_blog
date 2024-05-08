<script setup lang="ts">
import PageTitle from "@/components/PageTitle.vue";
import { onMounted, Ref, ref } from "vue";
import axios from "@/axios.ts";
import { IArticle } from "@/types/IArticle.ts";
import ArticlesList from "@/components/Articles/List.vue";

const articles: Ref<IArticle[]> = ref([]);

onMounted(() => {
  axios.get("/api/post/get/all").then((response) => {
    articles.value = response.data.data;
  });
});
</script>

<template>
  <div>
    <PageTitle>Посты</PageTitle>
    <ArticlesList :articles="articles" />
  </div>
</template>

<style scoped lang="scss"></style>
