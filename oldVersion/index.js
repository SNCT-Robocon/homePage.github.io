newsNum = 0;
now=0;

const apiUrl = 'https://api.github.com/repos/SNCT-Robocon/homePage.github.io/contents/blog'; 
const repo = 'https://snct-robocon.github.io/homePage.github.io/'

fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error('ネットワークエラー: ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        const fileList = document.getElementById('fileList');

        // 表示をクリア
        fileList.innerHTML = '';

        // ファイル数
        const fileCount = data.length;

        // 各ファイルの名前とパスを表示
        data.forEach(file => {
            if (file.name.endsWith('.html')) { 
                //パス:file.download_url
                const listItem = document.createElement('li');
                const fileName = file.name.replace('.html', '');
                listItem.textContent = fileName;
                fileList.appendChild(listItem);
                listItem.onclick = () => {
                    alert(fileName);
                    window.open(repo+'/blog/'+file.name, "_blank");
                };
            }
        });
    })
    .catch(error => {
        console.error('エラー:', error);
    });

// Intersection Observer 設定
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if(entry.target.classList == 'text-path') {
                entry.target.style.animation = 'drawText 2s ease-in forwards';
            } else if(entry.target.classList == 'line-left'||entry.target.classList == 'line-right') {
                entry.target.style.animation = 'drawLine 2s ease-in forwards';
            } else if(entry.target.classList == 'appear'){
                entry.target.style.animation = 'appear 2s ease-in forwards';
            }
            observer.unobserve(entry.target); // 一度表示したら監視を解除
        }
    });
}, { threshold: 0.5 }); // 50%以上表示されたら実行

document.addEventListener("DOMContentLoaded", () => {
    // SVGを監視
    document.querySelectorAll('.text-path').forEach(element => {
        observer.observe(element);
    });
    document.querySelectorAll('.line-left').forEach(element => {
        observer.observe(element);
    });
    document.querySelectorAll('.line-right').forEach(element => {
        observer.observe(element);
    });
    document.querySelectorAll('.appear').forEach(element => {
        observer.observe(element);
    });

    

    newsNum = document.getElementById('newsBoxes').childElementCount/2+1|0;
    now = newsNum/2+newsNum%2;
    document.getElementById('newsBoxes').children[now].classList.add('selected');
    document.getElementById('newsBoxes').style.left = now*-24 +25 + 'vw';
});

function selectNews(direction){
    if(direction == 'right' && now < newsNum){
        now++;
        document.getElementById('newsBoxes').children[now].classList.add('selected');
        document.getElementById('newsBoxes').children[now-1].classList.remove('selected');
        document.getElementById('newsBoxes').style.left = now*-24 +25 + 'vw';
    } else if(direction == 'left' && now > 0){
        now--;
        document.getElementById('newsBoxes').children[now].classList.add('selected');
        document.getElementById('newsBoxes').children[now+1].classList.remove('selected');
        document.getElementById('newsBoxes').style.left = now*-24 + 25 + 'vw';
    }
}

//md to html
// async function openMarkdownPage(pass,name) {
//     const response = await fetch(pass); // 読み込む Markdown ファイル
//     const text = await response.text();
//     const htmlContent = DOMPurify.sanitize(marked.parse(text)); // Markdown を HTML に変換

    
//     // 新しいウィンドウを開く
//     const newWindow = window.open("", "_blank");
//     if (newWindow) {
//         newWindow.document.write(`
//                 <!DOCTYPE html>
//                 <html lang="ja">
//                 <head>
//                     <meta charset="UTF-8">
//                     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//                     <title>${name}</title>
//                     <style>
//                         body { font-family: Arial, sans-serif; line-height: 1.6; padding: 20px; }
//                     </style>
//                 </head>
//                 <body>
//                     <h1>${name}</h1>
//                     <div id="content">${htmlContent}</div>
//                 </body>
//                 </html>
//             `);
//         newWindow.document.close(); // 書き込み完了
//     } else {
//         alert("ポップアップがブロックされました。許可してください。");
//     }
// }
