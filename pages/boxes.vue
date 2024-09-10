<template>
  <div v-if="boxes && state.listBoxes" class="container mx-auto flex flex-col">
    <div class="text-center flex flex-row justify-center pt-8">
      <h1>Boxes</h1>
    </div>
    <div class="text-center flex flex-row justify-center py-8">
      <input
        v-model="searchTerm"
        type="text"
        placeholder="Search for box"
        class="input input-bordered w-full max-w-xs"
        v-on:keyup="filterBoxes"
      />
    </div>
    <div class="flex flex-row items-center">
      <BoxCard
        :box="blankBox"
        :create="true"
        :alpha-id="generateId()"
        class="p-5 h-full w-72"
        @update="updateList"
      ></BoxCard>
      <BoxCard
        v-for="box in state.listBoxes"
        :key="box"
        :box="box"
        :create="false"
        :alpha-id="generateId()"
        class="p-5 w-72"
        @update="updateList"
      >
      </BoxCard>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Box } from '~/types/types';

let { boxes } = useBoxes();
const searchTerm = ref('');
const state = reactive({
  listBoxes: []
});
state.listBoxes = boxes.value;

const blankBox = ref({
  name: '',
  refId: '',
  color: '',
  weight: 0,
  sequence: '',
  dimensions: { x: 0, y: 0, z: 0 },
  centerOfMass: { x: 0, y: 0, z: 0 },
  quantity: 1
});

const filterBoxes = () => {
  state.listBoxes = boxes.value.filter((box) => {
    let tempBox = JSON.parse(JSON.stringify(box));
    if (searchTerm.value !== '') {
      if (
        tempBox?.name.toLowerCase().indexOf(searchTerm.value.toLowerCase()) >=
          0 ||
        tempBox.refId.toLowerCase().indexOf(searchTerm.value.toLowerCase()) >= 0
      ) {
        return box;
      }
    } else {
      return box;
    }
  });
};

const updateList = () => {
  state.listBoxes = boxes.value;
};

function generateId() {
  const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let id = '';
  for (let i = 0; i < 10; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    id += characters[randomIndex];
  }
  return id;
}
</script>

<style></style>
