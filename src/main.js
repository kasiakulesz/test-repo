import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'

document.querySelector('#app').innerHTML = `
  <div class="p-10">
    <a href="https://vite.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <h1 class="font-bold text-2xl text-primary ">Hello Vite!</h1>
    <div class="card">
      <button id="counter" type="button" class="bg-blue-300 p-4"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite logo to learn more
    </p>
  </div>
`

setupCounter(document.querySelector('#counter'))

const fetchArticles = async () => {
  try {
    const response = await fetch(
      'https://nrlitwvxtepgxqtmukuh.supabase.co/rest/v1/articles?select=*', {
        headers: {
          apiKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5ybGl0d3Z4dGVwZ3hxdG11a3VoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgwNzk3ODMsImV4cCI6MjA2MzY1NTc4M30.MzdeaeuY5cgVBNgqOXBLLFHo0JG9ugWbhqLVOHvB2Ng',
  },
  });
  const data = await response.json();
  console.log(data);
  return data;
  } catch (error) {
  console.error('Fetch error:', error);
  alert('Błąd wgrywania artykułów')
  }
};

const loadArticles = async () => {
  const articles = await fetchArticles();
  articles.forEach(article => {
    const div = document.createElement('div');
    document.getElementById("articles").innerHTML += `
    <div class="article_box">
      <div class="flex flex-row gap-2 items-baseline">
        <h3 class="text-2xl font-bold">${article.title} • </h3>
        <h4 class="text-xl font-semibold">${article.subtitle}</h4>
      </div>
      <div class="flex gap-2 items-baseline">
        <p class="font-semibold">${article.author}</p>
        <p class="font-light text-xs">${new Date(article.created_at).toLocaleString()}</p>
      </div>
      <p>${article.content}</p>
      <hr class="w-50 h-px mx-auto my-8 bg-gray-300 border-0">
    </div>
    `;
  });
};


loadArticles()