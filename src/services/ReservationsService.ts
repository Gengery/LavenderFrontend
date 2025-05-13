import { ReservationModel } from "@/models/ReservationModel";
import store from "@/store";
import { GET_API_LAVENDER_URL } from '@/store/index';

export class ReservationsService {
    private static instance: ReservationsService;
    private domain;

    private constructor() {
        this.domain = store.getters[GET_API_LAVENDER_URL];
    }

    public static getInstance() {
        if (!ReservationsService.instance)
            ReservationsService.instance = new ReservationsService();
        return ReservationsService.instance;
    }

    public async getActualReservations():Promise<ReservationModel[]> {
        const response = await fetch(`${this.domain}/api/reservations/all/actual`, {
            credentials: 'include'
        });
        if (!response.ok)
            return [];
        const json = await response.json();
        return json as ReservationModel[];
    }

    public async addReservation(request: ReservationModel):Promise<boolean> {
        const response = await fetch(`${this.domain}/api/reservations`, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(request)
        });
        return response.ok;
    }

    public async getForDate(date: Date, table: number) { 
        const query = new URLSearchParams({
            date: date.toUTCString(),
            tableId: table.toString()
        });

        const response = await fetch(`${this.domain}/api/reservations/date?${query.toString()}`, {
                credentials:'include'
            });
        
        const json = await response.json();
        return json as ReservationModel[];
    }

    public async getForUser(onlyActual: boolean) {
        const query = new URLSearchParams({
            onlyActual: onlyActual.toString()
        });

        const response = await fetch(`${this.domain}/api/reservations/all/user?${query.toString()}`, {
                credentials:'include'
            }
        );

        const json = await response.json();
        return json as ReservationModel[];
    }

    public async deleteById(id: number) {
        const response = await fetch(`${this.domain}/api/reservations/admin/${id}`, {
                method: 'DELETE',
                credentials: 'include'
            }
        );

        return response.ok;
    }
}