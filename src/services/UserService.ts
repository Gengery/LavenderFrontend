import { UserRequestModel } from '@/requests/UserRequestModel';
import store from '@/store';
import { GET_API_LAVENDER_URL } from '@/store/index';

export class UserService {

    private static instance: UserService;
    private domain = "";

    private constructor() { 
        this.domain = store.getters[GET_API_LAVENDER_URL];
    }

    public static getInstance(): UserService {
        if (!this.instance)
            this.instance = new UserService();
        return this.instance;
    }

    public async register(username: string, login: string, password: string):Promise<boolean> {
        
        const request: UserRequestModel = {
            username: username,
            login: login,
            password: password
        }

        const response = await fetch(`${this.domain}/api/users`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(request)
        });
        
        return response.ok;
    }

    public async login(login: string, password: string):Promise<boolean> {

        const request: UserRequestModel = {
            login: login,
            password: password
        }

        const response = await fetch(`${this.domain}/api/users/auth`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(request)
        });

        return response.ok;
    }

    public async deleteUser(id: number):Promise<boolean> {
        const query = new URLSearchParams({
            id: id.toString()
        });

        const response = await fetch(`${this.domain}/api/users/authY?${query.toString()}`, {
            method: 'DELETE'
        });

        return response.ok;
    }
    
    public async adminCheck():Promise<boolean> {
        try {
            const response = await fetch(`${this.domain}/api/users/admin/check`, {
                credentials: 'include'
            });

            return response.ok;
        }
        catch {
            return false;
        }
    }

    public async customerCheck():Promise<boolean> {
        const response = await fetch(`${this.domain}/api/users/customer/check`, {
            credentials: 'include'
        });

        return response.ok;
    }

    public async authCheck():Promise<boolean> {
        const response = await fetch(`${this.domain}/api/users/auth/check`, {
            credentials: 'include'
        });

        return response.ok;
    }

    public async logout():Promise<boolean> {
        const response = await fetch(`${this.domain}/api/users/logout`, {
            credentials: 'include'
        });
        
        return response.ok;
    }
}