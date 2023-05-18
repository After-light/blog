import { StarOutlined, LikeOutlined, MessageOutlined } from '@ant-design/icons';

/**
 * 创建article actions列表
 * @param {Object} actionProps 文章actions对象 { starNumber, likeNumber, messageNumber }
 */
const createArticleActions = ({ starNumber, likeNumber, messageNumber }) => [
  {
    actionName: 'start',
    text: starNumber,
    icon: StarOutlined,
  },
  {
    actionName: 'like',
    text: likeNumber,
    icon: LikeOutlined,
  },
  {
    actionName: 'message',
    text: messageNumber,
    icon: MessageOutlined,
  },
];

/**
 * 将getArticles接口返回的数据转为Articles
 * @param {Array} data [{ id, title, createTime, content, starNumber, likeNumber, messageNumber }]
 * @returns {Object} Promise
 */
export const convertToArticles = (data) => {
  const articles = data
    .map(({ starNumber, likeNumber, messageNumber, ...resetProps }) => {
      return {
        ...resetProps,
        href: `/article/${resetProps.id}`,
        actions: createArticleActions({ starNumber, likeNumber, messageNumber }),
      };
    })
    .sort((a, b) => new Date(b.createTime) - new Date(a.createTime));

  return new Promise((resolve) => resolve(articles));
};
