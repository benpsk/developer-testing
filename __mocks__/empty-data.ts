import { GET_PROPERTY } from "@/query/queries";
import initialEmptyData from "./initial-empty-data";

const emptyData = [
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
                property: initialEmptyData,
            },
        },
    },
];
export default emptyData;