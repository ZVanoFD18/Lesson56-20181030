'use strict';

class App {
    /**
     * Точка входа в приложение.
     * Здесь привязываются обработчики событий к главным DOM-элементам.
     */
    static run() {
        let tableUsers = Users.getTable();
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
        SV.bindForm(document.querySelector('#user-iu form'));
    }

    /**
     * Возвращает URI-encoded URL с параметрами для вызова GET-запроса
     * @param baseUrl
     * @param params
     * @returns {string}
     */
    static getUrlWithParams(baseUrl, params) {
        //let url = baseUrl + '?';
        let paramsStr = App.getUrlParams(params);
        let result = baseUrl + (paramsStr === '' ? '' : '?') + paramsStr;
        return result;
    }

    /**
     * Возвращает URI-encoded параметры для вызова POST-запроса в
     * формате "Content-Type : application/x-www-form-urlencoded"
     * @param params
     * @param isEncodeUriComponents
     * @returns {string}
     */
    static getUrlParams(params, isEncodeUriComponents) {
        isEncodeUriComponents = typeof(isEncodeUriComponents) === 'boolean' ? isEncodeUriComponents :  true ;
        let paramsStr = '';
        for (let parName in params) {
            paramsStr += (paramsStr === '' ? '' : '&');
            if (isEncodeUriComponents){
                paramsStr += encodeURIComponent(parName) + '=' + encodeURIComponent(params[parName]);
            } else {
                paramsStr += parName + '=' + params[parName];
            }
        }
        return paramsStr;
    }

    /**
     * Возвращает значения элементов HTML-формы в виде ассоциативного массива.
     * @param formEl
     */
    static getFormParams(formEl) {
        let result = {};
        [].forEach.call(formEl.elements, (formItemEl) => {
            if (formItemEl.nodeName === 'INPUT') {
                result[formItemEl.name] = formItemEl.value;
            }
        });
        return result;
    }


}