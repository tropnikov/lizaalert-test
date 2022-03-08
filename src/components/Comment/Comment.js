import React from 'react';
import { useEffect, useState } from 'react';
import parse from 'html-react-parser';
import api from '../../utils/api';
import getDateStringFromUnixTime from '../../utils/dateConversion';
import './Comment.css';

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
      <div className="comment">
        {newComment.text && parse(newComment.text)}
        <p>
          by <span className="comment__author">{newComment.by}</span> at{' '}
          <span className="comment__date">
            {getDateStringFromUnixTime(newComment.time)}
          </span>
        </p>
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
