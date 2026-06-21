const assert = require("node:assert/strict");
const fs = require("node:fs");
const test = require("node:test");

const pages = [
  "index.html",
  "about.html",
  "rooms.html",
  "pricing.html",
  "procedures.html",
  "indications.html",
  "nutrition.html",
  "licenses.html",
  "contact.html"
];

function tagSkeleton(html) {
  return [...html.matchAll(/<\/?([a-z][a-z0-9-]*)\b[^>]*>/gi)].map((match) => ({
    closing: match[0].startsWith("</"),
    tag: match[1].toLowerCase()
  }));
}

for (const locale of ["uz", "kk"]) {
  test(`${locale} pages use the Russian page structure`, () => {
    for (const page of pages) {
      const source = fs.readFileSync(page, "utf8");
      const localized = fs.readFileSync(`${locale}/${page}`, "utf8");

      assert.deepEqual(tagSkeleton(localized), tagSkeleton(source), `${locale}/${page}`);
      assert.doesNotMatch(
        localized,
        /\b(?:src|href|content)="(?:assets\/|images\/|favicon\.svg)/,
        `${locale}/${page} contains a root-relative asset path`
      );
    }
  });
}

test("Uzbek generated pages contain no untranslated Russian copy", () => {
  for (const page of pages) {
    const html = fs.readFileSync(`uz/${page}`, "utf8");
    assert.doesNotMatch(html, /[А-Яа-яЁё]/, `uz/${page}`);
  }
});
