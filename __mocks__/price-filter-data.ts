import { GET_PROPERTY } from "@/query/queries";
import initialMockData from "./initial-data";
import filterByMinPrice from "./filter-by-min-price";

const priceFilterMockData = [
    {
        request: {
            query: GET_PROPERTY,
            variables: {
                take: 10,
                skip: 0,
                offerType: null,
                minPrice: 0,
                maxPrice: 0,
                bedroom: 0,
                minArea: 0,
                maxArea: 0,
            },
        },
        result: {
            data: {
                property: initialMockData,
            },
        },
    },
    {
        request: {
            query: GET_PROPERTY,
            variables: {
                take: 10,
                skip: 0,
                offerType: null,
                minPrice: 1000,
                maxPrice: 0,
                bedroom: 0,
                minArea: 0,
                maxArea: 0,
            },
        },
        result: {
            data: {
                property: filterByMinPrice,
            },
        },
    },
];
export default priceFilterMockData;