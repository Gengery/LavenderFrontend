<script>
    import BookerMapper from '@/components/booker/BookerMapper.vue';
    import BookerDataField from '@/components/booker/BookerDataField.vue';
    import { ref } from 'vue';

    export default {
        components: {
            BookerMapper,
            BookerDataField
        },

        setup() {
            let date = ref(Date.now());
            let table = ref(1);
            const bookerFieldMarker = ref(null);
            const scrollToInput = () => {
                const marker = document.getElementById("bookerMarker");
                marker.scrollIntoView({ behavior: 'smooth' });
            }

            return {
                date,
                table,
                bookerFieldMarker,
                scrollToInput
            }
        }
    }
</script>


<template>
    <div id="bookPageMain">
        <BookerMapper @mapclick="(i) => {
            table = i;
            scrollToInput();
        }"/>
        <hr id="bookerMarker"/>
        <BookerDataField
            v-model:tableNumber="table"
            v-model:selectedDate="date"/>
    </div>
</template>


<style>
    #bookPageMain {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
</style>