<script lang="ts">
    import { ReservationModel } from '@/models/ReservationModel';
import router from '@/router';
import { ReservationsService } from '@/services/ReservationsService';
import { defineComponent, ref, watch } from 'vue';

    export default defineComponent({
        props: {
            tableNumber: {
                type: Number,
                required: true
            }
        },
        
        emits: {
            'update:selectedDate': (newValue: Date) => true
        },

        setup(props, { emit }) {
            const resService = ReservationsService.getInstance();
            const reservations = ref([] as ReservationModel[]);
            const selectedDate = ref(new Date().toISOString().substring(0, 10));
            const selectedStart = ref('00:00');
            const selectedEnd = ref('00:00');

            const onDateInput = (event: Event) => {
                emit('update:selectedDate', new Date(selectedDate.value));
            };

            const getReservationsForDate = async () => {
                reservations.value = await resService.getForDate(new Date(selectedDate.value), props.tableNumber);
            };

            const addReservation = async () => {
                const newRes:ReservationModel = {
                    timeOfStart: `${selectedDate.value}T${selectedStart.value}`,
                    timeOfEnd: `${selectedDate.value}T${selectedEnd.value}`,
                    tableId: props.tableNumber,
                    userId: -1
                };
                const result = await resService.addReservation(newRes);
                if (!result)
                    alert('Не забронировано!!!');
                else
                    router.push('my-reservations');
            };
            
            watch(() => props.tableNumber, (newTable) => getReservationsForDate());

            return {
                selectedDate,
                selectedStart,
                selectedEnd,
                onDateInput,
                reservations,
                getReservationsForDate,
                addReservation
            }
        }
    });

</script>


<template>
    <div id="bookerFieldMain" class="st-brd">
        <div class="booker-label">
            <span>Номер столика: </span>
            <input class="booker-input st-brd" :value="tableNumber" disabled/>
        </div>
        <div class="booker-label">
            <span>Забронировать на: </span>
            <input class="booker-input st-brd" type="date" v-model="selectedDate" @change="getReservationsForDate" @input="onDateInput"/>
        </div>
        <div class="booker-label">
            <span>С: </span>
            <input class="booker-input st-brd" type="time" v-model="selectedStart" @input="onDateInput"/>
        </div>
        <div class="booker-label">
            <span>До: </span>
            <input class="booker-input st-brd" type="time" v-model="selectedEnd" @input="onDateInput"/>
        </div>
        <button @click="addReservation" class="st-brd st-input st-button">Записаться</button>

        <div v-if="reservations.length > 0" id="reserved" class="st-brd">
            <span>Уже занято:</span>
            <span v-for="res in reservations" 
            :key="res.id">
            {{ `${new Date(res.timeOfStart!).toLocaleTimeString().substring(0, 5)}
             - ${new Date(res.timeOfEnd!).toLocaleTimeString().substring(0, 5)}` }}</span>
        </div>
    </div>
</template>

<style>
    #bookerFieldMain {
        display: flex;
        flex-direction: column;
        align-items: flex-end;

        padding: 50px;
        margin: 20px;
    }

    .booker-input {
        width: 400px;
        padding: 20px;
    }

    .booker-label {
        margin: 10px;

        &>input {
            text-align: center;
        }
    }

    #reserved {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        margin: 30px;

        &>span {
            white-space: nowrap;
            margin: 5px;
        }
    }
</style>