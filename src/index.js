import './styles.css';
import loadService from "./js/load-service";
import updateGalleryMarkup from "./js/update_gallery-markup";
import showLightbox from "./js/lightbox"


const refs = {
    galleryRef: document.querySelector(".gallery"),
    formRef: document.querySelector(".search-form"),
    loadMoreBtn: document.querySelector('[data-action="load-more"]'),
     largeImage: document.querySelector('.lightbox-image'),
  modal: document.querySelector('.js-lightbox'),
  closeModalBtn: document.querySelector('.lightbox-button'),
  overlay: document.querySelector('.lightbox-overlay')
};


  console.log(refs.loadMoreBtn)
refs.formRef.addEventListener("submit", submitHandler)


function submitHandler(event) {
    event.preventDefault()
    const form = event.currentTarget;
    loadService.query = form.elements.query.value;
    refs.galleryRef.innerHTML = "";
    form.reset();
    loadService.resetPage();
    refs.loadMoreBtn.classList.add("is-hidden");
    loadService.fetchImages().then(hits => {
        updateGalleryMarkup(hits);
        refs.loadMoreBtn.classList.remove("is-hidden");
    });
    };



refs.loadMoreBtn.addEventListener("click", loadMoreBtnHandler);


function loadMoreBtnHandler() {
    loadService.fetchImages().then(hits => {
        updateGalleryMarkup(hits);
        refs.loadMoreBtn.classList.remove("is-hidden");
    });
    };


  refs.galleryRef.addEventListener('click', onGalleryClick);


refs.closeModalBtn.addEventListener('click', onCloseModal);

function onGalleryClick(e) {
  e.preventDefault();

  if (e.target.nodeName !== 'IMG') {
    return;
  }

  const imageRef = e.target;
  
  refs.largeImage.src = imageRef.dataset.source;
  refs.largeImage.alt = imageRef.alt;
  
  onOpenModal();
}

function onOpenModal() {
  window.addEventListener('keydown', onPressESC);
  
  refs.modal.classList.add('is-open');
  refs.overlay.addEventListener('click', onClickOverlay);
}



function onCloseModal() {
  window.removeEventListener('keydown', onPressESC);
  
  refs.modal.classList.remove('is-open');
  refs.largeImage.src = '#';
  refs.largeImage.alt = ' ';
}

function onPressESC(e) {
  if (e.code === 'Escape') {
    onCloseModal();
  }
}

function onClickOverlay(e) {
  if (e.target === e.currentTarget) {
    onCloseModal();
  }
}


