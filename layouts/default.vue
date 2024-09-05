<template>
  <div>
    <div class="navbar bg-primary">
      <div class="navbar-start"></div>
      <div class="navbar-center lg:flex">
        <ul class="menu menu-horizontal">
          <a class="btn btn-ghost">Call Api</a>
          <a class="btn btn-ghost">Add Items</a>
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
