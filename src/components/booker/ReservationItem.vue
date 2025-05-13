<script lang="ts">
import { ReservationModel } from '@/models/ReservationModel';
import { PropType } from 'vue';
import { defineComponent } from 'vue';

    export default defineComponent({
        props: {
            reservation: {
                type: Object as PropType<ReservationModel>,
                required: true
            }
        }
    });
</script>


<template>
    <div id="resItemMain" class="st-brd">
        <span>Пользователь #{{ reservation.userId }}</span>
        <div class="dater">
            <span>{{ new Date(reservation.timeOfStart!).toDateString() }}</span>
            <span>{{ new Date(reservation.timeOfStart!).toTimeString().substring(0, 5) }} - 
                {{ new Date(reservation.timeOfEnd!).toTimeString().substring(0, 5) }}</span>
        </div>
        <span>Столик #{{ reservation.tableId }}</span>
        <slot>
            
        </slot>
    </div>
</template>


<style>
    #resItemMain {
        position: relative;
        display: flex;
        flex-direction: column;
        margin: 10px;
        padding: 10px;
    }

    .dater {
        display: flex;
        justify-content: space-between;
    }
</style>