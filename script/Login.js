const submitBtn = document.querySelector('#login-btn');
const loginField = document.querySelector('.login-field');
let loginBtn_flag = false; // 비활성화: false, 활성화: true

submitBtn.addEventListener('click', submitLoginInfo);
loginField.addEventListener('keyup', toggleLoginBtn);

//
// functions
// 
function submitLoginInfo() {
    const loginInfo = getLoginInfo();
    const url = origin_server + 'accounts/login/';
    const url_home = origin_net;
    // const url_home = './index.html';
    const config = {
        method : 'post',
        headers : {
            'Content-Type' : 'application/json',
        },
        body : JSON.stringify(loginInfo),
    }

    fetch(url, config)
    .then( res => { return res.json() } )
    .then( data => {
        if(data.token) {
            localStorage.setItem('token', data.token);
            console.log(localStorage.getItem('token'));
            location.replace(url_home);
        } else {
            alert('회원정보를 확인해주세요.')
        }
    })
    .catch( err => console.error(err) );
}

function getLoginInfo() {
    const info = {
        username : "",
        password : "",
    };

    info.username = document.querySelector('#userID').value;
    info.password = document.querySelector('#userPW').value;

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
