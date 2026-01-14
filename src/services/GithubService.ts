import axios from "axios";
import { RepositoryItem } from "../interfaces/RepositoryItem";
import { UserInfo } from '../interfaces/UserInfo';

import AuthService from "./AuthService";

const GITHUB_API_URL = import.meta.env.VITE_API_URL;

const githubApi = axios.create({
    baseURL: GITHUB_API_URL,
});

githubApi.interceptors.request.use((config) => {
    const AuthHeader = AuthService.getAuthHeader();
    if (AuthHeader) {
        config.headers.Authorization = AuthHeader;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export const fetchRepositories = async (): Promise<RepositoryItem[]> => {
    try {
        const response = await githubApi.get(`/user/repos` , {
            params: {
                per_page: 100,
                sort: "created",
                direction: "desc",
                affiliation: "owner",
                t: new Date().getTime() // Evitar caché
            }
        });

        const repositories: RepositoryItem[] = response.data.map((repo: any) => ({
            id: repo.id,
            name: repo.name,
            description: repo.description ? repo.description : null,
            imageurl: repo.owner ? repo.owner.avatar_url : null,
            html_url: repo.html_url,
            owner: repo.owner ? repo.owner.login : null,
            language: repo.language ? repo.language : null,
        }));

        return repositories;

    } catch (error: any) {
        console.error("Ocurrió un error al obtener repositorios:", error.response?.status, error.message);
        return [];
    }
}

export const createRepository = async (repo: RepositoryItem): Promise<void> => {
    try {
        const response = await githubApi.post(`/user/repos`, repo)
        console.log("Repositorio creado", response.data);
        
    } catch (error) {
        console.error("Ocurrió un error al crear el repositorio:", error);
        throw error;
    }
};

export const editRepository = async (owner: string, repoName: string, data: Partial<RepositoryItem>): Promise<RepositoryItem> => {
    try {
        // Usamos PATCH como lo indica la API de GitHub para actualizaciones parciales.
        const response = await githubApi.patch(`/repos/${owner}/${repoName}`, data);
        const repo = response.data;
        return {
            id: repo.id,
            name: repo.name,
            description: repo.description ? repo.description : null,
            imageurl: repo.owner ? repo.owner.avatar_url : null,
            html_url: repo.html_url,
            owner: repo.owner ? repo.owner.login : null,
            language: repo.language ? repo.language : null,
        };
    } catch (error: any) {
        console.error(`Ocurrió un error al editar el repositorio ${owner}/${repoName}:`, error);
        throw error;
    }
};

export const deleteRepository = async (owner: string, repoName: string): Promise<void> => {
    try {
        await githubApi.delete(`/repos/${owner}/${repoName}`);
    } catch (error: any) {
        console.error(`Ocurrió un error al eliminar el repositorio ${owner}/${repoName}:`, error);
        throw error;
    }
};

export const getUserInfo = async (): Promise<UserInfo> => {
    try {
        const response = await githubApi.get(`/user`);
        return response.data as UserInfo;
    } catch (error) {
        console.error("Ocurrió un error al obtener la información del usuario:", error);
        const userNotFound : UserInfo = {
            login: "undefined",
            name: "Usuario no encontrado",
            bio: "No se pudo obtener la información del usuario.",
            avatar_url: "https://img.icons8.com/ios_filled/1200/unfriend-male.jpg",
        }
        return userNotFound;
    }
};