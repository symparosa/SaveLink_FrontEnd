
var selectCardId = 0, domain = "https://savelink.finalproject.gq";

window.onload = function minhaLista() {

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch(domain + "/api/artigo/lista_artigo", requestOptions)
        .then(response => response.json())
        .then(function (result) {
            console.log(result);
            validarArtigos(result);
        })
        .catch(error => console.log('error', error));
}

function validarArtigos(result) {

    var msg = result['message'];
    var type = result['responseType'];

    if (type == 'ERROR') {
        getMSG(msg);
    } else if (type == 'SUCESS') {
        var objeto = result['object'];
        construirCard(objeto);
    } else {
        getMSG('Falha.');
    }
}

function construirCard(objeto) {

    var div_container = document.getElementById('container-card');
    var div_row = document.getElementById('row');

    for (var i = 0; i <objeto.length ; i++) {

        var div_col = document.createElement('div');
        div_col.className = 'col';

        var div = document.createElement('div');
        div.id = 'card_' + objeto[i]["id"];
        div.className = 'card h-100';

        var a = document.createElement('a');
        a.href = objeto[i]["link"];
        a.id = 'link';

        var img = document.createElement("img");
        img.src = objeto[i]["foto"];
        img.className = 'card-img-top';

        a.appendChild(img);

        var div_1 = document.createElement('div');
        div_1.className = 'card-body';

        var h5 = document.createElement('h5');
        h5.className = 'card-title';
        h5.textContent = objeto[i]["titulo"];

        div_1.appendChild(h5);

        var p = document.createElement('p');
        p.className = 'card-text';
        p.textContent = objeto[i]["autor"];

        div_1.appendChild(p);

        a.appendChild(div_1);

        var div_2 = document.createElement('div');
        div_2.className = 'dropdown';

        var button = document.createElement('button');
        button.id = 'btn_dropdown';
        button.className = 'btn';
        button.type = 'button';
        button.dataset.bsToggle = 'dropdown';

        var img_1 = document.createElement("img");
        img_1.className = 'img_options';
        img_1.src = "./img/options.png";

        var ul = document.createElement("ul");
        ul.className = 'dropdown-menu';

        var li_1 = document.createElement("li");
        li_1.id = objeto[i]["id"];

        li_1.addEventListener('click', function (e) {
            addFavoritos(this.id);
        });

        var li_2 = document.createElement("li");
        li_2.id = objeto[i]["id"];

        li_2.addEventListener('click', function (e) {
            removerArtigos(this.id);
        });

        var li_3 = document.createElement("li");
        li_3.id = objeto[i]["id"];

        li_3.addEventListener('click', function (e) {
            selectCardId = this.id;
            editArtigos(this.id);
        });

        var a_1 = document.createElement("a");
        a_1.className = 'dropdown-item';
        a_1.innerText = 'Favorito';

        var img_2 = document.createElement("img");
        img_2.className = 'options_icon';
        img_2.src = "./img/heart.png";

        a_1.appendChild(img_2);
        li_1.appendChild(a_1);

        var a_2 = document.createElement("a");
        a_2.className = 'dropdown-item';
        a_2.innerText = 'Remover';

        var img_3 = document.createElement("img");
        img_3.className = 'options_icon';
        img_3.src = "./img/delete.png";

        a_2.appendChild(img_3);
        li_2.appendChild(a_2);

        var a_3 = document.createElement("a");
        a_3.className = 'dropdown-item';
        a_3.innerText = 'Editar';

        var img_4 = document.createElement("img");
        img_4.className = 'options_icon';
        img_4.src = "./img/edit.png";

        a_3.appendChild(img_4);
        li_3.appendChild(a_3);

        ul.appendChild(li_1);
        ul.appendChild(li_2);
        ul.appendChild(li_3);

        button.appendChild(img_1);
        div_2.appendChild(button);
        div_2.appendChild(ul);

        div.appendChild(a);
        div.appendChild(div_2);

        div_col.appendChild(div);
        div_row.appendChild(div_col);
        div_container.appendChild(div_row);
    }
}

function addFavoritos(id) {

    var requestOptions = {
        method: 'PUT',
        redirect: 'follow'
    };

    fetch(domain + "/api/artigo/save_favoritos/" + id, requestOptions)
        .then(response => response.json())
        .then(function (result) {
            validarResult(result);
        })
        .catch(error => console.log('error', error));
}

function removerArtigos(id) {

    var requestOptions = {
        method: 'DELETE',
        redirect: 'follow'
    };

    fetch(domain + "/api/artigo/delete_artigo/" + id, requestOptions)
        .then(response => response.json())
        .then(function (result) {
            validarResult(result);
            location = './minhaLista.html';
        })
        .catch(error => console.log('error', error));
}

function editArtigos(id) {
    const myModal = new bootstrap.Modal('#exampleModal', {
        keyboard: true,
        focus: true,
        backdrop: true
    })

    myModal.show();

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch(domain + "/api/artigo/get_artigo/" + id, requestOptions)
        .then(response => response.json())
        .then(function (result) {

            var msg = result['message'];
            var type = result['responseType'];

            if (type == 'ERROR') {
                getMSG(msg);
            } else if (type == 'SUCESS') {
                document.getElementById('recipient-autor').value = result['object']['autor'];
                document.getElementById('recipient-titulo').value = result['object']['titulo'];
            } else {
                getMSG('Falha.');
            }
        })
        .catch(error => console.log('error', error));
}

function editar() {

    var autor = document.getElementById('recipient-autor').value;
    var titulo = document.getElementById('recipient-titulo').value;

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "id": selectCardId,
        "titulo": titulo,
        "autor": autor
    });

    var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch(domain + "/api/artigo/edit_artigo", requestOptions)
        .then(response => response.json())
        .then(function (result) {
            validarResult(result);
            location = './minhaLista.html';
        })
        .catch(error => console.log('error', error));
}
