import React from 'react';

import Comment from '../Comment/Comment';

const CommentsList = ({ comments }) => {
  // const [isLoading, setLoading] = useState(true);
  // const setLoadingState = (isCompLoading) => setLoading(isCompLoading);
  return (
    <section>
      {comments.map((item) => (
        <Comment key={item} comment={item} />
      ))}
    </section>
  );
};

export default CommentsList;
