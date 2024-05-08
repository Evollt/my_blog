<script setup lang="ts">
import { Ref, ref, watch } from "vue";
// import { User } from "@/composables/useUser";
import { useAuthStore } from "@/stores/auth";
import { toast } from "vue3-toastify";
import { IArticle } from "@/types/IArticle";
import axios from "@/axios";
import { onMounted } from "vue";
import { ICategory } from "@/types/ICategory";
const props = defineProps<{
  dialog: boolean;
  article?: IArticle | null;
}>();
const emits = defineEmits(["update-dialog"]);
const authStore = useAuthStore();

// @ts-ignore
const article: Ref<IArticle> = ref(
  props.article ?? {
    id: 1,
    title: "",
    description: "",
    user: authStore.user,
    category: "",
    created_at: "",
  }
);
const categories: Ref<ICategory[]> = ref([]);
const selectedCategory = ref(article.value.category.title);

watch(selectedCategory, (value) => {
  // @ts-ignore
  article.value.category = categories.value.find((item) => item.title == value);
});

onMounted(async () => {
  await axios.get("api/category/get/all").then((response) => {
    categories.value = response.data;
  });
});

const editPost = async () => {
  await axios
    .post(
      `api/post/update/${article.value.id}`,
      {
        _method: "put",
        title: article.value.title,
        description: article.value.description,
        category_id: article.value.category.id,
      },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("auth_token"),
        },
      }
    )
    .then(() => {
      toast.success("Пост успешно отредактирован");
      emits("update-dialog", false);
    })
    .catch((response) => {
      // @ts-ignore
      for (const [key, value] of Object.entries(
        response.response.data.errors
      )) {
        // @ts-ignore
        toast.error(value[0]);
      }
    });
};

const createPost = async () => {
  await axios
    .post(
      `api/post/create`,
      {
        title: article.value.title,
        description: article.value.description,
        category_id: article.value.category.id,
      },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("auth_token"),
        },
      }
    )
    .then(() => {
      toast.success("Пост успешно создан");
      emits("update-dialog", false);
    })
    .catch((response) => {
      // @ts-ignore
      for (const [key, value] of Object.entries(
        response.response.data.errors
      )) {
        // @ts-ignore
        toast.error(value[0]);
      }
    });
};
</script>

<template>
  <v-card width="100%" align-items="center" class="p-0">
    <template v-slot:title class="title-md-center">
      {{ props.article ? "Редактировать" : "Создать" }} пост
    </template>
    <v-card-text class="bg-surface-dark">
      <div class="flex justify-between gap-[20px]">
        <v-text-field
          v-model="article.title"
          label="Введите название"
          density="compact"
          variant="outlined"
        ></v-text-field>
        <v-autocomplete
          label="Выберите категорию"
          :items="categories"
          v-model="selectedCategory"
          class="max-w-[400px]"
          density="compact"
          variant="outlined"
        ></v-autocomplete>
      </div>
      <v-md-editor v-model="article.description" height="93%"></v-md-editor>
      <v-card-actions class="mt-4 grid gap-3 absolute right-4">
        <v-btn
          variant="outlined"
          color="red"
          @click="emits('update-dialog', false)"
          >Отмена</v-btn
        >
        <v-btn
          variant="outlined"
          color="purple"
          @click="props.article ? editPost() : createPost()"
          >Сохранить</v-btn
        >
      </v-card-actions>
    </v-card-text>
  </v-card>
</template>

<style scoped lang="scss">
.description-textarea {
  &:focus {
    outline: none;
  }
}
</style>
