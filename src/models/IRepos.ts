import { INFORM_MESSAGE } from "../utils/consts";

export interface IGitHubRepository {
    id: number;
    name: string;
    html_url: string;
    description?: string;
    stargazers_count: number;
    watchers_count: number;
    forks_count: number;
    language?: string;
    updated_at: string;
    created_at: string;
}

export type TInformMessage = (typeof INFORM_MESSAGE)[keyof typeof INFORM_MESSAGE];