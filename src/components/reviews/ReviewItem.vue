<script lang="ts">
import { ReviewResponseModel } from '@/responses/ReviewResponseModel';
import { defineComponent, PropType } from 'vue';
import emptyStar from '@/assets/images/star_empty.png';
import fullStar from '@/assets/images/star_full.png';

    export default defineComponent({
        props: {
            review: {
                type: Object as PropType<ReviewResponseModel>,
                required: true
            }
        },

        setup(props) {
            const checkSrc = (index: number):string => {
                if (index <= props.review.mark)
                    return fullStar;
                return emptyStar;
            }

            return {
                checkSrc
            }
        }
    });
</script>


<template>
    <div class="st-brd" id="reviewItemMain">
        <div id="wrapper">
            <div id="markSelector">
                <span> {{ `${review.userName}: ` }}</span>
                <img v-for="index in 5"
                :key="index" 
                class="mark"
                :src="checkSrc(index)">
            </div>
            <p class="st-brd text">{{ review.text }}</p>
        </div>
    </div>
</template>


<style>
    #reviewItemMain {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 80%;
        padding: 15px;
        margin: 5px;
    }

    #markSelector {
        display: flex;
        justify-content: center;
        margin: 10px;
        align-self: flex-start;
    }

    .mark {
        width: 40px;
    }

    #wrapper {
        width: 80%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }

    .text {
        width: 100%;
        padding: 15px;
    }
</style>