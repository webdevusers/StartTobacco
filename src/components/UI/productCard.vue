<template>
  <div class="product-card">
    <div class="product-card-img">
      <img :src="imageUrl" :alt="title" />
    </div>
    <div class="product-card-info">
      <a class=" " href="#" @click.prevent="goToFlavoring(id)">
        <div class="product-card-title">
          <h3>{{ title }}</h3>
        </div>
        <div class="product-card-reviews">
          <div class="product-card-reviews-stars">
            <img src="/icons/stars.svg" alt="" />
          </div>
        </div>
        <div class="product-card-discount">
          <div class="product-card-old-price">{{ oldPrice }}₴</div>
          <!-- <div class="product-card-discount-info" v-if="discount > 0">
          - {{ discount.toFixed(0) }}%
        </div> -->
        </div>
        <div class="product-card-price">{{ newPrice }}₴</div>
      </a>
    </div>
    <div class="add-to-cart" @click="addToCart()">
      <img src="/icons/cart.svg" alt="" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: {
    id: String,
    title: String,
    imageUrl: String,
    isOnSale: Boolean,
    oldPrice: Number,
    newPrice: Number,
    liked: Boolean,
  },
  data() {
    return {
      discount: 0,
      user: [],
      token: "",
    };
  },
  methods: {
    addToCart() {},
  },
  created() {
    this.calculateDiscount();
  },
  watch: {
    oldPrice: "calculateDiscount",
    newPrice: "calculateDiscount",
  },
  methods: {
    calculateDiscount() {
      if (this.oldPrice > 0 && this.newPrice < this.oldPrice) {
        this.discount = ((this.oldPrice - this.newPrice) / this.oldPrice) * 100;
      } else {
        this.discount = 0;
      }
    },
    goToFlavoring(id) {
      this.$router.push({
        path: `/flavoring/`,
        query: { flavoringId: id },
      });
    },
  },
  created() {
    this.user = JSON.parse(localStorage.getItem(`user`));
    this.token = JSON.parse(localStorage.getItem(`token`));
  },
};
</script>

<style lang="scss">
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
  width: 250px;
  position: relative;
  border-radius: 10px;
  background: #fff;
  /* shadow for cards */
  box-shadow: 5px 5px 25px 0px rgba(0, 0, 0, 0.2);
  user-select: none;
  cursor: pointer;
  @media (max-width: 570px) {
    width: 280px;
  }
  &-info {
    padding: 0 16px;
  }

  &-img {
    padding-top: 40px;
    text-align: center;
    margin-bottom: 20px;
  }

  &-liked {
    cursor: pointer;
    position: absolute;
    top: 17.5px;
    right: 17.5px;
    z-index: 5;
  }

  &-title {
    color: #292929;
    font-family: tobacco;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    margin-bottom: 12px;
    user-select: none;
    height: 2em;
    line-height: 1em;
    overflow: hidden;
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
    font-size: 16px;
    font-weight: 400;
    letter-spacing: 0.32px;
    margin-right: 10px;
    text-decoration: line-through;
  }

  &-price {
    color: #292929;
    font-family: tobacco;
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: 0.48px;
    padding-bottom: 20.5px;
  }
}
</style>
