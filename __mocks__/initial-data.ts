const initialMockData = {
    pageInfo: {
        currentPage: 1,
        hasNextPage: true,
        hasPreviousPage: false,
        itemCount: 1,
        pageCount: 2,
        perPage: 1,
        totalCount: 2,
    },
    properties: [
        {
            id: '1',
            price: 100,
            area: 100,
            bedroom: 5,
            description: "initial description",
            name: "initial name",
            offerType: "RENT",
            title: "initial title",
            images: [
                {
                    id: '1',
                    url: "/vercel.svg",
                },
                {
                    id: '2',
                    url: "/vercel.svg",
                }
            ],
        }
    ],
};

export default initialMockData;