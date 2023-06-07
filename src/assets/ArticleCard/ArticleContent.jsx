import React from 'react';

const ArticleContent = ({ content }) => {
  const contentList = content.split('\r\n');

  return (
    <div>
      {contentList.map((text, index) => (
        <React.Fragment key={index}>
          {<span>{text}</span>}
          {index !== contentList.length - 1 && <br />}
        </React.Fragment>
      ))}
    </div>
  );
};

export default ArticleContent;
