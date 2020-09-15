getVideos();


//
// functions
//
function getVideos() {
    // const url = origin_server + 'videos/';
    const url = '../local-server/data/video-data.json';
    const config = {
        method: 'get',
    };

    fetch(url, config)
    .then( res => { return res.json(); } )
    .then( data => { 
        renderContents(data) 
        console.log('fetched');
    })
    .catch( err => console.error(err) );
}

function renderContents(data) {
    const mainArea = document.querySelector('main');

    data.forEach( (categ, idx) => {
        mainArea.innerHTML += `
            <section id="categ-${categ["category_name"]}">
                <h2 class="category-name">${categ["category_name"]}</h2>
            </section>
            `;

        const categContainer = document.querySelector('#categ-'+categ["category_name"]);

        if(categ["videos"].length === 0) {
            categContainer.innerHTML += '<div class="empty-box">해당 카테고리에 영상이 존재하지 않습니다.</div>'
        } else {
            categContainer.innerHTML += '<ul class="video-list"><ul>'

            categ["videos"].forEach( v_info => {
                const ul = document.querySelector('#categ-'+categ["category_name"]+' ul');
                const profile = '<i class="fas fa-user-circle"></i>' // 추후 로직추가
    
                ul.innerHTML += `
                    <li class="video-container">
                        <a href="./watch?video_id=${v_info["id"]}">
                            <img class="video-thumbnail" src="${v_info["thumbnail"]}">
                            <div class="content-info">
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
    
        }
        if(idx < 2) {
            mainArea.innerHTML += '<hr class="hr-line">'
        }
    }); 
}