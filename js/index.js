const PARAM_NAME = 'carriage';
const ORDER_DOMAIN = 'https://qr.vnticketonline.vn';
const FPL_TRAIN_DOMAIN = 'https://fptplay.vn';
document.addEventListener('DOMContentLoaded', function () {
  const currentUrl = window?.location?.href;
  const urlParams = new URLSearchParams(window.location.search);
  const paramValue = urlParams.get(PARAM_NAME) || '';

  //set href link change language to English
  const linkSetLangEn = document.querySelector('.set-lang-en');
  if (linkSetLangEn)
    linkSetLangEn.href = currentUrl.replace('index_vn', 'index_en');

  const linkSetLangEnMobile = document.querySelector('.set-lang-en-mb');
  if (linkSetLangEnMobile)
    linkSetLangEnMobile.href = currentUrl.replace('index_vn', 'index_en');

  //set href link change language to Vietnamese
  const linkSetLangVn = document.querySelector('.set-lang-vn');
  if (linkSetLangVn)
    linkSetLangVn.href = currentUrl.replace('index_en', 'index_vn');

  const linkSetLangVnMobile = document.querySelector('.set-lang-vn-mb');
  if (linkSetLangVnMobile)
    linkSetLangVnMobile.href = currentUrl.replace('index_en', 'index_vn');

  //set link call to action button
  const linkOrder = document.querySelector('.dat-mon');
  if (linkOrder) linkOrder.href = `${ORDER_DOMAIN}/${paramValue}`;

  const linkFpl = document.querySelector('.xem-phim');
  if (linkFpl) {
    linkFpl?.addEventListener('click', function () {
      const isConnectedWifi = detectWifi();
      if (isConnectedWifi) {
        window.location.href = FPL_TRAIN_DOMAIN;
      } else {
        const modal = document.querySelector('.backdrop');
        const buttonClose = document.querySelector('.modal-button');
        buttonClose.addEventListener('click', function () {
          modal?.classList?.remove('show');
        });
        modal?.classList?.add('show');
      }
    });
  }
});

function detectWifi() {
  fetch('https://fptplay.vn/check', {
    method: 'GET',
  })
    .then(function (response) {
      console.log(response);
      if (response.status_code == 200) {
        return true;
      }
      return false;
    })
    .catch(function (error) {
      console.error('There was a problem with the fetch operation:', error);
      return false;
    });
}
