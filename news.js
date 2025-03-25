//お知らせの取得
var api_url = 'https://script.google.com/macros/s/AKfycbwzgahZ9oATQSkaXFnHnqxeVsEWvIKzNVONQH9e6GkWB1SIdN7fM21KX8gxN6LFTA4/exec';
now=0;
newsNum=0;

window.onload = function(){
    document.getElementById('newsBoxes').style.left = 0*-24 +25 + 'vw';
    document.getElementsByClassName('newsBox base')[0].classList.add('selected');
    fetch(api_url)
    .then(function (fetch_data) {
        return fetch_data.json();
    })
    .then(function (json) {
        document.getElementsByClassName('newsBox base')[0].classList.remove('selected');
        for (var i = 0; i < json.length; i++) {
            var base_element = document.getElementsByClassName('newsBox base');
            var clone_element = base_element[0].cloneNode(true); //元となるHTMLの要素を複製
            clone_element.classList.remove('base');
            clone_element.querySelector('.newsDate').textContent = json[i].date;
            clone_element.querySelector('.newsTitle').textContent = json[i].title;
            clone_element.querySelector('.newsImage').setAttribute( 'src', json[i].image );
            clone_element.querySelector('.newsContent').textContent = json[i].content;
            base_element[0].parentNode.appendChild(clone_element);
        }
        if(json.length == 0){
            newsNum = json.length-1
            document.getElementsByClassName('newsBox base')[0].classList.add('selected');
        } else {
            document.getElementsByClassName('newsBox base')[0].remove();
            newsNum = json.length-1;
            now = newsNum/2|0;
            document.getElementsByClassName('newsBox')[now].classList.add('selected');
            document.getElementById('newsBoxes').style.left = now*-24 +25 + 'vw';
        }
    })
}

function selectNews(direction){
    if(direction == 'right'){
        if(now < newsNum){
            now++;
            document.getElementById('newsBoxes').children[now].classList.add('selected');
            document.getElementById('newsBoxes').children[now-1].classList.remove('selected');
            document.getElementById('newsBoxes').style.left = now*-24 +25 + 'vw';
        } else {
            now = 0;
            document.getElementById('newsBoxes').children[now].classList.add('selected');
            document.getElementById('newsBoxes').children[newsNum].classList.remove('selected');
            document.getElementById('newsBoxes').style.left = now*-24 +25 + 'vw';
        }
    } else if(direction == 'left'){
        if(now > 0){
            now--;
            document.getElementById('newsBoxes').children[now].classList.add('selected');
            document.getElementById('newsBoxes').children[now+1].classList.remove('selected');
            document.getElementById('newsBoxes').style.left = now*-24 + 25 + 'vw';
        } else {
            now = newsNum;
            document.getElementById('newsBoxes').children[now].classList.add('selected');
            document.getElementById('newsBoxes').children[0].classList.remove('selected');
            document.getElementById('newsBoxes').style.left = now*-24 + 25 + 'vw';
        }
    }
}