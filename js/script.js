const field = document.querySelector("#campo-de-texto");
const addButton = document.querySelector("#botao-de-adicionar");
const list = document.querySelector("#lista-de-itens");

async function carregaItens() {

    const resposta = await fetch('http://localhost:3000/itens');
    const itens = await resposta.json();

    list.innerHTML = "";

    itens.forEach(item => {
        list.insertAdjacentHTML("afterbegin",
            `<li class="list-item" data-id="${item.id}">
            ${item.nome}

            <button class="edit-button">
            editar
            </button>

            <button class="remove-button">
            excluir
            </button>

            </li>`);
    });

};

addButton.addEventListener('click', async () => {
    const valor = field.value;

    if (valor !== "") {

        try {
            const response = await fetch('http://localhost:3000/itens', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nome: valor })
            });

            console.log('Status:', response.status);

            field.value = '';

            await carregaItens();

        } catch (error) {
            console.error("Erro na requisição", error);
        }
    }

});

list.addEventListener('click', async (event) => {
    const li = event.target.closest("li");

    if (!li) return;
    
    const liId = li.dataset.id;

    if (event.target.classList.contains("edit-button")) {

        const novoNome = prompt("Digite o nome do novo item");

        if (novoNome) {

            await fetch(`http://localhost:3000/itens/${liId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nome: novoNome
                })

            });
            await carregaItens();

        }



    }


    if (event.target.classList.contains("remove-button")) {

        await fetch(`http://localhost:3000/itens/${liId}`, {
            method: 'DELETE'
        });
        await carregaItens();
    }

});

carregaItens();

