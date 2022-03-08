import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import api from '../../utils/api';
import NewStories from '../NewStories/NewStories';
import Story from '../Story/Story';
import './App.css';
import spinner from '../../images/spinner.gif';

const App = () => {
  const [newStories, setNewStories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getNewStories = async () => {
      try {
        const newStoriesIds = await api.getNewStories();
        const top100NewStoriesPromises = newStoriesIds
          .slice(0, 100)
          .map((story) =>
            api.getStoryById(story).catch((err) => console.log(err))
          );
        const top100NewStories = await Promise.all(top100NewStoriesPromises);
        setNewStories(top100NewStories);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    getNewStories();
  }, []);

  return (
    <Container>
      <main className="App">
        <h1 className="header">HackerNews</h1>
        <Routes>
          <Route
            path="/"
            element={
              isLoading ? (
                <>
                  <img className="spinner" src={spinner} alt="spinner" />
                  <h2 className="header_loading">Loading...</h2>
                </>
              ) : (
                <section>
                  <NewStories stories={newStories} />
                </section>
              )
            }
          />
          <Route path="/:storyId" element={<Story stories={newStories} />} />
        </Routes>
      </main>
    </Container>
  );
};

export default App;
