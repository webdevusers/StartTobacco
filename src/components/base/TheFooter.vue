<template>
  <div class="footer">
    <div class="footer__wrap wrap">
      <div class="footer-text">
        {{ $t('subscribeText') }}
      </div>
      <div class="footer-subscribe">
        <div class="footer-subscribe-input">
          <input type="text" placeholder="Ваше email" v-model="request" />
        </div>
        <div class="footer-subscribe-button" @click="showModal">
          <p>{{ $t('subscribeBtn')}}</p>
        </div>
      </div>
    </div>
  </div>
  <div class="privacy">
    <div class="privacy__wrap wrap">
      <h3>{{  $t('privacypolicy') }}</h3>
    </div>
  </div>
  <div class="modalSuccesfull" v-if="created">
    {{ $t('newsNotify') }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      request: "",
      created: false,
    };
  },
  methods: {
    showModal() {
      this.created = true,
      this.request = ''
    }

  },
  watch: {
    created(val) {
      if (val === true) {
        setTimeout(() => {
          this.created = false;
        }, 3000);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
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
  right: 100px;
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
.footer {
  &__wrap {
    padding: 15px 10px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);

    @media (max-width: 968px) {
      grid-template-columns: repeat(1, 1fr);
    }

    grid-gap: 40px;
    align-items: center;
  }

  &-text {
    font-size: 18px;
    text-align: center;
    font-family: tobacco;
    color: white;

    @media (max-width: 1220px) {
      font-size: 14px;
    }

    @media (max-width: 968px) {
      max-width: 70%;
      margin: 0 auto;
      font-size: 16px;
    }
  }

  background: #292929;

  &-subscribe {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;

    @media (max-width: 570px) {
      display: flex;
      flex-direction: row;
      justify-content: center;
    }

    @media (max-width: 968px) {
      margin: 0 auto;
    }

    &-input {
      input {
        border-radius: 5px 0px 0px 5px;
        max-width: 545px;
        padding: 12.5px 12px;
        border: none;
        width: 545px;

        &:focus {
          outline: none;
          border: none;
        }

        @media (max-width: 1220px) {
          max-width: 480px;
        }

        @media (max-width: 968px) {
          max-width: 360px;
        }

        @media (max-width: 570px) {
          //   max-width: 250px;
          width: 100%;
        }
      }
    }

    &-button {
      background: #efca00;
      border-radius: 0px 5px 5px 0px;
      padding: 13px 20px;
      cursor: pointer;
      user-select: none;
      font-family: tobacco;
      font-size: 15px;
      text-align: center;

      @media (max-width: 510px) {
        padding: 13px 10px;
      }

      @media (max-width: 570px) {
        max-width: 120px;
        width: 100%;
      }

      @media screen {}
    }
  }
}

.privacy {
  &__wrap {
    padding: 10px 15px;

    h3 {
      font-family: tobacco;

      @media (max-width: 968px) {
        font-size: 14px;
      }
    }
  }
}
</style>
