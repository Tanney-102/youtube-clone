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

    console.log(data);

    videoArea.innerHTML = `
    <div id="video-player">
        <video id="video" controls autoplay>
            <source src="${data["video"]}" type="video/mp4">
            video 미지원 브라우저입니다.
        </video>
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