<script setup lang="ts">
import PageTitle from "@/components/PageTitle.vue";
import { onMounted, ref } from "vue";
import ArticlesList from "@/components/Articles/List.vue";
import { Article } from "@/composables/useArticle";
import { useArticleStore } from "@/stores/article";
import { BasicShadowMap, SRGBColorSpace, NoToneMapping } from "three";
import { TresCanvas } from "@tresjs/core";
import { OrbitControls } from "@tresjs/cientos";
import Text from "../components/Models/Text.vue";

const articleStore = useArticleStore();
const defaultHelloText = ref("Evollts Blog");

const gl = {
  clearColor: "#18181b",
  shadows: true,
  size: 300,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
};

onMounted(() => {
  Article.getAll();
});
</script>

<template>
  <div>
    <PageTitle>Посты</PageTitle>
    <div style="height: 500px">
      <TresCanvas v-bind="gl">
        <TresPerspectiveCamera :position="[2, 2, 9]" />
        <OrbitControls :enable-zoom="false" />
        <Suspense>
          <Text :text="defaultHelloText" />
        </Suspense>
        <TresDirectionalLight
          :position="[0, 2, 4]"
          :intensity="1.2"
          cast-shadow
        />
      </TresCanvas>
    </div>
    <ArticlesList :articles="articleStore.articles" />
  </div>
</template>

<style scoped lang="scss"></style>
