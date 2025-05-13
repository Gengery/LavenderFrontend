import { MenuTagResponseModel } from "@/models/MenuTagModel";
import store from "@/store";
import { GET_API_LAVENDER_URL } from '@/store/index';

export class MenuTagsService {
    private static instance: MenuTagsService;
    private domain;

    private constructor() {
        this.domain = store.getters[GET_API_LAVENDER_URL];
    }

    public static getInstance() {
        if (!MenuTagsService.instance)
            MenuTagsService.instance = new MenuTagsService();
        return MenuTagsService.instance;
    }

    public async getAllTags():Promise<MenuTagResponseModel[]> {
        const response = await fetch(`${this.domain}/api/menu/positions/tags/all`);
        const json = await response.json();
        return json as MenuTagResponseModel[];
    }

    public async addTag(name: string) {
        const info = {
            name: name
        }

        const response = await fetch(`${this.domain}/api/menu/positions/tags`, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(info)
        });

        return response.ok;
    }

    public async deleteTag(id: number):Promise<boolean> {
        const query = new URLSearchParams({
            id: id.toString()
        });
        const response = await fetch(`${this.domain}/api/menu/positions/tags?${query.toString()}`, {
            method: 'DELETE',
            credentials: 'include'
        });

        return response.ok;
    }

    public async updateTag(id: number, newName: string):Promise<boolean> {
        const info = {
            id: id,
            name: newName
        };

        const response = await fetch(`${this.domain}/api/menu/positions/tags`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(info)
        });

        return response.ok;
    }
}