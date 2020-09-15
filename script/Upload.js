const thumbnailInput = document.querySelector('#thumbnail-input');
const upload = document.querySelector('#upload');

thumbnailInput.addEventListener('change', putImg);
upload.addEventListener('click', uploadFiles);

const g_info = {
    'title': '',
    'video_file': 'v',
    'thumbnail' : 't',
    'text' : '',
    'likes' : 0,
    'author' : -1,
    'category' :'',
}  


//
//functions
//
function putImg(e) {
    const reader = new FileReader();

    reader.onload = (e) => {
        document.querySelector('#thumbnail-img').setAttribute('src', e.target.result);
    }

    reader.readAsDataURL(e.target.files[0]);
}

function uploadFiles() {
    getFileInfo();

    console.log(g_info);

    const url = origin_server + 'video/upload/'
    const config = {
        method: 'post',
        headers: {
            'Content-Type' : 'application/json',
        },
        body : JSON.stringify(g_info),
    }

    fetch(url, config)
    .then( res => { return res.json() } )
    .then( data => console.log(data) )
    .catch( err => console.error(err) );

}

function getFileInfo() {
    const form = document.querySelector('.upload-form')
    const vInfoInputs = form.children[0].children;
    

    g_info.title = vInfoInputs[0].value;
    // readURL(form.children[1].children[0].files[0])
    //                     .then(file => { this.v = file.target.result });
    // readURL(vInfoInputs[3].files[0])
    //                     .then(file => { this.t = file.target.result } );
    g_info.video_file = form.children[1].children[0].files[0].path;
    g_info.thumbnail = vInfoInputs[3].files[0].path;
    g_info.text = vInfoInputs[1].value;
    g_info.category = vInfoInputs[2].value

    const url_user = origin_server + 'accounts/user/'
    const token = 'Token ' + localStorage.getItem('token');
    const config = {
        method : 'get',
        headers : {
            'Authorization' : token,
        },
    }

    fetch(url_user, config)
    .then( res => { return res.json() })
    .then( data => {
        if(data.id) {
            g_info.author = data.id;
        }
    })
    .catch( err => {
        console.log('user fetch error')
        console.error(err);
    });
}

function readURL(file) {
    return new Promise((resolve, reject) => {
        var fr = new FileReader();  
        fr.onload = resolve;  // CHANGE to whatever function you want which would eventually call resolve
        fr.readAsDataURL(file);
    });
}