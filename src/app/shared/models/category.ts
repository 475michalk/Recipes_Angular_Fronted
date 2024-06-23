import { Recipe } from "./recipes";

export interface Category {
    description: string;
    recipes: Recipe[];
    image?: string; 
}
