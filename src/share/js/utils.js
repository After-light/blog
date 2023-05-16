import { message } from 'antd';

const copyText = (text) => {
  navigator.clipboard
    .writeText(text)
    .then(() =>
      message.success({
        content: '复制成功！',
        style: {
          marginTop: '80px',
        },
      })
    )
    .catch((error) => {
      message.error({
        content: '复制失败！',
        style: {
          marginTop: '80px',
        },
      });
      console.error('Copy failed: ', error);
    });
};

/**
 * 创建一个复制事件回调函数
 * @param {String} text 复制的文本
 * @returns {Function} 事件回调
 */
export const createCopyEventCallback = (text) => (e) => {
  e.preventDefault();
  navigator.permissions.query({ name: 'clipboard-write' }).then((result) => {
    if (result.state == 'granted' || result.state == 'prompt') {
      copyText(text);
    }
  });
};
