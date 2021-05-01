const apiKey = '21376741-4642603aeb6d51fadff9a1e81';

function fetchImages(searchQuery) {
  const page = 1;
  const url = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${searchQuery}&page=${page}&per_page=12&key=${apiKey}`;

  return fetch(url)
    .then(response => response.json())
    .then(data => data.hits)
    .catch(error => console.log(error));
}

export default fetchImages;
