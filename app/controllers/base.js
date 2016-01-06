'use strict'
function Base () {

    var alphabet = 'abcedefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ01234566789';
    
    this.encode = function(num) {
        var base_count = alphabet.length;
        var encoded = "";
        var div;
        var mod;
        while (num >= base_count) {
            div = num / base_count;
            mod = (num - (base_count * parseInt(div)));
            encoded = alphabet[mod] + encoded;

            num = parseInt(div);
        }
        if (num) {
            encoded = alphabet[num] + encoded;
        }

        return encoded;
    }
    this.decode = function(num) {
        num = num.toString();
        var decoded = 0;
        var multi = 1;
        var digit;
        while (num.length > 0) {
            digit = num[num.length - 1];
            decoded += multi * alphabet.indexOf(digit);
            multi = multi * alphabet.length;
            num = num.slice(0, -1);
        }

        return decoded;
    }

}

module.exports = Base;
