import axios from 'axios';

export class pixabayAPI {
  static BASE_URL = 'https://pixabay.com/api/';
  static API_KEY = '33063582-bd88d5aaf715a71a39133f1fd';

  constructor() {
    this.page = null;
    this.q = null;
  }

  fetchPhotosByQuery() {
    const searchParams = {
      params: {
        q: this.q,
        page: this.page,
        per_page: 40,
        orientation: 'horizontal',
        key: pixabayAPI.API_KEY,
        image_type: 'photo',
        safesearch: true,
      },
    };

    return axios.get(`${pixabayAPI.BASE_URL}`, searchParams);
  }
}
