$(document).ready(function () {
    $("#nome").blur(function (e) {
        e.preventDefault();
        if (($(this).val().length) < 4 || ($(this).val().length) > 11) {
            mostrarMensagemErro(".erro-nome", this);
        } else {
            esconderMensagemErro(".erro-nome", this)
        }

    });

    $("#sobrenome").blur(function (e) {
        e.preventDefault();
        if (($(this).val().length) < 4 || ($(this).val().length) > 11) {
            mostrarMensagemErro(".erro-sobrenome", this);
        } else {
            esconderMensagemErro(".erro-sobrenome", this)
        }
    });

    $("#email").blur(function (e) {
        e.preventDefault();
        if (($(this).val().length) == 0) {
            mostrarMensagemErro(".erro-emailVaizo", this);
        } else {
            esconderMensagemErro(".erro-emailVazio", this);
            verificaEmail(this);

        }
    });

    $("#senha").blur(function (e) {
        e.preventDefault();
        if (($(this).val().length) < 6 || ($(this).val().length) > 12) {
            mostrarMensagemErro(".erro-senha", this);
        } else {
            esconderMensagemErro(".erro-senha", this);
            verificaSenha(this);
        }
    });


    $("#CEP").blur(function (e) {
        e.preventDefault();

        if (($(this).val().length) < 8) {
            mostrarMensagemErro(".erro-CEP", this);
        } else {
            esconderMensagemErro(".erro-CEP", this);
            recuperarCEP(this);
        }


    });

    $("#numero").blur(function (e) {
        e.preventDefault();

        if ((($(this).val().length) < 1 || ($(this).val().length) > 4)) {
            mostrarMensagemErro(".erro-CEP", this);
        } else {
            esconderMensagemErro(".erro-CEP", this);
            recuperarCEP(this);
        }


    });
});

function mostrarMensagemErro(erro, input) {
        $(erro).css("display", "block");
        $(input).css("border", "3px solid red")
    }

function esconderMensagemErro(erro, input) {
        $(erro).css("display", "none");
        $(input).css("border", "3px solid green")
    }

function verificaEmail(input) {
        const regEmail = new RegExp(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i);
        const ms = $(input).val();
        var n = regEmail.exec(ms);
        if (n != null) {
            esconderMensagemErro(".erro-emailRE", input);
        } else {
            mostrarMensagemErro(".erro-emailRE", input);
        }
    }

function verificaSenha(input) {
        const regEmail = new RegExp(/[a-z]+[0-9]+/i);
        const ms = $(input).val();
        var n = regEmail.exec(ms);
        if (n != null) {
            esconderMensagemErro(".erro-senha", input);
        } else {
            mostrarMensagemErro(".erro-senha", input);
        }
    }


function recuperarCEP(input,) {
        const cep = $(input).val().replace(/\D/g, '')
        const url = `https://viacep.com.br/ws/${cep}/json/`
        const options = {
            method: 'GET',
            mode: 'cors',
            headers: {
                'content-type': 'application/json;charset=utf-8'
            }
        }

        if (!input.validity.patternMismatch && !input.validity.valueMissing) {
            fetch(url, options).then(
                response => response.json()
            ).then(
                data => {
                    if (data.erro) {
                        mostrarMensagemErro(".erro-CEP-busca", input);
                        return
                    }
                    esconderMensagemErro(".erro-CEP-busca", input);
                    preencheCamposComCEP(data)
                    return
                }
            )
        }
    }

function preencheCamposComCEP(data) {
        $("#cidade").val(data.localidade);
        $("#logradouro").val(data.logradouro);
        $("#estado").val(data.uf);
        $("#cidade").css("border", "3px solid green")
        $("#logradouro").css("border", "3px solid green")
        $("#estado").css("border", "3px solid green")
    }