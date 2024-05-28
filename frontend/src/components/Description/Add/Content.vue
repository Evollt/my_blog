<script setup lang="ts">
import { ref } from "vue";
import { User } from "@/composables/useUser";
import { useAuthStore } from "@/stores/auth";
import { toast } from "vue3-toastify";
import { Ref } from "vue";
import { IUser } from "@/types/IUser";
defineProps<{
  dialog: boolean;
}>();
const emits = defineEmits(["update-dialog"]);
const authStore = useAuthStore();

const user: Ref<IUser> = ref({
  id: authStore.user?.id ?? 0,
  name: authStore.user?.name ?? "",
  email: authStore.user?.email ?? "",
  description: authStore.user?.description ?? "",
  avatar: authStore.user?.avatar ?? "",
});

const saveDescription = async () => {
  const response = await User.update(user.value);

  if (response) {
    toast.success("Описание обновлено");
    emits("update-dialog", false);
  }
};

const updatePhoto = (e: any) => {
  // selectedFile.value = URL.createObjectURL(e.target.files[0]);
  user.value.avatar = e.target.files[0];
  console.log(user.value.avatar);
};
</script>

<template>
  <v-card width="100%" align-items="center" class="p-0">
    <template v-slot:title class="title-md-center"> Изменить данные </template>
    <v-card-text class="bg-surface-dark">
      <label class="flex justify-center mb-4">
        <div class="avatar flex">
          <img
            v-if="user?.avatar"
            :src="user?.avatar"
            class="rounded-full w-36 h-36 object-cover"
            alt=""
          />
          <img
            v-else
            src="@/assets/img/hacker.png"
            class="rounded-full w-36 h-36 object-cover"
            alt=""
          />

          <div class="avatar-edit cursor-pointer justify-center items-center">
            <div class="w-20 rounded-full border-white border-2 p-5">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path
                  fill="#ffffff"
                  d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"
                />
              </svg>
            </div>
          </div>
          <input
            type="file"
            class="hidden"
            accept="image/png, image/jpg, image/jpeg"
            id="companyPhoto"
            @change="updatePhoto"
          />
        </div>
      </label>

      <div class="grid grid-cols-2 gap-8">
        <v-text-field
          v-model="user.name"
          label="Введите имя"
          density="compact"
          variant="outlined"
        ></v-text-field>
        <v-text-field
          v-model="user.email"
          label="Введите почту"
          density="compact"
          variant="outlined"
        ></v-text-field>
      </div>
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

.avatar {
  .avatar-edit {
    display: none;
  }
  &:hover {
    .avatar-edit {
      display: flex;
      position: absolute;
      width: 144px;
      height: 144px;
      border: 1px solid black;
      background-color: rgba(0, 0, 0, 0.5);
      border-radius: 50%;
      color: red;
      z-index: 10;
    }
  }
}
</style>
