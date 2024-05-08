<script setup lang="ts"></script>

<template>
  <div class="page-title">
    <h1 class="text-3xl">
      <slot></slot>
    </h1>
  </div>
</template>

<style scoped lang="scss">
.page-title {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
}
</style>
