import { IArticle } from "@/types/IArticle";
import { defineStore } from "pinia";
import { Ref, ref } from "vue";

export const useArticleStore = defineStore('article', () => {
  let articles: Ref<IArticle[]> = ref([])
  let myArticles: Ref<IArticle[]> = ref([])

  return {
    articles,
    myArticles
  }
})
