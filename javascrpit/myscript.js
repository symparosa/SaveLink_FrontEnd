var cont = 0, domain = "http://localhost:8080";

function getMSG(msg) {
    document.getElementById('mytoastBody').innerText = msg;
    const toastTrigger = document.getElementById('myToast');
    const toast = new bootstrap.Toast(toastTrigger);
    toast.show();
    cont = 1;

    this.show = function () {
        toast.show();
    }

    this.dispose = function () {
        toast.dispose();
    }
}

async function requestImportarArtigos() {

    document.getElementById("spinner").style.display = 'block';

    if (cont == 1) {
        var toast = new getMSG('');
        toast.dispose();
        cont = 0;
    }

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "link": "https://devgo.com.br/"
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch(domain + "/api/artigo/importar", requestOptions)
        .then(response => response.json())
        .then(function (result) {
            document.getElementById("spinner").style.display = 'none';
            validarResult(result);
        })
        .catch(error => console.log('error', error));
}

function validarResult(result) {

    console.log(result);
    var msg = result['message'];
    var type = result['responseType'];

    if (type == 'ERROR') {
        getMSG(msg);
    } else if (type == 'SUCESS') {
        getMSG(msg);
    } else {
        getMSG('Falha.');
    }
}