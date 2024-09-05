<template>
  <div>
    <div>{{ data }}</div>
    <div v-html="svg" class="figure-container"></div>
  </div>
</template>

<script setup>
const data = await $fetch('/api/paccurate', {
  method: 'POST',
  body: { testo: 'hey gurl' }
});

const svg = data.svgs;
</script>

<style lang="scss">
body {
  background-color: beige;
}

.volume-line {
  stroke: #666;
  stroke-dasharray: 2, 1;
  stroke-width: 1;
}

polygon.volume-line {
  fill-opacity: 0.95;
  //   transition-duration: 0.2s;
  stroke-opacity: 0.95;
  stroke: black;
  stroke-width: 1;
  //   fill-opacity: 0.1;
  //   stroke-opacity: 0;
}

.figure-container {
  width: 300px;
}
</style>
