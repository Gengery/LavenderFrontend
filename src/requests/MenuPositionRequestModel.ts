export interface MenuPositionRequestModel {
    id?: number;
    name: string;
    imageName: string;
    price: number;
    weight: number;
    proteins: number;
    fats: number;
    carbohydrates: number;
    composition: string[];
    tags: number[];
    menuChapterId: number;
}