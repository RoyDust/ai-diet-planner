declare module "*.png" {
  const value: any;
  export default value;
}

declare module "*.jpg" {
  const value: any;
  export default value;
}

declare module "*.jpeg" {
  const value: any;
  export default value;
}

declare module "*.gif" {
  const value: any;
  export default value;
}

declare module "*.svg" {
  const value: any;
  export default value;
}

declare module "*.webp" {
  const value: any;
  export default value;
}

export type TRecipe = {
  _id: string;
  _creationTime: number;
  jsonData: {
    description: string;
    recipeName: string;
    calories: number;
    category: string[];
    cookTime: number;
    imagePrompt: string;
    ingredients: {
      icon: string;
      ingredient: string;
      quantity: string;
    }[];
    serveTo: number;
    steps: string[];
  };
  userId: string;
  imageUrl?: string;
  recipeName: string;
}; 