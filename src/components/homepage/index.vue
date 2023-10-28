<template>
    <banner />
    <div class="idx">
        <div class="idx__wrap wrap">
            <popularItems />
        </div>
        <newItems />
        <div class="idx__wrap wrap">
            <discount />
            <articleBlock />
            <reviews />
        </div>
    </div>
</template>

<script setup>
import popularItems from '../homepage/particles/popular.vue'
import banner from '../base/TheBanner.vue'
import newItems from '../homepage/particles/newItems.vue'
import discount from '../homepage/particles/discount.vue'
import articleBlock from '../homepage/particles/article.vue'
import reviews from '../homepage/particles/reviews.vue'
</script>

<style lang="scss" scoped>

</style>