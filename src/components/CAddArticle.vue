<template>
    <div class="add">
        <textarea rows="8" placeholder="Введите текст" v-model="text" class="add__text"></textarea>
        <button v-if="!willChangeArticle" class="add__button" @click="addArticle" :disabled="!text">Добавить</button>
        <button v-else class="add__button" @click="editArticle" :disabled="checkText">Изменить</button>
    </div>
</template>

<script setup>
import {computed, onMounted, ref} from 'vue';

const emits = defineEmits(['add', 'change']);
const props = defineProps({
    article: {
        type: String,
        default: '',
    }
})

const checkText = computed(() => {
    return props.article === text.value || !text.value;
})

const text = ref('');
const willChangeArticle = ref(false);

onMounted(() => {
    loadTextArticle();
})

function loadTextArticle() {
    if (props.article) {
        text.value = props.article;
        willChangeArticle.value = true;
    }
}

function addArticle() {
    emits('add', text.value);
    text.value = '';
}

function editArticle() {
    emits('change', text.value);
    text.value = '';
}
</script>

<style lang="less">
.add {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    &__text {
        padding: 10px;
        width: ~'min(100%, 700px)';
        border-radius: 5px;
        font-size: 14px;
    }

    &__button {
        margin-top: 20px;
        padding: 10px;
        background: var(--color-main);
        border-radius: 5px;
        color: #fff;
        cursor: pointer;
        transition: transform .3s ease;

        &:not(:disabled):hover {
            transform: scale(1.06);
        }

        &:disabled {
            opacity: 0.8;
            cursor: not-allowed;
        }
    }
}
</style>