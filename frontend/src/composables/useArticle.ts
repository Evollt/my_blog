import axios from "@/axios";
import { useArticleStore } from "@/stores/article";
import { IArticle } from "@/types/IArticle";
import { toast } from "vue3-toastify";

export class Article {
  static articleStore = () => useArticleStore();

  static async getAll() {
    return await axios.get("/api/post/get/all").then((response) => {
      this.articleStore().articles = response.data.data;
    });
  }

  static async get(id: number) {
    return await axios.get(`/api/post/get/${id}`);
  }

  static async create(article: IArticle) {
    await axios
      .post(
        `api/post/create`,
        {
          title: article.title,
          description: article.description,
          category_id: article.category.id,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("auth_token"),
          },
        },
      )
      .then(() => {
        toast.success("Пост успешно создан");

        this.getAll();
        this.my();
      })
      .catch((response) => {
        // @ts-ignore
        for (const [key, value] of Object.entries(
          response.response.data.errors,
        )) {
          // @ts-ignore
          toast.error(value[0]);
        }
      });
  }

  static async edit(article: IArticle) {
    await axios
      .post(
        `api/post/update/${article.id}`,
        {
          _method: "put",
          title: article.title,
          description: article.description,
          category_id: article.category.id,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("auth_token"),
          },
        },
      )
      .then(() => {
        toast.success("Пост успешно отредактирован");

        this.getAll();
        this.my();
      })
      .catch((response) => {
        // @ts-ignore
        for (const [key, value] of Object.entries(
          response.response.data.errors,
        )) {
          // @ts-ignore
          toast.error(value[0]);
        }
      });
  }

  static async my() {
    await axios
      .get("api/post/my", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("auth_token"),
        },
      })
      .then((resposne) => {
        this.articleStore().myArticles = resposne.data.data;
      });
  }

  static async delete(id: number) {
    await axios
      .delete(`api/post/delete/${id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("auth_token"),
        },
      })
      .then(() => {
        toast.info("Пост удален");

        this.getAll();
        this.my();
      });
  }
}
