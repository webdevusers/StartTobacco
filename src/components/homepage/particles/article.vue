<template>
  <div class="article">
    <div class="article__wrap wrap">
      <div class="article-img">
        <img src="/images/article-block.png" alt="" />
      </div>
      <div class="article-text">
        <div class="article-text__title">What is Lorem Ipsum?</div>
        <div class="article-text__desc">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.article {
  &__wrap {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    margin-bottom: 100px;
    margin-top: 100px;
    @media (max-width: 1024px) {
      grid-template-columns: repeat(1, 1fr);
    }
  }
  &-img {
    @media (max-width: 1024px) {
      max-width: 600px;
      margin: 0 auto;
      width: 100%;
      img {
        width: 100%;
        object-fit: cover;
      }
    }
  }
  &-text {
    font-family: tobacco;
    background: #292929;
    border-radius: 5px;
    padding: 20px 48px;
    &__title {
      font-size: 20px;
      color: #efca00;
      margin-bottom: 20px;
    }
    &__desc {
      font-size: 16px;
      color: white;
    }
    @media (max-width: 1024px) {
      max-width: 600px;
      margin: 0 auto;
    }
    @media (max-width: 510px) {
      &__title {
        font-size: 16px;
      }
      &__desc {
        font-size: 14px;
      }
    }
  }
}
</style>
