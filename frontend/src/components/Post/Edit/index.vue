<script setup lang="ts">
import { ref, watch } from "vue";
import PostEditContent from "@/components/Post/Edit/Content.vue";
import { IArticle } from "@/types/IArticle";

const props = defineProps<{
  dialog: boolean;
  article?: IArticle | null;
}>();
const emits = defineEmits(["update-dialog"]);

const dialog = ref(props.dialog);

watch(
  () => props.dialog,
  (value) => {
    dialog.value = value;
  }
);
watch(dialog, (value) => {
  emits("update-dialog", value);
});
</script>

<template>
  <div>
    <v-dialog v-model="dialog" width="100%" fullscreen>
      <PostEditContent
        :article="props.article"
        :dialog="dialog"
        @update-dialog="(e) => (dialog = e)"
      />
    </v-dialog>
  </div>
</template>

<style scoped lang="scss"></style>
