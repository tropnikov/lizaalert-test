const serverUrl = 'https://hacker-news.firebaseio.com/v0/';

class Api {
  #baseUrl;
  #headers;

  constructor({ baseUrl, headers }) {
    this.#baseUrl = baseUrl;
    this.#headers = headers;
  }

  #handleResponse = (response) => {
    return response.ok
      ? response.json()
      : Promise.reject(`Ошибка: ${response.status}`);
  };

  getNewStories() {
    return fetch(this.#baseUrl + `newstories.json`).then(this.#handleResponse);
  }

  getStoryById(itemId) {
    return fetch(`${this.#baseUrl}/item/${itemId}.json`, {
      method: 'GET',
      headers: this.#headers,
    }).then(this.#handleResponse);
  }
}

const api = new Api({
  baseUrl: serverUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
