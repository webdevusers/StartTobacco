<template>
  <div class="background" @click="hideModal">
    <div class="cart" @click.stop>
      <div class="cart-content">
        <ul class="items-list">
          <li
            v-for="item in itemsCart"
            :key="`${item.products._id} + ${item.containerVolume}`"
          >
            <div class="item-remove" @click="deleteItem(item.products._id)">
              <img src="/icons/delete.svg" alt="" />
            </div>
            <div class="item-img">
              <img :src="item.products.imageUrl" alt="" />
            </div>
            <div class="item-name">
              {{ item.products.title }}
            </div>
            <div class="item-price">{{ item.products.newPrice }}₴</div>
            <div class="item-count">
              <button @click="removeCount(item)" v-if="item.summ > 0">-</button>
              <div class="input">{{ item.summ }}</div>
              <button @click="addCount(item)">+</button>
            </div>
          </li>
        </ul>
      </div>
      <div class="cart-buttons">
        <button
          class="cart-buttons-item gray"
          @click="this.$emit('cart', cart)"
        >
          Продовжити покупки
        </button>
        <div class="cart-buttons-item yellow">
          <div class="cart-buttons-item__price">
            {{ getTheSum }} <span>₴</span>
          </div>
          <button class="cart-buttons-item-btn" @click="goToOrders">
            Оформити замовлення
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      itemIds: [{ id: "1" }, { id: "2" }],
      cart: true,
      itemsCart: [],
      foo: 5,
    };
  },
  methods: {
    hideModal() {
      this.$emit("cart", this.cart);
    },
    goToOrders(item) {
      this.hideModal();
      this.$router.push({
        path: `/user-orders/`,
      });
    },
    getItems() {
      axios.post("local", {}).then((responce) => {
        responce = this.itemsCart;
      });
    },
    removeCount(point) {
      this.itemsCart = [...this.itemsCart].filter((item) =>
        item.products._id === point.products._id &&
        item.containerVolume === point.containerVolume
          ? +item.summ--
          : item
      );
    },
    getSumm(event) {
      // item.summ = event.target.value;
      console.log(event);
      // this.itemsCart = [...this.itemsCart].filter((item) =>
      //   item.products._id === point.products._id &&
      //   item.containerVolume === point.containerVolume
      //     ? +item.summ++
      //     : item
      // );
    },
    addCount(point) {
      this.itemsCart = [...this.itemsCart].filter((item) =>
        item.products._id === point.products._id &&
        item.containerVolume === point.containerVolume
          ? +item.summ++
          : item
      );
    },
    deleteItem(id) {
      this.itemsCart = [...this.itemsCart].filter(
        (item) => item.products._id != id
      );
    },
  },
  computed: {
    getTheSum() {
      let summ = [...this.itemsCart]
        .reduce((acc, val) => (acc += +val.summ * +val.products.newPrice), 0)
        .toString();

      return summ
        .split("")
        .reverse()
        .join("")
        .replace(/(\d{3})/g, "$1 ")
        .split("")
        .reverse()
        .join("");
    },
  },
  watch: {
    itemsCart(newValue) {
      localStorage.setItem(`order`, JSON.stringify(newValue));
    },
  },
  mounted() {
    this.itemsCart = JSON.parse(localStorage.getItem(`order`));
  },
};
</script>
<style lang="scss" scoped>
.background {
  z-index: 20;
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  display: none;
  background: rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: center;
  align-items: center;
}
.cart {
  box-shadow: 5px 5px 25px 0px rgba(0, 0, 0, 0.2);
  padding: 50px 100px;
  background: white;
  border-radius: 5px;
  min-width: 250px;
  text-align: center;
  @media (max-width: 765px) {
    padding: 40px;
  }
  @media (max-width: 570px) {
    padding: 20px;
  }
  &-close {
    cursor: pointer;
    position: absolute;
    right: 32px;
    top: 32px;
  }
  &-buttons {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    padding-top: 40px;

    &-item {
      &.gray {
        border-radius: 5px;
        border: 2px solid #e8e7e7;
        background: #f5f5f5;

        padding: 12px 20px;

        font-family: tobacco;
        font-size: 16px;
        @media (max-width: 765px) {
          font-size: 14px;
          padding: 5px 10px;
        }
      }

      &.yellow {
        border-radius: 10px;
        border: 1px solid #efca00;
        background: rgba(239, 202, 0, 0.2);
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 14px 12px;
        @media (max-width: 765px) {
          padding: 5px;
          flex-direction: column;
          justify-content: center;
        }
      }

      &__price {
        color: #000;
        margin-right: 20px;
        font-family: tobacco;
        font-size: 30px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
        @media (max-width: 765px) {
          font-size: 20px;
        }
        @media (max-width: 570px) {
          font-size: 16px;
          margin-right: 0;
        }
        span {
          font-size: 16px;
          @media (max-width: 765px) {
            font-size: 14px;
          }
        }
      }

      &-btn {
        border-radius: 7px;
        background: #efca00;
        padding: 10px 20px;
        font-family: tobacco;
        @media (max-width: 765px) {
          padding: 5px 10px;
        }
        @media (max-width: 570px) {
          font-size: 12px;
        }
      }
    }
  }
}

.items-list {
  li {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
}

.item {
  &-count {
    padding-left: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;

    font-family: tobacco;
    @media (max-width: 570px) {
      padding-left: 5px;
    }
    p {
      font-size: 24px;
      padding: 7.5px;
      user-select: none;
      cursor: pointer;
      @media (max-width: 765px) {
        font-size: 18px;
      }
      @media (max-width: 570px) {
        font-size: 16px;
      }
    }

    .input {
      width: 50px;
      // height: 25px;
      font-size: 18px;
      font-family: tobacco;
      border-radius: 3px;
      border: 1px solid rgba(0, 0, 0, 0.5);
      background: rgba(216, 216, 216, 0.4);
      text-align: center;
      padding: 1px 5px;
      margin-left: 5px;
      margin-right: 5px;
      @media (max-width: 765px) {
        font-size: 16px;
      }
      @media (max-width: 570px) {
        font-size: 14px;
        // margin-left: 0;
        // margin-right: 0;
        // padding: 0;
        width: 100%;
      }
    }
  }

  &-price {
    font-size: 20px;
    font-weight: 800;
    font-family: tobacco;
    @media (max-width: 765px) {
      font-size: 16px;
    }
    @media (max-width: 570px) {
      font-size: 14px;
    }
  }

  &-name {
    font-family: tobacco;
    font-size: 20px;
    max-width: 300px;
    margin-right: 20px;
    @media (max-width: 765px) {
      font-size: 16px;
    }
    @media (max-width: 570px) {
      font-size: 14px;
      margin-right: 10px;
    }
  }
}
</style>
