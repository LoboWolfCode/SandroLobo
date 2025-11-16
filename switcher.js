const switcher = document.querySelector(".switcher");

const trackPrevious = (el) => {
  const radios = el.querySelectorAll('input[type="radio"]');
  let previousValue = null;

  // init first select
  const initiallyChecked = el.querySelector('input[type="radio"]:checked');
  if (initiallyChecked) {
    previousValue = initiallyChecked.getAttribute("c-option");
    el.setAttribute("c-previous", previousValue);
  }

  radios.forEach((radio) => {
    radio.addEventListener("change", () => {
      if (radio.checked) {
        el.setAttribute("c-previous", previousValue ?? "");
        previousValue = radio.getAttribute("c-option");
      }
    });
  });
};

trackPrevious(switcher);


const saveToLocalStorage = (el) => {
  const radios = el.querySelectorAll('input[type="radio"]');
  const storageKey = "switcher-selection";

  // restore saved selection
  const saved = localStorage.getItem(storageKey);
  if (saved) {
    const radio = el.querySelector(`input[type="radio"][c-option="${saved}"]`);
    if (radio) radio.checked = true;
  }

  radios.forEach((radio) => {
    radio.addEventListener("change", () => {
      if (radio.checked) {
        localStorage.setItem(storageKey, radio.getAttribute("c-option"));
      }
    });
  });
};

saveToLocalStorage(switcher);