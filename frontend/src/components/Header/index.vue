<script setup lang="ts">
import { RouterLink } from "vue-router";
import HeaderLink from "@/components/Header/Link.vue";
import UIDefaultButton from "@/components/UI/DefaultButton.vue";
import Login from "@/components/Login/index.vue";
import { ref } from "vue";

const loginDialog = ref(false);
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
            <HeaderLink link="/profile" title="Профиль" />
          </li>
          <li>
            <HeaderLink link="/articles" title="Посты" />
          </li>
          <li>
            <HeaderLink link="/about" title="О нас" />
          </li>
          <li>
            <HeaderLink link="/create-article" title="Создать пост" />
          </li>
        </ul>
      </nav>

      <div class="flex-1 flex gap-4 items-center justify-end">
        <!-- <RouterLink
          class="block h-14 w-14 relative rounded-full border-2 group shadow"
          :to="{ name: 'profile' }"
        > -->
        <!-- <img
            src="https://sun9-49.userapi.com/impg/cs8Vt9RzXqOo6iItPZyAKu3vjohfKVUrPps7EA/rNbH8v0GPdU.jpg?size=400x400&quality=95&sign=f9cc45c4356d0d8024ce457d0a22ff85&type=album"
            class="rounded-full"
            alt=""
          /> -->
        <!-- </RouterLink> -->
        <div class="flex gap-6 items-center">
          <UIDefaultButton @click="loginDialog = true">Войти</UIDefaultButton>
          <UIDefaultButton>Зарегистрироваться</UIDefaultButton>
        </div>
      </div>
    </div>
  </header>
  <Login :dialog="loginDialog" @update-dialog="(e) => (loginDialog = e)" />
</template>

<style scoped lang="scss">
@import "@/assets/scss/_variables.scss";
.logo {
  font-family: $logoFont;
}
</style>
