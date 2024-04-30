<script setup lang="ts">
import UICloseButton from "@/components/UI/CloseButton.vue";
defineProps<{
  dialog: boolean;
}>();
const emits = defineEmits(["update-dialog"]);
</script>

<template>
  <v-card width="100%" align-items="center" class="p-0">
    <template v-slot:title> Войти </template>
    <template v-slot:append>
      <UICloseButton @click="emits('update-dialog', false)" />
    </template>
    <v-card-text class="bg-surface-light">dsjfowej</v-card-text>
  </v-card>
</template>

<style scoped lang="scss"></style>
