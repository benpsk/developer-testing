"use client";

import { useEffect, useReducer, useState } from 'react';
import { useQuery } from '@apollo/client';
import Pagination from '@/components/pagination';
import Property from "@/components/property";
import { initialFilter, searchReducer } from '@/hooks/use-search';
import Search from '@/components/search';
import { GET_PROPERTY } from '@/query/queries';

const Home = ({ initialData }: { initialData: any }) => {
  const [take, setTake] = useState(10);
  const [skip, setSkip] = useState(0);
  const [currentData, setCurrentData] = useState(initialData);
  const [filter, dispatchFilter] = useReducer(searchReducer, initialFilter);

  const { loading, error, data, refetch } = useQuery(GET_PROPERTY, {
    skip: true, 
  });


  useEffect(() => {
    if (!loading && !error) {
      refetch({
        take, skip, ...filter
      }).then((result) => {
        console.log('inside => ', result);
        if (result?.data?.property) setCurrentData(result.data.property);
      });
    }
  }, [skip, take, filter, refetch, loading, error]);
  console.log(take, loading, error);

  useEffect(() => {
    setSkip(0);
  }, [take, filter]);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return (
    <div className="">
      <Search
        filter={filter}
        dispatchFilter={dispatchFilter}
      />
      <div className="grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-2 xl:grid-cols-2 xl:gap-8">
        {
          currentData.properties.map(property => (
            <Property property={property} key={property.id} />
          ))}
      </div>
      {
        currentData.pageInfo.totalCount > 1 && (
          <Pagination
            pageInfo={currentData.pageInfo}
            skip={skip}
            take={take}
            setSkip={setSkip}
            setTake={setTake}
          />
        )
      }
    </div>
  );
};

export default Home;
