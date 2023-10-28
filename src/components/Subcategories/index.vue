<template>
    <banner />
    <div class="idx">
        <div class="idx__wrap wrap">
            <content />
            <articleBlock />
            <reviews />
        </div>
    </div>
</template>

<script setup>
import banner from '../base/TheBanner.vue'
import content from './particles/subcategoryPage.vue'
import articleBlock from '../homepage/particles/article.vue'
import reviews from '../homepage/particles/reviews.vue'
</script>

<style lang="scss" scoped>

</style>