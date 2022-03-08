import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../utils/api';
import getDateStringFromUnixTime from '../../utils/dateConversion';
import './Story.css';
// import LoaderHOC from '../LoaderHOC/LoaderHOC';
import CommentsList from '../CommentsList/CommentsList';
import { Button } from 'react-bootstrap';
// export const CommentsLoad = LoaderHOC(CommentsList);

const Story = ({ stories }) => {
  const [newStory, setNewStory] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  // const [isCommentsLoading, setIsCommentsLoading] = useState(true);
  const url = 'https://news.ycombinator.com/item?id=';
  const { storyId } = useParams();
  const navigate = useNavigate();

  // works slightly faster then api call
  const story = stories
    ? stories.find((item) => item.id === Number(storyId))
    : null;

  // const handler = () => {
  //   setIsCommentsLoading(false);
  // };

  useEffect(() => {
    if (stories && stories.length === 0) {
      // for the case of reloading the page
      api
        .getStoryById(storyId)
        .then((story) => {
          setNewStory(story);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      // works slightly faster then api call
      setNewStory(story);
      setIsLoading(false);
    }
  }, []);

  return isLoading ? (
    <h2 className="header_loading">Loading...</h2>
  ) : (
    <div>
      <h2>{newStory.title}</h2>
      <p>
        Score: <span className="newstory__score">{newStory.score}</span>, by{' '}
        <span className="newstory__author">{newStory.by}</span> at{' '}
        <span className="newstory__date">
          {getDateStringFromUnixTime(newStory.time)}
        </span>
      </p>
      <p>
        Link:{' '}
        <a href={url + `${newStory.id}`} rel="noreferrer">
          {url + `newStory.id`}
        </a>{' '}
      </p>
      <p> Comments: {newStory.descendants}</p>
      {newStory.kids && <CommentsList comments={newStory.kids} />}
      <Button onClick={() => navigate(-1)}>Back</Button>
    </div>
  );
};

export default Story;
