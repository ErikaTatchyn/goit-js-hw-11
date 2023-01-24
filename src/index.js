import './css/styles.css';
import axios from 'axios';
import notiflix from 'notiflix';

const searchForm = document.getElementById('search-form');
const searchInput = document.querySelector("input[name='searchQuery']");

// Pixabay API endpoint
const API_URL = 'https://pixabay.com/api';

// API key
const API_KEY = '33063582-bd88d5aaf715a71a39133f1fd';

searchForm.addEventListener('submit', async e => {
  e.preventDefault();
  // Get the search query
  const searchQuery = searchInput.value;

  try {
    // Show loading notification
    notiflix.Loading.spin('Searching...');
    // Make the API request
    const response = await axios.get(API_URL, {
      params: {
        key: API_KEY,
        q: searchQuery,
        image_type: 'photo',
        orientation: horizontal,
        safe_search: true,
      },
    });
    // Handle the API response
    if (response.data.hits.length === 0) {
      notiflix.Notify.info('No results found.');
    } else {
      // Display the images
    }
    // Hide the loading notification
    notiflix.Loading.remove();
  } catch (error) {
    // Handle the error
    notiflix.Notify.failure('An error occurred.');
    // Hide the loading notification
    notiflix.Loading.remove();
  }
});
