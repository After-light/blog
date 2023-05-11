export default [
  {
    key: 'homePage',
    name: '',
    href: '/',
    mode: 'headMode',
    component: () => import(/* webpackChunkName: 'HomePage' */ '@@/assets/HomePage'),
  },
  {
    key: 'technologyStack',
    name: '技术栈',
    href: '/technologyStack',
    mode: 'headlessMode',
    component: () => import(/* webpackChunkName: 'TechnologyStack' */ '@@/assets/TechnologyStack'),
  },
  {
    key: 'tools',
    name: '工具集',
    href: '/tools',
    mode: 'headlessMode',
    component: () => import(/* webpackChunkName: 'Tools' */ '@@/assets/Tools'),
  },
  {
    key: 'interviewQuestions',
    name: '面试题',
    href: '/interviewQuestions',
    mode: 'headlessMode',
    component: () =>
      import(/* webpackChunkName: 'InterviewQuestions' */ '@@/assets/InterviewQuestions'),
  },
  {
    key: 'shallowReading',
    name: '浅阅读',
    href: '/shallowReading',
    mode: 'headlessMode',
    component: () => import(/* webpackChunkName: 'ShallowReading' */ '@@/assets/ShallowReading'),
  },
  {
    key: 'friendLink',
    name: '友链',
    href: '/friendLink',
    mode: 'headlessMode',
    component: () => import(/* webpackChunkName: 'FriendLink' */ '@@/assets/FriendLink'),
  },
]
