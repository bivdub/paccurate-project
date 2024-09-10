<template>
  <div class="container mx-auto">
    <div class="flex flex-col items-center">
      <div class="flex flex-row py-5">
        <div class="font-extrabold text-4xl">Create Order</div>
      </div>
      <div class="flex flex-row justify-around w-full">
        <div class="flex flex-col w-1/4 items-start">
          <div class="text-2xl font-extrabold">Order Options</div>
          <label class="form-control w-full">
            <div class="label pb-0">
              <span class="text-md">Box Types</span>
              <span class="label-text-alt"
                >The set of boxes available to pack the order</span
              >
            </div>
            <select
              v-model="order.boxTypeSet"
              class="select w-full select-bordered max-w-xs mt-4"
            >
              <option v-for="boxes in boxTypes" :key="boxes">
                {{ boxes }}
              </option>
            </select>
          </label>

          <div class="form-control w-full">
            <label class="label cursor-pointer">
              <span class="label-text"
                ><strong>Lay Flat</strong> - Whether all items in order should
                be laid flat</span
              >
            </label>
            <input
              type="checkbox"
              class="toggle toggle-primary"
              :checked="order.layFlat"
            />
          </div>

          <div class="form-control w-full">
            <label class="label cursor-pointer">
              <span class="label-text"
                ><strong>Interlock</strong> - alternates orientation by layer
                when laying flat to inprove stability</span
              >
            </label>
            <input
              type="checkbox"
              class="toggle toggle-primary"
              :checked="order.layFlat"
            />
          </div>

          <div class="form-control w-full">
            <label class="label cursor-pointer">
              <span class="label-text"
                ><strong>Corners</strong> - Only pack items at corner points -
                (optimal)</span
              >
            </label>
            <input
              type="checkbox"
              class="toggle toggle-primary"
              :checked="order.corners"
            />
          </div>

          <div class="flex flex-row mt-5">
            <button
              class="btn btn-primary"
              @click="makeCall"
              name="Submit Order"
            >
              Submit Order
            </button>
          </div>
        </div>
        <div class="flex flex-col w-3/4 pl-10">
          <div class="text-2xl font-extrabold">Order Items</div>
          <table class="table table-auto table-zebra">
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Quantity</th>
                <th>ID</th>
                <th>Weight</th>
                <th>Location</th>
                <th>Dimensions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <button
                    :disabled="!newItem.name"
                    @click="addItem"
                    class="btn btn-primary"
                  >
                    Add
                  </button>
                </td>
                <td>
                  <select
                    v-model="newItem"
                    class="select w-full select-bordered max-w-xs"
                    name="addItems"
                  >
                    <option v-for="item in items" :key="item" :value="item">
                      {{ item.name || item.refId }}
                    </option>
                  </select>
                </td>
                <td>
                  <input
                    type="number"
                    v-model="newItem.quantity"
                    class="input input-bordered w-20"
                  />
                </td>
                <td>{{ newItem.refId }}</td>
                <td>{{ newItem.weight }}</td>
                <td>{{ newItem.sequence }}</td>
                <td>
                  <div v-if="newItem.dimensions">
                    {{ newItem?.dimensions.x }} X {{ newItem?.dimensions.y }} X
                    {{ newItem?.dimensions.z }}
                  </div>
                </td>
              </tr>
              <tr v-for="item in orderItems" :key="item.refId">
                <td></td>
                <td>{{ item.name }}</td>
                <td>{{ item.quantity }}</td>
                <td>{{ item.refId }}</td>
                <td>{{ item.weight }}</td>
                <td>{{ item.sequence }}</td>
                <td>
                  <div v-if="item.dimensions">
                    {{ item.dimensions.x }} X {{ item.dimensions.y }} X
                    {{ item.dimensions.z }}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { set } from '~/node_modules/nuxt/dist/app/compat/capi';

const { items } = useItems();
const { boxes } = useBoxes();
const { orders, setOrder } = useOrders();
const order = ref({
  boxTypeSet: 'custom',
  layFlat: false,
  interlock: false,
  corners: true
});
const blankItem = {
  name: '',
  refId: '',
  color: '',
  weight: 0,
  sequence: '',
  dimensions: { x: 0, y: 0, z: 0 },
  centerOfMass: { x: 0, y: 0, z: 0 },
  quantity: 1
};

const newItem = ref(blankItem);

const boxTypes = ['custom', 'fedex', 'usps', 'pallet'];
const orderItems = ref([]);
const orderBoxes = ref([]);

const orderDisabled = computed(() => {
  return orderItems.value.length < 1;
});

const addItem = () => {
  orderItems.value.push(Object.assign({}, newItem.value));
  newItem.value = blankItem;
};

const makeCall = async () => {
  const data = await $fetch('/api/paccurate', {
    method: 'POST',
    body: {
      options: order.value,
      itemSets: orderItems.value,
      boxes: boxes.value
    }
  })
    .then(async (data) => {
      await setOrder(data);

      await navigateTo({
        path: '/orders',
        query: {
          order: data.packUuid
        }
      });
    })
    .catch((err) => {
      alert(err);
    });
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
