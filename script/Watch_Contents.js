window.addEventListener('resize', function() {
    setVideoWidth();
});

// 0: 레이아웃 모드 , 1: 서버모드
pickMode(0);


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
    let createdDate = '';

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
                    <span class="video-views">조회수 ${data["views"]}회</span>
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

// 0: 레이아웃 모드 , 1: 서버모드
function pickMode(mode) {
    if(mode==1) {
        getMainVideo();
    } else {
        loadLayoutMode();
    }
}

function loadLayoutMode() {
    document.getElementById('video-area').innerHTML = `
    <div id="video-player">
        <video id="video" src="./local-server/data/contents/123/123.mp4" controls autoplay>video 미지원 브라우저입니다.</video>
    </div>
    <div class="video-title">세상 모든 근의 공식</div>
    <div class="video-info">
        <div class="video-info-head">
            <div class="view-n-created">
                <span class="video-views">조회수</span>
                <span>&middot;</span>
                <span class="video-created">생성일</span>
            </div>
            <div class="v-btns-container">
                <div id="likes-btn" class="btn-hover v-btn">
                    <i class="fas fa-thumbs-up v-icon"></i>
                    <div class="btn-text">5</div>
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
                <i class="fas fa-user-circle"></i>
            </div>
            <div class="desc-container">
                <div class="author-info">
                    <div>
                        <div class="author-name">오태은</div>
                        <div class="author-subs">구독자 100만명</div>
                    </div>
                    <button id="subs-btn" class="subs-btn btn-hover">구독</button>
                </div>
                <div class="desc-content">
                    근의 공식에 대한 설명입니다.
                </div>
            </div>
        </div>
    </div>
    `

    setVideoWidth();
}