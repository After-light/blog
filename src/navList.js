import BodyWrapper from '@@layout/BodyWrapper';
import BodyWrapperHeadless from '@@layout/BodyWrapperHeadless';

export default [
  {
    key: 'homePage',
    name: '',
    href: '/',
    importComponent: () => import(/* webpackChunkName: 'HomePage' */ '@@assets/HomePage'),
    componentWrapper: BodyWrapper,
  },
  {
    key: 'technologyStack',
    name: '技术栈',
    href: '/technologyStack',
    importComponent: () =>
      import(/* webpackChunkName: 'TechnologyStack' */ '@@assets/TechnologyStack'),
    componentWrapper: BodyWrapperHeadless,
  },
  {
    key: 'tools',
    name: '工具集',
    href: '/tools',
    importComponent: () => import(/* webpackChunkName: 'Tools' */ '@@assets/Tools'),
    componentWrapper: BodyWrapperHeadless,
  },
  {
    key: 'interviewQuestions',
    name: '面试题',
    href: '/interviewQuestions',
    importComponent: () =>
      import(/* webpackChunkName: 'InterviewQuestions' */ '@@assets/InterviewQuestions'),
    componentWrapper: BodyWrapperHeadless,
  },
  {
    key: 'shallowReading',
    name: '浅阅读',
    href: '/shallowReading',
    importComponent: () =>
      import(/* webpackChunkName: 'ShallowReading' */ '@@assets/ShallowReading'),
    componentWrapper: BodyWrapperHeadless,
  },
  {
    key: 'friendLink',
    name: '友链',
    href: '/friendLink',
    importComponent: () => import(/* webpackChunkName: 'FriendLink' */ '@@assets/FriendLink'),
    componentWrapper: BodyWrapperHeadless,
  },
  {
    key: 'articleContent',
    name: '',
    href: '/article/:id',
    importComponent: () => import(/* webpackChunkName: 'FriendLink' */ '@@assets/Article'),
    componentWrapper: BodyWrapperHeadless,
  },
  {
    key: 'all',
    name: '',
    href: '*',
    importComponent: () => import(/* webpackChunkName: 'HomePage' */ '@@assets/HomePage'),
    componentWrapper: BodyWrapper,
  },
];
