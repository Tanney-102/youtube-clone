    const sviewSearchBtn = document.getElementById('smallview-search-btn');
    let viewWidth_flag = 1; // viewport의 변화를 감지. 기존 width가 768미만이었으면 0, 반대경우 1
    let sviewSearchBtnActive = 0; // smallview-search-btn이 눌렀는지 감지. 눌렸으면 1, 안눌렸거나 뒤로가기를 했을경우 0
    
    setMainHeight();

    sviewSearchBtn.addEventListener('click', openSearchArea);
    
    window.onresize = function() {
        const viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

        if(viewportWidth >= 768 && viewWidth_flag == 0) {
            viewWidth_flag = 1;
            getLargeHeader();

            if(sviewSearchBtnActive) {
                document.getElementById('begin').style.display = 'flex';
                document.getElementById('end').style.display = 'flex';

                const hiddenBackBtn = document.getElementById('hidden-back-btn');
                if(hiddenBackBtn != undefined) {
                    const headContainer = document.getElementById('head-container');
                    
                    headContainer.removeChild(hiddenBackBtn);
                }
            }
        } else if(viewportWidth < 768 && viewWidth_flag == 1) {
            viewWidth_flag = 0;
            getSmallHeader();

            if(sviewSearchBtnActive) {
                openSearchArea();
            }
        }
    }



// functions
function setMainHeight() {
    const viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    
    document.getElementsByTagName('main')[0].style.minHeight = viewportHeight + 'px'
}

function openSearchArea() {
    const sviewSearchBtn = document.getElementById('smallview-search-btn');
    const headerBegin = document.getElementById('begin');
    const headerEnd = document.getElementById('end');
    const headContainer = document.getElementById('head-container');
    const searchForm = document.getElementById('head-search-form');

    // sviewSearchBtnActive 활성화
    sviewSearchBtnActive = 1;

    // header에서 begin과 end, smallview-search-btn을 가리고 searchForm을 활성화
    headerBegin.style.display = 'none';
    headerEnd.style.display = 'none';
    sviewSearchBtn.style.display = 'none';
    searchForm.style.display = 'flex';
    

    // 뒤로가기 버튼 추가
    addBackBtn(headContainer);
}

// 뒤로가기 버튼 추가
function addBackBtn(parent) {
    const backBtnHTML = '<button data-tooltip-text="뒤로" id="hidden-back-btn" class="btn-hover">' +
    '<i id="back-btn-icon" class="fas fa-arrow-left"></i>' +
    '</button>';
    parent.innerHTML = backBtnHTML + parent.innerHTML;

    // 뒤로가기 버튼 클릭 이벤트 추가
    const hiddenBackBtn = document.getElementById('hidden-back-btn');
    hiddenBackBtn.addEventListener('click', function() {
        const sviewSearchBtn = document.getElementById('smallview-search-btn');
        const headerBegin = document.getElementById('begin');
        const headerEnd = document.getElementById('end');
        const searchForm = document.getElementById('head-search-form');

        sviewSearchBtnActive = 0;
        
        headerBegin.style.display = 'flex';
        headerEnd.style.display = 'flex';
        searchForm.style.display = 'none';
        sviewSearchBtn.style.display = 'inline';

        sviewSearchBtn.addEventListener('click', openSearchArea);
        parent.removeChild(hiddenBackBtn);
    });
}

function getLargeHeader() {
    const mid = document.getElementById('mid');
    const searchForm = document.getElementById('head-search-form');
    const sviewSearchBtn = document.getElementById('smallview-search-btn');

    mid.style.width = '640px';
    mid.style.margin = '0 100px';
    mid.style.flex = '0 1 auto';

    searchForm.style.display = 'flex';

    sviewSearchBtn.style.display = 'none';
}

function getSmallHeader() {
    const mid = document.getElementById('mid');
    const searchForm = document.getElementById('head-search-form');
    const sviewSearchBtn = document.getElementById('smallview-search-btn');

    mid.style.flex = '1 1 auto';
    mid.style.display = 'flex';
    mid.style.justifyContent = 'flex-end';
    mid.style.margin = '0';

    searchForm.style.display = 'none';

    sviewSearchBtn.style.display = 'inline';
}
