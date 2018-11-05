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

    constructor(name: string, requester: string, persons: string, ingredients: Ingredients[], links: Links[], videoId: string) {
        this.name = name;
        this.requester = requester;
        this.persons = persons;
        this.ingredients = ingredients;
        this.links = links;
        this.videoId = videoId;
        this.id = 0;
    }
}
