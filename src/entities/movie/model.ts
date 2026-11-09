export interface AniListMedia {
  id: number;
  title: {
    romaji: string;
    english: string | null;
    native: string | null;
  };
  coverImage: {
    extraLarge: string;
  };
  averageScore: number | null;
  startDate: {
    year: number | null;
  } | null;
  description: string | null;
  genres: string[];
  format: string | null;
  episodes: number | null;
  duration: number | null;
  status: string | null;
  studios: {
    nodes: { name: string }[];
  };
}

export interface AniListResponse {
  data: {
    Page: {
      media: AniListMedia[];
      pageInfo: {
        hasNextPage: boolean;
        currentPage: number;
      };
    };
  };
  errors?: { message: string }[];
}
