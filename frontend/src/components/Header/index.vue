<script setup lang="ts">
import { RouterLink } from "vue-router";
import HeaderLink from "@/components/Header/Link.vue";
import UIDefaultButton from "@/components/UI/DefaultButton.vue";
import Login from "@/components/Login/index.vue";
import Register from "@/components/Register/index.vue";
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";
import { User } from "@/composables/useUser";
import PostEdit from "@/components/Post/Edit/index.vue";

const loginDialog = ref(false);
const registerDialog = ref(false);
const authStore = useAuthStore();
const createPostDialog = ref(false);
</script>

<template>
  <header
    class="h-20 flex items-center bg-zinc-900/60 backdrop-blur-md sticky top-0 z-10"
  >
    <div class="w-full container mx-auto flex items-center">
      <div class="flex-1">
        <RouterLink :to="{ name: 'articles' }">
          <h1 class="text-3xl logo">Evollts Blog</h1>
        </RouterLink>
      </div>

      <nav class="hidden sm:block flex-1">
        <ul class="flex justify-center gap-6">
          <li>
            <HeaderLink link="/articles" title="Посты" />
          </li>
          <li>
            <HeaderLink link="/about" title="О нас" />
          </li>
        </ul>
      </nav>

      <div class="flex-1 flex gap-4 items-center justify-end">
        <div class="user" v-if="authStore.user">
          <v-menu transition="slide-y-transition">
            <template v-slot:activator="{ props }">
              <div v-bind="props" class="cursor-pointer">
                <img
                  v-if="authStore.user.avatar"
                  :src="authStore.user.avatar"
                  class="rounded-full w-16 h-16 object-cover"
                  alt=""
                />
                <img
                  v-else
                  src="@/assets/img/hacker.png"
                  class="rounded-full w-14 h-14 object-cover"
                  alt=""
                />
              </div>
            </template>
            <v-list>
              <v-list-item @click="$router.push({ name: 'profile' })">
                <v-list-item-title>Профиль</v-list-item-title>
              </v-list-item>
              <v-list-item @click="createPostDialog = true">
                <v-list-item-title>Создать пост</v-list-item-title>
              </v-list-item>
              <v-list-item @click="User.logout">
                <v-list-item-title>Выйти</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
        <div class="flex gap-6 items-center" v-else>
          <UIDefaultButton @click="loginDialog = true">Войти</UIDefaultButton>
          <UIDefaultButton @click="registerDialog = true"
            >Зарегистрироваться</UIDefaultButton
          >
        </div>
      </div>
    </div>
  </header>
  <Login :dialog="loginDialog" @update-dialog="(e) => (loginDialog = e)" />
  <Register
    :dialog="registerDialog"
    @update-dialog="(e) => (registerDialog = e)"
  />
  <PostEdit
    :dialog="createPostDialog"
    @update-dialog="(e: boolean) => (createPostDialog = e)"
  />
</template>

<style scoped lang="scss">
@import "@/assets/scss/_variables.scss";
.logo {
  font-family: $logoFont;
}
</style>
