<script setup lang="ts">
import PageTitle from "@/components/PageTitle.vue";
import { useAuthStore } from "@/stores/auth";
import { IArticle } from "@/types/IArticle";
import { Ref, ref } from "vue";
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import PostEdit from "@/components/Post/Edit/index.vue";

import MarkdownPreview from "@uivjs/vue-markdown-preview";
import "@uivjs/vue-markdown-preview/markdown.css";
import { Article } from "@/composables/useArticle";

const article: Ref<IArticle | null> = ref(null);
const route = useRoute();
const authStore = useAuthStore();
const editPostDialog = ref(false);
let options = {
  month: "long",
  day: "numeric",
  timezone: "UTC",
  hour: "numeric",
  minute: "numeric",
};
onMounted(async () => {
  await Article.get(Number(route.params.id)).then((response) => {
    article.value = response.data.data;
  });
});
</script>

<template>
  <div>
    <PageTitle>{{ article?.title }}</PageTitle>
    <markdown-preview class="markdown-wrapper">
      {{ article?.description }}
    </markdown-preview>
    <div class="flex justify-between center mt-5 text-gray-500">
      <div>
        <div
          class="text-violet-500 cursor-pointer"
          v-if="article?.user.email == authStore.user?.email"
          @click="editPostDialog = true"
        >
          Редактировать
        </div>
      </div>
      <div class="text-right">
        <div>Автор: {{ article?.user.name }}</div>
        <div>
          Опубликовано:
          {{
            //@ts-ignore
            new Date(article?.created_at).toLocaleString("ru", options)
          }}
        </div>
      </div>
    </div>

    <PostEdit
      :dialog="editPostDialog"
      :article="article"
      @update-dialog="(e: boolean) => (editPostDialog = e)"
    />
  </div>
</template>

<style scoped lang="scss">
</style>
