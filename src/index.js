import "./prebuilt.css";
import "./styles.css";

import "./theme_default.css";
import "./theme_brand.css";
import "./theme_inverse.css";

import postcss from "postcss";
const cssColors = postcss([
  require("postcss-nested"),
  require("postcss-simple-vars"),
  require("postcss-color-function")
]);

const mutamuta = new MutationObserver(function(records) {
  for (let found of records) {
    for (let node of found.addedNodes) {
      updateThemeCss(node);
    }
  }
  // console.log('callback that runs when observer is triggered', records);
});
mutamuta.observe(document.head, { childList: true });
for (let node of document.getElementsByTagName("style")) {
  updateThemeCss(node);
}

function updateThemeCss(node) {
  if (!/theme_.+/.test(node.id)) {
    return;
  }
  console.warn("RENDERING", node.id);
  cssColors.process(node.innerHTML, { from: node.id }).then(css => {
    if (!node) return;
    node.innerHTML = String(css);
  });
}
