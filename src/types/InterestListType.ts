export interface InterestListType {
  topCategoryId: number;
  topCategoryName: string;
  subCategories: SubCategoryType[];
}

export interface SubCategoryType {
  id: number;
  name: string;
  checked: boolean;
}
