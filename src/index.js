import { pixabayAPI } from './api.js';
import { createGalleryCards } from './galleryCards.js';
import Notiflix from 'notiflix';

const searchFormEl = document.querySelector('.search-form');
const galleryListEl = document.querySelector('.gallery');
const loadMoreBtnEl = document.querySelector('.load-more');

const pixabayApi = new pixabayAPI();

const onSearchFormSubmit = async event => {
  event.preventDefault();
  pixabayApi.q = event.target.elements.searchQuery.value.trim();
  pixabayApi.page = 1;

  try {
    const response = await pixabayApi.fetchPhotosByQuery();
    const { data } = response;
    if (data.hits.length === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );

      event.target.reset();

      galleryListEl.innerHTML = '';

      loadMoreBtnEl.classList.add('is-hidden');

      return;
    }

    if (data.total_pages > 1) {
      loadMoreBtnEl.classList.remove('is-hidden');
    }

    galleryListEl.innerHTML = createGalleryCards(data.hits);
  } catch (err) {
    console.log(err);
  }
};

const onLoadMoreBtnClick = async event => {
  pixabayApi.page += 1;

  try {
    const response = await pixabayApi.fetchPhotosByQuery();
    const { data } = response;

    galleryListEl.insertAdjacentHTML(
      'beforeend',
      createGalleryCards(data.hits)
    );

    if (pixabayApi.page === data.total / 40) {
      loadMoreBtnEl.classList.add('is-hidden');
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }
  } catch (err) {
    console.log(err);
  }
};

searchFormEl.addEventListener('submit', onSearchFormSubmit);
loadMoreBtnEl.addEventListener('click', onLoadMoreBtnClick);
