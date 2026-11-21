/* Wraps every word of [data-split] headings so they can rise in one by one. */
export function splitWords(el: HTMLElement) {
  let i = 0;
  const frag = document.createDocumentFragment();
  const wrap = (content: string | Node) => {
    const w = document.createElement("span");
    w.className = "w";
    const inner = document.createElement("span");
    inner.className = "w__in";
    inner.style.setProperty("--i", String(i++));
    if (typeof content === "string") inner.textContent = content;
    else inner.appendChild(content);
    w.appendChild(inner);
    return w;
  };
  [...el.childNodes].forEach((node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      (node.textContent ?? "").split(/(\s+)/).forEach((tok) => {
        if (!tok) return;
        frag.appendChild(/^\s+$/.test(tok) ? document.createTextNode(" ") : wrap(tok));
      });
    } else if (node.nodeName === "BR") {
      frag.appendChild(node.cloneNode());
    } else {
      frag.appendChild(wrap(node.cloneNode(true)));
    }
  });
  el.replaceChildren(frag);
}
