<script setup lang="ts">
import { useTexture } from "@tresjs/core";
import { Text3D } from "@tresjs/cientos";
const matcapTexture = await useTexture([
  "https://raw.githubusercontent.com/Tresjs/assets/main/textures/matcaps/2.png",
]);

defineProps<{
  text: string;
}>();
</script>

<template>
  <Text3D
    :text="text"
    font="https://raw.githubusercontent.com/Tresjs/assets/main/fonts/FiraCodeRegular.json"
    center
    :size="1"
    need-updates
    :position="[0, 0, 0]"
  >
    <TresMeshMatcapMaterial :matcap="matcapTexture" />
  </Text3D>
</template>
