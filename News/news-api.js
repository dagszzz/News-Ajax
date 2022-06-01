function setEleDisplay(id, display) {
    var ele = document.getElementById(id);
    if (!ele) {
        console.error('Element with id ' + id + ' not found ind document.');
        return;
    }
    ele.style.display = display;
}

function showEle(id) { setEleDisplay(id, 'block');}
function hideEle(id) { setEleDisplay(id, 'block');}

function makeHeadline(title, output){
      output.push('<div class = "headline">');
                output.push('<a href="#article" onclick="console.log(\'' + 
                encodeURIComponent(title.replace(/'/g,"\\'")) + 
                '\')">');
                output.push(title);
                output.push('</a>');
                output.push('</div>');
                return output;
        
}

function showHeadlines() {
    var headlinesURL = "https://newsapi.org/v2/top-headlines" + 
    "?" +
    "country=us" +
    "&" +
    "category=entertainment" + 
    "&" +
    "apiKey=97ae53656f8c434aaa80f56a95d5ec60";

    var req = new XMLHttpRequest();
    req.open("GET", headlinesURL, true);

    req.onload = function () {
        hideEle('ajax-wait');
        var newsData = JSON.parse(req.responseText);
        var output = [];
        for (var articleIdx = 0; 
            articleIdx < newsData.articles.length; 
            articleIdx++){
            makeHeadline(newsData.articles[articleIdx].title, output);    
            }      
        document.getElementById('headlines').innerHTML = output.join('\r');
    } ;
        
    req.onerror = function () {
        hideEle('ajax-wait');
        console.log('success');
    } ;
        
    req.send();

    showEle('ajax-wait');

}

window.addEventListener('load', showHeadlines);

