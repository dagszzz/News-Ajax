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
                output.push('<a href="#article" onclick="showGIFS(\'' + 
                encodeURIComponent(title.replace(/'/g,"\\'")) + 
                '\')">');
                output.push(title);
                output.push('</a>');
                output.push('</div>');
                return output;
        
}

function addGIFImg(imageContainerId, imgSrc) {
    var newIMG = document.createElement('img');
    newIMG.src = imgSrc;
    var containerEle = document.getElementById(imageContainerId);
    containerEle.appendChild(newIMG);
}

function showGIFS(searchTerm) {
    document.getElementById('gifs').innerHTML = '';
    var gifsURL = "http://api.giphy.com/v1/gifs/search" + 
    "?" +
    "rating=g" +
    "&" +
    "q=" + searchTerm +
    "&" +
    "apiKey=97ae53656f8c434aaa80f56a95d5ec60";

    var req = new XMLHttpRequest();
    req.open("GET", gifsURL, true);

    req.onload = function () {
        hideEle('ajax-wait');
        var gifData = JSON.parse(req.responseText);
        for (var gifIdx = 0; gifIdx < gifData.data.length;gifIdx++) {
            console.log(gifData.data[gifIdx].images.original.url);
            addGIFImg('gifs', gifData.data[gifIdx].images.original.url);
        }
    } ;
        
    req.onerror = function () {
        hideEle('ajax-wait');
        document.getElementById('error').innerHTML = 
        'There was an error in retrieving GIFs. Please try again';
        showEle('error');
    } ;
        
    req.send();

    showEle('ajax-wait');

}

window.addEventListener('load', showGIFS);

