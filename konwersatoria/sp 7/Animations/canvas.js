document.addEventListener('DOMContentLoaded', initCanvasSlider);

function initCanvasSlider() {
  // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
  // pobranie uchwytu do elem. canvas
  const canvas = document.getElementById('plotno');

  if (!canvas || !canvas.getContext) {
    return;
  }

  // pobranie 'kontekstu' 2d za pomocą którego będziemy rysować
  const ctx = canvas.getContext('2d');

  const slide = {
    width: 1200,
    height: 675,
    speed: 4000,
  };

  let imgStartTop = 0;
  let imgStartLeft = 0;
  const sliderImages = [];

  // ładowanie zdjęć
  for (let i = 1; i <= 5; i += 1) {
    sliderImages[i] = new Image();
    sliderImages[i].addEventListener('load', function onLoad() {
      ctx.drawImage(this, imgStartLeft, imgStartTop, slide.width, slide.height);
      imgStartLeft += 300;
    });
    sliderImages[i].src = `./img/m${i}.jpg`;
  }

  let trX = 0;
  let offsetX = 0;

  // anim start
  function anim() {
    // mała zabawa z przesunięciem - slajdy zwalniają na końcu
    trX += (1 - trX / slide.width) * 80 + 1;

    // czyszczenie obszaru rysowania
    // ctx.clearRect(0, 0, slide.width, slide.height);

    // przerysowanie zdjęć w pozycji (-offsetX-trX+i*slide.width, 0)
    for (const i in sliderImages) {
      if (Object.prototype.hasOwnProperty.call(sliderImages, i)) {
        ctx.drawImage(sliderImages[i], -offsetX - trX + i * slide.width, 0, slide.width, slide.height);
      }
    }

    // w czasie animacji zdjęć
    if (trX < slide.width) {
      // jeśli koniec animacji - zrób anim wstecz
      if (offsetX >= slide.width * (sliderImages.length - 1)) {
        animReverse();
      } else {
        requestAnimationFrame(anim);
      }
    } else {
      // czekaj 2s i animuj ponownie
      setTimeout(anim, 2000);
      offsetX += slide.width;
      trX = 0;
    }
  }

  // funkcja animuje zdjęcia "wstecz" - w prawo do początkowej pozycji
  function animReverse() {
    trX += 80;
    ctx.clearRect(0, 0, slide.width, slide.height);

    for (const i in sliderImages) {
      if (Object.prototype.hasOwnProperty.call(sliderImages, i)) {
        ctx.drawImage(sliderImages[i], -offsetX + trX + i * slide.width, 0, slide.width, slide.height);
      }
    }

    if (trX + slide.width < offsetX) {
      requestAnimationFrame(animReverse);
    } else {
      setTimeout(anim, 2000);
      offsetX = slide.width;
      trX = 0;
    }
  }

  void slide.speed;
  anim();
}