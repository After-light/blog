import { StarOutlined, LikeOutlined, MessageOutlined } from '@ant-design/icons';

/**
 * 创建article actions列表
 * @param {Object} actionProps 文章actions对象 { starNumber, likeNumber, messageNumber }
 */
export const createArticleActions = ({ starNumber, likeNumber, messageNumber }) => [
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
