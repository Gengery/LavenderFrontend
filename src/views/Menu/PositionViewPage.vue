<script lang="ts">
    import TagShow from '@/components/menu_page_components/positions_page_components/TagShow.vue';
import ReviewAdder from '@/components/reviews/ReviewAdder.vue';
import ReviewItem from '@/components/reviews/ReviewItem.vue';
    import { MenuPositionResponseModel } from '@/responses/MenuPositionResponseModel';
import { ReviewResponseModel } from '@/responses/ReviewResponseModel';
    import router from '@/router';
    import { ImageService } from '@/services/ImagesService';
    import { MenuPositionsService } from '@/services/MenuPositionsService';
import { ReviewsService } from '@/services/ReviewsService';
    import { defineComponent, ref } from 'vue';

    export default defineComponent({
        components: {
            TagShow,
            ReviewAdder,
            ReviewItem
        },

        setup() {
            const positionsService = MenuPositionsService.getInstance();
            const imagesService = ImageService.getInstance();
            const position = ref<MenuPositionResponseModel>({});
            const imgUrl = ref("");
            const positionId = parseInt(router.currentRoute.value.params.positionId as string);
            const loadInfo = async () => {
                position.value = await positionsService.getPositionById(positionId);
                imgUrl.value = await imagesService.getImage(position.value.imageName!);
            };
            loadInfo();

            let skip = 0;
            const take = 2;
            const reviewsService = ReviewsService.getInstance();
            const reviews = ref([] as ReviewResponseModel[]);
            const loadSomeReviews = async () => {
                reviews.value.splice(reviews.value.length, 0, ...await reviewsService.getReviewsForPosition(positionId, take, skip));
                skip += take;
            }
            loadSomeReviews();

            return {
                position,
                imgUrl,
                positionId,
                loadInfo,
                // --- //
                reviews,
                loadSomeReviews
            }
        }
    })
</script>


<template>
    <div id="main">
        <div id="card" class="st-brd">
            <div id="composition">
                <img class="position-image st-brd" :src="imgUrl">
                <div>
                    <span>{{ position.name }}</span>
                    <span> - {{ position.price }} руб.</span>
                </div>
                <div class="tag-container">
                    <tag-show v-for="tag in position.tags" :key="tag" :tagName="tag"></tag-show>
                </div>
                <hr>
                <p>Вес: {{ position.weight }} г.</p>
                <p>Белки: {{ position.proteins }} г.</p>
                <p>Жиры: {{ position.fats }} г.</p>
                <p>Углеводы: {{ position.carbohydrates }} г.</p>
                <p v-for="(str, index) in position.composition" :key="index">{{ str }}</p>
            </div>
        </div>
        <review-adder :positionId="positionId"/>
        <p class="centered">Отзывы</p>
        <review-item v-for="rev in reviews"
         :key="rev.id"
         :review="rev"></review-item>
        <p class="more" @click="loadSomeReviews">Больше отзывов...</p>
    </div>
</template>


<style scoped>
    #main {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        padding: 30px;
    }

    #card {
        width: 80%;
        padding: 0;
        display: flex;
        flex-direction: column;

        & > img {
            padding: 0;
            border-top: none;
            border-left: none;
            border-right: none;
            border-radius: 0;
        }
    }

    #composition {
        display: flex;
        flex-direction: column;
        padding: 50px;

        & > * {
            margin-top: 10px;
            margin-bottom: 10px;
        }
    }

    .centered {
        margin: auto;
    }

    .position-image {
        width: 100%;
        aspect-ratio: 2/1;
    }

    .tag-container {
        display: inline-flex;

        &>* {
            margin-right: 10px;
        }
    }

    .more {
        cursor: pointer;
        padding: 20px;
        width: 80%;
        background-color: white;
        text-align: center;
        transition: 0.2s;

        &:hover {
            background-color: rgb(188, 202, 214);
        }
    }
</style>