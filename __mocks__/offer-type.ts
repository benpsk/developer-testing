import { GET_PROPERTY } from '@/query/queries';
import initialMockData from './initial-data';
import filterBySalePage from './filter-by-sale-page';
const offerTypeMockData = [
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
                offerType: 'SALE',
                minPrice: 0,
                maxPrice: 0,
                bedroom: 0,
                minArea: 0,
                maxArea: 0,
            },
        },
        result: {
            data: {
                property: filterBySalePage,
            },
        },
    },
];

export default offerTypeMockData;