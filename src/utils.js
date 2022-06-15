/**
 * Retorna el elemento encontrado en base al selector pasado
 * @param {String} selector El identificador o clase del elemento
 * @returns {Element}
 */
const d = document;

export function $(selector) {
  return d.querySelector(selector);
}

export function isMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}
