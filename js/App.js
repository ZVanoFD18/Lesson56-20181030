'use strict';

class App {
    static run(){
        let tableUsers = Users.getTable();
        console.log('tableUsers', tableUsers);
        document.querySelector('.mi-users-add').addEventListener('click', (event) => {
            Users.doAdd(event.target);
        });
        document.querySelector('.mi-users-load').addEventListener('click', (event) => {
            Users.doLoadList(event.target);
        });
        tableUsers.addEventListener('click', (event) => {
            if (event.target.classList.contains('action-edit')) {
                Users.onClickEdit(event.target);
            } else if (event.target.classList.contains('action-remove')) {
                Users.onClickRemove(event.target);
            }
        });
    }
    static getUrlWithParams(baseUrl, params){
        //let url = baseUrl + '?';
        let paramsStr = '';
        for(let parName in params){
            paramsStr += (paramsStr === '' ? '?' : '&');
            paramsStr += encodeURIComponent(parName) + '=' + encodeURIComponent(params[parName]);
        }
        let result = baseUrl + paramsStr;
        return result;
    }
    static getFormParams(formEl){
        let result = {};
        console.log(formEl.elements);
        [].forEach.call(formEl.elements, (formItemEl)=>{
            if (formItemEl.nodeName === 'INPUT'){
                result[formItemEl.name] = formItemEl.value;
            }
        });
        return result;
    }

}