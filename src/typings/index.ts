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
  characters: Array<Character>;
  isFilterLoading: boolean;
  isLoading: boolean;
  isPageLoading: boolean;
  totalPages: number;
}