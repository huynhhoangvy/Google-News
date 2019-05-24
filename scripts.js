let articles = [];
let currentPage = 1;
let more = false;
let sources = [];
let sourceName = [];
let sourceNameWithCount = {}

const docNewsList = () => document.getElementById('newsList')
const getData = async () => {
  const url = 'https://newsapi.org/v2/everything?pageSize=10&q=game&apiKey=50a894daaedc4bb2ad278397c8fc6644&page=' + currentPage
  const req = new Request(url);
  const res = await fetch(req)
  let data = await res.json();

  articles = articles.concat(data.articles)
  sources = articles.map(element => element.source.name)
  console.log(sourceNameWithCount)

  for (let i = 0; i < sources.length - 1; i++) {
    if (!sourceNameWithCount[sources[i]]) {
      sourceNameWithCount[sources[i]] = 1;
    } else if (sourceNameWithCount[sources[i]]) {
      sourceNameWithCount[sources[i]] += 1;
    }
  }

sourceName = Object.keys(sourceNameWithCount)

renderNewsFeed()
}

const renderNewsFeed = () => {
  let html = ''
  articles.map((articles) => {
    const node = html += `
    <h1>${articles.title}</h1>	<h3>${articles.description}</h3> <img src="${articles.urlToImage}" style="display: inline-block; height: 20%; width: 40% "> <h5>Published ${moment(articles.publishedAt).startOf("hour").fromNow()}</h5> <h6><a href="${articles.url}">${articles.author || 'Associated Press'}</a></h6>	<p>${articles.content}</p> `
    docNewsList().innerHTML = node
  })
  document.getElementById("totalArticles").innerHTML = `Total Articles: ${articles.length}`
  document.getElementById("checkBox-form").innerHTML = sourceName.map(element => `<input id="${element}" type="checkbox"" checked>(${sourceNameWithCount[element]})${element}`).join("")
  filterArticles()
}

let viewMore = () => {
  currentPage += 1;
  getData();
}

let filterArticles = () => {
  for (let i = 0; i < sourceName.length - 1; i++) {
    if (document.getElementById(`${sourceName[i]}`).checked) {
      articles = articles.filter(element => element.source.name != sourceName[i]);
    }
  }
  for (let i = 0; i < sourceName.length - 1; i++) {
    document.getElementById(`${sourceName[i]}`).addEventListener("change", renderNewsFeed);
  }
}

getData()