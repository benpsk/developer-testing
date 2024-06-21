import { OfferType } from "@prisma/client";

enum searchType {
    SET_OFFER_TYPE = 'SET_OFFER_TYPE',
    SET_MIN_PRICE = 'SET_MIN_PRICE',
    SET_MAX_PRICE = 'SET_MAX_PRICE',
    SET_BEDROOM = 'SET_BEDROOM',
    SET_MIN_AREA = 'SET_MIN_AREA',
    SET_MAX_AREA = 'SET_MAX_AREA',
    RESET = 'RESET',
}

const initialFilter = {
    offerType: null as OfferType | null,
    minPrice: 0.0,
    maxPrice: 0.0,
    bedroom: 0,
    minArea: 0,
    maxArea: 0,
};

export interface FilterType {
    offerType: null | OfferType,
    minPrice: number,
    maxPrice: number,
    bedroom: number,
    minArea: number,
    maxArea: number
}
const searchReducer = (state: FilterType, action: any) => {
    switch (action.type) {
        case searchType.SET_OFFER_TYPE:
            return { ...state, offerType: action.payload };
        case searchType.SET_MIN_PRICE:
            return { ...state, minPrice: action.payload };
        case searchType.SET_MAX_PRICE:
            return { ...state, maxPrice: action.payload };
        case searchType.SET_BEDROOM:
            return { ...state, bedroom: action.payload };
        case searchType.SET_MIN_AREA:
            return { ...state, minArea: action.payload };
        case searchType.SET_MAX_AREA:
            return { ...state, maxArea: action.payload };
        case searchType.RESET:
            return initialFilter;
        default:
            return state;
    }
};

export { searchType, searchReducer, initialFilter }