window.onload = function() {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() { 
    if (xhr.readyState === 4) { 
        if (xhr.status === 200) {  
            const videoData = JSON.parse(this.responseText);
            renderContents(videoData);
        } else {
         console.error('404');
        }
    }
    };
    // xhr.open('GET', 'http://127.0.0.1:1337/home');
    xhr.open('GET', '../local-server/data/video-data.json');
    xhr.send(null);
}

function renderContents(data) {
    const categoryList = ['1', '2'];
    const mainArea = document.getElementsByTagName('main')[0];

    categoryList.forEach( (categ, idx) => {
        const profile = '<i class="fas fa-user-circle"></i>' // 추후 로직추가
        
        mainArea.innerHTML += `
            <section id="categ-${categ}">
                <h2 class="category-name">${categ}</h2>
                <ul class="video-list">
            `;
        
        data[categ].forEach( v_info => {
            const ul = document.querySelector('#categ-'+categ+' ul');

            ul.innerHTML += `
                <li class="video-container">
                    <a href="./watch?video_id=${v_info["video_id"]}">
                        <img class="video-thumbnail" src="${v_info["thumbnail"]}">
                        <div class="ideo-info">
                            <div class="info-user-icon">${profile}</div>
                            <div class="info-text">
                                <div class="info-title">${v_info["title"]}</div>
                                <div class="info-author">${v_info["author"]}</div>
                            </div>
                        </div>
                    </a>
                </li>
            `;
        });

        mainArea.innerHTML += `</ul></section>`

        if(idx != categoryList.length - 1) {
            mainArea.innerHTML += '<hr class="hr-line">'
        }
    });
}

// {
//     "title" : "세상 모든 근의 공식",
//     "video_id":"202007v123",
//     "author" : "오태은",
//     "video" : "123/123.mp4",
//     "thumbnail" : "123/thumbnail_123.png",
//     "text" : "근의 공식에 대한 설명입니다.",
//     "likes" : 4,
//     "created" : "2020-07-02-17:04:52",
//     "category" : "1"
// }