const field = document.querySelector("#campo-de-texto");
const addButton = document.querySelector("#botao-de-adicionar");
const list = document.querySelector("#lista-de-itens");

async function carregaItens() {

    const resposta = await fetch('http://localhost:3000/itens');
    const itens = await resposta.json();

    list.innerHTML = "";

    itens.forEach(item => {
        list.insertAdjacentHTML("afterbegin", `<li>${item.nome}</li>`);
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

carregaItens();

