<script lang="ts">
import ReservationItem from '@/components/booker/ReservationItem.vue';
import DeleteIcon from '@/components/specialui/DeleteIcon.vue';
import { ReservationModel } from '@/models/ReservationModel';
import { ReservationsService } from '@/services/ReservationsService';
import { defineComponent, ref } from 'vue';

    export default defineComponent({
        components: {
            ReservationItem,
            DeleteIcon
        },

        setup() {
            const reservationsService = ReservationsService.getInstance();
            const reservations = ref([] as ReservationModel[]);

            const deleteReservation = async (id: number) => {
                const result = await reservationsService.deleteById(id);
                if (!result)
                    alert('Не удалось удалить бронь');
                location.reload();
            };

            const loadReservations = async () => {
                reservations.value = await reservationsService.getActualReservations();
            };
            loadReservations();

            return  {
                reservations,
                deleteReservation
            };
        }
    });

</script>


<template>
    <div id="resMain">
        <span v-if="reservations.length == 0">Актуальных бронирований нет</span>
        <reservation-item v-for="res in reservations"
         :key="res.id" 
         class="res-item"
         :reservation="res">
            <delete-icon class="deleter"
             @click="() => deleteReservation(res.id)"/>
        </reservation-item>
    </div>
</template>


<style>
    #resMain {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .deleter {
        width: 36px;
        position: absolute;
        background-color: white;
        right: 5px;
        bottom: 5px;
    }

    .res-item {
        width: 600px;
    }
</style>