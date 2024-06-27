const filterBySalePage = {
    pageInfo: {
        currentPage: 1,
        hasNextPage: false,
        hasPreviousPage: true,
        itemCount: 1,
        pageCount: 1,
        perPage: 1,
        totalCount: 1,
    },
    properties: [
        {
            id: '1',
            price: 1000,
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
export default filterBySalePage;