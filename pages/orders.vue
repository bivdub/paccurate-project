<template>
  <div class="flex flex-row h-full">
    <div class="order-list flex-column w-80 flex-wrap">
      <div v-for="order in orders" :key="order">
        <div class="" @click="selectOrder(order.packUuid)">
          {{ order.built }}
        </div>
      </div>
    </div>
    <div class="divider lg:divider-horizontal"></div>
    <div class="order-details flex-column w-1/2 flex-grow px-5">
      <h1 class="font-extrabold text-4xl text-center py-8">Order Details</h1>
      <div v-if="selectedOrder.packUuid" class="flex flex-row">
        <div v-if="selectedOrder" class="flex-column w-1/2">
          <div class="row pb-5">
            <h2 class="text-2xl font-bold pb-2">Date</h2>
            <div>
              {{ selectedOrder.built }}
            </div>
          </div>
          <div class="row pb-5">
            <h2 class="text-2xl font-bold pb-2">Total Cost</h2>
            <div class="max-w-80">
              {{ selectedOrder.totalCost }}
            </div>
          </div>
          <div class="row pb-5">
            <h2 class="text-2xl font-bold pb-2">Total Weight</h2>
            <div>
              {{ selectedOrder.totalWeight }}
            </div>
          </div>
          <div class="row pb-5">
            <h2 class="text-2xl font-bold pb-2">Date</h2>
            <div>
              {{ selectedOrder.built }}
            </div>
          </div>
        </div>
        <div v-if="selectedOrder" class="flex-column w-2/3">
          <div class="row pb-5">
            <h2 class="text-2xl font-bold pb-2">Pack Id</h2>
            <div class="break-words w-full">
              {{ selectedOrder.packUuid }}
            </div>
          </div>
          <div class="row pb-5">
            <h2 class="text-2xl font-bold pb-2">Boxes Used</h2>
            <div class="break-words w-full">
              {{ selectedOrder.boxes.length }}
            </div>
          </div>
          <div class="row pb-5">
            <h2 class="text-2xl font-bold pb-2">Order Contents</h2>
            <div
              class="break-words w-full"
              v-for="item in itemTotals"
              :key="item"
            >
              {{ item.name }} : {{ item.count }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="divider lg:divider-horizontal"></div>
    <div class="order-visual flex-column min-w-80" v-if="selectedOrder">
      <div class="svg-container w-full px-5">
        <div
          class="flex py-8"
          v-for="(svg, index) in selectedOrder.svgs"
          :key="svg"
        >
          <div>
            <div v-html="svg" class="w-full flex-row"></div>
            <div class="text-2xl flex-row pt-5" v-if="selectedOrder.boxes">
              Box Used: {{ selectedOrder.boxes[index].box.boxType.name }}
            </div>
            <div
              class="text-xl flex-row"
              v-for="item in selectedBoxInfo[index].itemsInfo"
              :key="item"
            >
              {{ item.name }} : {{ item.count }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute();
const { orders } = useOrders();
const keys = orders.value.map((order: any) => order.packUuid);

const selectedOrder: any = ref({});

if (route.query.order) {
  const orderIndex = keys.indexOf(route.query.order);
  selectedOrder.value = orderIndex ? orders.value[orderIndex] : {};
}

const selectedBoxInfo = computed(() => {
  let returnInfo: any[] = [];

  if (selectedOrder.value.packUuid) {
    selectedOrder.value.boxes.forEach((box: any) => {
      let boxInfo: any = {
        name: box.box.boxType.name
      };

      let itemsInfo: any = [];

      box.box.items.forEach((item: any) => {
        const keys = itemsInfo.map((i: any) => i.refId);
        const itemIndex = keys.indexOf(item.item.refId);

        if (itemIndex >= 0) {
          itemsInfo[itemIndex].count++;
        } else {
          itemsInfo.push({
            refId: item.item.refId,
            name: item.item.name,
            count: 1
          });
        }
      });

      boxInfo.itemsInfo = itemsInfo;

      returnInfo.push(boxInfo);
    });
    return returnInfo;
  }
});

const itemTotals: any = computed(() => {
  let totals: any = [];
  if (selectedBoxInfo.value) {
    selectedBoxInfo.value.forEach((box: any) => {
      box.itemsInfo.forEach((item: any) => {
        const keys = totals.map((i: any) => i.refId);
        const itemIndex = keys.indexOf(item.refId);

        if (itemIndex >= 0) {
          totals[itemIndex].count += item.count;
        } else {
          totals.push({
            refId: item.refId,
            name: item.name,
            count: item.count
          });
        }
      });
    });
    return totals;
  }
  return totals;
});

const selectOrder = (orderId: string) => {
  const orderIndex = keys.indexOf(orderId);
  selectedOrder.value = orders.value[orderIndex];
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
  transition-duration: 0.2s;
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
