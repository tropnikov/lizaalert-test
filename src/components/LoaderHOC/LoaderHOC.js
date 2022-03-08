import React from 'react';
import { useState } from 'react';

const LoaderHOC =
  (Component) =>
  ({ isLoading, children, ...props }) => {
    // const HOC = () => {
    // const [isLoading, setLoading] = useState(true);
    // const setLoadingState = (isCompLoading) => setLoading(isCompLoading);

    return isLoading ? (
      <h1>Loading...</h1>
    ) : (
      <Component {...props}>{children}</Component>
    );
    // };

    // return HOC;
  };

export default LoaderHOC;
