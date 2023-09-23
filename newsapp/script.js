const API_KEY= "ed1703bbc02344d4b04f7df289c9ab36";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("India"));

function reload (){
    window.location.reload();
}

async function fetchNews(query) {
   const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);

   const data = await res.json();
   bindData(data.articles);
}

function bindData(articles){
   const cardscontainer = document.getElementById('cards-container');
    const newsCardTemplate = document.getElementById('template-news-card');

   cardscontainer.innerHTML = '';

   articles.forEach(article => {

    if(!article.urlToImage) return;
    const cardClone = newsCardTemplate.content.cloneNode(true);
    filldataincard(cardClone,article); 
    cardscontainer.appendChild(cardClone);
    
   });

}

function filldataincard(cardClone,article) {
    const newsImg = cardClone.querySelector('#news-img');
    const newTitle = cardClone.querySelector('#news-title');
    const newsSource = cardClone.querySelector('#news-source');
    const newsDesc = cardClone.querySelector('#news-desc');

    newsImg.src = article.urlToImage;
    newTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta"
    });

    newsSource.innerHTML = `${article.source.name} . ${date}`;

    cardClone.firstElementChild.addEventListener("click", () =>{
        window.open(article.url, "_blank");
    });

}
let curSelectedNav = null;

function onNavItemClick(id){
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove('active');
    curSelectedNav = navItem;

    curSelectedNav.classList.add('active');


}

const searchbutton = document.getElementById("search-button");

const searchtext = document.getElementById("search-text");

searchbutton.addEventListener("click", () => {
    const query = searchtext.value;
    if(!query) return;
    fetchNews(query);

    curSelectedNav?.classList.remove("active");

    curSelectedNav = null;
});