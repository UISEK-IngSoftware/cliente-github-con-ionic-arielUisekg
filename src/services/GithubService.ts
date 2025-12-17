import axios from 'axios';
import { RepositoryItem } from '../interfaces/RepositoryItem';
import { UserInfo } from '../interfaces/Userinfo';


const GITHUB_API_URL = import.meta.env.VITE_API_URL; // Reemplaza con la URL base de la API de GitHub
const GITHUB_API_TOKEN = import.meta.env.VITE_GITHUB_API_TOKEN; // Reemplaza con tu token de acceso personal de GitHub
export const fetchRepositories = async(): Promise<RepositoryItem[]> => {
    try {
        const response = await axios.get(`${GITHUB_API_URL}/user/repos`, {
            headers: {
                Authorization: `Bearer ${GITHUB_API_TOKEN}`,  
            },
            params: {
                per_page: 100,
                sort:'created',
                direction:'desc',
                affiliation:'owner'
            },
        });
        const repositories: RepositoryItem[] = response.data.map((repo: any) => ({
            name: repo.name,
            description: repo.description,
            imageurl: repo.owner ? repo.owner.avatar_url : null,
            owner: repo.owner ? repo.owner.login : null,
            language: repo.language? repo.language : null,
        }));
        return repositories;

    }catch (error) {
        console.error('Hubo un error al obtener repositorios', error);
        return [];
    }
}
export const createRepository = async (repo: RepositoryItem): Promise<void> => {
    try {
        const response = await axios.post(`${GITHUB_API_URL}/user/repos`, {
            name: repo.name,
            description: repo.description,
            private: false // o true si quieres privado
        }, {
            headers: {
                Authorization: `Bearer ${GITHUB_API_TOKEN}`,
            },
        });
        console.log('Repositorio creado con éxito', response.data);
    } catch (error) {
        console.error('Hubo un error al crear el repositorio', error);
    }
};

export const getUserInfo = async (): Promise<UserInfo> => {
    try {
        const response = await axios.get(`${GITHUB_API_URL}/user`, {
            headers: {
                Authorization: `Bearer ${GITHUB_API_TOKEN}`,
            }
        });
        return response.data as UserInfo;
    } catch (error) {
        console.error('Hubo un error al obtener la información del usuario', error);
        const userNotFound: UserInfo = {
            login: 'undefined',
            name: 'Usuario no encontrado',
            bio: 'No se pudo obtener la información del usuario.',
            avatar_url: 'https://cdn-icons-png.flaticon.com/512/6676/6676023.png'
        };
        return userNotFound;
    }
};
    