// __mocks__/handlers.js

export const initialMockData = {
  pageInfo: {
    currentPage: 1,
    hasNextPage: false,
    hasPreviousPage: false,
    itemCount: 1,
    pageCount: 1,
    perPage: 1,
    totalCount: 1,
  },
  properties: [
    {
      id: '1',
      price: 100,
      area: 100,
      bedroom: 5,
      description: "hello description",
      name: "hello name",
      offerType: "RENT",
      title: "hello title",
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

