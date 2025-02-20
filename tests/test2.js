async function openMarkdownPage() {
    const response = await fetch('sample.md'); // 読み込む Markdown ファイル
    const text = await response.text();
    const htmlContent = DOMPurify.sanitize(marked.parse(text)); // Markdown を HTML に変換

    
    // 新しいウィンドウを開く
    const newWindow = window.open("", "_blank");
    if (newWindow) {
        newWindow.document.write(`
            <!DOCTYPE html>
            <html lang="ja">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Markdownページ</title>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; padding: 20px; }
                </style>
            </head>
            <body>
                <h1>Markdownの内容</h1>
                <div id="content">${htmlContent}</div>
            </body>
            </html>
        `);
        newWindow.document.close(); // 書き込み完了
    } else {
        alert("ポップアップがブロックされました。許可してください。");
    }
}