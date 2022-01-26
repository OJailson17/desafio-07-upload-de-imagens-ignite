import { Button, Box } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface FetchImagesProps {
  data: Card[];
  after: string;
}

const fetchImages = async ({ pageParam = 0 }): Promise<FetchImagesProps> => {
  try {
    const response = await api.get(`/api/images?after=${pageParam}`);

    // console.log(response);

    return response.data;
  } catch (error) {
    console.log(error);
  }

  return null;
};

export default function Home(): JSX.Element {
  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery('images', fetchImages, {
    getNextPageParam: (lastPage, _pages) => {
      if (lastPage?.after) {
        return lastPage?.after;
      }

      return null;
    },
  });

  console.log(hasNextPage);

  const formattedData = useMemo(() => {
    // TODO FORMAT AND FLAT DATA ARRAY
    const pages = data?.pages
      .map(group => {
        const pageData = group?.data.map((page: Card) => {
          return {
            title: page?.title,
            description: page?.description,
            url: page?.url,
            ts: page?.ts,
            id: page?.id,
          };
        });
        return pageData;
      })
      .flat();

    return pages;
  }, [data]);

  // TODO RENDER LOADING SCREEN

  // TODO RENDER ERROR SCREEN

  return (
    <>
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>
        <CardList cards={formattedData} />
        {/* TODO RENDER LOAD MORE BUTTON IF DATA HAS NEXT PAGE */}
        {/* <button type="button" onClick={fetchNextPage}>
          Fetch
        </button> */}
      </Box>
    </>
  );
}
