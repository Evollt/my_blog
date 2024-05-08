<script setup lang="ts">
import { IArticle } from "@/types/IArticle";
import { ref } from "vue";
import PostEdit from "@/components/Post/Edit/index.vue";
import axios from "@/axios";
import { toast } from "vue3-toastify";
const props = defineProps<{
  article: IArticle;
  isOwner: boolean;
}>();
const emits = defineEmits(["get-articles"]);

let options = {
  month: "long",
  day: "numeric",
  timezone: "UTC",
  hour: "numeric",
  minute: "numeric",
};
const editPostDialog = ref(false);

const deleteArticle = async () => {
  await axios
    .delete(`api/post/delete/${props.article.id}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("auth_token"),
      },
    })
    .then(() => {
      emits("get-articles", true);
      toast.info("Пост удален");
    });
};
</script>

<template>
  <div>
    <div class="article-item grid gap-[10px]">
      <div class="article-item__date text-sm text-gray-500">
        {{
          //@ts-ignore
          new Date(article.created_at).toLocaleString("ru", options)
        }}
      </div>
      <div class="article-item__date text-sm text-gray-500">
        Категория: {{ article.category.title }}
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
      <RouterLink
        :to="`/articles/${article.id}`"
        class="article-item__btns text-gray-500 hover:underline cursor-pointer"
      >
        Читать пост →
      </RouterLink>
      <div class="text-right" v-if="isOwner">
        <v-btn
          variant="outlined"
          class="mr-[10px]"
          color="purple"
          @click="editPostDialog = true"
          >Редактировать</v-btn
        >
        <v-btn variant="outlined" color="red" @click="deleteArticle"
          >Удалить</v-btn
        >
      </div>
    </div>
    <PostEdit
      :dialog="editPostDialog"
      :article="article"
      @update-dialog="(e: boolean) => (editPostDialog = e)"
    />
  </div>
</template>

<style scoped lang="scss"></style>
