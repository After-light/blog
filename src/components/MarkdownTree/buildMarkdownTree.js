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
    .map((text) => {
      const level = countCharAtBeginningOfQueryString(text, '#');
      return { level, title: text.replace(/#|\*/g, '').trim() };
    });

  return [{ level: 1, title: title.trim() }].concat(list);
};

const createMarkdownLink = (markdown) => {
  const list = createMarkdownList(markdown);

  const levelMap = {};
  return list.map(({ level, title }, index) => {
    const key = index + 1;

    levelMap[level] = !levelMap[level] ? [key] : levelMap[level].concat(key);

    const parentKey = levelMap[level - 1] ? levelMap[level - 1].slice(-1)[0] : '';

    return { key, parentKey, level, title };
  });
};

/**
 * @param {*} list
 * @returns
 */
const convertToTree = (list) => {
  const findChildrenLoop = (parentNode, list) => {
    let children = [];
    for (let i = 0; i < list.length; i++) {
      const current = {
        ...list[i],
        children: [],
      };
      const next = list[i + 1];

      const currentHasChildren = next && next.parentKey === current.key;
      if (currentHasChildren) {
        current.children = findChildrenLoop(current, list.slice(i + 1));
      }

      if (current.parentKey === parentNode.key) {
        children.push(current);
      }
    }
    return children;
  };
  const rootNode = list.shift();
  rootNode.children = findChildrenLoop(rootNode, list);
  return [rootNode];
};

export default (markdown) => {
  const mdList = createMarkdownLink(markdown);
  return convertToTree(mdList);
};
