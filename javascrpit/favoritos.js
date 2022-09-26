
var domain = "https://savelink.finalproject.gq";

window.onload = function Favoritos() {

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch(domain + "/api/artigo/lista_favoritos", requestOptions)
        .then(response => response.json())
        .then(function (result) {
            validarArtigos(result);
        })
        .catch(error => console.log('error', error));
}

function construirCard(objeto) {

    var div_container = document.getElementById('container-card');
    var div_row = document.getElementById('row');

    for (var i = 0; i < objeto.length; i++) {

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
        img.className = 'card-img-top'

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
            removerFavoritos(this.id);
        });

        var a_1 = document.createElement("a");
        a_1.className = 'dropdown-item';
        a_1.innerText = 'Remover favorito';

        var img_3 = document.createElement("img");
        img_3.className = 'options_icon';
        img_3.src = "./img/delete.png";

        a_1.appendChild(img_3);
        li_1.appendChild(a_1);

        ul.appendChild(li_1);

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

function removerFavoritos(id) {

    var requestOptions = {
        method: 'PUT',
        redirect: 'follow'
    };

    fetch(domain + "/api/artigo/delete_favoritos/" + id, requestOptions)
        .then(response => response.json())
        .then(function (result) {
            validarResult(result);
            location = './favoritos.html';
        })
        .catch(error => console.log('error', error));
}
