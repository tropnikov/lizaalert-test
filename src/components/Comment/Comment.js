import React from 'react';
import { useEffect, useState } from 'react';
import parse from 'html-react-parser';
import api from '../../utils/api';

const Comment = ({ comment }) => {
  const [newComment, setNewComment] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api
      .getStoryById(comment)
      .then((story) => {
        setNewComment(story);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [comment]);

  return (
    !newComment.deleted && (
      <div>
        {newComment.text && parse(newComment.text)}
        {newComment.kids && (
          <div>
            {newComment.kids.map((item) => (
              <Comment key={item} comment={item} />
            ))}
          </div>
        )}
      </div>
    )
  );
};

export default Comment;
