<template>
  <div class="texts">
    <div class="title">
      StartTobacco
    </div>
    <div class="article">
      <div class="article__wrap wrap">
        <div class="article-img">
          <img src="/images/article-1.png" alt="">
        </div>
        <div class="article-text">
          <div class="article-text__title">
            <b>{{ $t('articletexttitle1') }}</b> {{ $t('articletexttitle2') }}
          </div>
          <div class="article-text__desc">
            {{ $t('articletextdesc1') }}<b>{{ $t('articletextdesc2') }}</b>, {{ $t('articletextdesc3') }}<br>
            {{ $t('articletextdesc4') }}<b>{{ $t('articletextdesc5') }}</b>{{ $t('articletextdesc6') }}<br>
            {{ $t('articletextdesc7') }}
          </div>
        </div>
      </div>
    </div>
    <div class="article">
      <div class="article__wrap wrap reverse">
        <div class="article-text">
          <div class="article-text__title">
            <b>{{ $t('articletexttitle3') }}</b>{{ $t('articletexttitle4') }}
          </div>
          <div class="article-text__desc">
            {{ $t('articletextdesc8') }} <b>{{ $t('articletextdesc9') }}</b>.
            {{ $t('articletextdesc10') }}
          </div>
        </div>
        <div class="article-img">
          <img src="/images/article-2.png" alt="">
        </div>
      </div>
    </div>
    <div class="article">
      <div class="article__wrap wrap">
        <div class="article-img">
          <img src="/images/article-3.png">
        </div>
        <div class="article-text">
          <div class="article-text__title">
            {{ $t('articletexttitle5') }}
          </div>
          <div class="article-text__desc">
            {{ $t('articletextdesc11') }}
          </div>
          <div class="article-text__list">
            <li>{{ $t('articletextlist1') }}</li>
            <li>{{ $t('articletextlist2') }}</li>
            <li>{{ $t('articletextlist3') }}</li>
            <li>{{ $t('articletextlist4') }}</li>
            <li>{{ $t('articletextlist5') }}</li>
            <li>{{ $t('articletextlist6') }}</li>
            <li>{{ $t('articletextlist7') }}</li>
          </div>
          <div class="article-text__desc">
            {{ $t('articletextdesc12') }}
          </div>
          <div class="article-text__list">
            <li>{{ $t('articletextlist8') }}</li>
            <li>{{ $t('articletextlist9') }}</li>
            <li>{{ $t('articletextlist10') }}</li>
            <li>{{ $t('articletextlist11') }}</li>
            <li>{{ $t('articletextlist12') }}</li>
          </div>
          <div class="article-text__desc">
            {{ $t('articletextdesc13') }}
          </div>
        </div>
      </div>
    </div>
    <div class="article">
      <div class="article__wrap wrap reverse">
        <div class="article-text">
          <div class="article-text__title">
            {{ $t('articletexttitle6') }}
          </div>
          <div class="article-text__desc">
            {{ $t('articletextdesc14') }}
          </div>
        </div>
        <div class="article-img">
          <iframe width="560" height="315" src="https://www.youtube.com/embed/DzMWv3KYc1Q?si=tAGbRTpAVt1sVnaS"
            title="YouTube video player" frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen></iframe>
        </div>
      </div>
    </div>
    <div class="article">
      <div class="article__wrap wrap">
        <div class="article-img">
          <img src="/images/article-4.png" alt="">
        </div>
        <div class="article-text">
          <div class="article-text__title">
            {{ $t('articletexttitle7') }}
          </div>
          <div class="article-text__desc">
            {{ $t('articletextdesc15') }}
          </div>
        </div>
      </div>
    </div>
    <div class="article">
      <div class="article__wrap wrap reverse">
        <div class="article-text">
          <div class="article-text__title">
            {{ $t('articletexttitle8') }}
          </div>
          <div class="article-text__desc">
            {{ $t('articletextdesc16') }}
          </div>
        </div>
        <div class="article-img">
          <img src="/images/article-5.png" alt="">
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.ytp-impression-link {
  display: none !important;
}
.texts {
  padding-top: 50px;
  .title {
    text-align: center;
    font-family: 'tobacco';
    font-size: 24px;
  }
}
.article {
  &__wrap {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    margin-bottom: 100px;
    margin-top: 100px;
    gap: 40px;

    @media (max-width: 1024px) {
      flex-direction: column;

      &.reverse {
        flex-direction: column-reverse;
      }

      margin-top: 40px;
      margin-bottom: 40px;
      padding: 20px !important;
    }
  }

  &-img {
    min-width: 50%;

    img {
      border-radius: 15px;
    }

    video {
      border-radius: 15px;
    }

    iframe {
      max-width: 100%;
      margin: 0 auto;

      @media (max-width: 590px) {
        height: 190px;
      }
    }

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
    background: white;
    border-radius: 5px;

    &__title {
      font-size: 20px;
      color: black;
      margin-bottom: 20px;
      position: relative;

      &::before {
        position: absolute;
        content: "";
        background: #EFCA00;
        width: 105px;
        height: 2px;
        bottom: -10px;
      }
    }

    &__desc {
      font-size: 16px;
      color: black;
      margin-bottom: 16px;
    }

    &__list {
      margin-bottom: 16px;

      li::marker {
        color: #EFCA00;
      }
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
}</style>