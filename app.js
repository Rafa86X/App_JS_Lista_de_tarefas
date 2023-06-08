'use strict';

// <label class="todo__item">
// <input type="checkbox">
// <div>teste de item 1</div>
// <input type="button" value="X">
// </label> 

// let bancoDados = [
//     {'tarefa' : 'Estudar JS', 'status': ''},
//     {'tarefa' : 'Ver Vingadores', 'status': 'checked'},
//     {'tarefa' : 'Ver Exterminador do futuro', 'status': 'checked'}

// ]

const getBanco = () =>JSON.parse(localStorage.getItem('ListaTarefas')) ?? []

const bancoDados = getBanco()

const setBanco = (banco) => localStorage.setItem('ListaTarefas', JSON.stringify(banco))


const criarItem = (tarefa,status='',indice) => {

    const item = document.createElement('label')
    item.classList.add('todo__item')
    item.innerHTML = `
        <input type="checkbox" ${status} data-indice=${indice}>
        <div>${tarefa}</div>
        <input type="button" value="X" data-indice=${indice}>
    `
    document.getElementById('toldo').appendChild(item)
}

const limpaTela = () => {
    const toldo = document.getElementById('toldo')
    while(toldo.firstChild){
        toldo.removeChild(toldo.lastChild)
    }
}

const atualizaTela = () =>{
    limpaTela()
    bancoDados.forEach((item, indice)=> criarItem(item.tarefa,item.status, indice))
}

const inserirItem = (evento) =>{
    const tecla = evento.key
    const texto = evento.target.value
    if(tecla=='Enter'){
        if(texto!=''){
            bancoDados.push({'tarefa' : texto, 'status' : ''})
            setBanco(bancoDados)
            atualizaTela()
            evento.target.value = ''
        }
    }

}

const removeItem = (indice) => {
    bancoDados.splice(indice,1)
    setBanco(bancoDados)
    atualizaTela()
}

const atualizaIntem = (indice) =>{
    bancoDados[indice].status = bancoDados[indice].status == '' ? 'checked' : ''
    setBanco(bancoDados)
    atualizaTela()

}

const clickItem = (evento) =>{
    const elemento = evento.target
    const indice = elemento.dataset.indice

    if(elemento.type == 'button'){
        removeItem(indice)
    }else if(elemento.type=='checkbox'){
        atualizaIntem(indice)
       }
}

document.getElementById('newItem').addEventListener('keypress',inserirItem)
document.getElementById('toldo').addEventListener('click',clickItem)


atualizaTela()
