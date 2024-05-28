<script setup lang="ts">
import PageTitle from "@/components/PageTitle.vue";
import DescriptionAdd from "@/components/Description/Add/index.vue";
import { useAuthStore } from "@/stores/auth";
import { ref } from "vue";
import ArticlesList from "@/components/Articles/List.vue";
import MarkdownPreview from "@uivjs/vue-markdown-preview";
import "@uivjs/vue-markdown-preview/markdown.css";
import { onMounted } from "vue";
import { Article } from "@/composables/useArticle";
import { useArticleStore } from "@/stores/article";

const authStore = useAuthStore();
const addDescription = ref(false);
const articleStore = useArticleStore();

onMounted(async () => {
  await Article.my();
});
</script>

<template>
  <div>
    <PageTitle>
      {{ authStore.user?.name }}
    </PageTitle>

    <div class="flex justify-center mb-4">
      <img
        v-if="authStore.user?.avatar"
        :src="authStore.user?.avatar"
        class="rounded-full w-36 h-36 object-cover"
        alt=""
      />
      <img
        v-else
        src="@/assets/img/hacker.png"
        class="rounded-full w-36 h-36 object-cover"
        alt=""
      />
    </div>

    <div class="user-description grid gap-5">
      <div>
        <markdown-preview
          v-if="authStore.user?.description"
          class="markdown-wrapper"
        >
          {{ authStore.user?.description }}
        </markdown-preview>
        <markdown-preview v-else class="markdown-wrapper">
          # У вас нет описания
        </markdown-preview>
      </div>

      <div
        class="text-violet-500 cursor-pointer"
        @click="addDescription = true"
      >
        Изменить данные
      </div>

      <DescriptionAdd
        :dialog="addDescription"
        @update-dialog="(e: boolean) => (addDescription = e)"
      />

      <PageTitle> Мои посты </PageTitle>

      <ArticlesList :is-owner="true" :articles="articleStore.myArticles" />
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
