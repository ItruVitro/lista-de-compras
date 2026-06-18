const field = document.querySelector("#campo-de-texto");
const addButton = document.querySelector("#botao-de-adicionar");
const list = document.querySelector("#lista-de-itens");

function criarElemento(tag, texto, id, classe) {

    const elemento = document.createElement(tag);

    if (texto) elemento.textContent = texto;
    if (id != null) elemento.dataset.id = id;
    if (classe) elemento.classList.add(classe);

    return elemento;
};

async function carregaItens() {

    try {
        const response = await fetch('http://localhost:3000/itens');

        if (!response.ok) { throw new Error('Erro ao buscar itens'); }

        return response.json();
    }
    catch (error) {
        console.error(error);
    }

};

function renderizarItens(itens){

        list.innerHTML = '';

        itens.forEach(item => {
            const li = criarElemento('li', `${item.nome}`, `${item.id}`, 'list-item');

            const botaoEditar = criarElemento('button', 'editar', null, 'edit-button');
            const botaoExcluir = criarElemento('button', 'excluir', null, 'remove-button');

            li.appendChild(botaoEditar);
            li.appendChild(botaoExcluir);

            list.appendChild(li);

        });

}

async function carregarTela() {

    const itens = await carregaItens();
    renderizarItens(itens);

}


addButton.addEventListener('click', async () => {
    const valor = field.value.trim();

    if (valor !== "") {

        try {
            const response = await fetch('http://localhost:3000/itens', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nome: valor })
            });

            if (!response.ok) { throw new Error('Erro ao enviar itens'); }

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
            try {
                const response = await fetch(`http://localhost:3000/itens/${liId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        nome: novoNome
                    })

                });

                if (!response.ok) { throw new Error('Erro ao atualizar itens'); }

                await carregaItens();
            } catch (error) {
                console.error(error);
            }

        }



    }


    if (event.target.classList.contains("remove-button")) {

        try {
            const response = await fetch(`http://localhost:3000/itens/${liId}`, {
                method: 'DELETE'
            });

            if (!response.ok) { throw new Error('Erro ao deletar itens'); }

            await carregaItens();
        }
        catch (error) {
            console.log(error);
        }

    }

});

carregaItens();

