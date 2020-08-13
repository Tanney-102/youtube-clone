window.addEventListener('resize', function() {
    setVideoWidth();
});

// 0: 레이아웃 모드 , 1: 서버모드
pickMode(0);


//
// functions
//
function getMainVideo() {
    let query_video_id = document.URL.split('=')[1];
    // const url = 'http://localhost:3000/home/' + query_video_id;
    // const url = 'http://youtubeclone1535.herokuapp.com/home/' + query_video_id.substr(0,1);
    const url = '../local-server/data/' + query_video_id + '.json';
    const config = {
        method:'get',
        header: {
            "Origin": "http://localhost:3000",
            // "Access-Control-Allow-Origin": "*",
        },
    };

    fetch(url, config)
    .then( res => {
        if(res.status == 200) {
            res.json().then( data => {
                renderVideoArea(data);
                renderCommentArea(data["comments"]);
            });
        } else {
            console.error('error: ' + res.status);
        }
    })
    .catch( err => console.error(err) );
    
    
}

function renderVideoArea(data) {
    const videoArea = document.querySelector('#video-area');
    const userProfile = '<i class="fas fa-user-circle"></i>' // 추후 수정
    const created = data["created"].substr(0, 10).split('-');
    let createdDate = '';

    created.forEach( v => {
        createdDate += v + '. ';
    });

    videoArea.innerHTML = `
    <div id="video-player">
        <video id="video" controls autoplay>
            <source src="${data["video_file"]}" type="video/mp4">
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

function renderCommentArea(comments) {
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
                <div class="v-btn">
                    <button id="likes-btn" class="btn-hover"><i class="fas fa-thumbs-up v-icon"></i></button>
                    <div class="btn-text">5</div>
                </div>
                <div class="v-btn">
                    <button id="share-btn" class="btn-hover"><i class="fas fa-share v-icon"></i></button>
                    <div class="btn-text">공유</div>
                </div>
                <div class="v-btn">
                    <button id="save-btn" class="btn-hover"><i class="fas fa-plus-square v-icon"></i></button>
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