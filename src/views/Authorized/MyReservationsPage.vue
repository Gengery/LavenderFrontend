<script lang="ts">
import ReservationItem from '@/components/booker/ReservationItem.vue';
import { ReservationModel } from '@/models/ReservationModel';
import { ReservationsService } from '@/services/ReservationsService';
import { defineComponent, ref } from 'vue';

    export default defineComponent({
        components:{
            ReservationItem
        },

        setup() {
            const resService = ReservationsService.getInstance();
            const reservations = ref([] as ReservationModel[]);
            const onlyActual = ref(true);
            
            const loadReservationsForUser = async () => {
                reservations.value = await resService.getForUser(onlyActual.value);
            };
            loadReservationsForUser();

            return {
                reservations,
                onlyActual,
                loadReservationsForUser
            }
        }
    });
</script>


<template>
    <div id="main">
        <div class="actualer st-brd">
            <span>Только актуальные</span>
            <input type="checkbox" v-model="onlyActual" @change="loadReservationsForUser">
        </div>
        <reservation-item v-for="(res, index) in reservations"
         :reservation="res"
         :key="index"
         class="res-width"/>
    </div>
</template>


<style>
    #main {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
    }

    .res-width {
        width: 600px;
    }

    .actualer {
        display: flex;
        align-items: center;

        & > span {
            margin-right: 10px;
        }

        & > input {
            width: 25px;
            height: 25px;
        }
    }
</style>