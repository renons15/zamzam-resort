const assert = require("node:assert/strict");
const fs = require("node:fs");
const test = require("node:test");
const vm = require("node:vm");

const navbarCode = fs.readFileSync("assets/js/navbar.js", "utf8");
const legacyRedirectCode = fs.readFileSync(
  "assets/js/legacy-ru-redirect.js",
  "utf8"
);

function renderNavbar(pathname, hash = "") {
  const host = { innerHTML: "" };

  vm.runInNewContext(navbarCode, {
    window: { location: { pathname, hash } },
    document: {
      querySelector: () => host,
      readyState: "complete"
    }
  });

  return host.innerHTML;
}

test("Russian navigation uses the canonical root pages", () => {
  const navbar = renderNavbar("/zamzam-resort/");

  assert.match(navbar, /href="\/zamzam-resort\/about\.html"/);
  assert.match(navbar, /href="\/zamzam-resort\/#rooms"/);
  assert.match(navbar, /href="\/zamzam-resort\/" lang="ru"/);
  assert.doesNotMatch(navbar, /\/zamzam-resort\/ru\//);
});

test("language links preserve the equivalent page", () => {
  const russianNavbar = renderNavbar("/zamzam-resort/about.html");
  const uzbekNavbar = renderNavbar("/zamzam-resort/uz/about.html");

  assert.match(
    russianNavbar,
    /href="\/zamzam-resort\/uz\/about\.html" lang="uz"/
  );
  assert.match(
    russianNavbar,
    /href="\/zamzam-resort\/kk\/about\.html" lang="kk"/
  );
  assert.match(
    uzbekNavbar,
    /href="\/zamzam-resort\/about\.html" lang="ru"/
  );
});

test("legacy Russian URLs redirect to root and preserve URL state", () => {
  let redirectedTo = "";

  vm.runInNewContext(legacyRedirectCode, {
    URL,
    window: {
      location: {
        href: "https://renons15.github.io/zamzam-resort/ru/index.html?ref=old#hero",
        replace(url) {
          redirectedTo = url;
        }
      }
    }
  });

  assert.equal(
    redirectedTo,
    "https://renons15.github.io/zamzam-resort/?ref=old#hero"
  );
});
