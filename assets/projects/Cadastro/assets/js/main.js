const KEY_BD = '@usuariosestudo'

var listaRegistros = {
    ultimoIdGerado:0,
    usuarios:[]
}

var FILTRO = ''

function gravarBD(){
    localStorage.setItem(KEY_BD, JSON.stringify(listaRegistros) )
}

function lerBD(){
    const data = localStorage.getItem(KEY_BD)
    if(data){
        listaRegistros = JSON.parse(data)
    }
    desenhar()
}


function pesquisar(value){
    FILTRO = value;
    desenhar()
}


function desenhar(){
    const tbody = document.getElementById('listaRegistrosBody')
    if(tbody){
        var data = listaRegistros.usuarios;
        if(FILTRO.trim()){
            const expReg = eval(`/${FILTRO.trim().replace(/[^\d\w]+/g,'.*')}/i`)
            data = data.filter( usuario => {
                return expReg.test( usuario.nome ) || expReg.test( usuario.fone )
            } )
        }
        data = data
            .sort( (a, b) => {
                return a.nome < b.nome ? -1 : 1
            })
            .map( usuario => {
                return `<tr>
                        <td>${usuario.id}</td>
                        <td>${usuario.nome}</td>
                        <td>${usuario.email}</td>
                        <td>${usuario.fone}</td>
                        <td>
                            <button class="btn btn-outline-danger" onclick='perguntarSeDeleta(${usuario.id})'>Deletar</button>
                        </td>
                    </tr>`
            } )
        tbody.innerHTML = data.join('')
    }
}

function insertUsuario(nome, email, fone){
    const id = listaRegistros.ultimoIdGerado + 1;
    listaRegistros.ultimoIdGerado = id;
    listaRegistros.usuarios.push({
        id, nome, email, fone
    })
    gravarBD()
    desenhar()
    visualizar('lista')
}

function deleteUsuario(id){
    listaRegistros.usuarios = listaRegistros.usuarios.filter( usuario => {
        return usuario.id != id
    } )
    gravarBD()
    desenhar()
}

function perguntarSeDeleta(id){
    if(confirm('Quer deletar o registro de id '+id)){
        deleteUsuario(id)
    }
}

function limparEdicao(){
    document.getElementById('nome').value = ''
    document.getElementById('email').value = ''
    document.getElementById('fone').value = ''
}

function visualizar(pagina, novo=false, id=null){
    document.body.setAttribute('page',pagina)
    if(pagina === 'cadastro'){
        if(novo) limparEdicao()
        if(id){
            const usuario = listaRegistros.usuarios.find( usuario => usuario.id == id )
            if(usuario){
                document.getElementById('id').value = usuario.id
                document.getElementById('email').value = usuario.email
                document.getElementById('nome').value = usuario.nome
                document.getElementById('fone').value = usuario.fone
            }
        }
    }
}

function submeter(e){
    e.preventDefault()
    const data = {
        id: document.getElementById('id').value,
        email: document.getElementById('email').value,
        nome: document.getElementById('nome').value,
        fone: document.getElementById('fone').value,
    }
    if(data.id){
        editUsuario(data.id, data.email, data.nome, data.fone)
    }else{
        insertUsuario(data.nome, data.email, data.fone)
    }
}

window.addEventListener('load', () => {
    lerBD()
    document.getElementById('cadastroRegistro').addEventListener('submit', submeter)
    document.getElementById('inputPesquisa').addEventListener('keyup', e => {pesquisar(e.target.value)})
})
