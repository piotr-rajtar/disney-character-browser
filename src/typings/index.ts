interface CachedData {
  data: Character[];
  info: { totalPages: number };
}

export interface CachedRequest {
  queryKey: string;
  data: CachedData;
}

export interface Character {
  allies: string[];
  createdAt: string;
  enemies: string[];
  films: string[];
  imageUrl: string;
  name: string;
  parkAttractions: string[];
  shortFilms: string[];
  sourceUrl: string;
  tvShows: string[];
  updatedAt: string;
  url: string;
  videoGames: string[];
  __v: number;
  _id: number;
}
export interface FetchCharactersPayload {
  pageSize?: number;
  page?: number;
  name?: string;
}

export interface RootState {
  cachedRequest: { [key: string]: CachedData };
  characters: Array<Character>;
  isFilterLoading: boolean;
  isLoading: boolean;
  isPageLoading: boolean;
  totalPages: number;
}