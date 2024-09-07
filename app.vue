<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
const colorMode = useColorMode();

definePageMeta({
  colorMode: 'lemonade'
});
</script>

<style lang="scss">
body {
  height: 100vh;
  width: 100vw;
  color: black;
}

h1 {
  @apply text-4xl;
}

p {
  @apply text-lg;
}
</style>
