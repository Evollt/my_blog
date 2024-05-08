<script setup lang="ts">
import PageTitle from "@/components/PageTitle.vue";
import DescriptionAdd from "@/components/Description/Add/index.vue";
import { useAuthStore } from "@/stores/auth";
import { marked } from "marked";
import { ref } from "vue";
const authStore = useAuthStore();
const addDescription = ref(false);
import MarkdownPreview from "@uivjs/vue-markdown-preview";
import "@uivjs/vue-markdown-preview/markdown.css";
</script>

<template>
  <div>
    <PageTitle>
      {{ authStore.user?.name }}
    </PageTitle>

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
        v-if="!addDescription"
        @click="addDescription = true"
      >
        Добавить описание
      </div>

      <DescriptionAdd
        :dialog="addDescription"
        @update-dialog="(e: boolean) => (addDescription = e)"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.markdown-wrapper {
  width: 100%;
  max-width: 100%;
  margin: 0;
  background-color: #18181b;
  color: white;
}
</style>
