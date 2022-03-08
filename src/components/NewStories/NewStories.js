import { Link } from 'react-router-dom';
import getDateStringFromUnixTime from '../../utils/dateConversion';
import './NewStories.css';

const NewStories = ({ stories }) => {
  return (
    <ol className="stories-container">
      {stories.map((item) => {
        return (
          <li key={item.id} className="story">
            <Link to={`/${item.id}`}>
              <div>
                <p>{item.title}</p>
                <p>
                  <span>
                    {item.score} by {item.by}{' '}
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
