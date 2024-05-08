<script setup lang="ts">
import { User } from "@/composables/useUser";
import { Ref, ref } from "vue";
import { IRegister } from "@/types/Auth";
defineProps<{
  dialog: boolean;
}>();
const emits = defineEmits(["update-dialog"]);

const registerData: Ref<IRegister> = ref({
  name: "" as string,
  email: "" as string,
  password: "" as string,
});

const registerUser = async () => {
  const responseStatus = await User.register(registerData.value);

  if (responseStatus) {
    emits("update-dialog", false);
  }
};
</script>

<template>
  <v-card width="100%" align-items="center" class="p-0">
    <template v-slot:title> Зарегистрироваться </template>
    <v-card-text class="bg-surface-dark">
      <form @submit.prevent>
        <v-text-field
          v-model="registerData.name"
          label="Введите имя"
          density="compact"
          variant="outlined"
        ></v-text-field>
        <v-text-field
          v-model="registerData.email"
          label="Введите почту"
          density="compact"
          variant="outlined"
        ></v-text-field>
        <v-text-field
          v-model="registerData.password"
          label="Введите пароль"
          type="password"
          density="compact"
          variant="outlined"
        ></v-text-field>
        <v-btn type="submit" width="100%" @click="registerUser">Войти</v-btn>
      </form>
    </v-card-text>
  </v-card>
</template>

<style scoped lang="scss"></style>
