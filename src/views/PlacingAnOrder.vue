<template>
  <div class="container">
    <div class="title title--basket">Кошик</div>
    <div class="row">
      <div class="type-of-delivery" ref="delivery">
        <div class="type-of-delivery__left">
          <div class="type-of-delivery__title">Доставка</div>
          <div class="radio-group">
            <input class="radio-input" name="radio-group" id="radio1" type="radio" value="Доставка НоваПошта"
              v-model="typeDelivery" />
            <label class="radio-label" for="radio1">
              <span class="radio-inner-circle"></span>
              {{ $t('deliveryHP') }}
            </label>

            <input class="radio-input" name="radio-group" id="radio2" type="radio" value="Самовивіз НоваПошта"
              v-model="typeDelivery" />
            <label class="radio-label" for="radio2">
              <span class="radio-inner-circle"></span>
              {{ $t('deliveryHP1') }}
            </label>

            <input class="radio-input" name="radio-group" id="radio3" type="radio" value="Доставка УкрПошта"
              v-model="typeDelivery" />
            <label class="radio-label" for="radio3">
              <span class="radio-inner-circle"></span>
              {{ $t('deliveryUK') }}
            </label>

            <input class="radio-input" name="radio-group" id="radio4" type="radio" value="Самовивіз УкрПошта"
              v-model="typeDelivery" />
            <label class="radio-label" for="radio4">
              <span class="radio-inner-circle"></span>
              {{ $t('deliveryUK1') }}
            </label>
          </div>
        </div>
        <div class="type-of-delivery__right">
          <div class="type-of-delivery__title">Оплата</div>

          <div class="radio-group__right">
            <input class="radio-input" name="radio-group__right" id="radio1__right" type="radio" value="false"
              v-model="payNow" />
            <label class="radio-label" for="radio1__right">
              <span class="radio-inner-circle"></span>
              {{ $t('pay') }}
            </label>

            <input class="radio-input" name="radio-group__right" id="radio2__right" type="radio" value="true"
              v-model="payNow" />
            <label class="radio-label" for="radio2__right">
              <span class="radio-inner-circle"></span>
              {{ $t('pay1') }}
            </label>
          </div>
        </div>
      </div>
      <div class="registration-contract__left">
        <div class="check">
          <div class="check__title">{{ $t('razom') }}</div>
          <div class="check__col">
            <div class="check__col-title">
              {{ getTheSumOfTheQuantityOfGoods }} товара на суму
            </div>
            <div class="check__col-summ">{{ getTheSum }} ₴</div>
          </div>
          <div class="check__delivery">
            <div class="check__delivery-title">{{ $t('deliveryPrice') }}</div>
            <div class="check__delivery-text">{{ $t('deliveryText') }}</div>
          </div>
          <div class="check__summa">
            <div class="check__summa-title">{{ $t('pay2') }}</div>
            <div class="check__summa-text">{{ getTheSum }} ₴</div>
          </div>
        </div>
      </div>
    </div>

    <div class="user-request__title">{{ $t('order') }}</div>
    <div class="user-request__list" v-for="item in products" :key="item.id">
      <button class="user-request__cancel" @click="deleteProduct(item.products._id)">
        <img src="../../public/images/cancel.png" alt="" />
      </button>
      <img :src="item.products.imageUrl" alt="" class="user-request__img" />
      <div class="user-request__title-product">{{ item.products.title }}</div>
      <div class="user-request__col">{{ getCol(item) }}</div>
      <div class="user-request__summ">{{ getSum(item) }}₴</div>
    </div>
    <div class="title">{{ $t('orderTitle') }}</div>
    <div class="contact">{{ $t('contacts') }}</div>
    <div class="registration-contract">
      <div class="registration-contract__right">
        <form action="#" class="form" method="POST" @submit.prevent>
          <base-input :class="[
            v$.user.name.$error ? 'errors-color shake--transition' : '',
            'form__contact',
          ]" v-model="v$.user.name.$model" type="text" :placeholder="$t('orderName')" />
          <base-input :class="[
            v$.user.surname.$error ? 'errors-color shake--transition' : '',
            'form__contact',
          ]" v-model="v$.user.surname.$model" type="text" :placeholder="$t('orderSurname')" />
          <base-input :class="[
            v$.user.phone.$error ? ' errors-color shake--transition' : '',
            'form__contact',
          ]" v-model="v$.user.phone.$model" type="text" :placeholder="$t('orderPhone')" />
          <base-input :class="[
            // v$.user.email.$error ? ' errors-color shake--transition' : '',
            'form__contact',
          ]" v-model="user.email" type="text" :placeholder="$t('orderEmail')" />
        </form>
        <template v-if="typeDelivery === 'Доставка НоваПошта'">

          <div :class="[isError ? 'shake--transition' : '', 'with-search']">
            <base-input class="with-search__input" v-model="cityDelivery" type="text" placeholder="Населений пункт" />
            <base-input class="with-search__input" v-model="numberDelivery" type="text" placeholder="Відділення" />
          </div>
        </template>
        <template v-else-if="typeDelivery === 'Самовивіз НоваПошта'">
          <div :class="[isError ? 'shake--transition' : '', 'with-search']">
            <base-input class="with-search__input" v-model="cityDelivery" type="text" placeholder="Населений пункт" />
            <base-input class="with-search__input" v-model="numberDelivery" type="text" placeholder="Адреса" />
          </div>
        </template>
        <template v-if="typeDelivery === 'Доставка УкрПошта'">
          <div :class="[isError ? 'shake--transition' : '', 'with-search']">
            <base-input class="with-search__input" v-model="cityDelivery" type="text" placeholder="Населений пункт" />
            <base-input class="with-search__input" v-model="numberDelivery" type="text"
              placeholder="Адреса або поштовий індекс" />
          </div>
        </template>
        <template v-else-if="typeDelivery === 'Самовивіз УкрПошта'">
          <div :class="[isError ? 'shake--transition' : '', 'with-search']">
            <base-input class="with-search__input" v-model="cityDelivery" type="text" placeholder="Населений пункт" />
            <base-input class="with-search__input" v-model="numberDelivery" type="text"
              placeholder="Адреса або поштовий індекс" />
          </div>
        </template>
        <!-- <base-input-whith-search
          v-bind:isError="isError"
          v-model:modelValue="numberDelivery"
          v-bind:options="allNumberDelivery"
        /> -->
        <button type="submit" class="form__button form__button--confirm"
          @click.stop="receiveOrderConfirmation('delivery'), modalSuccesfull = true">
          {{ $t('confirmOrder1') }}
        </button>
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
        <div class="check__delivery-title">{{ $t('deliveryPrice') }}</div>
        <div class="check__delivery-text">{{ $t('deliveryText') }}</div>
      </div>
      <div class="check__summa">
        <div class="check__summa-title"> {{ $t('pay2') }}
        </div>
        <div class="check__summa-text">{{ getTheSum }} ₴</div>
      </div>
    </div>
    <div class="modalSuccesfull" v-if="modalSuccesfull">
      {{ $t('confirmPlacingAnOrder') }}
    </div>
  </div>

  <regModal v-if="regContent" @modal="(regContent = !regContent), (authContent = true)" v-model:regContent="regContent" />
  <authModal v-if="authContent" @modal="(authContent = !authContent), (regContent = true)"
    v-model:authContent="authContent" />
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
import { Exception } from "sass";

export default {
  data() {
    return {
      v$: useVuelidate(),
      regContent: false,
      authContent: false,
      typeDelivery: "",
      cityDelivery: "",
      regionDelivery: "",
      numberDelivery: "",
      modalSuccesfull: false,
      allCityDelivery: [
        { id: 1, city: "Київ", obl: "Київська область" },
        { id: 2, city: "Вінниця", obl: "Вінницька область" },
        { id: 2, city: "Вінниця", obl: "Волинська область" },
        { id: 3, city: "Дніпро", obl: "Дніпропетровська область" },
        { id: 4, city: "Донецьк", obl: "Донецька область" },
        { id: 5, city: "Житомир", obl: "Житомирська область" },
        { id: 5, city: "Запоріжжя", obl: "Закарпатська область" },
        { id: 5, city: "Запоріжжя", obl: "Запорізька область" },
        { id: 5, city: "Івано-Франківськ", obl: "Івано-Франківськ область" },
        { id: 5, city: "Кропивницький", obl: "Кіровогра́дська область" },
        { id: 5, city: "Луганськ", obl: "Луганська область" },
        { id: 5, city: "Львів", obl: "Львівська область" },
        { id: 5, city: "Миколаїв", obl: "Миколаївська область" },
        { id: 5, city: "Одеса", obl: "Одеська область" },
        { id: 5, city: "Полтава", obl: "Полтавська область" },
        { id: 5, city: "Рівне", obl: "Рівненська область" },
        { id: 5, city: "Суми", obl: "Сумська область" },
        { id: 5, city: "Тернопіль", obl: "Тернопільська область" },
        { id: 5, city: "Харків", obl: "Харківська область" },
        { id: 5, city: "Херсон", obl: "Херсонська область" },
        { id: 5, city: "Хмельницький", obl: "Хмельницька область" },
        { id: 5, city: "Черкаси", obl: "Черкаська область" },
        { id: 5, city: "Чернівці", obl: "Чернівецька область" },
        { id: 5, city: "Чернігів", obl: "Чернігівська область" },
      ],
      payNow: "",
      cardInput: "",
      termInput: "",
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
    getArray() {
      let extractedProducts = [];
      for (let product of this.products) {
        const { summ, containerVolume, newPrice } = product;
        const item = `товар: ${product.products.title}, ємність: ${containerVolume} кількість: ${summ} шт., ціна: ${newPrice} грн.`;
        extractedProducts.push(item);
      }
      return extractedProducts.join(" ");
    },
  },
  watch: {
    modalSuccesfull(val) {
      if (val === true) {
        setTimeout(() => {
          this.modalSuccesfull = false;
        }, 3000);
      }
    },
  },
  methods: {
    sendMessage() {

      const token = "6700460046:AAHX2VEGlAkcmhXh2_S2zLvk_whH1eKghZU";
      const chatId = "@asdopklasdpkoaspodop";
      const message = `\n
📱 Замовлення:
👤 Ім'я клієнта: ${this.user.name} ${this.user.surname}
📲 Телефон: ${this.user.phone}
💸 Сума до сплати: ${this.getTheSum} грн.
⌨️ Тип оплати: ${this.payNow ? 'Реквизиты' : 'Наложка'}
🧳 Товари:
${this.getArray}

📦 Доставка:
📝 Тип доставки: ${this.typeDelivery}
🏙  Місто доставки: ${this.cityDelivery}
💠 Номер відділення: №${this.numberDelivery}
`;
      const apiUrl = `https://api.telegram.org/bot${token}/sendMessage`;

      axios
        .post(apiUrl, {
          chat_id: chatId,
          text: message,
        })
        .then((response) => {
          console.log("Сообщение успешно отправлено:", response.data);
        })
        .catch((error) => {
          console.error("Ошибка при отправке сообщения:", error.response.data);
        });
    },
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
        let urlStr = `https://eshopbackend-72da33f36405.herokuapp.com//user/edit`;
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
    async fetchOrderCreate() {
      try {
        this.isLoader = true;
        let urlStr = `https://damp-sands-00500-b961cd19fbea.herokuapp.com/order/create`;
        const response = await axios.post(urlStr, {
          name: this.user.name,
          surname: this.user.surname,
          typeDelivery: this.typeDelivery,
          deliveryAddress: `Область ${this.regionDelivery.obl} місто ${this.cityDelivery}, номер почти чи ідекс ${this.numberDelivery}`,
          typePayment: this.payNow
            ? "Оплата за реквізитами"
            : "Оплата при отриманні",
          phone: this.user.phone,
          order: [...this.products],
        });
      } catch (err) {
        console.log(err);
      } finally {
        this.isLoader = false;
      }
    },
    getCol(item) {
      return `${this.indentInThousands(item?.newPrice)} ₴ х ${item.summ} од.`;
    },
    getSum(item) {
      return this.indentInThousands(+item?.newPrice * +item.summ);
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
        // this.fetchAddOrder();
        this.fetchOrderCreate();
        this.sendMessage();
        localStorage.removeItem(`order`);
      }
    },
  },
  validations() {
    return {
      user: {
        name: { required, minLength: minLength(3) },
        surname: { required, minLength: minLength(3) },
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
.type-of-delivery {
  @media (max-width: 980px) {
    margin-bottom: 80px;
  }
}

@keyframes addedToCart {
  from {
    top: 0px;
  }

  to {
    top: 75px;
  }
}

.modalSuccesfull {
  position: fixed;
  top: 75px;
  right: 200px;
  background: #15ff00;
  padding: 20px;
  z-index: 15;
  border-radius: 10px;
  color: #292929;
  animation: addedToCart 1.2s;

  @media (max-width: 540px) {
    right: 20px;
  }
}

.with-search {
  @media (max-width: 980px) {
    display: flex;
    flex-direction: column;
    column-gap: 10px !important;

    input {
      font-size: 16px;
      max-width: 90%;
      padding: 15px;
    }
  }
}

.row {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin-bottom: 40px;

  @media (max-width: 980px) {
    grid-template-columns: repeat(1, 1fr) !important;
  }
}

input {
  outline: none;
}

.with-search {
  display: flex;
  column-gap: 30px;

  &__input {
    margin: 35px 0 30px;
    border: 1px solid rgb(0, 0, 0);
    font-size: 0.875rem;
    padding: 14px 12px;
    color: rgba(41, 41, 41, 0.5);
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    max-width: 245px;
    box-shadow:
      0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);

    @media screen and (max-width: 570px) {
      font-size: 0.75rem;
      padding: 8px 6px;
      line-height: normal;
      font-style: normal;
    }

    @media (min-width: 640px) {
      font-size: 0.875rem;
      line-height: 1.25rem;
    }

    @media screen and (max-width: 570px) {
      font-size: 0.625rem;
      padding: 8px 6px;
      max-width: 140px;
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

  &__right {}

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
    object-fit: contain;

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

  &__left {}

  &__right {}

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

.radio-input:checked+.radio-label .radio-inner-circle {
  border-color: #000000;
}

.radio-input:checked+.radio-label .radio-inner-circle::after {
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
