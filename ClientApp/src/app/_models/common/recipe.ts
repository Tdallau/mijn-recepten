import { Ingredients } from './ingredients';

export class Recipe {
    name: string;
    requester: string;
    persons: string;
    id: number;
    ingredients: Ingredients[];
    links: any[];
    favorite: boolean;
}
