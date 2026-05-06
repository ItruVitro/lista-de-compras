const field = document.querySelector("#campo-de-texto");
const addButton = document.querySelector("#botao-de-adicionar");

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
        } catch (error) {
            console.error("Erro na requisição", error);
        }
    }

});