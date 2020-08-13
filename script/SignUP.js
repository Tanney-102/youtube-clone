const submitBtn = document.querySelector('#signup-btn');
const idCheckBtn = document.querySelector('#id-check-btn');
let name_check = 0;

submitBtn.addEventListener('click', submitUserInfo);
idCheckBtn.addEventListener('click', checkIDMutiplicity);

//
// functions
//
function submitUserInfo() {
    if(!checkForms()) {
        alert('주어진 양식을 모두 채워주세요');
        return;
    }
    if(!id_check) {
        alert('ID 중복검사를 실행해주세요.');
        return;
    }
    if(!checkPW()) {
        alert('비밀번호가 일치하지 않습니다.')
        return;
    }

    const userInfo = getUserInfo();
    const url = "";
    const login_page = origin_home + 'login.html'
    const config = {
        method : 'post',
        headers: {
            'Content-Type' : 'application/json',
        },
        body : JSON.stringify(userInfo),
    };

    fetch(url, config)
    .then( () => {
        alert('회원가입 성공!');
        fetch(login_page, {method:'get'});
    })
    .catch( err => {
        console.error(err);
        alert('회원가입 실패')
    })
}

function getUserInfo() {
    const info = {
        id : "",
        pw : "",
        name: "",
    };
    
    info.id = document.querySelector('#userID');
    info.pw = document.querySelector('#userPW');
    info.name = document.querySelector('#username');

    return info;
}

function checkForms() {
    const userName = document.querySelector('#username').value;
    const userId = document.querySelector('#userID').value;
    const userPw = document.querySelector('#userPW').value;
    const userPw_c = document.querySelector('#userPW-confirm').value;

    if(userName === '' || userId === '' || userPw === '' || userPw_c === '')
        return false;
    return true;

}

function checkIDMutiplicity() {

}

function checkPW() {
    return document.querySelector('#userPW') === document.querySelector('#userPW_confirm');
}