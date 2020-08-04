window.addEventListener('resize', function() {
    setVideoWidth();
});

// 임시 코드
// setVideoWidth();

getMainVideo();


//
// functions
//
function getMainVideo() {
    const query_video_id = document.URL.split('=')[1];
    const xhr = new XMLHttpRequest();
    
    xhr.onreadystatechange = function() {
        if(this.readyState == 4) {
            if(this.status == 200) {
                const videoData = JSON.parse(this.responseText);
                const title = document.getElementsByTagName('title')[0];

                title.innerHTML = videoData['title'];
                renderVideoArea(videoData);
                setVideoWidth();
            } else {
                console.error('404');
            }
    
        }
    }

    xhr.open('GET', '../local-server/data/' + query_video_id + '.json');
    // xhr.open('GET', 'localhost:1337/watch?video_id=' + query_video_id);
    xhr.send();
}

function renderVideoArea(data) {
    const videoArea = document.querySelector('#video-area');
    const userProfile = '<i class="fas fa-user-circle"></i>' // 추후 수정
    const created = data["created"].split('/')[0].split('-');
    let createdDate;

    created.forEach( v => {
        createdDate += v + '. ';
    });

    videoArea.innerHTML = `
    <div id="video-player">
        <video id="video" controls autoplay>
            <source src="${data["video"]}" type="video/mp4">
            video 미지원 브라우저입니다.
        </video>
    </div>
    <div class="video-title">${data["title"]}</div>
        <div class="video-info">
            <div class="video-info-head">
                <div class="view-n-created">
                    <span class="video-views">조회수 ${views}회</span>
                    <span>&middot;</span>
                    <span class="video-created">${createdDate}</span>
                </div>
                <div class="v-btns-container">
                    <div id="likes-btn" class="btn-hover v-btn">
                        <i class="fas fa-thumbs-up v-icon"></i>
                        <div class="btn-text">${data["likes"]}</div>
                    </div>
                    <div id="share-btn" class="btn-hover v-btn">
                        <i class="fas fa-share v-icon"></i>
                        <div class="btn-text">공유</div>
                    </div>
                    <div id="save-btn" class="btn-hover v-btn">
                        <i class="fas fa-plus-square v-icon"></i>
                        <div class="btn-text">저장</div>
                    </div>
                </div>
            </div>
            <div class="video-desc">
                <div class="author-profile">
                    ${userProfile}
                </div>
                <div class="desc-container">
                    <div class="author-info">
                        <div>
                            <div class="author-name">${data["author"]}</div>
                            <div class="author-subs">구독자 100만명</div>
                        </div>
                        <button id="subs-btn" class="subs-btn btn-hover">구독</button>
                    </div>
                    <div class="desc-content">
                        ${data["text"]}
                    </div>
                </div>
            </div>
        </div>
    `;

    setVideoWidth();
}

function setVideoWidth() {
    const videoArea = document.querySelector('#video-area');
    const v_width = window.getComputedStyle(videoArea).width;
    const video = document.querySelector('#video');

    video.setAttribute('width', v_width);
}