export interface Category {
  id: number;
  name: string;
}

export type CategoryDto = Category;
export type UpdateCategoryDto = Partial<Category>;
