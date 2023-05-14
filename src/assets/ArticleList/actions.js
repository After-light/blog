import { get } from '@@share/js/request';
import { convertToArticles } from './utils';

export const getArticles = () => {
  return get('/api/getArticles').then(convertToArticles);
};
