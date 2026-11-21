import { $, reduceMotion } from "./utils";

const WORDS = {
  fr: ["Bonjour", "Hello", "Hola", "Ciao", "Hallo", "Olá", "Bonjour"],
  en: ["Hello", "Bonjour", "Hola", "Ciao", "Hallo", "Olá", "Hello"],
};

/** Cycles "hello" in several languages, then lifts the curtain. `instant` skips the words. */
export function runLoader(done: () => void, instant = false) {
  const word = $("#loaderWord");
  const words = document.documentElement.lang === "en" ? WORDS.en : WORDS.fr;
  word.textContent = words[0];

  const finish = () => {
    document.body.classList.remove("is-loading");
    document.body.classList.add("loaded");
    done();
  };
  if (reduceMotion || instant) return finish();

  let i = 0;
  const timer = setInterval(() => {
    i++;
    if (i >= words.length) {
      clearInterval(timer);
      setTimeout(finish, 150);
      return;
    }
    word.textContent = words[i];
  }, 190);
}
