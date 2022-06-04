import { fetchPictures } from './fetchPictures';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';

const searchForm = document.querySelector('.search-form');
const galleryContainer = document.querySelector('.gallery');
searchForm.addEventListener('submit', onSubmitSearch);

function onSubmitSearch(e) {
  e.preventDefault();
  const searchItem = e.currentTarget.elements.searchQuery.value;
  //console.log(searchItem);
  fetchPictures(searchItem)
    .then(res => {
      cardsRender(res);
    })
    .catch(error => {
      console.log(error);
    });
}

function cardsRender(res) {
  if (res.totalHits === 0) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
  if (galleryContainer.innerHTML !== '') {
    galleryContainer.innerHTML = '';
  }
  //console.log(res);
  const picsArray = res.hits;
  //console.log(picsArray);
  const newGallery = picsArray
    .map(
      picture => `<div class="photo-card">
    <a class="gallery__item" href="${picture.largeImageURL}">
    <img src="${picture.webformatURL}" alt="${picture.tags}" loading="lazy" width="300px", height="200px"/>
    </a>
    <div class="info">
    <p class="info-item">
      <b>Likes </b>${picture.likes}
     </p>
    <p class="info-item">
      <b>Views </b>${picture.views}
    </p>
    <p class="info-item">
      <b>Comments </b>${picture.comments}
    </p>
    <p class="info-item">
      <b>Downloads </b>${picture.downloads}
    </p>
    </div>
    </div>`
    )
    .join('');
  //console.log(newGallery);
  galleryContainer.innerHTML = newGallery;
}
