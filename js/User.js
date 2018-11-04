'use strict';

class User{
    static showAdd(){
        let winEl = document.getElementById('user-iu');
        winEl.querySelector('input[name="id"]').value = '';
        winEl.querySelector('.title').innerHTML = "+ Добавление"
        winEl.querySelector('.button-save').onclick = (event)=>{
            event.preventDefault();
            let formParams = App.getFormParams(winEl.querySelector('form'));
            User.doAjax(formParams, (isSuccess, json)=>{
                Users.doLoadList();
                winEl.classList.add('hidden');
            });
        };
        winEl.classList.remove('hidden');
    }
    static doAjax(params, callback){
        let  bodyParams = App.getUrlParams(params);
        let xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://bot.big-maker.com/user.php');
        xhr.send(bodyParams);
        xhr.addEventListener('readystatechange', () => {
            console.log('readystatechange', arguments);
            if (xhr.readyState !== 4) {
                return;
            }
            let json = JSON.parse(xhr.responseText);
            callback.call(true, json);
        });

    }
}