let listaDeItens = []
let itemAEditar

const form = document.getElementById("form-itens")
const itensInput = document.getElementById("receber-item")
const ulItens = document.getElementById("lista-de-itens")
const ulItensComprados = document.getElementById("itens-comprados")
const listaRecuperada = localStorage.getItem('listaDeItens')
 
 // Armazenando os dados no navegador
function atualizaLocalStorage() {
    localStorage.setItem('listaDeItens', JSON.stringify(listaDeItens))
}

if(listaRecuperada) {
    listaDeItens = JSON.parse(listaRecuperada)
    mostrarItem()
} else {
    listaDeItens = []
}
// Fim

form.addEventListener("submit", function(evento) { //esse código faz com que, quando clicarmos o botão
    evento.preventDefault()                        //faz com que as funções ou outros códigos funcione
    salvarItem()
    mostrarItem()
    itensInput.focus() // quando enviarmos algum item para o nosso carrinho, o campo de texto continuará sendo selecionado  
})

function salvarItem () {
    const comprasItem = itensInput.value // pega o valor que for inserido no input
    const checarDuplicado = listaDeItens.some((elemento) => elemento.valor.toUpperCase() === comprasItem.toUpperCase()) // esse código checa se
    // o item tá duplicado até se utilizarmos letra minuscula, e pra gente fazer essa checagem tivemos que utilizar o toUpperCase()

    if(checarDuplicado) {
        alert("Item já existe!")
    } else {

    listaDeItens.push ({
        valor: comprasItem,
        checar: false
    })  
}

    itensInput.value = '' // quando enviarmos o item pro carrinho, o valor no campo de texto some
}

function mostrarItem() {
    ulItens.innerHTML = '' // o ulitens abaixo, já está guardando os valores anteriores, então a gente
                          // usa o ulItens.innerHTML = '' vazio pra "resetar os valores anteriores"
    ulItensComprados.innerHTML = ''                      
    listaDeItens.forEach((elemento, index) => {
        if(elemento.checar) {
            ulItensComprados.innerHTML += `
        <li class="item-compra is-flex is-justify-content-space-between" data-value="${index}">
            <div>
                <input type="checkbox" checked class="is-clickable" />  
                <span class="itens-comprados is-size-5">${elemento.valor}</span>
            </div>
            <div>
                <i class="fa-solid fa-trash is-clickable deletar"></i>
            </div>
        </li>
            `
        } else {
        ulItens.innerHTML += `
    <li class="item-compra is-flex is-justify-content-space-between" data-value="${index}">
        <div>
            <input type="checkbox" class="is-clickable" />
            <input type="text" class="is-size-5" value="${elemento.valor}" ${index !== Number(itemAEditar) ? 'disabled' : ''}></input>     
        </div>

        <div>
            ${ index === Number(itemAEditar) ? '<button onclick="salvarEdicao()"><i class="fa-regular fa-floppy-disk is-clickable"></i></button>' : '<i class="fa-regular is-clickable fa-pen-to-square editar"></i>'}
            <i class="fa-solid fa-trash is-clickable deletar"></i>
        </div>
    </li>`
    }
    })

    const inputsCheck = document.querySelectorAll('input[type="checkbox"]')

    inputsCheck.forEach(i => { // o "i" representa cada elemento do array de elementos 'inputsCheck' que
        // está sendo percorrido
        i.addEventListener("click", (evento) => {
            valorDoElemento = evento.target.parentElement.parentElement.getAttribute('data-value')
            listaDeItens[valorDoElemento].checar = evento.target.checked
            mostrarItem()
        })
    })

    const deletarObjetos = document.querySelectorAll(".deletar")

    deletarObjetos.forEach(i => {
        i.addEventListener("click", (evento) => {
            valorDoElemento = evento.target.parentElement.parentElement.getAttribute('data-value')
            listaDeItens.splice(valorDoElemento,1) // esse método splice, consegue deletar objetos, adicionar...
            mostrarItem()
        })
    })

    const editarItens = document.querySelectorAll(".editar")

    editarItens.forEach(i => {
        i.addEventListener("click", (evento) => {
            itemAEditar = evento.target.parentElement.parentElement.getAttribute('data-value') // vai receber o indice do objeto
            mostrarItem()
        })
    })

    atualizaLocalStorage()
}

function salvarEdicao() {
    const itemEditado = document.querySelector(`[data-value="${itemAEditar}"] input[type="text"]`) // pega o indice do itemAEditar
    // console.log(itemEditado.value)
    listaDeItens[itemAEditar].valor = itemEditado.value
    console.log(listaDeItens)
    itemAEditar = -1 // não está referenciando a nenhum objeto, pois todos os objetos começam de indice 0
    mostrarItem() 
}
