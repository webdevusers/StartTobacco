<template>
  <div class="background" @click="hideModal">
    <div class="cart" @click.stop>
      <div class="cart-content">
        <ul class="items-list" v-if="this.itemsCart.length > 0">
          <li v-for="item in itemsCart" :key="`${item.products._id} + ${item.containerVolume}`">
            <div class="item-remove" @click="deleteItem(item.products._id)">
              <img class="item-remove" src="/icons/delete.svg" alt="" />
            </div>
            <div class="item-img">
              <img class="item-img" :src="item.products.imageUrl" alt="" />
            </div>
            <div class="item-name">
              {{ item.products.title }}
            </div>
            <div class="item-price">{{ item.newPrice }}₴</div>
            <div class="item-count">
              <button @click="removeCount(item)" v-if="item.summ > 0">-</button>
              <div class="input">{{ item.summ }}</div>
              <button @click="addCount(item)">+</button>
            </div>
          </li>
        </ul>
        <div class="items-undefind" v-else>
          <div class="items-block-svg">
            <svg viewBox="0 0 32 32" enable-background="new 0 0 32 32" version="1.1" xml:space="preserve"
              xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000">
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
              <g id="SVGRepo_iconCarrier">
                <g id="Files_Folder40"></g>
                <g id="Files_Folder39"></g>
                <g id="Files_Folder38"></g>
                <g id="Files_Folder37"></g>
                <g id="Files_Folder36"></g>
                <g id="Files_Folder35"></g>
                <g id="Files_Folder34">
                  <g>
                    <path
                      d="M27,9v5c0,0.55-0.45,1-1,1H6.74L2.96,27.29C2.83,27.72,2.43,28,2,28c-0.05,0-0.1,0-0.15-0.01 C1.36,27.92,1,27.5,1,27V5c0-0.55,0.45-1,1-1h7c0.31,0,0.61,0.15,0.8,0.4L12.5,8H26C26.55,8,27,8.45,27,9z"
                      fill="#FE9803"></path>
                  </g>
                  <line fill="none" stroke="#231F20" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"
                    stroke-width="2" x1="26" x2="2" y1="27" y2="27"></line>
                  <g>
                    <path
                      d="M30.96,14.29l-4,13C26.83,27.71,26.44,28,26,28H2c-0.32,0-0.62-0.15-0.8-0.41 c-0.19-0.25-0.25-0.58-0.16-0.88l4-13C5.17,13.29,5.56,13,6,13h24c0.32,0,0.62,0.15,0.8,0.41C30.99,13.66,31.05,13.99,30.96,14.29 z"
                      fill="#FFC10A"></path>
                  </g>
                </g>
                <g id="Files_Folder33"></g>
                <g id="Files_Folder32"></g>
                <g id="Files_Folder31"></g>
                <g id="Files_Folder30"></g>
                <g id="Files_Folder29"></g>
                <g id="Files_Folder28"></g>
                <g id="Files_Folder27"></g>
                <g id="Files_Folder26"></g>
                <g id="Files_Folder25"></g>
                <g id="Files_Folder24"></g>
                <g id="Files_Folder23"></g>
                <g id="Files_Folder22"></g>
                <g id="Files_Folder21"></g>
                <g id="Files_Folder20"></g>
                <g id="Files_Folder19"></g>
                <g id="Files_Folder18"></g>
                <g id="Files_Folder17"></g>
                <g id="Files_Folder16"></g>
                <g id="Files_Folder15"></g>
                <g id="Files_Folder14"></g>
                <g id="Files_Folder13"></g>
                <g id="Files_Folder12"></g>
                <g id="Files_Folder11"></g>
                <g id="Files_Folder10"></g>
                <g id="Files_Folder09"></g>
                <g id="Files_Folder08"></g>
                <g id="Files_Folder07"></g>
                <g id="Files_Folder06"></g>
                <g id="Files_Folder05"></g>
                <g id="Files_Folder04"></g>
                <g id="Files_Folder03"></g>
                <g id="Files_Folder02"></g>
                <g id="Files_Folder01"></g>
              </g>
            </svg>
          </div>
          <div class="items-text">
            {{ $t('nullCart')}}
          </div>
        </div>
      </div>
      <div class="cart-buttons">
        <button class="cart-buttons-item gray" @click="this.$emit('cart', cart)">
          {{ $t('nextBuy') }}
        </button>
        <div class="cart-buttons-item yellow" v-if="this.itemsCart.length > 0">
          <div class="cart-buttons-item__price">
            {{ getTheSum }} <span>₴</span>
          </div>
          <button class="cart-buttons-item-btn" @click="goToOrders">
            {{ $t('confirmOrder') }}
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
        .reduce((acc, val) => (acc += +val.summ * +val.newPrice), 0)
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
.items-block-svg {
  width: 100px;
  margin: 0 auto;
  margin-bottom: 20px;
}
.items-text {
  margin-bottom: 20px;
}
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

  &-remove {
    height: 32px;
    width: 32px;
    object-fit: contain;

    @media (max-width: 765px) {
      height: 20px;
      width: 20px;
    }

    @media (max-width: 570px) {
      height: 15px;
      width: 15px;
    }
  }

  &-img {
    height: 150px;
    width: 150px;
    object-fit: contain;

    @media (max-width: 765px) {
      height: 100px;
      width: 100px;
    }

    @media (max-width: 570px) {
      height: 65px;
      width: 65px;
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
}</style>
