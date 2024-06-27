const secondPageMockData = {
    pageInfo: {
        currentPage: 2,
        hasNextPage: false,
        hasPreviousPage: true,
        itemCount: 1,
        pageCount: 2,
        perPage: 1,
        totalCount: 2,
    },
    properties: [
        {
            id: '2',
            price: 100,
            area: 100,
            bedroom: 5,
            description: "second description",
            name: "second name",
            offerType: "SALE",
            title: "second title",
            images: [
                {
                    id: '1',
                    url: "/vercel.svg",
                }
            ],
        }
    ],
};

export default secondPageMockData;