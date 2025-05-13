<script lang="ts">
    import { defineComponent, PropType, ref } from 'vue';
    import { MenuPositionResponseModel } from '@/responses/MenuPositionResponseModel';
    import { ImageService } from '@/services/ImagesService';
    import TagShow from './TagShow.vue';

    export default defineComponent({
        components: {
            TagShow
        },

        props: {
            model: {
                type: Object as PropType<MenuPositionResponseModel>,
                required: true
            }
        },

        setup(props) {
            const imageService = ImageService.getInstance();
            const imageSrc = ref("");
            imageService.getImage(props.model.imageName!).then(src => imageSrc.value = src);

            return {
                imageSrc
            };
        }
    });
</script>


<template>
    <div class="menu-short-container st-brd st-back">
        <img class="st-brd position-image" :src="imageSrc">
        <div class="composition-box">
            <p>{{ model.name }}</p>
            <p>{{ model.price }} руб.</p>
            <div class="tag-container">
                <tag-show v-for="(tag, index) in model.tags" :tagName="tag" :key="index"></tag-show>
            </div>
            <p v-for="(str, index) in model.composition" :key="index">{{ str }}</p>
        </div>
        <slot>
            
        </slot>
    </div>
</template>


<style scoped>
    .menu-short-container {
        position: relative;
        display: flex;
        flex-direction: column;
        height: 400px;
        width: 320px;
        overflow: hidden;
        margin: 20px;
        padding: 0;
        transition: 0.2s;
        
        &:after {
            content: "";
            position: absolute;
            width: 100%;
            height: 100%;
            background-image: linear-gradient(transparent 70%, rgba(76, 73, 73, 0.638));
        }

        &:hover {
            transform: scale(1.05);
            background-color: rgb(235, 205, 160);
        }
    }

    .composition-box {
        display: flex;
        flex-direction: column;
        padding: 20px;
    }

    .tag-container {
        width: 100%;
    }

    .position-image {
        width: 100%;
        aspect-ratio: 2/1;
        border-radius: 0;
        border-top: none;
        border-left: none;
        border-right: none;
        padding: 0;
    }
</style>