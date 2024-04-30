import { IUser } from "@/types/IUser";
import { defineStore } from "pinia";
import { Ref, ref } from "vue";

export const useAuthStore = defineStore('auth', () => {
  let user: Ref<IUser | null> = ref(null)

  return {
    user
  }
})
