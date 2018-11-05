import { Ingredients } from './ingredients';
import { Links } from './links';

export class Recipe {
    name: string;
    requester: string;
    persons: string;
    id: number;
    ingredients: Ingredients[];
    links: Links[];
    favorite: boolean;
    videoId: string;
}
