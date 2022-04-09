'use strict'

const url = "https://api.github.com/users/"
const inputText = document.querySelector('#username')
const search = document.querySelector('.get-user >button')
const userinfo = document.querySelector('.show-user')
let avatar = document.querySelector('.user-pic')
let userName = document.querySelector('.name')
let Id = document.querySelector('.user-id')
let repository = document.querySelector('.repo-number>span')
let UserFollower = document.querySelector('.follower-number>span')
let UserFollowing = document.querySelector('.following-number>span')
const errorBox= document.querySelector('.incorrect-user')




search.addEventListener('click', function (){
    let textValue = inputText.value;
    if (!textValue){
        inputText.classList.add('null-filedError')
        inputText.placeholder= 'Please enter username first'
        inputText.addEventListener('focus', function (){
            inputText.classList.remove('null-filedError')
        })
    }else {
        inputText.style.border= '2px solid gray'
        fetch(url + textValue, { method: "GET" })
            .then(function (response) {
                return response.json()
            })
            .then(async (data) => {
                if (data["login"]===textValue){
                    await render(data)
                    userinfo.style.opacity='1'
                }else {
                    return Promise.reject(errorFunc)
                }

            })
            .catch(errorFunc=> {
                errorFunc()
            })
    }


})

function render(data) {
    const { avatar_url, id, following, followers, public_repos, name } = data
    avatar.src = avatar_url
    userName.textContent = name
    Id.textContent = id
    repository.textContent = public_repos
    UserFollower.textContent = followers
    UserFollowing.textContent = following
}

function errorFunc(){
    errorBox.classList.add('incorrect-user-show')
    userinfo.style.opacity='0'
    inputText.addEventListener('focus', function (){
        errorBox.classList.remove('incorrect-user-show')
    })
}
