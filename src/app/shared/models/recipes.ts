export interface Recipes {
  nameRecipe?: string;
  descriptionRecipe?: string;
  categoryName?: string[];
  preparationTime?: number;
  level?: number;
  dateAdd?: Date;
  layers: Array<{
    description: string;
    component: string[];
  }>;
  instructionRecipe?: string;
  privateYesOrNo?: boolean;
  addedByUsers: Array<{
    userId: string;
    name: string;
  }>;
  image: string[];
}

export class Recipe implements Recipes {
  constructor(
    public nameRecipe?: string,
    public descriptionRecipe?: string,
    public categoryName: string[] = [],
    public preparationTime?: number,
    public level?: number,
    public dateAdd: Date = new Date(),
    public layers: Array<{ description: string; component: string[] }> = [],
    public instructionRecipe?: string,
    public privateYesOrNo: boolean = false,
    public addedByUsers: Array<{ userId: string; name: string }> = [],
    public image: string[] = []
  ) {}
}
