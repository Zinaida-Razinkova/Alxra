const filterItem = document.querySelector(".portfolio-items");
const filterImg = document.querySelectorAll(".portfolio-row .portfolio-image");
const smallFotos = document.querySelectorAll('.portfolio-img');
const modalGallery =  document.querySelector('.portfolio-modal');
const bigFotos = document.querySelectorAll('.portfolio-modal__slide');
const btnLeft = document.querySelector('.portfolio-modal__prev');
const btnRight = document.querySelector('.portfolio-modal__next');
const btnClose = document.querySelector('.portfolio-modal__close');

// filter
window.onload = ()=>{ 
  filterItem.onclick = (selectedItem)=>{ 
    if(selectedItem.target.classList.contains("portfolio-item")){ 
      filterItem.querySelector(".active").classList.remove("active"); 
      selectedItem.target.classList.add("active"); 
      let filterName = selectedItem.target.getAttribute("data-name");
      filterImg.forEach((image) => {
        let filterImges = image.getAttribute("data-name");
        if((filterImges == filterName) || (filterName == "all")){
          image.classList.remove("hide"); 
          image.classList.add("show"); 
        }else{
          image.classList.add("hide"); 
          image.classList.remove("show"); 
        }
      });
    }
  }
}

// open portfolio
const getActiveSlide = () => {
  smallFotos.forEach(fotoSlide => fotoSlide.addEventListener("click", openFotoGallery));
}
getActiveSlide();

function openFotoGallery() {
  modalGallery.style.display = 'block';
  showSlides(event);
}

// next slide
let activeSlide=0;
const rightSlide = () => {
  activeSlide++;
  if(activeSlide > bigFotos.length -1){
    activeSlide = 0;
  }
  showSlides(event);
};
const leftSlide = () => {
  activeSlide--;
  if(activeSlide < 0){
    activeSlide = bigFotos.length -1;
  }
  showSlides(event);
};

// show large photo in portfolio
const showSlides = (event) => {
  bigFotos.forEach(foto => foto.style.display = 'none'); 
  if (event.target.nodeName === "SPAN") {
    bigFotos[activeSlide].style.display = 'block';
}
    if (event.target.nodeName === "IMG") {
      const indexSlide = [...smallFotos].indexOf(event.target);
      bigFotos[indexSlide].style.display = 'block';
  }
}

// close portfolio
function closeGallery() {
  modalGallery.style.display = 'none';
};

function backdropClick(event) {
  if (event.target === event.currentTarget) {
    closeGallery();
  }
}

function pressEscape(event) {
  if (event.code === 'Escape') {
    closeGallery();
  }
}

btnRight.addEventListener("click", rightSlide);
btnLeft.addEventListener("click", leftSlide);
btnClose.addEventListener("click", closeGallery);
modalGallery.addEventListener("click", backdropClick);
window.addEventListener('keydown', pressEscape);