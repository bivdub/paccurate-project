<template>
  <div>
    <div class="navbar bg-primary">
      <div class="navbar-start"></div>
      <div class="navbar-center lg:flex">
        <ul class="menu menu-horizontal">
          <NuxtLink to="/" class="btn btn-ghost">Call Api</NuxtLink>
          <NuxtLink to="/items" class="btn btn-ghost">Add Items</NuxtLink>
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
