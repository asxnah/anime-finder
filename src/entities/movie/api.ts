import { useInfiniteQuery } from '@tanstack/react-query';
import { anilistApi } from '../../shared/api/anilist';
import { type AniListResponse } from './model';
import { useMovieStore } from './store';

const GET_ANIME = `
  query ($page: Int, $perPage: Int, $search: String, $format: MediaFormat, $sort: [MediaSort]) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        hasNextPage
        currentPage
      }
      media(search: $search, type: ANIME, format: $format, sort: $sort, isAdult: false) {
        id
        title {
          romaji
          english
          native
        }
        coverImage {
          extraLarge
        }
        averageScore
        startDate {
          year
        }
        description
        genres
        format
        episodes
        duration
        status
        studios(isMain: true) {
          nodes {
            name
          }
        }
      }
    }
  }
`;

export const useAnimeSearch = () => {
  const { searchQuery, filter } = useMovieStore();

  return useInfiniteQuery({
    queryKey: ['anilist', searchQuery, filter],
    queryFn: async ({ pageParam = 1 }) => {
      const variables: Record<string, unknown> = {
        page: pageParam,
        perPage: 20,
      };

      if (searchQuery.trim()) {
        variables.search = searchQuery.trim();
        variables.sort = ['SEARCH_MATCH'];
      } else {
        variables.sort = ['SCORE_DESC'];
      }

      if (filter === 'movie') variables.format = 'MOVIE';
      if (filter === 'tv') variables.format = 'TV';

      const { data } = await anilistApi.post<AniListResponse>('', {
        query: GET_ANIME,
        variables,
      });

      if (data.errors) throw new Error(data.errors[0].message);

      return data.data.Page; // Возвращаем всю страницу (там есть media и pageInfo)
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      // Если есть следующая страница, возвращаем номер следующей
      return lastPage.pageInfo.hasNextPage ? lastPage.pageInfo.currentPage + 1 : undefined;
    },
    retry: 2,
    staleTime: 1000 * 60 * 5,
  });
};
