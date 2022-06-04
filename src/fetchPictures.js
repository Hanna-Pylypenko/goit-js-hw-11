const BASE_URL = 'https://pixabay.com/api';
const apiKey = '27847639-8e847d0d7182257a527cf2e5a';

export function fetchPictures(searchItem, pageNumber) {
  if (searchItem === '') {
    return;
  }
  return fetch(
    `${BASE_URL}/?key=${apiKey}&q=${searchItem}&image_type=photo&orientation=horizontal&safesearch=true&page=${pageNumber}&per_page=40`
  ).then(res => {
    if (res.status === 404) {
      throw new Error();
    }
    return res.json();
  });
}
