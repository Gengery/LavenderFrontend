import { GET_API_LAVENDER_URL } from '@/store/index';
import { ReviewRequestModel } from "@/requests/ReviewRequestModel";
import { ReviewResponseModel } from "@/responses/ReviewResponseModel";
import store from "@/store";

export class ReviewsService {
    private static instance: ReviewsService;
    private domain;

    private constructor() {
        this.domain = store.getters[GET_API_LAVENDER_URL];
    }

    public static getInstance() {
        if (!ReviewsService.instance)
            ReviewsService.instance = new ReviewsService();
        return ReviewsService.instance;
    }

    public async getReviewsForPosition(positionId: number, take: number, skip: number):Promise<ReviewResponseModel[]> {
        const response = await fetch(`${this.domain}/api/reviews/position/${positionId}/${take}/${skip}`);
        if (!response.ok)
            return [];
        const json = await response.json();
        return json as ReviewResponseModel[];
    }

    public async addReview(request: ReviewRequestModel):Promise<boolean> {
        const response = await fetch(`${this.domain}/api/reviews`, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(request)
        });
        return response.ok;
    }

    public async deleteReview(id: number):Promise<boolean> {
        const query = new URLSearchParams({
            id: id.toString()
        });
        const response = await fetch(`${this.domain}/api/reviews?${query.toString()}`, {
            method: 'DELETE',
            credentials: 'include'
        });
        return response.ok;
    }
}