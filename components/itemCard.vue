<template>
  <div>
    <div
      v-if="!create"
      class="card shadow-xl bg-primary text-center p-5 flex flex-col hover:bg-secondary hover:cursor-pointer"
      :onclick="item.name + '_modal.showModal()'"
    >
      <div>
        <h2 class="text-2xl">{{ item?.name || item.refId }}</h2>
        <p>weight: {{ item.weight }}</p>
        <p>
          dimensions: {{ item.dimensions.x }} x {{ item.dimensions.y }} x
          {{ item.dimensions.z }}
        </p>
      </div>
    </div>
    <div
      v-else
      class="card shadow-xl bg-primary text-center p-5 flex flex-col hover:bg-secondary hover:cursor-pointer"
      :onclick="item.refId + '_modal.showModal()'"
    >
      <div>
        <h2 class="text-2xl">Create New Item</h2>
      </div>
    </div>
    <dialog ref="itemModal" :id="item.name + '_modal'" class="modal mx-auto">
      <div class="modal-box bg-slate-100 w-2/3 max-w-none px-10">
        <h1 class="text-2xl font-bold text-center py-3 pb-8">
          {{ item.name || item.refId }}
        </h1>
        <div class="flex gap-10">
          <div class="flex-1 w-1/2">
            <label class="form-control w-full">
              <div class="font-extrabold text-md">
                <span class="label-text">Item Id</span>
              </div>
              <input
                type="text"
                disabled
                v-model="item.refId"
                placeholder="Will be generated on creation"
                class="input input-bordered w-full"
              />
            </label>
            <label class="form-control w-full">
              <div class="label">
                <span class="font-extrabold text-md">Name</span>
                <span class="label-text-alt">Name of item - Optional</span>
              </div>
              <input
                type="text"
                :disabled="!editMode"
                v-model="instanceItem.name"
                placeholder="Enter Name"
                class="input input-bordered w-full"
              />
            </label>
            <label class="form-control w-full">
              <div class="label">
                <span class="font-extrabold text-md">Color</span>
                <span class="label-text-alt"
                  >CSS color or hexcode for item visualization- Optional</span
                >
              </div>
              <input
                type="text"
                :disabled="!editMode"
                v-model="instanceItem.color"
                placeholder="Color of item"
                class="input input-bordered w-full"
              />
            </label>
            <label class="form-control w-full">
              <div class="label">
                <span class="font-extrabold text-md">Weight</span>
                <span class="label-text-alt"
                  >weight of the item - Required</span
                >
              </div>
              <input
                type="number"
                :disabled="!editMode"
                v-model="instanceItem.weight"
                placeholder="Enter Color"
                class="input input-bordered w-full"
              />
            </label>
          </div>
          <div class="flex-1 w-1/2">
            <label class="form-control w-full">
              <div class="label pb-0">
                <span class="text-md font-extrabold">Location</span>
                <span class="label-text-alt"
                  >The aisle and bin where the item is located<br />
                  e.g. 1120 can be aisle 11, bin 20 - optional</span
                >
              </div>
              <input
                type="text"
                :disabled="!editMode"
                v-model="instanceItem.sequence"
                placeholder="Aisle"
                class="input input-bordered"
              />
            </label>
            <label class="form-control w-full pt-2">
              <div class="label pb-0">
                <span class="text-md font-extrabold pb-0">Item Dimensions</span>
                <span class="label-text-alt">Item Dimensions - required</span>
              </div>
              <div class="flex">
                <label class="form-control w-20 mr-8">
                  <div class="label">
                    <span class="label-text">Length</span>
                  </div>
                  <input
                    type="text"
                    :disabled="!editMode"
                    v-model="instanceItem.dimensions.z"
                    placeholder="Length"
                    class="input input-bordered input-sm"
                  />
                </label>
                <label class="form-control w-20 mr-8">
                  <div class="label">
                    <span class="label-text">Width</span>
                  </div>
                  <input
                    type="text"
                    :disabled="!editMode"
                    v-model="instanceItem.dimensions.y"
                    placeholder="Width"
                    class="input input-bordered input-sm"
                  />
                </label>
                <label class="form-control w-20">
                  <div class="label">
                    <span class="label-text">Height</span>
                  </div>
                  <input
                    type="text"
                    :disabled="!editMode"
                    v-model="instanceItem.dimensions.x"
                    placeholder="Height"
                    class="input input-bordered input-sm"
                  />
                </label>
              </div>
            </label>
            <label class="form-control w-full pt-2">
              <div class="label pb-0">
                <span class="font-extrabold text-md">Center of Mass</span>
                <span class="label-text-alt"
                  >Location of Center of Mass - optional</span
                >
              </div>
              <div class="flex">
                <label class="form-control w-20 mr-8">
                  <div class="label">
                    <span class="label-text">Length</span>
                  </div>
                  <input
                    type="text"
                    :disabled="!editMode"
                    v-model="instanceItem.centerOfMass.z"
                    placeholder="Length"
                    class="input input-bordered input-sm"
                  />
                </label>
                <label class="form-control w-20 mr-8">
                  <div class="label">
                    <span class="label-text">Width</span>
                  </div>
                  <input
                    type="text"
                    :disabled="!editMode"
                    v-model="instanceItem.centerOfMass.y"
                    placeholder="Width"
                    class="input input-bordered input-sm"
                  />
                </label>
                <label class="form-control w-20">
                  <div class="label">
                    <span class="label-text">Height</span>
                  </div>
                  <input
                    type="text"
                    :disabled="!editMode"
                    v-model="instanceItem.centerOfMass.x"
                    placeholder="Height"
                    class="input input-bordered input-sm"
                  />
                </label>
              </div>
            </label>
          </div>
        </div>
        <div class="flex flex-row justify-end pt-5">
          <div
            class="btn btn-primary mx-3"
            v-if="!editMode"
            @click="toggleEditMode"
          >
            Edit Item
          </div>
          <form v-if="!editMode" method="dialog mx-3">
            <button class="btn" @click.prevent="handleModalClose">Close</button>
          </form>
          <form v-if="editMode && !props.create" method="dialog mx-3">
            <button class="btn btn-primary mx-3" @click.prevent="updateItem">
              Save
            </button>
          </form>
          <div
            class="btn btn-warning mx-3"
            v-if="editMode && !props.create"
            @click="toggleEditMode"
          >
            Cancel
          </div>
          <form v-if="props.create" method="dialog mx-3">
            <button class="btn btn-primary mx-3" @click.prevent="updateItem">
              Add
            </button>
          </form>
          <form v-if="props.create" method="dialog">
            <button class="btn mx-3" @click.prevent="handleModalClose">
              Close
            </button>
          </form>
        </div>
      </div>
      <!-- <form method="dialog" class="modal-backdrop">
        <button @click="handleModalClose">close</button>
      </form> -->
    </dialog>
  </div>
</template>

<script lang="ts" setup>
const { items, setItem } = useItems();
const props = defineProps(['item', 'create']);
let editMode = ref(props.create ? true : false);
const instanceItem = ref({});
const emit = defineEmits(['update']);
const itemModal = ref(null);

itemModal.value;

if (props.create) {
  instanceItem.value = {
    name: '',
    refId: '',
    color: '',
    weight: 0,
    sequence: '',
    dimensions: { x: 0, y: 0, z: 0 },
    centerOfMass: { x: 0, y: 0, z: 0 },
    quantity: 1
  };
} else {
  const item = props.item;
  instanceItem.value = Object.assign({}, item);
}

const instanceItemDimension = ref({
  height: instanceItem.value.dimensions.x,
  width: instanceItem.value.dimensions
});

const toggleEditMode = () => {
  editMode.value = !editMode.value;
};

const updateItem = async () => {
  await setItem(Object.assign({}, instanceItem.value));
  emit('update');
  itemModal.value.close();
};

const handleModalClose = () => {
  editMode.value = false;
  itemModal.value.close();
};
</script>

<style></style>
