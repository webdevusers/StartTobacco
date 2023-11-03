<template>
  <div class="container">
    <div class="title title--basket">Кошик</div>
    <div class="title">Оформлення замовлення</div>
    <div class="contact">Ваші контактні дані</div>
    <div class="registration-contract">
      <div class="registration-contract__right">
        <form action="#" class="form" method="POST" @submit.prevent>
          <base-input
            :class="[
              v$.user.name.$error ? 'errors-color shake--transition' : '',
              'form__contact',
            ]"
            v-model="v$.user.name.$model"
            type="text"
            placeholder="Введіть ім&#039;я"
          />
          <base-input
            :class="[
              v$.user.surname.$error ? 'errors-color shake--transition' : '',
              'form__contact',
            ]"
            v-model="v$.user.surname.$model"
            type="text"
            placeholder="Введіть фамілію"
          />
          <base-input
            :class="[
              v$.user.phone.$error ? ' errors-color shake--transition' : '',
              'form__contact',
            ]"
            v-model="v$.user.phone.$model"
            type="text"
            placeholder="Моб.телефон"
          />
          <base-input
            :class="[
              v$.user.email.$error ? ' errors-color shake--transition' : '',
              'form__contact',
            ]"
            v-model="v$.user.email.$model"
            type="text"
            placeholder="Електронна пошта"
          />
          <button
            type="submit"
            class="form__button form__button--save"
            @click.stop="submitForm"
          >
            Зберегти
          </button>
        </form>
        <base-select-whith-button
          v-model:modelValue="cityDelivery"
          v-bind:options="allCityDelivery"
        />
        <base-input-whith-search
          v-bind:isError="isError"
          v-model:modelValue="numberDelivery"
          v-bind:options="allNumberDelivery"
        />
        <button
          type="submit"
          class="form__button form__button--confirm"
          @click.stop="receiveOrderConfirmation('delivery')"
        >
          Підтверджую замовлення
        </button>
      </div>
      <div class="registration-contract__left">
        <div class="check">
          <div class="check__title">Разом</div>
          <div class="check__col">
            <div class="check__col-title">
              {{ getTheSumOfTheQuantityOfGoods }} тов. на суму
            </div>
            <div class="check__col-summ">{{ getTheSum }} ₴</div>
          </div>
          <div class="check__delivery">
            <div class="check__delivery-title">Вартість доставки</div>
            <div class="check__delivery-text">за тарифами перевізника</div>
          </div>
          <div class="check__summa">
            <div class="check__summa-title">До сплати</div>
            <div class="check__summa-text">{{ getTheSum }} ₴</div>
          </div>
          <button
            class="check__button"
            @click.stop="receiveOrderConfirmation('delivery')"
          >
            Підтверджую замовлення
          </button>
        </div>
      </div>
    </div>
    <div class="user-request__title">Ваше замовлення</div>
    <div class="user-request__list" v-for="item in products" :key="item.id">
      <button
        class="user-request__cancel"
        @click="deleteProduct(item.products._id)"
      >
        <img src="../../public/images/cancel.png" alt="" />
      </button>
      <img :src="item.products.imageUrl" alt="" class="user-request__img" />
      <div class="user-request__title-product">{{ item.products.title }}</div>
      <div class="user-request__col">{{ getCol(item) }}</div>
      <div class="user-request__summ">{{ getSum(item) }}₴</div>
    </div>

    <div class="type-of-delivery" ref="delivery">
      <div class="type-of-delivery__left">
        <div class="type-of-delivery__title">Доставка</div>
        <div class="radio-group">
          <input
            class="radio-input"
            name="radio-group"
            id="radio1"
            type="radio"
            value="Доставка Нова Пошта"
            v-model="typeDelivery"
          />
          <label class="radio-label" for="radio1">
            <span class="radio-inner-circle"></span>
            Доставка Нова Пошта
          </label>

          <input
            class="radio-input"
            name="radio-group"
            id="radio2"
            type="radio"
            value="Самовивіз НоваПошта"
            v-model="typeDelivery"
          />
          <label class="radio-label" for="radio2">
            <span class="radio-inner-circle"></span>
            Самовивіз НоваПошта
          </label>

          <input
            class="radio-input"
            name="radio-group"
            id="radio3"
            type="radio"
            value="Самовивіз УкрПошта"
            v-model="typeDelivery"
          />
          <label class="radio-label" for="radio3">
            <span class="radio-inner-circle"></span>
            Самовивіз УкрПошта
          </label>

          <input
            class="radio-input"
            name="radio-group"
            id="radio4"
            type="radio"
            value="Доставка УкрПошта"
            v-model="typeDelivery"
          />
          <label class="radio-label" for="radio4">
            <span class="radio-inner-circle"></span>
            Доставка УкрПошта
          </label>
        </div>
      </div>
      <div class="type-of-delivery__right">
        <div class="type-of-delivery__title">Оплата</div>

        <div class="radio-group__right">
          <input
            class="radio-input"
            name="radio-group__right"
            id="radio1__right"
            type="radio"
            value="false"
            v-model="payNow"
          />
          <label class="radio-label" for="radio1__right">
            <span class="radio-inner-circle"></span>
            Оплата при отриманні
          </label>

          <input
            class="radio-input"
            name="radio-group__right"
            id="radio2__right"
            type="radio"
            value="true"
            v-model="payNow"
          />
          <label class="radio-label" for="radio2__right">
            <span class="radio-inner-circle"></span>
            Оплатити зараз
          </label>
        </div>
        <div class="pay" v-if="payNow == 'true'">
          <div class="pay__title">Номер карти</div>
          <input
            class="pay__input pay__input--card"
            v-model="numberCard"
            type="text"
            @input="getCardInput"
            ref="cardInput"
          />

          <div class="pay__props">
            <div class="pay__props--gap">
              <div class="pay__title">Термін дії</div>
              <input
                class="pay__input pay__input--term"
                v-model="termCard"
                type="text"
                @input="getTermInput"
                ref="termInput"
              />
            </div>
            <div class="">
              <div class="pay__title">CVV</div>
              <input
                class="pay__input pay__input--cvv"
                v-model="cvvCard"
                type="text"
                @input="getCvvInput"
                ref="cvvInput"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="check check--mobile">
      <div class="check__title">Разом</div>
      <div class="check__col">
        <div class="check__col-title">
          {{ getTheSumOfTheQuantityOfGoods }} тов. на суму
        </div>
        <div class="check__col-summ">{{ getTheSum }} ₴</div>
      </div>
      <div class="check__delivery">
        <div class="check__delivery-title">Вартість доставки</div>
        <div class="check__delivery-text">за тарифами перевізника</div>
      </div>
      <div class="check__summa">
        <div class="check__summa-title">До сплати</div>
        <div class="check__summa-text">{{ getTheSum }} ₴</div>
      </div>
      <div
        class="check__button"
        @click.stop="receiveOrderConfirmation('delivery')"
      >
        Підтверджую замовлення
      </div>
    </div>
  </div>

  <regModal
    v-if="regContent"
    @modal="(regContent = !regContent), (authContent = true)"
    v-model:regContent="regContent"
  />
  <authModal
    v-if="authContent"
    @modal="(authContent = !authContent), (regContent = true)"
    v-model:authContent="authContent"
  />
</template>

<script>
import BaseSelectWhithButton from "@/components/UI/BaseSelectWhithButton.vue";
import BaseInputWhithSearch from "@/components/UI/BaseInputWhithSearch.vue";
import BaseInput from "../components/UI/BaseInput.vue";
import regModal from "../components/base/authComponents/regModal.vue";
import authModal from "../components/base/authComponents/authModal.vue";
import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength } from "@vuelidate/validators";
import axios from "axios";

export default {
  data() {
    return {
      v$: useVuelidate(),
      regContent: false,
      authContent: false,
      cityDelivery: "",
      vidilNP: "",
      allCityDelivery: [
        { id: 1, city: "Київ", obl: "Київ" },
        { id: 2, city: "Вінниця", obl: "Вінниця" },
        { id: 3, city: "Дніпро", obl: "Дніпро" },
        { id: 4, city: "Донецьк", obl: "Донецьк" },
        { id: 5, city: "Житомир", obl: "Житомир" },
        { id: 5, city: "Запоріжжя", obl: "Запоріжжя" },
        { id: 5, city: "Івано-Франківськ", obl: "Івано-Франківськ" },
        { id: 5, city: "Кропивницький", obl: "Кропивницький" },
        { id: 5, city: "Луганськ", obl: "Луганськ" },
        { id: 5, city: "Луцьк", obl: "Луцьк" },
        { id: 5, city: "Львів", obl: "Львів" },
        { id: 5, city: "Миколаїв", obl: "Миколаїв" },
        { id: 5, city: "Одеса", obl: "Одеса" },
        { id: 5, city: "Полтава", obl: "Полтава" },
        { id: 5, city: "Рівне", obl: "Рівне" },
        { id: 5, city: "Суми", obl: "Суми" },
        { id: 5, city: "Тернопіль", obl: "Тернопіль" },
        { id: 5, city: "Ужгород", obl: "Ужгород" },
        { id: 5, city: "Харків", obl: "Харків" },
        { id: 5, city: "Херсон", obl: "Херсон" },
        { id: 5, city: "Хмельницький", obl: "Хмельницький" },
        { id: 5, city: "Черкаси", obl: "Черкаси" },
        { id: 5, city: "Чернівці", obl: "Чернівці" },
        { id: 5, city: "Чернігів", obl: "Чернігів" },
      ],
      numberDelivery: "",
      allNumberDelivery: [
        { id: 1, name: "№1" },
        { id: 2, name: "№2" },
        { id: 3, name: "№3" },
        { id: 4, name: "№4" },
        { id: 5, name: "№1" },
        { id: 6, name: "№2" },
        { id: 7, name: "№3" },
        { id: 8, name: "№4" },
        { id: 9, name: "№11" },
        { id: 10, name: "№21" },
        { id: 11, name: "№31" },
        { id: 13, name: "№41" },
        { id: 12, name: "№12" },
        { id: 14, name: "№22" },
        { id: 15, name: "№32" },
        { id: 16, name: "№42" },
        { id: 17, name: "№13" },
        { id: 18, name: "№23" },
        { id: 19, name: "№33" },
        { id: 20, name: "№43" },
        { id: 21, name: "№14" },
        { id: 22, name: "№24" },
        { id: 23, name: "№34" },
        { id: 24, name: "№44" },
      ],
      typeDelivery: "",
      payNow: "",
      cardInput: "",
      termInput: "",
      numberCard: null,
      termCard: null,
      cvvCard: null,
      cvvInput: "",
      products: [],
      user: [],
      isError: false,
      token: "",
    };
  },
  components: {
    BaseInput,
    BaseSelectWhithButton,
    BaseInputWhithSearch,
    regModal,
    authModal,
  },
  computed: {
    getTheSumOfTheQuantityOfGoods() {
      return [...this.products].reduce((acc, val) => (acc += +val.summ), 0);
    },
    getTheSum() {
      let summ = [...this.products]
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
  methods: {
    async submitForm() {
      if (
        !this.user.name ||
        !this.user.surname ||
        !this.user.phone ||
        !this.user.email
      ) {
        this.regContent = true;
      } else if (this.v$.$invalid) {
        console.log(this.v$.$invalid);
        this.v$.$touch();
        return;
      } else {
        await this.fetchUpdatedData();
      }
    },
    async fetchUpdatedData() {
      try {
        // this.isLoader = true;
        let urlStr = `https://damp-sands-00500-b961cd19fbea.herokuapp.com/user/edit`;
        const response = await axios.post(urlStr, {
          id: this.user._id,
          updatedData: {
            name: this.user.name,
            surname: this.user.surname,
            email: this.user.email,
            phone: this.user.phone,
          },
        });
        if (response.data.edited) {
          localStorage.setItem(`user`, JSON.stringify(this.user));
        }
      } catch (err) {
        console.log(err);
      } finally {
        // this.isLoader = false;
      }
    },
    async fetchAddOrder() {
      try {
        this.isLoader = true;
        let urlStr = `https://damp-sands-00500-b961cd19fbea.herokuapp.com/user/addOrder`;
        const response = await axios.post(urlStr, {
          token: this.token,
          Object: {
            timeOrder: Date.now(),
            order: [...this.products],
          },
        });
        if (response.data.edited) {
          localStorage.setItem(`user`, JSON.stringify(this.user));
        }
      } catch (err) {
        console.log(err);
      } finally {
        this.isLoader = false;
      }
    },
    getCol(item) {
      return `${this.indentInThousands(item?.products.newPrice)} ₴ х ${
        item.summ
      } од.`;
    },
    getSum(item) {
      return this.indentInThousands(+item?.products.newPrice * +item.summ);
    },
    deleteProduct(id) {
      console.log(id);
      this.products = [...this.products].filter(
        (item) => item.products._id != id
      );
      console.log(this.products);
    },
    getCardInput(e) {
      if (this.numberCard.length > 15) {
        this.$refs.termInput.focus();
      }
      this.numberCard = this.numberCard.replace(/\D/g, "");
      if (this.numberCard.length == 16) {
        return (this.numberCard = this.numberCard.replace(/(\d{4})/g, "$1 "));
      }
    },
    indentInThousands(summ) {
      return summ
        .toString()
        .split("")
        .reverse()
        .join("")
        .replace(/(\d{3})/g, "$1 ")
        .split("")
        .reverse()
        .join("");
    },
    getTermInput(e) {
      if (this.termCard.length >= 4) {
        this.$refs.cvvInput.focus();
      }
      this.termCard = this.termCard.replace(/\D/g, "");
      if (this.termCard.length == 4) {
        let str = this.termCard.replace(/(\d{2})/g, "$1/");
        return (this.termCard = str.substring(0, str.length - 1));
      }
    },
    getCvvInput(e) {
      if (this.cvvCard.length >= 3) {
        this.$refs.cardInput.focus();
      }
      this.cvvCard = this.cvvCard.replace(/\D/g, "");
    },
    receiveOrderConfirmation(refName) {
      if (this.v$.$invalid) {
        this.v$.$touch();
      } else if (this.numberDelivery == false) {
        this.isError = true;
      } else if (this.typeDelivery == false || this.payNow == false) {
        var element = this.$refs[refName];
        var top = element.offsetTop;
        window.scrollTo(0, top);
      } else {
        this.fetchAddOrder();
        this.products = [];
        localStorage.removeItem(`order`);
      }
    },
  },
  validations() {
    return {
      user: {
        name: { required, minLength: minLength(3) },
        surname: { required, minLength: minLength(3) },
        email: { required, email },
        phone: { required },
      },
    };
  },
  watch: {
    isError(newValue) {
      if (newValue == true) {
        setTimeout(() => {
          this.isError = false;
        }, 3000);
      }
    },
    regContent(newValue) {
      setTimeout(() => {
        this.user = JSON.parse(localStorage.getItem(`user`));
        if (this.user?.name == undefined) {
          this.user = { name: "", surname: "", phone: "", email: "" };
        }
      }, 2000);
    },
    authContent(newValue) {
      setTimeout(() => {
        this.user = JSON.parse(localStorage.getItem(`user`));
        if (this.user?.name == undefined) {
          this.user = { name: "", surname: "", phone: "", email: "" };
        }
      }, 2000);
    },
  },
  mounted() {
    this.products = JSON.parse(localStorage.getItem(`order`));
    this.user = JSON.parse(localStorage.getItem(`user`));
    if (this.user?.name == undefined) {
      this.user = { name: "", surname: "", phone: "", email: "" };
    }
    this.token = JSON.parse(localStorage.getItem(`token`));
  },
};
</script>

<style lang="scss" scoped>
input {
  outline: none;
}
.shake--transition {
  animation: shake 0.2s 4;
  @keyframes shake {
    0%,
    100% {
      translate: 0;
    }

    25% {
      translate: 8px 0;
    }

    75% {
      translate: -8px 0;
    }
  }
}
.errors-color {
  border: 1px solid red;
}
.container {
  box-sizing: border-box;
  font-family: "tobacco";
  max-width: 1220px;
  margin: 66px auto 90px;
  padding: 0 10px;
  @media screen and (max-width: 1040px) {
    margin: 45px auto 90px;
  }
  @media screen and (max-width: 570px) {
    width: 100%;
    margin: 12px auto 90px;
    padding: 0 28px;
  }
}
.title {
  font-size: 26px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  @media screen and (max-width: 570px) {
    font-size: 1.2em;
  }
  &--basket {
    display: none;
    @media screen and (max-width: 1040px) {
      font-size: 26px;
      display: block;
      margin-bottom: 30px;
    }
    @media screen and (max-width: 570px) {
      display: block;
      font-size: 1.2em;
      margin-bottom: 15px;
    }
  }
}
.contact {
  margin-top: 35px;
  font-size: 22px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  @media screen and (max-width: 570px) {
    font-size: 1rem;
  }
}
.registration-contract {
  display: flex;
  justify-content: space-between;
  &__right {
  }
  &__left {
    width: 365px;
    height: 406px;
    @media (max-width: 765px) {
      display: none;
    }
  }
  @media (max-width: 765px) {
    display: flex;
    flex-direction: column;
  }
}
.form {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 44px;
  row-gap: 25px;
  margin-top: 24px;
  margin-bottom: 54px;
  @media (max-width: 765px) {
    width: 100%;
    gap: 15px;
    margin-top: 15px;
    margin-bottom: 25px;
  }
  @media screen and (max-width: 570px) {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  &__contact {
    width: 100%;
  }
  &__button {
    background: #efca00;
    border-radius: 7px;
    padding: 17px 33px;
    margin-top: 10px;
    font-size: 17.5px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    border: none;
    &--save {
      width: 152px;
    }
    &--confirm {
      margin-bottom: 100px;
      @media screen and (max-width: 570px) {
        margin-bottom: 25px;
      }
    }
    @media screen and (max-width: 570px) {
      font-size: 0.875rem;
      padding: 8px 17px;
    }
  }
}

.input-with-search {
  margin: 35px 0 75px;
}

.check {
  padding: 16px 20px 16px 14px;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background: #fff;
  box-shadow: 5px 5px 25px 0px rgba(0, 0, 0, 0.2);
  @media (max-width: 765px) {
    width: 60%;
  }
  @media (max-width: 570px) {
    width: 70%;
  }
  @media (max-width: 375px) {
    width: 80%;
  }
  &__title {
    color: #000;
    font-size: 24px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    margin-bottom: 13px;
    @media (max-width: 570px) {
      font-size: 1rem;
    }
  }
  &__col,
  &__summa,
  &__delivery {
    display: flex;
    justify-content: space-between;
  }
  &__delivery {
    margin: 26px 0 40px;
  }
  &__col-title,
  &__delivery-title {
    color: rgba(0, 0, 0, 0.6);
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    @media (max-width: 570px) {
      font-size: 0.875rem;
    }
    @media (max-width: 375px) {
      font-size: 0.75rem;
    }
  }
  &__col-title {
    width: 145px;
  }
  &__delivery-title {
    width: 80px;
  }
  &__col-summ {
    color: rgba(0, 0, 0, 0.75);
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    @media (max-width: 570px) {
      font-size: 1rem;
    }
    @media (max-width: 375px) {
      font-size: 0.875rem;
    }
  }
  &__delivery-text {
    color: #000;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    text-align: end;
    @media (max-width: 375px) {
      font-size: 0.75rem;
    }
  }
  &__summa-title {
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    @media (max-width: 570px) {
      font-size: 0.875rem;
    }
    @media (max-width: 375px) {
      font-size: 0.75rem;
    }
  }
  &__summa-text {
    color: rgba(0, 0, 0, 0.75);
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    @media (max-width: 570px) {
      font-size: 1rem;
    }
    @media (max-width: 375px) {
      font-size: 0.875rem;
    }
  }
  &__button {
    border-radius: 7px;
    background: #efca00;
    padding: 18px 27px;
    flex-shrink: 0;
    color: #000;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    width: 272px;
    margin: 75px auto;
    text-align: center;

    @media (max-width: 765px) {
      width: 80%;
      padding: 18px 25px;
    }
    @media (max-width: 570px) {
      width: 85%;
      padding: 15px 10px;
      margin: 45px auto;
      font-size: 0.75rem;
    }
    @media (max-width: 375px) {
      margin: 30px auto;
    }
  }
  @media (max-width: 765px) {
    display: none;
  }
  &--mobile {
    display: none;
    @media (max-width: 765px) {
      display: block;
      margin-top: 35px;
    }
  }
}
.user-request {
  &__title {
    color: #000;
    font-size: 24px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    padding-bottom: 30px;
    @media screen and (max-width: 570px) {
      font-size: 0.875rem;
    }
  }
  &__list {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 930px;
    padding-bottom: 50px;
    @media (max-width: 1040px) {
      width: 100%;
      padding-bottom: 40px;
    }
    @media (max-width: 570px) {
      padding-bottom: 20px;
    }
  }
  &__cancel {
    width: 32px;
    height: 32px;
    @media (max-width: 1040px) {
      width: 24px;
      height: 24px;
    }
    @media (max-width: 570px) {
      width: 12px;
      height: 12px;
    }
  }
  &__img {
    width: 116px;
    height: 116px;
    @media (max-width: 1040px) {
      max-width: 116px;
      max-height: 116px;
    }
    @media (max-width: 765px) {
      display: none;
    }
  }
  &__title-product {
    color: #000;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    max-width: 255px;
    @media (max-width: 765px) {
      font-size: 0.875rem;
    }

    @media (max-width: 570px) {
      font-size: 0.75rem;
      max-width: 135px;
    }
  }
  &__col {
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    @media (max-width: 765px) {
      font-size: 1.2em;
    }
    @media (max-width: 570px) {
      font-size: 0.75rem;
    }
  }
  &__summ {
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    @media (max-width: 765px) {
      font-size: 1.2em;
    }
    @media (max-width: 570px) {
      font-size: 0.75rem;
    }
  }
}
.type-of-delivery {
  display: flex;
  gap: 115px;
  margin-top: 50px;
  &__left {
  }
  &__right {
  }
  &__title {
    font-size: 1.5rem;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    @media (max-width: 570px) {
      font-size: 1rem;
    }
  }

  @media (max-width: 570px) {
    margin-top: 15px;
    gap: 35px;
  }
  @media (max-width: 765px) {
    flex-direction: column;
    gap: 70px;
  }
}
.radio-label {
  display: flex;
  align-items: center;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: 0.4px;
  margin-top: 50px;
  @media (max-width: 1040px) {
    font-size: 1rem;
  }
  @media (max-width: 375px) {
    font-size: 0.875rem;
    margin-top: 28px;
  }
}
.radio-input {
  position: absolute;
  opacity: 0;
}
.radio-inner-circle {
  display: inline-block;
  width: 1em;
  height: 1em;
  border: 2px solid #888;
  border-radius: 50%;
  margin-right: 1.5em;
  transition: border-color 0.2s;
  position: relative;
}
.radio-input:checked + .radio-label .radio-inner-circle {
  border-color: #000000;
}
.radio-input:checked + .radio-label .radio-inner-circle::after {
  content: "";
  display: block;
  width: 0.5em;
  height: 0.5em;
  background-color: #000000;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.pay {
  margin-top: 40px;
  &__title {
    color: rgba(0, 0, 0, 0.5);
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: 0.4px;
    @media (max-width: 1040px) {
      font-size: 1rem;
    }
    @media (max-width: 375px) {
      font-size: 0.875rem;
    }
  }
  &__input {
    border-radius: 7px;
    border: 1px solid rgba(0, 0, 0, 0.5);
    background: #fff;
    width: 100%;
    padding: 14px 12px;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    @media (max-width: 1040px) {
      font-size: 1rem;
    }
    @media (max-width: 375px) {
      font-size: 0.875rem;
    }
  }
  &__props--gap {
    margin-right: 50px;
    @media (max-width: 570px) {
      margin-right: 17.5px;
    }
  }
  &__input--cvv {
    width: 95px;
    @media (max-width: 570px) {
      width: 60px;
    }
  }
  &__input--term {
    width: 120px;
    @media (max-width: 570px) {
      width: 80px;
    }
  }
  &__input--card {
    width: 380px;
    @media (max-width: 570px) {
      width: 250px;
    }
  }
  &__props {
    display: flex;
    margin-top: 21px;
  }
}
</style>
