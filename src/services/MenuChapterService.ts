import { ChapterModel } from "@/models/ChapterModel";
import store from "@/store";
import { GET_API_LAVENDER_URL } from '@/store/index';

export class MenuChaptersService {
    private static instance: MenuChaptersService;
    private domain;

    private constructor() {
        this.domain = store.getters[GET_API_LAVENDER_URL];
    }

    public static getInstance() {
        if (!MenuChaptersService.instance)
            MenuChaptersService.instance = new MenuChaptersService();
        return MenuChaptersService.instance;
    }

    public async getAllChapters():Promise<ChapterModel[]> {
        const response = await fetch(`${this.domain}/api/menu/chapters/all`);
        if (!response.ok)
            return [];
        const json = await response.json();
        return json as ChapterModel[];
    }

    public async addChapter(name: string):Promise<boolean> {
        const chapter = {
            name: name
        }

        const response = await fetch(`${this.domain}/api/menu/chapters`, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(chapter)
        });
        return response.ok;
    }

    public async deleteChapter(id: number):Promise<boolean> {
        const query = new URLSearchParams({
            id: id.toString()
        });
        const response = await fetch(`${this.domain}/api/menu/chapters?${query.toString()}`, {
            method: 'DELETE',
            credentials: 'include'
        });
        return response.ok;
    }

    public async updateChapter(id: number, newName: string):Promise<boolean> {
        const info = {
            id: id,
            name: newName
        };

        const response = await fetch(`${this.domain}/api/menu/chapters`, {
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