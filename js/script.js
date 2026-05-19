const field = document.querySelector("#campo-de-texto");
const addButton = document.querySelector("#botao-de-adicionar");
const list = document.querySelector("#lista-de-itens");

async function carregaItens() {

    const resposta = await fetch('http://localhost:3000/itens');
    const itens = await resposta.json();

    list.innerHTML = "";

    itens.forEach(item => {
        list.insertAdjacentHTML("afterbegin",
            `<li data-id="${item.id}">
            ${item.nome}
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

    if (event.target.matches("button")) {
        let li = event.target.closest("li");
        let liId = li.dataset.id;

        console.log(liId);
        await fetch(`http://localhost:3000/itens/${liId}`, {
            method: 'DELETE'
        }); 
    }

    await carregaItens();
});

carregaItens();

