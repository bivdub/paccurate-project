<template>
  <div>
    <div class="btn" @click="makeCall">Make Call</div>
    <div v-if="svg">
      <div v-html="svg" class="figure-container"></div>
    </div>
    <div>{{ items }}</div>
  </div>
</template>

<script setup>
const { items } = useItems();
const svg = ref('');

const makeCall = async () => {
  console.log(items.value[0]);
  const data = await $fetch('/api/paccurate', {
    method: 'POST',
    body: {
      itemSets: [
        // JSON.parse(JSON.stringify(items.value[0]))
        JSON.parse(JSON.stringify(items.value[1]))
      ],
      boxTypes: [
        { weightMax: 150, name: '5x6x8', dimensions: { x: 5, y: 6, z: 8 } }
      ],
      includeScripts: false
    }
  });
  console.log(data);
  svg.value = data.svgs;
};
</script>

<style lang="scss">
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
