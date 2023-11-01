<template>
  <div class="footer">
    <div class="footer__wrap wrap">
      <div class="footer-text">
        Підпишітся на новини Start Tobacco. Завдяки підписці ви зможете
        отримувати інформацію о новинах, знижках, та інше.
      </div>
      <div class="footer-subscribe">
        <div class="footer-subscribe-input">
          <input type="text" placeholder="Ваше email" v-model="request" />
        </div>
        <div class="footer-subscribe-button">
          <p>Підписатися</p>
        </div>
      </div>
    </div>
  </div>
  <div class="privacy">
    <div class="privacy__wrap wrap">
      <h3>© 2023 Start Tobacco. Всі права захищені.</h3>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      request: "",
    };
  },
};
</script>

<style lang="scss" scoped>
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
      display: grid;
      grid-template-columns: 60% 1fr;
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
      @media (max-width: 510px) {
        padding: 13px 10px;
      }
      @media (max-width: 570px) {
        //   max-width: 250px;
        width: 100%;
      }
      @media screen {
      }
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
