'use strict';
let sampleUser = {
    "name": "Vasya",
    "email": "vasya@mail.ru",
    "phone": "123123432",
    "id": 4
}

class Users {
    static getTable() {
        return document.querySelector('table.users');
    }

    static doLoadList() {
        console.log('doLoad');
        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://bot.big-maker.com/users.php');
        xhr.send();
        xhr.addEventListener('readystatechange', () => {
            console.log('readystatechange', arguments);
            if (xhr.readyState !== 4) {
                return;
            }
            let json = JSON.parse(xhr.responseText);
            Users.renderTable(json);
        });
    }

    static renderTable(json) {
        let table = Users.getTable(),
            tBody = table.querySelector('tbody');
        tBody.innerHTML = '';
        console.log('renderTable', json);
        json.forEach((row) => {
            let newRow = Users.createRow(row);
            tBody.appendChild(newRow);
        });
    }

    static createRow(data) {
        if (!('id' in data)) {
            throw new Error('Id обязательно должен быть');
        }
        let tr = document.createElement('tr');
        var td;

        td = document.createElement('td');
        td.innerHTML = data.id;
        td.classList.add('user-id');
        tr.appendChild(td);

        td = document.createElement('td');
        td.innerHTML = data.name || '';
        td.classList.add('user-name');
        tr.appendChild(td);

        td = document.createElement('td');
        td.innerHTML = data.email || '';
        td.classList.add('user-email');
        tr.appendChild(td);

        td = document.createElement('td');
        td.innerHTML = data.phone || '';
        tr.appendChild(td);

        td = document.createElement('td');
        (function (tdEl) {
            var tmpEl;

            tmpEl = document.createElement('div');
            tmpEl.classList.add('actions-item', 'action-edit');
            tmpEl.innerHTML = 'Редактировать';
            tdEl.appendChild(tmpEl);

            tmpEl = document.createElement('div');
            tmpEl.classList.add('actions-item', 'action-remove');
            tmpEl.innerHTML = 'Удалить';
            tdEl.appendChild(tmpEl);
        })(td);
        tr.appendChild(td);

        return tr;
    }

    static doAdd() {
        // console.log('add');
        User.showAdd()
    }

    static onClickEdit(domEl) {
        console.log('edit');
    }

    static onClickRemove(domElButtonRemove) {
        console.log('remove');
        let id = domElButtonRemove.closest('tr').querySelector('.user-id').innerHTML;
        console.log(id);
        let url = App.getUrlWithParams('http://bot.big-maker.com/user.php' ,{
            id : id,
            remove : 1
        });

        let xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.send();
        xhr.addEventListener('readystatechange', () => {
            console.log('readystatechange', arguments);
            if (xhr.readyState !== 4) {
                return;
            }
            let json = JSON.parse(xhr.responseText);
            console.log(json);
            if (json.result == 1){
                Users.doLoadList();
            } else if (json.error){
                alert(json.error)
            }
            Users.doLoadList();
        });
    }

    static doEdit(id) {

    }


}
