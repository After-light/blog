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

export const isUrl = (str) => {
  const pattern = /^(https?:\/\/){1}([\da-z.-]+)\.([a-z.]{2,6})([\/\w\W.-]*)*\/?$/;
  return pattern.test(str);
};

export const downloadImageSync = (url, fileName) => {
  return new Promise((resolve) => {
    const download = (blob) => {
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      resolve();
    };

    fetch(url)
      .then((response) => response.blob())
      .then(download);
  });
};
