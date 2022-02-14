function Validations() {
    this.checkEmpty = function (value, spanID, message) {
        if (value.trim() != "") {
            document.getElementById(spanID).innerHTML = "";
            document.getElementById(spanID).style.display = "none";
            return true;
        }
        document.getElementById(spanID).innerHTML = message;
        document.getElementById(spanID).style.display = "block";
        return false;
    }

    this.checkExist = function (value, spanID, message, mangSanPham) {
        let isExist = false;
        isExist = mangSanPham.some(function (sp) {
            return sp.tenSP == value;
        })

        if (isExist) {
            document.getElementById(spanID).innerHTML = message;
            document.getElementById(spanID).style.display = "block";
            return false;
        }
        document.getElementById(spanID).innerHTML = "";
        document.getElementById(spanID).style.display = "none";
        return true;
    }

    this.checkPrice = function (value, spanID, message) {
        var patternString = /^\d+(,\d{1,2})?$/;
        var pattern = new RegExp(patternString);
        if (pattern.test(value)) {
            document.getElementById(spanID).innerHTML = "";
            document.getElementById(spanID).style.display = "none";
            return true;
        }
        document.getElementById(spanID).innerHTML = message;
        document.getElementById(spanID).style.display = "block";
        return false;
    }
}