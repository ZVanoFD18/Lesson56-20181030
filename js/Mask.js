'use strict';

/**
 * Класс для управления маской загрузки.
 */
class Mask {
    /**
     * Установить текст элемента маски
     * @param text
     * @returns {Mask}
     */
    static setText(text){
        document.querySelector('#id-mask>.mask-text').innerHTML = text;
        return Mask;
    }

    /**
     *  Показать маску
     * @param {String} newText
     * @returns {Mask}
     */
    static show(newText){
        if (newText !== undefined){
            Mask.setText(newText);
        }
        document.getElementById('id-mask').classList.remove('hidden');
        return Mask;
    }

    /**
     * Скрыть маску.
     * @returns {Mask}
     */
    static hide(){
        document.getElementById('id-mask').classList.add('hidden');
        return Mask;
    }
}