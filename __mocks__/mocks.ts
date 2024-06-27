import { GET_PROPERTY } from '@/query/queries';
import initialMockData from './initial-data';
import secondPageMockData from './second-page-data';
const mocks = [
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
                skip: 10,
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
                property: secondPageMockData,
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
];

export default mocks;