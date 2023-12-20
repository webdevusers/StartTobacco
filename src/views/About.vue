<template>
    <div class="about">
        <div class="about__wrap wrap">
            <div class="about-logo">
                <img src="/images/logo.png" alt="" />
            </div>
            <div class="about-text">
                <p>
                    <span>{{ $t('aboutText1')}}</span> <b>{{ $t('aboutText2')}}</b> {{ $t('aboutText3')}}<br><br>
                    {{ $t('aboutText4')}}<br><br>
                    {{ $t('aboutText5')}} <span>{{ $t('aboutText6')}}</span> {{ $t('aboutText7')}} <br><br>
                </p>
            </div>
        </div>
    </div>
</template>
<script>

</script>
<style lang="scss" scoped>
.about__wrap {
    padding: 100px 0;
}
.about-logo {
    max-width: 300px;
    width: 100%;
    margin-bottom: 40px;
    img {
        width: 100%;
    }
}
.about-text {
    padding-bottom: 60px;
    p {
        font-family: tobacco;
        span {
            font-weight: 600;
        }
        b {
            font-weight: 400;
            color: #efca00;
        }
    }
}
</style>