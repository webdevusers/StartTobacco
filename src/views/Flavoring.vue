<template>
  <div class="container" v-if="!isLoader">
    <div class="box">
      <div class="card__hover">
        <div class="box__left">
          <img class="card__img" :src="products.imageUrl" />
        </div>
      </div>
      <div class="box__right">
        <div class="breadcrumbs">
          <ul class="breadcrumbs__list" v-if="section.title">
            <li class="breadcrumbs__item">
              <a class="breadcrumbs__link" href="#" @click="goToCategory">
                {{ category.title }}
              </a>
            </li>
            <svg
              class="breadcrumbs__svg"
              width="5"
              height="13"
              viewBox="0 0 5 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.0174308 11.4567C0.0689392 11.6683 0.192559 11.8587 0.347084 11.9646C0.420912 12.0139 0.456968 12.021 0.61321 12.021C0.778037 12.021 0.802073 12.0163 0.887921 11.9552C0.965183 11.8987 1.34806 11.3861 2.93452 9.21574C4.55703 6.99599 4.89698 6.51865 4.94334 6.40108C4.99657 6.26705 5 6.24823 5 6.01309C5 5.77795 4.99657 5.75914 4.94334 5.6251C4.89698 5.50518 4.55875 5.03254 2.92593 2.80104C1.37038 0.672993 0.948014 0.108649 0.879336 0.0616207C0.805507 0.0122404 0.769452 0.00518608 0.61321 0.00518608C0.448384 0.00518608 0.424346 0.0122404 0.335065 0.0733776C0.216596 0.155678 0.117013 0.292061 0.0517697 0.463716C0.00884628 0.581286 0.00369501 0.616558 0.00369501 0.828186C0.00369501 1.23969 -0.145679 1.00454 1.79618 3.66636L3.50626 6.01309L1.79618 8.35747C-0.123359 10.9934 0.00884581 10.7841 0.000261307 11.1627C-0.00145578 11.2803 0.0054121 11.4002 0.0174308 11.4567Z"
                fill="black"
              />
            </svg>
            <li class="breadcrumbs__item">
              <a class="breadcrumbs__link" href="#" @click="goToSection">
                {{ section.title }}
              </a>
            </li>
          </ul>
        </div>
        <div class="box-mibale">
          <img class="box-mibale__img" :src="products.imageUrl" />
        </div>
        <div class="goods__title">
          {{ products.title }}
        </div>
        <div class="reviews">
          <div class="reviews__stars" v-if="products.ratingVoid">
            <div
              v-for="rating in [0, 1, 2, 3, 4]"
              :key="rating"
              :class="[
                products.ratingVoid > rating
                  ? 'reviews__star--yellow'
                  : 'reviews__star--gray',
                'reviews__star',
              ]"
              aria-hidden="true"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                />
              </svg>
            </div>
          </div>
        </div>
        <div class="prises" v-if="getPrise">
          <div class="prises__oldPrice" v-if="getPrise[0]?.oldPrice">
            {{ getPrise[0]?.oldPrice }}
          </div>
          <div class="prises__newPrice" v-if="getPrise[0]?.newPrice">
            {{ getPrise[0]?.newPrice }}₴
          </div>
        </div>

        <div class="capacity">
          <div
            class="capacity__title"
            v-if="products?.containerVolume?.length > 0"
          >
            Ємність
          </div>
          <base-select
            v-if="products?.containerVolume?.length > 0"
            class="capacity__select"
            v-model:modelValue="containerVolume"
            v-bind:options="products.containerVolume"
          />
        </div>
        <div class="number">
          <div class="number__title">Кількість</div>
          <div class="number__box">
            <button class="number__btn number__btn--minus" @click="minesOne()">
              -
            </button>

            <input
              type="text"
              class="number__value"
              :value="summ"
              @input="summ = $event.target.value"
            />
            <button class="number__btn number__btn--plus" @click="plusOne()">
              +
            </button>
          </div>
        </div>

        <button class="button" @click="addToCart">Додати до кошику</button>
      </div>
    </div>
    <div class="description" v-if="products.text">
      <div class="description__title">Опис</div>
      <div class="description__text">{{ products?.text }}</div>
    </div>
  </div>
  <div v-else>
    <base-loader />
  </div>
</template>

<script>
import BaseSelect from "@/components/UI/BaseSelect.vue";
import BaseLoader from "@/components/UI/BaseLoader.vue";
import axios from "axios";
export default {
  components: { BaseSelect, BaseLoader },
  data() {
    return {
      products: [],
      isLoader: false,
      containerVolume: "0.1л",
      summ: 1,
      section: {},
      category: "",
      token: "",
    };
  },
  methods: {
    plusOne() {
      this.summ++;
    },
    minesOne() {
      if (this.summ > 0) {
        this.summ--;
      }
    },
    addToCart() {
      let purchase = [
        {
          containerVolume: this.containerVolume,
          summ: +this.summ,
          newPrice: this.getPrise[0]?.newPrice,
          products: this.products,
        },
      ];
      let order = JSON.parse(localStorage.getItem(`order`));
      if (order) {
        order.push(purchase[0]);
        localStorage.setItem(`order`, JSON.stringify(order));
      } else {
        localStorage.setItem(`order`, JSON.stringify(purchase));
      }

      let sumOrder = JSON.parse(localStorage.getItem(`order`));
      const summedItems = {};
      sumOrder.forEach((item) => {
        const key = `${item.containerVolume}-${item.products._id}`;
        if (summedItems[key]) {
          console.log(summedItems[key].summ);
          summedItems[key].summ = +summedItems[key].summ + +item.summ;
        } else {
          summedItems[key] = { ...item };
        }
      });
      const resultArray = Object.values(summedItems);

      localStorage.setItem(`order`, JSON.stringify(resultArray));
    },
    goToSection() {
      this.$router.push({
        path: `/subcategory/`,
        query: { categoryId: this.category.id, sectinId: this.section.id },
      });
    },
    goToCategory() {
      this.$router.push({
        path: `/subcategory/`,
        query: { categoryId: this.category.id },
      });
    },
    async fetchGetProduct(item) {
      try {
        this.isLoader = true;
        let urlStr = `https://damp-sands-00500-b961cd19fbea.herokuapp.com/items/product/find/${item}`;
        // console.log(urlStr);
        const response = await axios.get(urlStr, {});
        this.products = response.data.product;
        // console.log(this.products);
      } catch (err) {
        console.log(err);
      } finally {
        this.isLoader = false;
      }
    },
    async fetchFindSection(id) {
      try {
        this.isLoader = true;
        let urlStr = `https://damp-sands-00500-b961cd19fbea.herokuapp.com/items/section/find/${id}`;
        const response = await axios.get(urlStr, {});

        this.section = {
          title: response.data.section.sectionName,
          id: response.data.section._id,
        };

        this.fetchFindCategory(response.data.section.category);
      } catch (err) {
        console.log(err);
      } finally {
        this.isLoader = false;
      }
    },
    async fetchFindCategory(id) {
      try {
        this.isLoader = true;
        let urlStr = `https://damp-sands-00500-b961cd19fbea.herokuapp.com/items/category/find/${id}`;
        const response = await axios.get(urlStr, {});
        this.category = {
          title: response.data.category.title,
          id: response.data.category._id,
        };
      } catch (err) {
        console.log(err);
      } finally {
        this.isLoader = false;
      }
    },
    async fetchAddViews() {
      try {
        let urlStr = `https://damp-sands-00500-b961cd19fbea.herokuapp.com/user/views/add`;
        const response = await axios.post(urlStr, {
          token: this.token,
          productID: this.$route.query.flavoringId,
        });
      } catch (err) {
        console.log(err);
      } finally {
      }
    },
  },
  computed: {
    getPriseFromContainerVolume() {
      if (this.products) {
        let array = JSON.parse(JSON.stringify(this.products));
        return array.containerVolume;
      }
    },
    getPrise() {
      return this.getPriseFromContainerVolume.filter(
        (item) => item.value == this.containerVolume
      );
    },
  },
  created() {
    const currentParams = { ...this.$route.query };
    this.fetchGetProduct(currentParams.flavoringId);
  },
  mounted() {
    this.$nextTick(async function () {
      this.token = JSON.parse(localStorage.getItem(`token`));
      if (this.token) {
        this.fetchAddViews();
      }
      const currentParams = { ...this.$route.query };
      if (currentParams.sectionName) {
        this.fetchFindSection(currentParams.sectionName);
      }
    });
  },
};
</script>

<style lang="scss" scoped>
.colorbg {
  background: #00000050;
}
a {
  text-decoration: none;
}
input {
  outline: none;
}
.box-mibale {
  display: none;
}
.container {
  box-sizing: border-box;
  font-family: "tobacco";
  max-width: 1220px;
  margin: 66px auto 90px;
  padding: 0 10px;
}
.box {
  display: grid;
  grid-template-columns: 45% 1fr; //530px

  gap: 80px;
  &__left {
    background: #ffffff;
    border-radius: 10px;
    max-width: 530px;
    height: 670px;
    object-fit: cover;
    margin: auto;
    position: relative;
    box-shadow: var(
      --shadowforcards-box-shadow,
      5px 5px 25px 0px rgba(0, 0, 0, 0.2)
    );
  }
}
.card__img {
  padding: 0 10px;
  width: 100%;

  object-fit: contain;
}
.breadcrumbs {
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  padding-bottom: 26px;
  width: 150%;
  &__list {
    display: flex;
    padding: 0;
    list-style: none;
    align-items: center;
  }

  &__svg {
    margin: 0 20px;
  }
  &__link {
    color: #000000;
    text-align: left;
    font-family: "tobacco";
    position: relative;
  }
}
.goods {
  &__title {
    color: #000000;
    font-family: "tobacco";
    font-size: 32px;
    font-weight: 600;
    padding-bottom: 40px;
  }
}
.reviews {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 300px;
  margin-bottom: 45px;
  &__stars {
    display: flex;
    gap: 5px;
  }
  &__star {
    content: "★";
    height: 18px;
    width: 18px;
    &--yellow {
      color: #ffc107;
    }
    &--gray {
      color: gray;
    }
  }
  &__voits {
    display: flex;
    width: 90px;
    gap: 15px;
  }
  &__icons {
    width: 25px;
    height: 25px;
  }
  &__text {
    color: #292929;
    font-family: "tobacco";
    font-size: 18.5px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
}
.prises {
  display: flex;
  font-family: "tobacco";
  width: 240px;
  gap: 25px;
  &__oldPrice {
    color: rgba(41, 41, 41, 0.5);
    text-decoration: line-through;
    font-size: 38px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: 0.76px;
  }
  &__newPrice {
    font-size: 40px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: 0.8px;
  }
}
.capacity {
  font-family: "tobacco";
  margin: 45px 0;
  &__title {
    font-size: 22px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    color: #000000;
    text-align: left;
    position: relative;
    width: 90px;
    margin-bottom: 10px;
  }
}
.number {
  font-family: "tobacco";
  &__title {
    color: #000000;
    margin-bottom: 10px;
    font-size: 22px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
  &__box {
    display: flex;
    align-items: center;
  }
  &__value {
    width: 170px;
    background: rgba(216, 216, 216, 0.4);
    border-radius: 3px;
    border-style: solid;
    border-color: rgba(0, 0, 0, 0.5);
    border-width: 1px;
    padding: 4px;
    text-align: center;
    margin: 0 15px;
  }
  &__btn {
    font-size: 1rem;
    font-weight: 600;
    border: none;
    background: transparent;
  }
}
.button {
  background: #efca00;
  border-radius: 3px;
  border: none;
  width: 310px;
  height: 65px;
  color: rgba(0, 0, 0, 0.8);
  font-size: 22px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: 0.44px;
  margin-top: 45px;
  &:hover {
    background: #d1b204;
  }
}
.description {
  margin: 109px 0;
  text-align: start;
  &__title {
    font-size: 32px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: 0.64px;
    margin-bottom: 45px;
  }
  &__text {
    font-size: 28px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: 0.56px;
  }
}
@media screen and (max-width: 1440px) {
  .container {
    font-family: "tobacco";
    max-width: 865px;
  }
  .box {
    display: grid;
    grid-template-columns: 42% 1fr;

    gap: 10%;
    &__left {
      background: #ffffff;
      border-radius: 10px;
      max-width: 100%;
      height: 475px;
    }
  }
  .card__img {
    padding: 50px 10px;
    width: 100%;
    max-height: 465px;
    object-fit: contain;
  }
  .card__hover {
    position: relative;
  }
  .breadcrumbs {
    padding-bottom: 26px;
    width: 150%;
    &__item {
      overflow: hidden;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
    }
  }
  .goods {
    &__title {
      font-size: 24px;
    }
  }

  .prises {
    gap: 40px;
    &__oldPrice {
      font-size: 30px;
      letter-spacing: 0.6px;
    }
    &__newPrice {
      font-size: 32px;
      letter-spacing: 0.64px;
    }
  }
  .capacity {
    margin: 50px 0;
    &__title {
      font-size: 20px;
    }
  }
  .number {
    &__title {
      font-size: 20px;
    }
  }
  .description {
    margin: 109px 0;
    text-align: start;
    &__title {
      font-size: 28px;
      letter-spacing: 0.56px;
      margin-bottom: 45px;
    }
    &__text {
      font-size: 24px;
      letter-spacing: 0.48px;
    }
  }
}
@media screen and (max-width: 1040px) {
  .container {
    font-family: "tobacco";
    max-width: 819px;
  }
  .box {
    display: grid;
    grid-template-columns: 36% 1fr;

    gap: 10%;
    &__left {
      background: #ffffff;
      border-radius: 10px;
      max-width: 100%;
      height: 375px;
    }
  }
  .card__img {
    padding: 40px 10px;
    width: 100%;
    max-height: 375px;
    object-fit: contain;
  }
  .card__hover {
    position: relative;
  }
  .breadcrumbs {
    padding-bottom: 44px;
    width: 90%;
  }
  .goods {
    &__title {
      font-size: 24px;
    }
  }
  .reviews {
    &__text {
      letter-spacing: 0.37px;
    }
  }
  .prises {
    gap: 40px;
    &__oldPrice {
      font-size: 28px;
      letter-spacing: 0.56px;
    }
    &__newPrice {
      font-size: 29px;
      letter-spacing: 0.58px;
    }
  }
  .capacity {
    &__title {
      font-size: 18px;
      letter-spacing: 0.36px;
    }
  }
  .number {
    &__title {
      font-size: 18px;
    }
  }
  .button {
    background: #efca00;
    border-radius: 3px;
    border: none;
    width: 250px;
    height: 50px;
    color: rgba(0, 0, 0, 0.8);
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: 0.32px;
  }
  .description {
    margin: 70px 0;
    text-align: start;
    &__title {
      font-size: 24px;
      letter-spacing: 0.48px;
      margin-bottom: 45px;
    }
    &__text {
      font-size: 22px;
      letter-spacing: 0.44px;
    }
  }
}
@media screen and (max-width: 570px) {
  .container {
    font-family: "tobacco";
    width: 100%;
    margin: 12px auto 90px;
    padding: 0 28px;
  }
  .box {
    display: flex;
    flex-direction: column;
    gap: 0px;
    &__left {
      display: none;
    }
  }

  .card__hover {
    position: relative;
  }
  .breadcrumbs {
    font-size: 0.625rem;
    padding-bottom: 26px;
    display: flex;
    justify-content: center;
    width: auto;
    &__list {
      display: flex;
      padding: 0;
      list-style: none;
      align-items: center;
    }

    &__link {
      color: #000000;
      text-align: left;
      font-family: "tobacco";
      position: relative;
    }
  }
  .box-mibale {
    display: flex;
    background: #ffffff;
    border-radius: 10px;
    justify-content: center;
    align-items: center;
    margin: 0 25%;
    object-fit: cover;

    box-shadow: var(
      --shadowforcards-box-shadow,
      5px 5px 25px 0px rgba(0, 0, 0, 0.2)
    );
    &__img {
      padding: 3rem 1rem;
    }
  }

  .goods {
    &__title {
      color: #000000;
      font-family: "tobacco";
      font-size: 1.2em;
      font-weight: 600;
      padding-top: 2.5rem;
      padding-bottom: 1.25rem;
    }
  }
  .reviews {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 300px;
    margin-bottom: 2.5rem;
    &__stars {
      display: flex;
      gap: 5px;
    }
    &__star {
      content: "★";
      height: 10px;
      width: 10px;
      &--yellow {
        color: #ffc107;
      }
      &--gray {
        color: gray;
      }
    }
    &__voits {
      display: flex;
      width: 90px;
      gap: 15px;
    }
    &__icons {
      width: 18px;
      height: 18px;
    }
    &__text {
      color: #292929;
      font-family: "tobacco";
      font-size: 0.875rem;
    }
  }
  .prises {
    display: flex;
    font-family: "tobacco";
    width: 50%;
    gap: 20%;
    &__oldPrice {
      color: rgba(41, 41, 41, 0.5);
      font-size: 22px;
      letter-spacing: 0.44px;
    }
    &__newPrice {
      font-size: 24px;
      letter-spacing: 0.48px;
    }
  }
  .capacity {
    font-family: "tobacco";

    margin: 2.5rem 0;
    &__title {
      font-size: 18px;
      letter-spacing: 0.36px;
      margin-bottom: 10px;
    }
    &__select {
      height: 100%;
      width: 50%;
    }
  }
  .number {
    font-family: "tobacco";
    &__title {
      font-size: 18px;
      letter-spacing: 0.36px;
      margin-bottom: 10px;
    }
    &__box {
      display: flex;
      align-items: center;
      width: 40%;
    }
    &__value {
      width: 100%;
      background: rgba(216, 216, 216, 0.4);
      border-radius: 3px;
      border-style: solid;
      border-color: rgba(0, 0, 0, 0.5);
      border-width: 1px;
      padding: 4px;
      text-align: center;
      margin: 0;
      order: 1;
    }
    &__btn {
      border: none;
      background: transparent;
      &--minus {
        order: 2;
        margin: 0 15px;
      }
      &--plus {
        order: 3;
      }
    }
  }

  .button {
    background: #efca00;
    border-radius: 3px;
    border: none;
    width: 60%;
    height: 100%;
    padding: 12px 20px;
    text-align: center;
    margin: 45px auto;
    display: block;
    color: rgba(0, 0, 0, 0.8);
    &:hover {
      background: #d1b204;
    }
  }
  .description {
    margin: 0 0 45px;
    &__title {
      font-size: 20px;
    }
    &__text {
      font-size: 18px;
    }
  }
}
</style>
