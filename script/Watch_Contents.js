let query_video_id = document.URL.split('=')[1];
// const url_getVideo = 'http://localhost:3000/home/' + query_video_id;
// const url_getVideo = origin_server + query_video_id.substr(0,1);
const url_getVideo = '../local-server/data/' + query_video_id + '.json';

//
// addEventListener
//
window.addEventListener('resize', function() {
    setVideoWidth();
});


//
// exec Func
//
pickMode(0); // 0: 레이아웃 모드 , 1: 서버모드


//
// functions
//
// 0: 레이아웃 모드 , 1: 서버모드
function pickMode(mode) {
    if(mode==1) {
        loadMainVideo();
        // loadCommentsByLikes();
    } else {
        loadLayoutMode();
    }
}

function loadMainVideo() {
    const config = {
        method:'get',
    };

    fetch(url_getVideo, config)
    .then( res => {
        res.json().then( data => {
            renderVideoArea(data);
        });
    })
    .catch( err => console.error(err) );
}

// function loadCommentsByLikes(comments) {
//     const config = {
//         method:'get',
//     };

//     fetch(url_getVideo, config)
//     .then( res => { return res.json['comments'] } )
//     .then( data => render
// }

function loadCommentsBydate(comments) {

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

function setVideoWidth() {
    const videoArea = document.querySelector('#video-area');
    const v_width = window.getComputedStyle(videoArea).width;
    const video = document.querySelector('#video');

    video.setAttribute('width', v_width);
}

function sortCommentsByLikes(com1, com2) {
    return com2['likes'] - com1['likes'];
}

function sortCommentsByDate(com1, com2) {

}

function loadLayoutMode() {
    document.querySelector('#video-area').innerHTML = `
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
    `;

    document.querySelector('#comment-container').innerHTML = `
        <div class="comment-head">
            <div class="comment-num">댓글 12개</div>
            <div id="sorting-rule">
                <button id="sorting-opt-toggle-btn" class="btn-hover">
                    <i class="fas fa-sort-amount-up"></i>
                    정렬 기준
                </button>
                <ul class="sorting-opt">
                    <li class="sorting-opt-list">
                        <button id="likes-sort-btn" class="sorting-opt-btn">
                            좋아요순
                        </button>
                    </li>
                    <li class="sorting-opt-list">
                        <button id="latest-sort-btn" class="sorting-opt-btn">
                            최근 댓글순
                        </button>
                    </li>
                </ul>
            </div>
        </div>
        <div class="post-comment-container">
            <div class="comment-user-profile">
                <i class="fas fa-user-circle"></i>
            </div>
            <form id="post-comment" action="#" method="POST">
                <div id="comment-input-container">
                    <input id="comment-input" type="text" placeholder="공개 댓글 추가...">
                </div>
                <div id="form-btn-container">
                    <button id="comment-reset-btn" class="form-btn" type="reset">취소</button>
                    <button id="comment-submit-btn" class="form-btn" type="submit">댓글</button>
                </div>
            </form>
        </div>
        <div class="get-comment-container">
            <ul>
                <li class="comment-list">
                    <div class="comment-user-profile">
                        <i class="fas fa-user-circle"></i>
                    </div>
                    <div class="comment-elm-container">
                        <div class="comment-elm-head">
                            <div class="comment-elm-username">오오오</div>
                            <div class="comment-elm-date">2일전</div>
                        </div>
                        <div class="comment-elm-body">
                            ㅋㅋㅋㅋㅋㅋㅋ 너무 재밌어요 ㅎㅎ
                        </div>
                        <div class="comment-elm-foot">
                            <i data-tooltip-text="좋아요" class="fas fa-thumbs-up comment-thumbs-btn btn-hover"></i>
                            <div class="likes-num thumbs-num">34</div>
                            <span data-tooltip-text="싫어요"><i class="fas fa-thumbs-down comment-thumbs-btn btn-hover"></i></span>
                            <div class="dislikes-num thumbs-num">1</div>
                        </div>
                    </div>
                </li>
                <li class="comment-list">
                    <div class="comment-user-profile">
                        <i class="fas fa-user-circle"></i>
                    </div>
                    <div class="comment-elm-container">
                        <div class="comment-elm-head">
                            <div class="comment-elm-username">오오오</div>
                            <div class="comment-elm-date">2일전</div>
                        </div>
                        <div class="comment-elm-body">
                            ㅋㅋㅋㅋㅋㅋㅋ 너무 재밌어요 ㅎㅎ
                        </div>
                        <div class="comment-elm-foot">
                            <i data-tooltip-text="좋아요" class="fas fa-thumbs-up comment-thumbs-btn btn-hover"></i>
                            <div class="likes-num thumbs-num">34</div>
                            <span data-tooltip-text="싫어요"><i class="fas fa-thumbs-down comment-thumbs-btn btn-hover"></i></span>
                            <div class="dislikes-num thumbs-num">1</div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
    `;

    document.querySelector('#sorting-opt-toggle-btn').addEventListener('click', toggleSortingBtns);
    setVideoWidth();
}

function toggleSortingBtns() {
    const sortingOptUL = document.querySelector('.sorting-opt');

    sortingOptUL.style.display = sortingOptUL.style.display === 'none' ? 'inline-block' : 'none';
}

