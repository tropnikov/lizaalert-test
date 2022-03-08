import { Link } from 'react-router-dom';
import getDateStringFromUnixTime from '../../utils/dateConversion';
import './NewStories.css';

const NewStories = ({ stories }) => {
  return (
    <ol className="stories-container">
      {stories.map((item) => {
        return (
          <li key={item.id}>
            <Link to={`/${item.id}`} className="story__link">
              <div className="story">
                <h4 className="story__title">{item.title}</h4>
                <p className="story__info">
                  Score: <span className="story__score">{item.score}</span>, by{' '}
                  <span className="story__author">{item.by}</span> at{' '}
                  <span className="story__date">
                    {getDateStringFromUnixTime(item.time)}
                  </span>
                </p>
              </div>
            </Link>
          </li>
        );
      })}
    </ol>
  );
};

export default NewStories;
