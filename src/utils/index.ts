import type { FetchCharactersPayload } from "../typings";

export const getQueryString = (queryObject: FetchCharactersPayload): string => {
  const queryParamKeys = Object.keys(queryObject) as Array<keyof FetchCharactersPayload>;
  return queryParamKeys.map((queryParamKey, index) => {
    const queryParam = `${queryParamKey}=${queryObject[queryParamKey]}`;
    const isNextQueryParamAvailable = queryParamKeys[index + 1];
    
    return isNextQueryParamAvailable
      ? `${queryParam}&`
      : queryParam;
  })
  .join('');
};

export const formatSearchString = (searchPhrase: string): string => {
  if(!searchPhrase.length) {
    return '';
  }
  const regex = / +(?= )/g;
  return searchPhrase.replace(regex,'').trim().replaceAll(' ', '+');
};