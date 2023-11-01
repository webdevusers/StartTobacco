<template>
  <div class="container">
    <div class="personal-information">
      <div class="personal-information__left">
        <div class="user">
          <div class="user__foto">
            <img
              class="user__foto-img"
              src="../../public/images/non-img-user.png"
              alt=""
            />
          </div>

          <div class="user__inform">
            <div class="user__name">{{ user.name }} {{ user.surname }}</div>
            <div class="user__email">{{ user.email }}</div>
          </div>
        </div>
        <div class="menu-for-user">
          <a
            v-for="item in navigation"
            :key="item.name"
            :href="item.href"
            @click.prevent="getPushingBtn(item)"
            :class="[
              'menu-for-user__list',
              item.current
                ? 'menu-for-user__list--true'
                : 'menu-for-user__list--false',
            ]"
            :value="item.name"
            :aria-current="item.current ? 'page' : undefined"
          >
            <div class="menu-for-user__circl">
              <img class="menu-for-user__img" :src="item.img" alt="" />
            </div>
            <div class="menu-for-user__text">{{ item.name }}</div>
          </a>
        </div>
      </div>

      <div class="personal-information__right">
        <div v-if="getItem[0].href == 'my-orders'">
          <div class="personal-information__first-title">Мої замовлення</div>
          <div class="personal-information__first">
            <template v-for="item in myOrder">
              <div class="card">
                <button class="like" @click="likedProduct(item)">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="27"
                    height="23"
                    viewBox="0 0 27 23"
                    fill="none"
                  >
                    <path
                      class="st0"
                      d="M7.6,1.9C5.7,2.2,4,3.2,2.9,4.9C2.4,5.7,2,6.8,1.9,7.7c-0.1,0.6,0,1.9,0.1,2.4c0.3,1.3,1.1,2.8,2.2,4.2
	c1.9,2.4,5.2,5,8.8,7.2c0.5,0.3,0.6,0.3,0.8,0.3c0.2,0,0.3,0,0.8-0.3c1.3-0.8,3.1-2,4.3-2.9c4.1-3.2,6.5-6.3,6.9-9.1
	c0.1-0.6,0-1.9-0.1-2.4c-0.3-1.4-0.9-2.5-1.9-3.4c-0.8-0.8-1.6-1.2-2.6-1.5c-0.6-0.2-1.1-0.3-1.8-0.3c-0.4,0-0.8,0-1,0.1
	c-0.8,0.1-1.8,0.5-2.5,1c-0.5,0.3-1.3,1.1-1.6,1.6c-0.1,0.2-0.3,0.4-0.3,0.4c0,0-0.1-0.2-0.3-0.4c-0.3-0.5-1.2-1.3-1.7-1.6
	c-0.7-0.5-1.6-0.8-2.4-1C9.1,1.9,8,1.8,7.6,1.9z"
                      :fill="isLike(item._id) ? '#EFCA00' : 'none'"
                      :stroke="isLike(item._id) ? 'none' : '#292929'"
                    />
                  </svg>
                </button>
                <product-card
                  :id="item.products._id"
                  :title="item.products.title"
                  :liked="item.products.liked"
                  :image-url="item.products.imageUrl"
                  :old-price="item.products.oldPrice"
                  :newPrice="item.products.newPrice"
                />
              </div>
            </template>
          </div>
          <div class="personal-information__second-title">
            Історія замовлень
          </div>
          <div class="personal-information__first">
            <template v-for="item in orderedProducts">
              <div class="card">
                <button class="like" @click="likedProduct(item)">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="27"
                    height="23"
                    viewBox="0 0 27 23"
                    fill="none"
                  >
                    <path
                      class="st0"
                      d="M7.6,1.9C5.7,2.2,4,3.2,2.9,4.9C2.4,5.7,2,6.8,1.9,7.7c-0.1,0.6,0,1.9,0.1,2.4c0.3,1.3,1.1,2.8,2.2,4.2
	c1.9,2.4,5.2,5,8.8,7.2c0.5,0.3,0.6,0.3,0.8,0.3c0.2,0,0.3,0,0.8-0.3c1.3-0.8,3.1-2,4.3-2.9c4.1-3.2,6.5-6.3,6.9-9.1
	c0.1-0.6,0-1.9-0.1-2.4c-0.3-1.4-0.9-2.5-1.9-3.4c-0.8-0.8-1.6-1.2-2.6-1.5c-0.6-0.2-1.1-0.3-1.8-0.3c-0.4,0-0.8,0-1,0.1
	c-0.8,0.1-1.8,0.5-2.5,1c-0.5,0.3-1.3,1.1-1.6,1.6c-0.1,0.2-0.3,0.4-0.3,0.4c0,0-0.1-0.2-0.3-0.4c-0.3-0.5-1.2-1.3-1.7-1.6
	c-0.7-0.5-1.6-0.8-2.4-1C9.1,1.9,8,1.8,7.6,1.9z"
                      :fill="isLike(item._id) ? '#EFCA00' : 'none'"
                      :stroke="isLike(item._id) ? 'none' : '#292929'"
                    />
                  </svg>
                </button>
                <product-card
                  :id="item._id"
                  :title="item.title"
                  :liked="item.liked"
                  :image-url="item.imageUrl"
                  :old-price="item.oldPrice"
                  :newPrice="item.newPrice"
                />
              </div>
            </template>
          </div>
        </div>
        <div class="" v-else-if="getItem[0].href == 'chosen'">
          <div class="personal-information__first-title">Обране</div>
          <div class="personal-information__first">
            <template v-for="item in likeProducts">
              <div class="card">
                <button class="like" @click="likedProduct(item)">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="27"
                    height="23"
                    viewBox="0 0 27 23"
                    fill="none"
                  >
                    <path
                      class="st0"
                      d="M7.6,1.9C5.7,2.2,4,3.2,2.9,4.9C2.4,5.7,2,6.8,1.9,7.7c-0.1,0.6,0,1.9,0.1,2.4c0.3,1.3,1.1,2.8,2.2,4.2
	c1.9,2.4,5.2,5,8.8,7.2c0.5,0.3,0.6,0.3,0.8,0.3c0.2,0,0.3,0,0.8-0.3c1.3-0.8,3.1-2,4.3-2.9c4.1-3.2,6.5-6.3,6.9-9.1
	c0.1-0.6,0-1.9-0.1-2.4c-0.3-1.4-0.9-2.5-1.9-3.4c-0.8-0.8-1.6-1.2-2.6-1.5c-0.6-0.2-1.1-0.3-1.8-0.3c-0.4,0-0.8,0-1,0.1
	c-0.8,0.1-1.8,0.5-2.5,1c-0.5,0.3-1.3,1.1-1.6,1.6c-0.1,0.2-0.3,0.4-0.3,0.4c0,0-0.1-0.2-0.3-0.4c-0.3-0.5-1.2-1.3-1.7-1.6
	c-0.7-0.5-1.6-0.8-2.4-1C9.1,1.9,8,1.8,7.6,1.9z"
                      :fill="isLike(item._id) ? '#EFCA00' : 'none'"
                      :stroke="isLike(item._id) ? 'none' : '#292929'"
                    />
                  </svg>
                </button>
                <!-- <a class=" " href="#" @click.prevent="goToFlavoring(item)"> -->
                <product-card
                  :id="item._id"
                  :title="item.title"
                  :liked="item.liked"
                  :image-url="item.imageUrl"
                  :old-price="item.oldPrice"
                  :newPrice="item.newPrice"
                />
                <!-- </a> -->
              </div>
            </template>
          </div>
        </div>
        <div class="" v-else>
          <div class="personal-information__first-title">
            Переглянуті товари
          </div>
          <div class="personal-information__first">
            <template v-for="item in views">
              <div class="card">
                <button class="like" @click="likedProduct(item)">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="27"
                    height="23"
                    viewBox="0 0 27 23"
                    fill="none"
                  >
                    <path
                      class="st0"
                      d="M7.6,1.9C5.7,2.2,4,3.2,2.9,4.9C2.4,5.7,2,6.8,1.9,7.7c-0.1,0.6,0,1.9,0.1,2.4c0.3,1.3,1.1,2.8,2.2,4.2
	c1.9,2.4,5.2,5,8.8,7.2c0.5,0.3,0.6,0.3,0.8,0.3c0.2,0,0.3,0,0.8-0.3c1.3-0.8,3.1-2,4.3-2.9c4.1-3.2,6.5-6.3,6.9-9.1
	c0.1-0.6,0-1.9-0.1-2.4c-0.3-1.4-0.9-2.5-1.9-3.4c-0.8-0.8-1.6-1.2-2.6-1.5c-0.6-0.2-1.1-0.3-1.8-0.3c-0.4,0-0.8,0-1,0.1
	c-0.8,0.1-1.8,0.5-2.5,1c-0.5,0.3-1.3,1.1-1.6,1.6c-0.1,0.2-0.3,0.4-0.3,0.4c0,0-0.1-0.2-0.3-0.4c-0.3-0.5-1.2-1.3-1.7-1.6
	c-0.7-0.5-1.6-0.8-2.4-1C9.1,1.9,8,1.8,7.6,1.9z"
                      :fill="isLike(item._id) ? '#EFCA00' : 'none'"
                      :stroke="isLike(item._id) ? 'none' : '#292929'"
                    />
                  </svg>
                </button>
                <product-card
                  :id="item._id"
                  :title="item.title"
                  :liked="item.liked"
                  :image-url="item.imageUrl"
                  :old-price="item.oldPrice"
                  :newPrice="item.newPrice"
                />
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import productCard from "@/components/UI/productCard.vue";
let navigation = [
  {
    name: "Мої замовлення",
    href: "my-orders",
    current: true,
    img: "../../public/images/orders.png",
  },
  {
    name: "Обране",
    href: "chosen",
    current: false,
    img: "../../public/images/like.png",
  },
  {
    name: "Переглянуті товари",
    href: "reviewed-products",
    current: false,
    img: "../../public/images/eye.png",
  },
];
export default {
  data() {
    return {
      navigation,
      user: [],
      token: "",
      views: [],
      myOrder: [],
      orderedProducts: [],
      likeProducts: [],
    };
  },
  components: {
    productCard,
  },
  methods: {
    getPushingBtn(item) {
      this.navigation.map((point) =>
        point.name == item.name
          ? (point.current = true)
          : (point.current = false)
      );
      let query = [...this.navigation].filter((point) => point.current);
      return this.$router.push({
        path: `/personal-information/`,
        query: { navigation: query[0].href },
      });
    },
    goToFlavoring(item) {
      this.$router.push({
        path: `/flavoring/`,
        query: { flavoringId: item.id },
      });
    },
    addToCart() {},
    getTheSum(item) {
      return item
        .toString()
        .split("")
        .reverse()
        .join("")
        .replace(/(\d{3})/g, "$1 ")
        .split("")
        .reverse()
        .join("");
    },
    isLike(id) {
      return this.user?.liked.filter((item) => item.productID == id).length > 0
        ? true
        : false;
    },
    likedProduct(item) {
      if (!this.user) {
        return;
      }
      if (this.isLike(item._id)) {
        this.fetchUserDislike(item._id);
      } else {
        this.fetchUserLike(item._id);
      }
    },
    async fetchUserLike(id) {
      try {
        // this.isLoader = true;
        let urlStr = `https://damp-sands-00500-b961cd19fbea.herokuapp.com/user/like`;
        const response = await axios.post(urlStr, {
          productID: id,
          userID: this.user._id,
        });
        // console.log(response.data.edited);
        this.fetchAuthorizationGet(this.token);
      } catch (err) {
        console.log(err);
      } finally {
        // this.isLoader = false;
      }
    },
    async fetchUserDislike(id) {
      try {
        // this.isLoader = true;
        let urlStr = `https://damp-sands-00500-b961cd19fbea.herokuapp.com/user/dislike`;
        const response = await axios.post(urlStr, {
          productID: id,
          userID: this.user._id,
        });
        // console.log(response.data.edited);
        this.fetchAuthorizationGet(this.token);
      } catch (err) {
        console.log(err);
      } finally {
        // this.isLoader = false;
      }
    },
    async fetchAuthorizationGet(token) {
      try {
        // this.isLoader = true;
        let urlStr = `https://damp-sands-00500-b961cd19fbea.herokuapp.com/user/get/`;
        const response = await axios.post(urlStr, {
          token: token,
        });
        this.user = response.data.user;

        localStorage.setItem(`user`, JSON.stringify(this.user));
      } catch (err) {
        console.log(err);
      } finally {
        // this.isLoader = false;
      }
    },
    async fetchGetLiked() {
      try {
        let urlStr = `https://damp-sands-00500-b961cd19fbea.herokuapp.com/user/getliked`;
        const response = await axios.post(urlStr, {
          token: this.token,
        });
        this.likeProducts = response.data.likedProducts;
      } catch (err) {
        console.log(err);
      } finally {
      }
    },
    async fetchGetViews() {
      try {
        let urlStr = `https://damp-sands-00500-b961cd19fbea.herokuapp.com/user/getviews`;
        const response = await axios.post(urlStr, {
          token: this.token,
        });
        this.views = response.data.views;
        // console.log(this.views);
      } catch (err) {
        console.log(err);
      } finally {
      }
    },
    async fetchGetCart() {
      try {
        let urlStr = `https://damp-sands-00500-b961cd19fbea.herokuapp.com/user/getcart`;
        const response = await axios.post(urlStr, {
          token: this.token,
        });
        this.orderedProducts = response.data.orderedProducts;
        // console.log(this.orderedProducts);
      } catch (err) {
        console.log(err);
      } finally {
      }
    },
  },
  computed: {
    getItem() {
      return this.navigation.filter((item) => item.current);
    },
  },
  async created() {
    this.myOrder = JSON.parse(localStorage.getItem(`order`));
    this.user = JSON.parse(localStorage.getItem(`user`));
    this.token = JSON.parse(localStorage.getItem(`token`));
    this.fetchGetLiked();
    this.fetchGetCart();
    this.fetchGetViews();
  },
  mounted() {
    let routerReview = this.$route.query.navigation;
    this.navigation.map((point) =>
      point.href == routerReview
        ? (point.current = true)
        : (point.current = false)
    );
  },
};
</script>

<style lang="scss" scoped>
.card {
  display: flex;
  position: relative;
  max-width: 250px;
  @media (max-width: 570px) {
    width: 150px;
  }
}
.like {
  cursor: pointer;
  position: absolute;
  top: 17.5px;
  right: 17.5px;
  z-index: 5;
}
.container {
  font-family: "tobacco";
  max-width: 1220px;
  margin: 66px auto 90px;
  padding: 0 10px;
}
.personal-information {
  display: grid;
  grid-template-columns: 23% 1fr;
  @media (max-width: 1040px) {
    grid-template-columns: 45% 1fr;
  }
  &__left {
  }
  &__right {
    position: relative;
    padding-left: 1.5em;
    margin-left: 3px;
    &::after {
      content: "";
      position: absolute;
      width: 1px;
      height: 25rem;
      background: rgba(0, 0, 0, 0.5);
      // margin: 0 auto;
      left: 0;
      top: 0;
      //   right: 0;
      //   bottom: 0;
    }
  }
  &__first {
    display: flex;
    gap: 65px;
    flex-wrap: wrap;
  }
  &__first-title {
    font-size: 28px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    margin-top: 60px;
    margin-bottom: 30px;
  }
  &__second-title {
    font-size: 24px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    margin-top: 50px;
    margin-bottom: 50px;
  }
}

.user {
  display: flex;
  align-items: center;
  gap: 23px;
  padding-bottom: 1rem;
  margin-bottom: 1.5em;
  position: relative;
  &::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 1px;
    background: rgba(0, 0, 0, 0.5);
    // margin: 0 auto;
    left: 0;
    right: 0;
    bottom: 0;
  }
  &__foto {
    width: 3.625rem;
    height: 3.625rem;
    background-color: #d9d9d9;
    padding: 10px;
    border-radius: 50%;
    @media (max-width: 570px) {
      padding: 7px;
      width: 2.25rem;
      height: 2.25rem;
    }
  }
  &__foto-img {
    width: 100%;
    height: 100%;
  }
  &__inform {
  }
  &__name {
    font-size: 1rem;
    font-style: normal;
    font-weight: 500;
    line-height: 115.967%;
    margin-bottom: 0.6em;
    @media (max-width: 570px) {
      font-size: 0.6em;
    }
  }
  &__email {
    font-size: 0.75rem;
    font-style: normal;
    font-weight: 500;
    line-height: 115.967%;
    @media (max-width: 570px) {
      font-size: 0.5rem;
      line-height: 115.967%;
    }
  }
}
.menu-for-user {
  &__list {
    display: flex;
    // flex-direction: column;
    margin-bottom: 1.2em;
    align-items: center;
    height: 2.75rem;
    @media (max-width: 570px) {
      margin-bottom: 0.625rem;
    }
    &--true {
      border-radius: 10px;
      background: rgba(239, 202, 0, 0.5);
      max-width: 15.875rem;
    }
    &--false {
      .menu-for-user__circl {
        background-color: #d9d9d9;
        border-radius: 50%;
      }
    }
  }
  &__circl {
    width: 2.5rem;
    height: 2.5rem;
    padding: 9px;
    margin-right: 1.5rem;
    @media (max-width: 570px) {
      width: 1.5rem;
      height: 1.5rem;
      padding: 5px;
    }
  }
  &__img {
    // @media (max-width: 570px) {
    width: 100%;
    height: 100%;
    // }
  }
  &__text {
    font-size: 1em;
    font-style: normal;
    font-weight: 500;
    line-height: 115.967%;
    @media (max-width: 570px) {
      font-size: 0.6em;
    }
  }
}
.reviews {
  &__stars {
    display: flex;
    gap: 5px;
  }
  &__star {
    content: "★";
    height: 1.2em;
    width: 1.2em;
    &--yellow {
      color: #ffc107;
      //   background-color: yellow;
    }
    &--gray {
      color: gray;
      //   background-color: gray;
    }
    @media (max-width: 570px) {
      height: 0.5em;
      width: 0.5em;
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
.add-to-cart {
  @media (max-width: 570px) {
    display: none;
  }
}
</style>
