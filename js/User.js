'use strict';

class User{
    static showAdd(){
        let winEl = document.getElementById('user-iu');
        winEl.querySelector('input[name="id"]').value = '';
        winEl.querySelector('.title').innerHTML = "+ Add"
        winEl.classList.remove('hidden');
    }
    static doAjax(callback){

    }
}