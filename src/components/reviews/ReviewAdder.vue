<script lang="ts">
import { ReviewRequestModel } from '@/requests/ReviewRequestModel';
import { ReviewsService } from '@/services/ReviewsService';
import { defineComponent, reactive } from 'vue';
import emptyStar from '@/assets/images/star_empty.png';
import fullStar from '@/assets/images/star_full.png';

    export default defineComponent({
        props: {
            positionId: {
                type: Number,
                required: true
            }
        },

        setup(props) {
            const reviewsService = ReviewsService.getInstance();
            const review = reactive({} as ReviewRequestModel);
            review.mark = 5;
            review.text = "";
            
            const addReview = async () => {
                review.positionId = props.positionId;
                if (!await reviewsService.addReview(review))
                    alert("Отзыв не добавлен");
                else
                    location.reload();
            };

            const setMark = (val: number) => {
                review.mark = val;
            };

            const checkSrc = (index: number):string => {
                if (index <= review.mark!)
                    return fullStar;
                return emptyStar;
            }

            return {
                review,
                addReview,
                setMark,
                checkSrc
            }
        }
    });
</script>


<template>
    <div id="mainOfAdder" class="st-brd">
        <div id="wrapper">
            <div id="markSelector">
                <span>Оценка:</span>
                <img v-for="index in 5"
                :key="index" 
                class="mark"
                :src="checkSrc(index)"
                @click="() => setMark(index)">
            </div>
            <textarea v-model="review.text"
            placeholder="Текст отзыва"
            class="text st-brd"></textarea>
            <button class="st-brd st-button st-input"
            @click="addReview"
            style="align-self: flex-end;">Отправить</button>
        </div>
    </div>
</template>


<style scoped>
    #markSelector {
        display: flex;
        justify-content: center;
        margin: 10px;
        align-self: flex-start;
    }

    #mainOfAdder {
        width: 80%;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 10px;
        padding: 40px;
    }

    #wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 80%;
    }

    .mark {
        width: 40px;
    }

    .text {
        width: 100%;
        margin: 10px;
        padding: 15px;
    }
</style>