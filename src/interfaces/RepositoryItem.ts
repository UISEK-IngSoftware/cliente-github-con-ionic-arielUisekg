export interface RepositoryItem {
    id?: number;
    name: string;
    description: string | null;
    imageurl: string | null;
    html_url?: string;
    owner: string | null; 
    language: string | null;
}