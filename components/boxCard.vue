<template>
  <div>
    <div
      v-if="!create"
      class="card shadow-xl bg-primary text-center p-5 flex flex-col hover:bg-secondary hover:cursor-pointer"
      :onclick="props.alphaId + '_modal.showModal()'"
    >
      <div>
        <h2 class="text-2xl">{{ box?.name || box.refId }}</h2>
        <p>max weight: {{ box.weightMax }}</p>
        <p>
          dimensions: {{ box.dimensions.x }} x {{ box.dimensions.y }} x
          {{ box.dimensions.z }}
        </p>
      </div>
    </div>
    <div
      v-else
      class="card shadow-xl bg-primary text-center p-5 flex flex-col hover:bg-secondary hover:cursor-pointer"
      :onclick="props.alphaId + '_modal.showModal()'"
    >
      <div>
        <h2 class="text-2xl">Create New Box</h2>
      </div>
    </div>
    <dialog ref="boxModal" :id="props.alphaId + '_modal'" class="modal mx-auto">
      <div class="modal-box bg-slate-100 w-2/3 max-w-none px-10">
        <h1 class="text-2xl font-bold text-center py-3 pb-8">
          {{ box.name || box.refId }}
        </h1>
        <div class="flex gap-10">
          <div class="flex-1 w-1/2">
            <label class="form-control w-full">
              <div class="font-extrabold text-md">
                <span class="label-text">Box Id</span>
              </div>
              <input
                type="text"
                disabled
                v-model="box.refId"
                placeholder="Will be generated on creation"
                class="input input-bordered w-full"
              />
            </label>
            <label class="form-control w-full">
              <div class="label">
                <span class="font-extrabold text-md">Name</span>
                <span class="label-text-alt">Name of box - Optional</span>
              </div>
              <input
                type="text"
                :disabled="!editMode"
                v-model="instanceBox.name"
                placeholder="Enter Name"
                class="input input-bordered w-full"
              />
            </label>
            <label class="form-control w-full">
              <div class="label">
                <span class="font-extrabold text-md">Price</span>
                <span class="label-text-alt">cost of the box - optional</span>
              </div>
              <input
                type="number"
                :disabled="!editMode"
                v-model="instanceBox.price"
                placeholder="Color of box"
                class="input input-bordered w-full"
              />
            </label>
            <label class="form-control w-full">
              <div class="label">
                <span class="font-extrabold text-md">Weight Tare</span>
                <span class="label-text-alt"
                  >weight of the box while empty - optional</span
                >
              </div>
              <input
                type="number"
                :disabled="!editMode"
                v-model="instanceBox.weightTare"
                placeholder="Enter Color"
                class="input input-bordered w-full"
              />
            </label>
          </div>
          <div class="flex-1 w-1/2">
            <label class="form-control w-full">
              <div class="label pb-0">
                <span class="text-md font-extrabold">Weight Max</span>
                <span class="label-text-alt"
                  >Maximum weight allowed in container - required</span
                >
              </div>
              <input
                type="number"
                :disabled="!editMode"
                v-model="instanceBox.weightMax"
                placeholder="Aisle"
                class="input input-bordered"
              />
            </label>
            <label class="form-control w-full pt-2">
              <div class="label pb-0">
                <span class="text-md font-extrabold pb-0">Box Dimensions</span>
                <span class="label-text-alt">Box Dimensions - required</span>
              </div>
              <div class="flex">
                <label class="form-control w-20 mr-8">
                  <div class="label">
                    <span class="label-text">Length</span>
                  </div>
                  <input
                    type="number"
                    :disabled="!editMode"
                    v-model="instanceBox.dimensions.z"
                    placeholder="Length"
                    class="input input-bordered input-sm"
                  />
                </label>
                <label class="form-control w-20 mr-8">
                  <div class="label">
                    <span class="label-text">Width</span>
                  </div>
                  <input
                    type="number"
                    :disabled="!editMode"
                    v-model="instanceBox.dimensions.y"
                    placeholder="Width"
                    class="input input-bordered input-sm"
                  />
                </label>
                <label class="form-control w-20">
                  <div class="label">
                    <span class="label-text">Height</span>
                  </div>
                  <input
                    type="number"
                    :disabled="!editMode"
                    v-model="instanceBox.dimensions.x"
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
                    type="number"
                    :disabled="!editMode"
                    v-model="instanceBox.centerOfMass.z"
                    placeholder="Length"
                    class="input input-bordered input-sm"
                  />
                </label>
                <label class="form-control w-20 mr-8">
                  <div class="label">
                    <span class="label-text">Width</span>
                  </div>
                  <input
                    type="number"
                    :disabled="!editMode"
                    v-model="instanceBox.centerOfMass.y"
                    placeholder="Width"
                    class="input input-bordered input-sm"
                  />
                </label>
                <label class="form-control w-20">
                  <div class="label">
                    <span class="label-text">Height</span>
                  </div>
                  <input
                    type="number"
                    :disabled="!editMode"
                    v-model="instanceBox.centerOfMass.x"
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
            Edit Box
          </div>
          <form v-if="!editMode" method="dialog mx-3">
            <button class="btn" @click.prevent="handleModalClose">Close</button>
          </form>
          <form v-if="editMode && !props.create" method="dialog mx-3">
            <button class="btn btn-primary mx-3" @click.prevent="updateBox">
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
            <button class="btn btn-primary mx-3" @click.prevent="updateBox">
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
    </dialog>
  </div>
</template>

<script lang="ts" setup>
const { boxes, setBox } = useBoxes();
const props = defineProps(['box', 'create', 'alphaId']);
let editMode = ref(props.create);
const instanceBox = ref({});
const emit = defineEmits(['update']);
const boxModal = ref(null);

boxModal.value;

if (props.create) {
  instanceBox.value = {
    name: '',
    refId: '',
    price: 0,
    weightTare: 0,
    weightMax: 0,
    dimensions: { x: 0, y: 0, z: 0 },
    centerOfMass: { x: 0, y: 0, z: 0 },
    reservedSpace: 0.2,
    itemSetsPerBoxMax: 0,
    itemsPerBoxMax: 0
  };
} else {
  const box = props.box;
  instanceBox.value = Object.assign({}, box);
}

const toggleEditMode = () => {
  editMode.value = !editMode.value;
};

const updateBox = async () => {
  const b = Object.assign({}, instanceBox.value);
  setBox(b);
  emit('update');
  boxModal.value.close();
};

const handleModalClose = () => {
  if (!props.create) {
    editMode.value = false;
  }
  boxModal.value.close();
};
</script>

<style></style>
