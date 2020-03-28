export interface OpeningTimes {
    days: string;
    opening: string;
    closing: string;
    closed: boolean;
}

export interface Review{
    _id?: string;
    author: string;
    rating: number;
    reviewText: string;
}

export interface Location {
    _id: string;
    name: string;
    distance: number;
    address: string;
    rating: number;
    facilities: string[];
    reviews: Review[];
    coords: number[];
    openingTimes: OpeningTimes[];
}