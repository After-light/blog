import React, { useEffect } from 'react';

const MIN_NAV_CONTAINER_MARGIN = 0;
const MIN_LINK_ITEM_MARGIN_RIGHT = 10;

const getDomMargin = (dom, prop) => {
  if (!dom) {
    return;
  }
  return parseInt(window.getComputedStyle(dom)[prop]);
};

/**
 * nav-container的margin动画
 * @param {Number} initMargin
 * @param {Number} scrollHeight
 * @param {Object} navContainerDom
 */
const navContainerAnimation = (initMargin, scrollHeight, navContainerDom) => {
  // maxMargin: 计算的margin超过初始化margin时取初始化margin
  const maxMargin = Math.min(initMargin, scrollHeight);

  /**
   * case1: margin不能大于初始化margin
   * case2: margin不能小于最小margin
   */
  const navContainerMargin = getDomMargin(navContainerDom, 'margin');
  const case1 = navContainerMargin <= initMargin;
  const case2 = navContainerMargin >= MIN_NAV_CONTAINER_MARGIN;

  if (case1 && case2) {
    requestAnimationFrame(() => {
      navContainerDom.style.margin = `${initMargin - maxMargin}px`;
    });
  }
};

/**
 * link-item的margin-right动画
 * @param {Number} initMargin
 * @param {Number} scrollHeight
 * @param {Object} linksRef
 */
const linkItemAnimation = (initMargin, scrollHeight, linksRef) => {
  const maxMarginRight = Math.min(initMargin - MIN_LINK_ITEM_MARGIN_RIGHT, scrollHeight);

  const linkItem = linksRef.current.childNodes[0];
  const linkItemMarginRight = getDomMargin(linkItem, 'margin-right');
  const case1 = linkItemMarginRight <= initMargin;
  const case2 = linkItemMarginRight >= MIN_LINK_ITEM_MARGIN_RIGHT;

  // 最后一个link-item不执行动画
  const animateHandle = (item, index) => {
    if (index === linksRef.current.childNodes.length - 1) {
      return;
    }

    item.style['margin-right'] = `${initMargin - maxMarginRight}px`;
  };

  if (case1 && case2) {
    requestAnimationFrame(() => {
      linksRef.current.childNodes.forEach(animateHandle);
    });
  }
};

const handleScroll = (linksRef) => {
  const navContainerDom = document.querySelector('body div[class^="container"]');
  const initNavContainerMargin = getDomMargin(navContainerDom, 'margin');
  const initLinkItemMarginRight = getDomMargin(linksRef.current.childNodes[0], 'margin-right');

  return (e) => {
    const { scrollTop } = e.target;
    const scrollHeight = Math.ceil(scrollTop / 10);

    // 控制nav-container的margin
    navContainerAnimation(initNavContainerMargin, scrollHeight, navContainerDom);

    // 控制link-item的margin-right
    linkItemAnimation(initLinkItemMarginRight, scrollHeight, linksRef);
  };
};

const useNavAnimation = (linksRef) => {
  useEffect(() => {
    const mainDom = document.querySelector('body .scrollbar');
    mainDom.addEventListener('scroll', handleScroll(linksRef));

    return () => {
      mainDom.removeEventListener('scroll', handleScroll(linksRef));
    };
  }, []);
};

export default useNavAnimation;
