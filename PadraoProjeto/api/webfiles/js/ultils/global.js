function numberToReal(num) {
    var numero = parseFloat(num);
    var numero = numero.toFixed(2).split('.');
    numero[0] = numero[0].split(/(?=(?:...)*$)/).join('.');
    return numero.join(',');
}

function hiddenPreload(){
    document.getElementById("preloadPadrao").style.display = "none";
}

function hiddenDiv(idDiv){
    document.getElementById(idDiv).style.display = "none";
}

function showDiv(idDiv){
    document.getElementById(idDiv).style.display = "block";
}

