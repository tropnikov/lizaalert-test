import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../utils/api';
import getDateStringFromUnixTime from '../../utils/dateConversion';
import Comment from '../Comment/Comment';
import './Story.css';

const Story = ({ stories }) => {
  const [newStory, setNewStory] = useState({});
  // const [storiesFromProps, setStoriesFromProps] = useState(stories);
  const [isLoading, setIsLoading] = useState(true);
  const url = 'https://news.ycombinator.com/item?id=';
  const { storyId } = useParams();

  // works slightly faster then api call
  const story = stories
    ? stories.find((item) => item.id === Number(storyId))
    : null;

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
        <span>
          {newStory.score} by {newStory.by} at{' '}
          {getDateStringFromUnixTime(newStory.time)}
        </span>
      </p>
      <p>
        <a href={url + `${newStory.id}`} rel="noreferrer">
          {url + `newStory.id`}
        </a>{' '}
        {newStory.descendants}
      </p>
      {newStory.kids && (
        <section>
          {newStory.kids.map((item) => (
            <Comment key={item} comment={item} />
          ))}
        </section>
      )}
    </div>
  );
};

export default Story;
