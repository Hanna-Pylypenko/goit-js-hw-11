import { fetchPictures } from './fetchPictures';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';

const searchForm = document.querySelector('.search-form');
const galleryContainer = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
searchForm.addEventListener('submit', onSubmitSearch);
loadMoreBtn.addEventListener('click', onLoadMoreClick);

let pageNumber = 1;
let searchItem;
let lightbox;

function onSubmitSearch(e) {
  pageNumber = 1;
  e.preventDefault();
  searchItem = e.currentTarget.elements.searchQuery.value.trim();
  if (galleryContainer.innerHTML !== '') {
    galleryContainer.innerHTML = '';
  }

  fetchPictures(searchItem, pageNumber)
    .then(res => {
      if (res.totalHits > 0) {
        Notiflix.Notify.info(`Hooray! We found ${res.totalHits} images.`);
        console.log(`Hooray! We found ${res.totalHits} images.`);
      }

      cardsRender(res);
      lightbox = new SimpleLightbox('.gallery a', {
        captions: true,
        captionsData: 'alt',
        captionDelay: 250,
      });
    })
    .catch(error => {
      console.log(error);
    });

  onLoadMoreClick();
}

function onLoadMoreClick() {
  pageNumber += 1;
  fetchPictures(searchItem, pageNumber)
    .then(res => {
      if (res.hits.length === 0) {
        loadMoreBtn.classList.remove('is-visible');
        Notiflix.Notify.info(
          "We're sorry, but you've reached the end of search results."
        );
      }
      additionalCardsRender(res);
      lightbox.refresh();
    })
    .catch(error => {
      console.log(error);
    });
}

function cardsRender(res) {
  console.log(res);

  const picsArray = res.hits;
  const newGallery = picsArray
    .map(
      picture =>
        `<div class="photo-card">
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

  if (res.totalHits > 40) {
    loadMoreBtn.classList.add('is-visible');
  } else if (res.totalHits === 0) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }

  galleryContainer.insertAdjacentHTML('beforeend', newGallery);
}

function additionalCardsRender(res) {
  const additionalPicsArray = res.hits;

  const LoadMoreGallery = additionalPicsArray
    .map(
      picture =>
        `<div class="photo-card">
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

  galleryContainer.insertAdjacentHTML('beforeend', LoadMoreGallery);
}
