let idCheck = false;

const submitBtn = document.querySelector('#signup-btn');
const nameCheckBtn = document.querySelector('#name-check-btn');

submitBtn.addEventListener('click', submitUserInfo);
nameCheckBtn.addEventListener('click', checkUserName);

//
// functions
//
function submitUserInfo() {
    if(!checkEmptyForms()) {
        alert('주어진 양식을 모두 채워주세요');
        return;
    }
    if(!idCheck) {
        alert('ID 중복검사를 완료해주세요.');
        return;
    }
    if(!checkPW()) {
        return;
    }

    const userInfo = getUserInfo();
    const url = origin_server + 'accounts/register/';
    const config = {
        method : 'post',
        headers: {
            'Content-Type' : 'application/json',
        },
        body : JSON.stringify(userInfo),
    };

    fetch(url, config)
    .then(res => { return res.json() } )
    .then( data => {
        localStorage.setItem('wtw-token', data.token);
        alert('회원가입 성공!');
        location.replace('./index.html');
    })
    .catch( err => {
        console.log('error');
        console.log(err);
        alert('회원가입 실패')
    })
}

//
function getUserInfo() {
    const info = {
            'username' : '',
            'password' : '',
    };
    
    info.username = document.querySelector('#username').value;
    info.password = document.querySelector('#userPW').value;

    console.log(JSON.stringify(info));
    return info;
}

function checkEmptyForms() {
    const userName = document.querySelector('#username').value;
    const userPw = document.querySelector('#userPW').value;
    const userPw_c = document.querySelector('#userPW-confirm').value;

    if(userName === '' || userPw === '' || userPw_c === '')
        return false;
    return true;

}

function checkPW() {
    const userPw = document.querySelector('#userPW')
    const userPw_c = document.querySelector('#userPW-confirm');
    
    if(userPw.value.length < 6) {
        alert('6자리 이상의 비밀번호를 입력해주세요.');
        return false;
    } else if (userPw.value != userPw_c.value) {
        alert('비밀번호가 일치하지 않습니다.');
        return false;
    }

    return true;
}

function checkUserName() {
    const nameInput = document.querySelector('#username');
    const name = nameInput.value;

    if(name.length < 6) {
        alert('채널명이 너무 짧습니다.(6자리 이상)');
        return;
    }

    const url_check = origin_server + 'accounts/register/id_check/?username=' + name;
    const config_check = {
        method: 'get',
    }

    fetch(url_check, config_check)
    .then(res => { return res.json() })
    .then(result => {
        if(result.data === 'exist') {
            alert('이미 사용중인 이름입니다.');
        } else {
            if(confirm('사용가능한 이름입니다. 사용하시겠습니까?')) {
                idCheck = true;
                nameInput.setAttribute('readonly', 'readonly');
                nameInput.parentNode.style.backgroundColor = '#e8e8e8';
                nameInput.style.backgroundColor = '#e8e8e8';
                // nameInput.parentNode.children[1].innerHTML = '수정';
                // nameInput.parentNode.children[1].addEventListener('click', reloadInput);
            } 
        }
    })
    .catch( err => console.error(err) );
}

function reloadInput() {
    const nameInput = document.querySelector('#username');

    nameInput.removeAttribute('readonly');
    nameInput.style.backgroundColor = '#f8f8f8';
    nameInput.parentNode.style.backgroundColor = '#f8f8f8';
    nameInput.parentNode.children[1].innerHTML = 'ID확인';
    nameInput.parentNode.children[1].addEventListener('click', checkUserName);
}