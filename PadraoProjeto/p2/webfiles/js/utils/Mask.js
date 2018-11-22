
$('.mask-cep').mask('00000-000');
$('.mask-cnpj').mask('00.000.000/0000-00', {reverse: true});
$('#celular-colaborador').change(function (phone) {
    if(phone.currentTarget.value.length > 10) {

        $('#celular-colaborador').mask('(00) 00000-0000')
    }

    if(phone.currentTarget.value.length < 11) {

        $('#celular-colaborador').mask('(00) 0000-0000')
    }

});

$('#fone-comercial').change(function (phone) {
    if(phone.currentTarget.value.length > 10) {

        $('#fone-comercial').mask('(00) 00000-0000')
    }

    if(phone.currentTarget.value.length < 11) {

        $('#fone-comercial').mask('(00) 0000-0000')
    }

});

$('#fone-adm').change(function (phone) {

    if(phone.currentTarget.value.length > 10) {
        $('#fone-adm').mask('(00) 00000-0000')
        return
    }

    if(phone.currentTarget.value.length < 11) {
        $('#fone-adm').mask('(00) 0000-0000')
        return
    }

});


$('.mask-cpf').mask('000.000.000-00', {reverse: true});
$(".mask-money").maskMoney({allowNegative: true, thousands:'.', decimal:',', affixesStay: false});



