import { makeAutoObservable } from "mobx";
import { IContact } from "../types/contact";
import { request } from '../request'
class Contact {
    loaded = false;
    contacts: IContact[] = [];
    
    errorFetch = '';
    errorUpdate = ""
    errorCreate = '';
    errorDelete = ''

    constructor() {
        makeAutoObservable(this)
    }

    async fetch() {
        try {
            const response = await request.get<IContact[]>("/");
            this.contacts = this.contacts.concat(response.data)
            this.errorFetch = ''
        }
        catch (e: any) {
            this.errorFetch = e.message
        }
        finally {
            this.loaded = true
        }

    }

    async update(id: number, username: string, phone: string) {
        try {
            const response = await request.put<string>(`/${id}`, {
                username,
                phone,
            });
            this.contacts =
                this.contacts.map(i => i.id === id ? { id, phone, username } : i)

            this.errorUpdate = ''
        }
        catch (e: any) {
            this.errorUpdate = e.message
        }


    }

    async add(username: string, phone: string) {
        try {
            const response = await request.post<IContact>("/", { username, phone });
            this.contacts.unshift(response.data);
            this.errorCreate = ''
        } catch (e: any) {
            this.errorCreate = e.message
        }


    }

    async remove(id: number) {
        try {
            const response = await request.delete<IContact[]>(
                `/${id}`
            );
            this.contacts = this.contacts.filter(i => i.id !== id)
            this.errorDelete = ''
        } catch (e: any) {
            this.errorDelete = e.message
        }


    }

    setError(message: string, type: 'create' | "update" | "delete" | 'fetch') {
        switch (type) {
            case 'create':
                this.errorCreate = message
                break;
            case 'delete':
                this.errorDelete = message
                break;

            case 'update':
                this.errorUpdate = message
                break;

            case 'fetch':
                this.errorFetch = message
        }

    }

    clearError() {
        this.errorCreate = ''
        this.errorDelete = ''
        this.errorUpdate = ''
    }

}
export default new Contact();