<template>
    <header class="header">
        <nav class="header__nav">
            <router-link to="/" class="header__link">Главная</router-link>
            <router-link :to="{name: 'article'}" class="header__link" :class="{'router-link-active': route.params.id}">
                Добавить статью
            </router-link>
        </nav>
    </header>
</template>

<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();
</script>

<style lang="less">
.header {
    padding: 16px 10px;
    display: flex;
    justify-content: center;
    box-shadow: 0px 0px 8px 5px rgba(126, 128, 129, 0.2);

    &__nav {
        width: 100%;
        max-width: 400px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    &__link {
        padding: 10px;
        display: flex;
        justify-content: center;
        flex: 1;
        color: var(--color-main);
        border-radius: 5px;
        transition: background .3s ease, color .3s ease;

        &.router-link-active {
            color: #FFF;
            background-color: var(--color-main);
        }

        &:first-child {
            margin-right: 20px;
        }
    }
}
</style>