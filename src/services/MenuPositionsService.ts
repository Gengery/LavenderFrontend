import { MenuFilterModel } from "@/models/MenuFilterModel";
import { MenuPositionRequestModel } from "@/requests/MenuPositionRequestModel";
import { MenuPositionResponseModel } from "@/responses/MenuPositionResponseModel";
import store from "@/store";
import { GET_API_LAVENDER_URL } from '@/store/index';

export class MenuPositionsService {
    private static instance: MenuPositionsService;
    private domain;

    private constructor() {
        this.domain = store.getters[GET_API_LAVENDER_URL];
    }

    public static getInstance() {
        if (!this.instance)
            this.instance = new MenuPositionsService();
        return MenuPositionsService.instance;
    }

    public async getListOfMenuPositions():Promise<MenuPositionResponseModel[]> {
        const response = await fetch(`${this.domain}/api/menu/positions/all`)
        const json = await response.json();
        return json as MenuPositionResponseModel[];
    }

    public async addMenuPosition(request: MenuPositionRequestModel):Promise<boolean> {
        const response = await fetch(`${this.domain}/api/menu/positions`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(request)
        });

        return response.ok;
    }

    public async updateMenuPosition(request: MenuPositionRequestModel):Promise<boolean> {
        const response = await fetch(`${this.domain}/api/menu/positions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(request)
        });

        return response.ok;
    }

    public async deleteMenuPosition(id: number):Promise<boolean> {
        const query = new URLSearchParams({
            id: id.toString()
        });

        const response = await fetch(`${this.domain}/api/menu/positions?${query.toString()}`, {
            method: 'DELETE',
            credentials: 'include'
        });

        return response.ok;
    }

    public async getAllPositionsForChapter(chapter: number):Promise<MenuPositionResponseModel[]> {

        const query = new URLSearchParams({
            chapter: chapter.toString()
        });

        const response = await fetch(`${this.domain}/api/menu/positions/all?${query.toString()}`);
        const json = await response.json();

        return json as MenuPositionResponseModel[];

    }

    public async getPositionById(id: number) {

        const response = await fetch(`${this.domain}/api/menu/positions/${id}`);
        const json = await response.json();
        return json as MenuPositionResponseModel;

    }

    public async getPositionsWithParams(filter: MenuFilterModel) {
        const response = await fetch(`${this.domain}/api/menu/positions/filter`, {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(filter)
        });

        const json = await response.json();
        return json as MenuPositionResponseModel[];
    }
}
