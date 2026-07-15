(function () {
  "use strict";

  function language() {
    const select = document.getElementById("languageSelect");
    if (select && /^(zh|en|ja)$/.test(select.value)) return select.value;
    try {
      return localStorage.getItem("hanyuLang") || "zh";
    } catch (error) {
      return "zh";
    }
  }

  function applyLanguageDetails() {
    const lang = language();
    document.documentElement.dataset.pagedLanguage = lang;
    const producer = document.querySelector(".producer-credit");
    if (!producer) return;
    producer.textContent = lang === "en"
      ? "Produced by · momoka1207"
      : lang === "ja"
        ? "制作者 · momoka1207"
        : "制作人 · momoka1207";
    document.documentElement.dataset.producerReady = "true";
  }

  window.addEventListener("change", function (event) {
    if (!event.target || event.target.id !== "languageSelect") return;
    applyLanguageDetails();
    setTimeout(applyLanguageDetails, 0);
  }, true);

  const observer = new MutationObserver(function (records) {
    let languageControlAdded = false;
    records.forEach(function (record) {
      record.addedNodes.forEach(function (node) {
        if (node.nodeType !== 1) return;
        if (node.id === "languageSelect" || (node.querySelector && node.querySelector("#languageSelect"))) {
          languageControlAdded = true;
        }
      });
    });
    if (languageControlAdded) applyLanguageDetails();
  });

  observer.observe(document.documentElement, { childList: true, subtree: true });
  applyLanguageDetails();
  window.addEventListener("DOMContentLoaded", function () {
    applyLanguageDetails();
  }, { once: true });
})();
