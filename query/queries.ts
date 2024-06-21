import { gql } from '@apollo/client'

const GET_PROPERTY = gql`
  query GetProperty($take: Int, $skip: Int, $offerType: OfferType, $minPrice: Float, $maxPrice: Float, $bedroom: Int, $minArea: Float, $maxArea: Float) {
    property(take: $take, skip: $skip, offerType: $offerType, minPrice: $minPrice, maxPrice: $maxPrice, bedroom: $bedroom, minArea: $minArea, maxArea: $maxArea) {
      pageInfo {
        currentPage
        hasNextPage
        hasPreviousPage
        itemCount
        pageCount
        perPage
        totalCount
      }
      properties {
        id
        price
        area
        bedroom
        description
        name
        offerType
        title
        images {
          id
          url
        }
      }
    }
  }
`;

export { GET_PROPERTY }