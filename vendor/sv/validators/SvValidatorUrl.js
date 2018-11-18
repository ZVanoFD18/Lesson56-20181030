'use strict';
class SvValidatorUrl extends SvBaseValidator {
    constructor() {
        super();
        this.vName = 'url';
        this.vMethod = this.V_METHODS.REGEX;
        this.vRegex =  /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
        this.vInvalidText = 'Значение не является корректным WEB-адресом';
    }
}
SV.reg(new SvValidatorUrl());