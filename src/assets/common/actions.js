import { get } from '@@share/js/request';
import { convertToArticles } from './utils';

export const getArticleList = () => {
  return get('/api/getArticleList').then(convertToArticles);
};

export const getArticleById = (id) => {
  return get(`/api/getArticleById/${id}`);
};
