<template>
  <div v-if="items && state.listItems" class="container mx-auto flex flex-col">
    <div class="text-center flex flex-row justify-center pt-8">
      <h1>Inventory</h1>
    </div>
    <div class="text-center flex flex-row justify-center py-8">
      <input
        v-model="searchTerm"
        type="text"
        placeholder="Search for item"
        class="input input-bordered w-full max-w-xs"
        v-on:keyup="filterItems"
      />
    </div>
    <div class="flex flex-row items-center">
      <ItemCard
        :item="blankItem"
        :create="true"
        :alpha-id="generateId()"
        class="p-5 h-full w-64"
        @update="updateList"
      ></ItemCard>
      <ItemCard
        v-for="item in state.listItems"
        :key="item"
        :item="item"
        :create="false"
        :alpha-id="generateId()"
        class="p-5 w-64"
        @update="updateList"
      >
      </ItemCard>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Item } from '~/types/types';

let { items } = useItems();
const searchTerm = ref('');
const state = reactive({
  listItems: []
});
state.listItems = items.value;
const blankItem = ref({
  name: '',
  refId: '',
  color: '',
  weight: 0,
  sequence: '',
  dimensions: { x: 0, y: 0, z: 0 },
  centerOfMass: { x: 0, y: 0, z: 0 },
  quantity: 1
});

const filterItems = () => {
  state.listItems = items.value.filter((item) => {
    let tempItem = JSON.parse(JSON.stringify(item));
    if (searchTerm.value !== '') {
      if (
        tempItem?.name.toLowerCase().indexOf(searchTerm.value.toLowerCase()) >=
          0 ||
        tempItem.refId.toLowerCase().indexOf(searchTerm.value.toLowerCase()) >=
          0
      ) {
        return item;
      }
    } else {
      return item;
    }
  });
};

const updateList = () => {
  state.listItems = items.value;
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
