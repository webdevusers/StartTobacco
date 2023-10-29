<template>
  <!-- <div class="loader"> -->
  <div class="loader"></div>
  <h3>Load</h3>
</template>

<script>
export default {
  name: "base-loader",
};
</script>

<style scoped>
.loader {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: transparent;
  border-radius: 50%;
}

.loader {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: transparent;
  width: 36px;
  height: 36px;
}

.loader {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: transparent;
  width: 36px;
  height: 36px;
  animation: spin89345 1s linear infinite;
}

@keyframes spin89345 {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
