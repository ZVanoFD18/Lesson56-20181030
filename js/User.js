'use strict';

/**
 * Статический класс, группирующий функциональность "Работа с одним пользователем".
 */
class User {
    /**
     * Отображает окно добавления пользователя
     */
    static showWindowAdd() {
        let winEl = document.getElementById('user-iu'),
            formEl = winEl.querySelector('form');
        User.clearForm(winEl.querySelector('form'));
        winEl.querySelector('input[name="id"]').value = '';
        winEl.querySelector('.title').innerHTML = "+ Добавление пользователя"
        winEl.querySelector('.button-cancel').onclick = (event) => {
            event.preventDefault();
            winEl.classList.add('hidden');
        };
        winEl.querySelector('.button-save').onclick = (event) => {
            event.preventDefault();
            let formParams = User.getFormAsJson(formEl);
            Mask.show('Добавление пользователя...');
            User.doAjaxAddOrEdit({
                user: JSON.stringify(formParams)
            }, (isSuccess, json) => {
                Mask.hide();
                winEl.classList.add('hidden');
                Users.doLoadList();
            });
        };
        winEl.classList.remove('hidden');
    }

    /**
     * Отображает окно редактирования пользователя.
     * @param userId
     */
    static showWindowEdit(userId) {
        let winEl = document.getElementById('user-iu'),
            formEl = winEl.querySelector('form');
        User.clearForm(formEl);
        winEl.querySelector('input[name="id"]').value = userId;
        winEl.querySelector('.title').innerHTML = "Редактирование пользователя"
        winEl.querySelector('.button-cancel').onclick = (event) => {
            event.preventDefault();
            winEl.classList.add('hidden');
        };
        winEl.querySelector('.button-save').onclick = (event) => {
            event.preventDefault();
            let formParams = User.getFormAsJson(formEl);
            Mask.show('Изменение пользователя...');
            User.doAjaxAddOrEdit({
                user: JSON.stringify(formParams)
            }, (isSuccess, json) => {
                Mask.hide();
                winEl.classList.add('hidden');
                Users.doLoadList();
            });
        };
        winEl.classList.remove('hidden');
        Mask.show('Загрузка информации о пользователе....');
        User.doAjaxGetUser({
            id: userId
        }, (isSuccess, json) => {
            Mask.hide();
            User.setFormFromJson(formEl, json);
        });
    }

    /**
     * Возвращает данные формы в виде стандартизированного JSON.
     * @param formEl
     */
    static getFormAsJson(formEl) {
        let result = {};
        [].forEach.call(formEl.elements, (formItemEl) => {
            if (formItemEl.nodeName === 'INPUT') {
                if (['street', 'suite', 'city', 'zipcode'].indexOf(formItemEl.name) >= 0) {
                    result.address = result.address || {};
                    result.address [formItemEl.name] = formItemEl.value;
                } else if (['lat', 'lng'].indexOf(formItemEl.name) >= 0) {
                    result.address = result.address || {};
                    result.address.geo = result.address.geo || {};
                    result.address.geo[formItemEl.name] = formItemEl.value;
                } else if (['companyName', 'catchPhrase'].indexOf(formItemEl.name) >= 0) {
                    result.company = result.company || {};
                    if (formItemEl.name === 'companyName') {
                        result.company ['name'] = formItemEl.value;
                    } else {
                        result.company [formItemEl.name] = formItemEl.value;
                    }
                } else {
                    result[formItemEl.name] = formItemEl.value;
                }
            }
        });
        return result;
    }

    /**
     * Устанавливает данные формы из стандартизированного JSON.
     * @param formEl
     * @param json
     */
    static setFormFromJson(formEl, json) {
        if (typeof(json) !== 'object') {
            throw new Error('Invalid type of "json" param.');
        }
        [].forEach.call(formEl.elements, (formItemEl) => {
            if (formItemEl.nodeName === 'INPUT') {
                if (['street', 'suite', 'city', 'zipcode'].indexOf(formItemEl.name) >= 0) {
                    if (json.address && formItemEl.name in json.address) {
                        formItemEl.value = json.address[formItemEl.name];
                    }
                } else if (['lat', 'lng'].indexOf(formItemEl.name) >= 0) {
                    if (json.address && json.address.geo && formItemEl.name in json.address.geo) {
                        formItemEl.value = json.address.geo[formItemEl.name];
                    }
                } else if (['companyName', 'catchPhrase'].indexOf(formItemEl.name) >= 0) {
                    if ('company' in json){
                        if (formItemEl.name === 'companyName') {
                            formItemEl.value = json.company.name;
                        } else if (json.company && formItemEl.name in json.company) {
                            formItemEl.value = json.company[formItemEl.name];
                        }
                    }
                } else {
                    if (formItemEl.name in json) {
                        formItemEl.value = json[formItemEl.name];
                    }
                }
            }
        });
    }

    /**
     * Очищает форму добавления/изменения пользователя.
     * @param formEl
     */
    static clearForm(formEl) {
        [].forEach.call(formEl.elements, (formItemEl) => {
            if (formItemEl.nodeName === 'INPUT') {
                formItemEl.value = '';
            }
        });
    }

    /**
     * Выполняет AJAX "Добавить или изменить пользователя"
     * @param params
     * @param callback
     */
    static doAjaxAddOrEdit(params, callback, scope) {
        let bodyParams = App.getUrlParams(params, false);
        let xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://bot.big-maker.com/user.php');
        xhr.send(bodyParams);
        xhr.addEventListener('readystatechange', () => {
            if (xhr.readyState !== 4) {
                return;
            }
            let json = JSON.parse(xhr.responseText);
            callback.call(scope || this, true, json);
        });
    }

    /**
     * Выполняет AJAX "Загрузить данные пользователя"
     * @param params
     * @param callback
     */
    static doAjaxGetUser(params, callback, scope) {
        let url = App.getUrlWithParams('http://bot.big-maker.com/user.php', params);
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.send();
        xhr.addEventListener('readystatechange', () => {
            if (xhr.readyState !== 4) {
                return;
            }
            let json = JSON.parse(xhr.responseText);
            callback.call(scope || this, true, json);
        });
    }

    /**
     * Выполняет AJAX "Удалить пользователя"
     * @param params
     * @param callback
     */
    static doAjaxRemoveUser(params, callback, scope) {
        params.remove = 1;
        let url = App.getUrlWithParams('http://bot.big-maker.com/user.php', params);
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.send();
        xhr.addEventListener('readystatechange', () => {
            if (xhr.readyState !== 4) {
                return;
            }
            let json = JSON.parse(xhr.responseText);
            callback.call(scope || this, true, json);
        });
    }
}