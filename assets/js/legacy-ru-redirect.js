(function () {
  const target = new URL(window.location.href);
  target.pathname = target.pathname
    .replace(/\/ru\//, "/")
    .replace(/\/index\.html$/, "/");

  window.location.replace(target.href);
})();
