<script setup>
import { RouterView } from "vue-router";
import TheHeader from "./components/base/TheHeader.vue";
import TheActions from "./components/base/TheAction.vue";
import TheFooter from "./components/base/TheFooter.vue";
</script>

<template>
  <TheHeader />
  <TheActions />
  <RouterView />
  <TheFooter />
</template>
<style lang="scss">
@import "./app.css";
a {
  text-decoration: none;
}
.swiper-pagination-bullet {
  width: 38px !important;
  height: 8px !important;
  border-radius: 5px !important;

  &-active {
    background: #efca00 !important;
  }
}

@font-face {
  font-family: tobacco;
  src: url("/fonts/Dinpro.ttf");
}

* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

.wrap {
  max-width: 1220px;
  padding: 0 20px;
  margin: 0 auto;

  @media (max-width: 1220px) {
    max-width: 1024px;
  }

  @media (max-width: 1024px) {
    max-width: 968px;
    padding: 15px 5px !important;
  }
}

.swiper-slide {
  @media (max-width: 968px) {
    display: flex !important;
    justify-content: center !important;
  }
}

.add-to-cart {
  background: #efca00;
  position: absolute;
  right: 0;
  bottom: 0;
  padding: 14px 28px;
  border-radius: 10px 0px;
  cursor: pointer;
}

.product-card-reviews {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 12px;

  &-count {
    display: flex;
    flex-direction: row;
    align-items: center;

    p {
      margin-left: 5px;
      color: #292929;
      font-family: tobacco;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      letter-spacing: 0.32px;
    }
  }
}

.product-card {
  z-index: -1;
  max-width: 250px;
  position: relative;
  border-radius: 10px;
  background: #fff;
  box-shadow: 5px 5px 25px 0px rgba(0, 0, 0, 0.2);
  user-select: none;
  cursor: pointer;
  @media (max-width: 570px) {
    width: 150px;
  }
  &-img {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 27px;
    @media (max-width: 570px) {
      width: 67px;
      height: 67px;
      margin-left: auto;
      margin-right: auto;
    }
  }

  &-info {
    padding: 0 16px;
  }
  &__void {
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: 0.28px;
    @media (max-width: 570px) {
      font-size: 0.5em;
    }
  }
  &-liked {
    cursor: pointer;
    position: absolute;
    top: 17.5px;
    right: 17.5px;
  }

  &-title {
    color: #292929;
    font-family: tobacco;
    font-size: 1rem;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    margin-bottom: 12px;
    user-select: none;
    @media (max-width: 570px) {
      font-size: 0.5rem;
    }
  }

  &-discount {
    display: flex;
    flex-direction: row;

    &-info {
      color: red;
      font-family: tobacco;
      font-weight: 800;
    }
  }

  &-old-price {
    color: rgba(41, 41, 41, 0.5);
    font-family: tobacco;
    font-size: 1rem;
    font-weight: 400;
    letter-spacing: 0.32px;
    margin-right: 10px;
    @media (max-width: 570px) {
      font-size: 0.5em;
    }
  }

  &-price {
    color: #292929;
    font-family: tobacco;
    font-size: 1.5rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: 0.48px;
    padding-bottom: 20.5px;
    @media (max-width: 570px) {
      font-size: 0.75rem;
    }
  }
}
</style>
