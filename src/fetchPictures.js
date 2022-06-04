const BASE_URL = 'https://pixabay.com/api';
const apiKey = '27847639-8e847d0d7182257a527cf2e5a';

export function fetchPictures(searchItem) {
  return fetch(
    `${BASE_URL}/?key=${apiKey}&q=${searchItem}&image_type=photo&orientation=horizontal&safesearch=true&page=1&per_page=40`
  ).then(res => {
    if (res.status === 404) {
      throw new Error();
    }
    return res.json();
  });
}
