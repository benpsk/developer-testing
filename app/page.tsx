import client from '@/lib/apollo-client'; 
import Home from '@/components/home';
import { GET_PROPERTY } from '@/query/queries';

export default async function Page() {
  const { data } = await client.query({
    query: GET_PROPERTY,
    variables: { take: 10, skip: 0 },
  });

  return <Home initialData={data.property} />;
}
