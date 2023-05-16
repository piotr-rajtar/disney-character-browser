export interface FetchCharactersPayload {
  pageSize?: number;
  page?: number;
  name?: string;
}

export interface RootState {
  characters: Array<Record<string, unknown>>;
  isLoading: boolean;
  isFilterLoading: boolean;
  totalPages: number;
}