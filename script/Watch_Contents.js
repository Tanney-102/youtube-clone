const query_video_id = document.URL.split('=')[1];
const xhr = new XMLHttpRequest();

console.log(query_video_id);

xhr.onreadystatechange = function() {
    if(this.readyState == 4) {
        if(this.status == 200) {
            const videoData = JSON.parse(this.responseText);
            renderVideoArea(videoData);
            setVideoWidth();
        } else {
            console.error('404');
        }

    }
}

// exec
//
xhr.open('GET', '../local-server/data/' + query_video_id + '.json');
// xhr.open('GET', 'localhost:1337/watch?video_id=' + query_video_id);
xhr.send();

// 임시 코드
setVideoWidth();

window.addEventListener('resize', function() {
    setVideoWidth();
});

// functions
//
function renderVideoArea(data) {
    const videoArea = document.querySelector('#video-area');

    console.log(data);

    videoArea.innerHTML = `
    <div id="video-player">
        <video id="video" controls autoplay>
            <source src="${data["video"]}" type="video/mp4">
            video 미지원 브라우저입니다.
        </video>
    </div>
    `;
}

function setVideoWidth() {
    const videoArea = document.querySelector('#video-area');
    const v_width = window.getComputedStyle(videoArea).width;
    const video = document.querySelector('#video');

    video.setAttribute('width', v_width);
}