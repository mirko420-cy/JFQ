let slideIndex = 0;

function prevSlide() {
  const slideWidth = document.querySelector('.carousel-slide img').clientWidth;
  if (slideIndex === 0) {
    slideIndex = document.querySelectorAll('#carousel1 img').length - 1;
    console.log(slideIndex)
  } else {
    slideIndex--;
  }
  updateSlide(slideWidth);
}

function nextSlide() {
  const slideWidth = document.querySelector('.carousel-slide img').clientWidth;
  if (slideIndex === document.querySelectorAll('#carousel1 img').length - 1) {
    slideIndex = 0;
    console.log(slideIndex)
  } else {
    slideIndex++;
  }
  updateSlide(slideWidth);
}

function updateSlide(slideWidth) {
  const newTransformValue = -slideIndex * slideWidth;
  document.querySelector('.carousel-slide').style.transform = `translateX(${newTransformValue}px)`;
}

let slideIndex2 = 0;

function prevSlide2() {
  const slideWidth2 = document.getElementById('carousel2').querySelector('img').clientWidth;
  if (slideIndex2 === 0) {
    slideIndex2 = document.querySelectorAll('#carousel2 img').length - 1;
  } else {
    slideIndex2--;
  }
  updateSlide2(slideWidth2);
}

function nextSlide2() {
  const slideWidth2 = document.getElementById('carousel2').querySelector('img').clientWidth;
  if (slideIndex2 === document.querySelectorAll('#carousel2 img').length - 1) {
    slideIndex2 = 0;
  } else {
    slideIndex2++;
  }
  updateSlide2(slideWidth2);
}

function updateSlide2(slideWidth2) {
  const newTransformValue2 = -slideIndex2 * slideWidth2;
  document.getElementById('carousel2').style.transform = `translateX(${newTransformValue2}px)`;
}
let slideIndex3 = 0;

function prevSlide3() {
  const slideWidth3 = document.getElementById('carousel3').querySelector('img').clientWidth;
  if (slideIndex3 === 0) {
    slideIndex3 = document.querySelectorAll('#carousel3 img').length - 1;
  } else {
    slideIndex3--;
  }
  updateSlide3(slideWidth3);
}

function nextSlide3() {
  const slideWidth3 = document.getElementById('carousel3').querySelector('img').clientWidth;
  if (slideIndex3 === document.querySelectorAll('#carousel3 img').length - 1) {
    slideIndex3 = 0;
  } else {
    slideIndex3++;
  }
  updateSlide3(slideWidth3);
}

function updateSlide3(slideWidth3) {
  const newTransformValue3 = -slideIndex3 * slideWidth3;
  document.getElementById('carousel3').style.transform = `translateX(${newTransformValue3}px)`;
}

const submitButton = document.getElementById("submit-button");
const commentInput = document.getElementById("comment-input");
const commentsContainer = document.getElementById("comments-container");

submitButton.addEventListener("click", function() {
  const comment = commentInput.value;
  const commentElement = document.createElement("div");
  commentElement.innerHTML = comment;
  commentsContainer.appendChild(commentElement);
  commentInput.value = "";
});

function initMap() {
  // Coordenadas del lugar
  var lugar = { lat: 12.992571201622615, lng: -66.60197115964398 };

  // mapa
  var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 15, //zoom inicial del mapa
      center: lugar // Centrar
  });

  // Marcador en las coordenadas del lugar
  var marker = new google.maps.Marker({
      position: lugar,
      map: map,
      title: 'Ubicación del Lugar'
  });
}



























