const countCharAtBeginningOfQueryString = (string, char) => {
  let count = 0;
  while (count < string.length) {
    if (string[count] !== char) {
      break;
    }

    count++;
  }
  return count;
};

const createMarkdownList = ({ title, content }) => {
  const list = content
    .split('\r\n')
    .filter((lineStr) => {
      const str = lineStr.trim();
      return str?.match(/^(#{1,6})\s/);
    })
    .map((text, index) => {
      const level = countCharAtBeginningOfQueryString(text, '#');
      return { key: index + 2, level, title: text.replace(/#|\*/g, '').trim() };
    });

  return [{ key: 1, level: 1, title: title.trim() }].concat(list);
};

// 下一个节点是否是它的孩子节点
const isParent = (current, next) => {
  if (!current || !next) {
    return;
  }

  return next.level - 1 === current.level;
};

const findChildren = (current, list) => {
  const { level } = current;

  return list.filter((e) => {
    const sameLevel = e.level === level + 1;
    if (sameLevel) {
      e.parentKey = current.key;
    }

    return sameLevel;
  });
};

/**
 * 将markdownList转成树
 * @param {Array} list
 * @returns {Array} tree
 */
const convertToTree = (list) => {
  for (let i = 0; i < list.length; i++) {
    const current = list[i];
    current.parentKey = '';
    const next = list[i + 1];

    // 1.判断当前节点是否是父节点
    const isParentNode = isParent(current, next);

    // 2.如果是父节点，帮他找到所有孩子
    const startIndex = i + 1;

    // 找到下一个同级节点，如果没找到，则取全部
    const nextWithSameLevel = list.slice(startIndex).findIndex((e) => e.level === current.level);
    const endIndex = startIndex + (nextWithSameLevel > 0 ? nextWithSameLevel : list.length - 1);

    current.children = isParentNode ? findChildren(current, list.slice(startIndex, endIndex)) : [];
  }
};

export default (markdown) => {
  const mdList = createMarkdownList(markdown);
  convertToTree(mdList);
  return [mdList.shift()];
};
