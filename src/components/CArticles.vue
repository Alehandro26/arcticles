<template>
    <ul class="list">
        <li v-for="item in props.list" :key="item.id" class="list__item">
            <p class="list__text">{{ item.text }}</p>
            <button class="list__button" @click="changeAcrticle(item.id)">Редактировать</button>
        </li>
    </ul>
</template>

<script setup>
import { useRouter } from 'vue-router';


const router = useRouter();
const props = defineProps({
    list: {
        type: Object,
        default: () => { }
    }
})

function changeAcrticle(id) {
    router.push({name: 'article', params: { id }})
}
</script>

<style lang="less">
.list {
    width: 100%;

    &__item {
        &:not(:last-child) {
            margin-bottom: 20px;
            padding-bottom: 10px;
            border-bottom: 1px solid rgba(126, 128, 129, 0.2);
        }

        &:nth-child(3n + 1) {
            .list__text {
                border-left: 6px solid #f94d00;
            }
        }

        &:nth-child(3n + 2) {
            .list__text {
                border-left: 6px solid #c1db3c;
            }
        }

        &:nth-child(3n + 3) {
            .list__text {
                border-left: 6px solid #4b81bf;
            }
        }
    }

    &__text {
        padding-left: 20px;
    }

    &__button {
        padding: 10px;
        margin-top: 20px;
        color: #FFF;
        background-color: var(--color-main);
        border-radius: 5px;
        cursor: pointer;
        transition: transform .3s ease;;

        &:hover {
            transform: scale(1.06);
        }
    }
}
</style>