<template>
  <div>
    <div class="navbar bg-primary">
      <div class="navbar-start"></div>
      <div class="navbar-center lg:flex">
        <ul class="menu menu-horizontal">
          <NuxtLink to="/" class="btn btn-ghost">Create Order</NuxtLink>
          <NuxtLink to="/items" class="btn btn-ghost">Inventory</NuxtLink>
          <NuxtLink to="/boxes" class="btn btn-ghost">Boxes</NuxtLink>
          <NuxtLink to="/orders" class="btn btn-ghost">Orders</NuxtLink>
        </ul>
      </div>
      <div class="navbar-end"></div>
    </div>
    <slot />
  </div>
</template>

<script>
export default {};
</script>

<style></style>
