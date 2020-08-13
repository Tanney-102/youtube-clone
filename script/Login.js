const submitBtn = document.querySelector('#login-btn');
let loginBtn_flag = false; // 비활성화: false, 활성화: true

submitBtn.addEventListener('click', submitLoginInfo);
$('form').on('propertychange change keyup paste', toggleLoginBtn);



//
// functions
// 
function submitLoginInfo() {
    const loginInfo = getLoginInfo();
    const url = "";
    const home_url = origin_home;
    const config = {
        method : 'post',
        headers : {
            'Content-Type' : 'application/json',
        },
        body : JSON.stringify(loginInfo),
    }

    fetch(url, config)
    .then( res => {
        if(res.token) {
            localStorage.setItem('wtw-token', res.token);
            fetch(home_url, {method: 'get'});
        } else {
            alert('로그인 실패')
        }
    })
}

function getLoginInfo() {
    const info = {
        id : "",
        pw : "",
    };

    info.id = document.querySelector('#userID').value;
    info.pw = document.querySelector('#userPW').value;

    return info;
}

function toggleLoginBtn() {
    const id = document.querySelector('#userID').value;
    const pw = document.querySelector('#userPW').value;

    if((id === '' || pw === '') && loginBtn_flag === true) {
        const loginBtn = document.querySelector('#login-btn');

        loginBtn_flag = false;
        loginBtn.setAttribute('disabled' ,'disabled');
        loginBtn.style.backgroundColor = 'rgba(233, 71, 50, 0.45)';
        loginBtn.classList.toggle('btn-hover');
    } else if(id != '' && pw != '' && loginBtn_flag === false) {
        const loginBtn = document.querySelector('#login-btn');

        loginBtn_flag = true;
        loginBtn.removeAttribute('disabled');
        loginBtn.style.backgroundColor = 'rgb(233, 71, 50)';
        loginBtn.classList.toggle('btn-hover');
    }
}
