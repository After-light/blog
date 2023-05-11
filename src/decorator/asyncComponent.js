import React, { useState, useEffect } from 'react';

const asyncComponent = (importComponent) => {
  const [Component, setComponent] = useState();

  useEffect(() => {
    importComponent().then((comp) => {
      setComponent(comp.default);
    });
  }, []);

  return Component ? Component : null;
};

export default asyncComponent;
