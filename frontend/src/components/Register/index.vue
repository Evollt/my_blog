<script setup lang="ts">
import { ref, watch } from "vue";
import RegisterContent from "@/components/Register/Content.vue";

const props = defineProps<{
  dialog: boolean;
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
    <v-dialog v-model="dialog" width="100%" max-width="400">
      <RegisterContent :dialog="dialog" @update-dialog="(e) => (dialog = e)" />
    </v-dialog>
  </div>
</template>

<style scoped lang="scss"></style>
