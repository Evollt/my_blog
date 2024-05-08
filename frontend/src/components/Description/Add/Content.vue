<script setup lang="ts">
import { ref } from "vue";
import { User } from "@/composables/useUser";
import { useAuthStore } from "@/stores/auth";
import { toast } from "vue3-toastify";
defineProps<{
  dialog: boolean;
}>();
const emits = defineEmits(["update-dialog"]);
const authStore = useAuthStore();

const user = ref({
  description: authStore.user?.description ?? "",
});

const saveDescription = async () => {
  const response = await User.update(user.value);

  if (response) {
    toast.success("Описание обновлено");
    emits("update-dialog", false);
  }
};
</script>

<template>
  <v-card width="100%" align-items="center" class="p-0">
    <template v-slot:title class="title-md-center"> Описание </template>
    <v-card-text class="bg-surface-dark">
      <v-md-editor v-model="user.description" height="93%"></v-md-editor>
      <v-card-actions class="mt-4 grid gap-3 absolute right-4">
        <v-btn
          variant="outlined"
          color="red"
          @click="emits('update-dialog', false)"
          >Отмена</v-btn
        >
        <v-btn variant="outlined" color="purple" @click="saveDescription"
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
