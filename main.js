const $ = document.querySelector.bind(document)

const isLogin = (status, message) => {
    if (status) {
        $('#login').disabled = true
        $('#login').innerHTML = 'Đang đăng nhập...'
    } else {
        $('#login').disabled = false
        $('#login').innerHTML = 'Đăng nhập'
        if (typeof message !== 'undefined') alert(message)
    }

}

const fetchJWT = (msv, password) => {
    return new Promise(resolve => {
        fetch(`${localStorage.site}api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: `{"username": "${msv}","password": "${password}"}`
        })
            .then(res => res.json())
            .then(res => {
                if (res.access_token) {
                    return {
                        status: true,
                        access_token: res.access_token
                    }
                } else {
                    let error = res.error ? res.error : res.password
                    return {
                        status: false,
                        error
                    }
                }
            })
            .then(checkLogin)
    })
}
const checkLogin = result => {
    if (result.status) {
        fetchCookie(result.access_token)
    } else {
        isLogin(false, result.error)
    }
}
const fetchCookie = access_token => {
    fetch(`${localStorage.site}jwt?token=${access_token}`, {
        method: 'GET'
    })
        .then(_ => {
            isLogin(false)
            $('#login').innerHTML = 'Đang chuyển hướng...'
            setTimeout(() => {
                location.href = localStorage.site
            }, 2000)
        })
}
document.addEventListener('DOMContentLoaded', () => {
    $('#login').addEventListener('click', e => {
        let msv = $('#msv').value
        let password = $('#password').value
        e.preventDefault()
        let option = $('#select-site').selectedIndex
        localStorage.site = option == 0 ? 'https://code.ptit.edu.vn/' : 'https://icpc.ptit.edu.vn/'
        isLogin(true)
        fetchJWT(msv, password)
    })
})