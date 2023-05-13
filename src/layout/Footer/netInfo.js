import { createCopyEventCallback } from '@@share/js/utils';

export default [
  {
    key: 'netOwnername',
    href: '/',
    content: '李瑞',
    title: '跳转到首页',
  },
  {
    key: 'email',
    content: 'Email',
    title: '点击复制邮箱',
    onClick: createCopyEventCallback('lee_ro@163.com'),
  },
];
