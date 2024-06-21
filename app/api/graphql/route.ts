import { createYoga } from 'graphql-yoga'
import SchemaBuilder from "@pothos/core";
import PrismaPlugin from "@pothos/plugin-prisma";
import type PrismaTypes from "@pothos/plugin-prisma/generated";

import prisma from '../../../lib/prisma'

const builder = new SchemaBuilder<{
  PrismaTypes: PrismaTypes;
}>({
  plugins: [PrismaPlugin],
  prisma: {
    client: prisma,
  }
})

builder.queryType({})

builder.enumType('OfferType', {
  values: ['SALE', 'RENT'] as const,
});


// Property model
builder.prismaObject("Property", {
  fields: (t) => ({
    id: t.exposeID('id'),
    name: t.exposeString('name'),
    title: t.exposeString('title'),
    price: t.exposeFloat('price'),
    offerType: t.expose('offerType', { type: 'OfferType' }),
    bedroom: t.exposeInt('bedroom'),
    area: t.exposeFloat('area'),
    description: t.exposeString('description'),
    images: t.relation("images"),
  })
})

// Image model
builder.prismaObject("Image", {
  fields: (t) => ({
    id: t.exposeID('id'),
    propertyId: t.exposeInt('propertyId'),
    url: t.exposeString('url'),
    property: t.relation("property"),
  })
})
// PageInfo type with resolvers
builder.objectType('PageInfo', {
  fields: (t) => ({
    currentPage: t.int({
      resolve: (parent) => parent.currentPage,
    }),
    hasNextPage: t.boolean({
      resolve: (parent) => parent.hasNextPage,
    }),
    hasPreviousPage: t.boolean({
      resolve: (parent) => parent.hasPreviousPage,
    }),
    itemCount: t.int({
      resolve: (parent) => parent.itemCount,
    }),
    pageCount: t.int({
      resolve: (parent) => parent.pageCount,
    }),
    perPage: t.int({
      resolve: (parent) => parent.perPage,
    }),
    totalCount: t.int({
      resolve: (parent) => parent.totalCount,
    }),
  }),
});


// PropertyConnection type
builder.objectType('PropertyConnection', {
  fields: (t) => ({
    pageInfo: t.field({
      type: 'PageInfo',
      resolve: (parent) => parent.pageInfo,
    }),
    properties: t.field({
      type: ['Property'],
      resolve: (parent) => parent.properties,
    }),
  }),
});

builder.queryField('property', (t) =>
  t.field({
    type: 'PropertyConnection', 
    args: {
      offerType: t.arg({ type: 'OfferType', required: false }),
      minPrice: t.arg.float({ required: false }),
      maxPrice: t.arg.float({ required: false }),
      bedroom: t.arg.int({ required: false }),
      minArea: t.arg.float({ required: false }),
      maxArea: t.arg.float({ required: false }),
      skip: t.arg.int({ required: false }), 
      take: t.arg.int({ required: false }), 
    },
    resolve: async (_parent, args, _context) => {
      let skip = args.skip || undefined;
      const take = args.take || undefined;

      const totalCount = await prisma.property.count({
        where: {
          offerType: args.offerType || undefined,
          price: {
            gte: args.minPrice || undefined,
            lte: args.maxPrice || undefined,
          },
          bedroom: args.bedroom || undefined,
          area: {
            gte: args.minArea || undefined,
            lte: args.maxArea || undefined,
          },
        },
      });

      const properties = await prisma.property.findMany({
        where: {
          offerType: args.offerType || undefined,
          price: {
            gte: args.minPrice || undefined,
            lte: args.maxPrice || undefined,
          },
          bedroom: args.bedroom || undefined,
          area: {
            gte: args.minArea || undefined,
            lte: args.maxArea || undefined,
          },
        },
        skip,
        take,
      });

      let currentPage = 1;
      let pageCount = 1;
      let hasNextPage = false;
      let hasPreviousPage = false;

      if (take) {
        if (!skip) skip = 0;
        currentPage = Math.floor(skip / take) + 1;
        pageCount = Math.ceil(totalCount / take);
        hasNextPage = skip + take < totalCount;
        hasPreviousPage = skip > 0;
      }

      const pageInfo = {
        currentPage,
        hasNextPage,
        hasPreviousPage,
        itemCount: properties.length,
        pageCount,
        perPage: take || totalCount,
        totalCount,
      };

      console.log(pageInfo);

      return {
        pageInfo,
        properties,
      };
    },
  })
);

const schema = builder.toSchema()
const { handleRequest } = createYoga({
  schema,
  graphqlEndpoint: '/api/graphql',
  fetchAPI: { Response }
})

export { handleRequest as GET, handleRequest as POST, handleRequest as OPTIONS }