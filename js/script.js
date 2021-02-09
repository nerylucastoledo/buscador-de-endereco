function escolhaCepOuRua() {
    const buscarPeloCep = document.getElementById('buscarPeloCep')
    const buscarPelaRua = document.getElementById('buscarPelaRua')
    const tabelaCep = document.querySelector('.tabelaCep')
    const tabelaRua = document.querySelector('.tabelaRua')

    buscarPelaRua.addEventListener('click', function() {
        buscarPelaRua.style.backgroundColor = 'aqua'
        buscarPeloCep.style.backgroundColor = 'white'
        tabelaRua.classList.add('ativo')
        tabelaCep.classList.remove('ativo')
    })

    buscarPeloCep.addEventListener('click', function() {
        buscarPeloCep.style.backgroundColor = 'aqua'
        buscarPelaRua.style.backgroundColor = 'white'
        tabelaCep.classList.add('ativo')
        tabelaRua.classList.remove('ativo')
    })
}
escolhaCepOuRua()


function PesquisaPeloCep() {

    const Numerocep = document.getElementById('Numerocep')
    const pesquisarporCep = document.querySelector('.pesquisar')  

    function pegaOCep() {
        ValidaCep(Numerocep.value)
    }
    pesquisarporCep.addEventListener('click', pegaOCep)
    

    function ValidaCep(cep){
        if(cep.length < 8 || cep.length > 8){
            mostrarErro('Cep maior ou menor que 8!')
            Numerocep.value = ""
        }
        else  {
            const cepDigitado = cep
            mostrarCep(cepDigitado)
        }             
    }

    function mostrarCep(cepPessoal) {
        const url = fetch(`https://viacep.com.br/ws/${cepPessoal}/json/`)
        puxarCep(url)
    }
    
}
PesquisaPeloCep()

function puxarCep(url) {
    const logradouro = document.getElementById('logradouro')
    const bairro = document.getElementById('bairro')
    const uf = document.getElementById('uf')
    const cep = document.getElementById('cep')
    const local = document.getElementById('local')
    const table = document.querySelector('table')
    
    const infoUrl = url

    infoUrl.then((resolucao) => {
        return resolucao.json()
    
    }).then((body)=> {
        if(body.length == 0 || body.length > 1) {
            mostrarErro('Endereço incorreto')
        } else if (body.length == 1){
            table.style.display = 'table'
            logradouro.innerText = body[0].logradouro
            bairro.innerText = body[0].bairro
            uf.innerText = body[0].uf
            cep.innerText = body[0].cep
            local.innerText = body[0].localidade
            Numerocep.value = ""
        }
         else {
            table.style.display = 'table'
            logradouro.innerText = body.logradouro
            bairro.innerText = body.bairro
            uf.innerText = body.uf
            cep.innerText = body.cep
            local.innerText = body.localidade
            Numerocep.value = ""
        }
    })
}

function PesquisaPorRua() {

    const estado = document.getElementById('estado')
    const cidade = document.getElementById('cidade')
    const rua = document.getElementById('rua')

    const pesquisarRua = document.querySelector('.pesquisarPorRua')

    function pesquisarCep() {
        ValidaCep(estado.value, cidade.value, rua.value)
    }
    pesquisarRua.addEventListener('click', pesquisarCep)

    function ValidaCep(estado, cidade, rua){
        if(estado.length < 2 || estado.length > 2){
            mostrarErro('UF maior que 2!')
        }
        else  {
            const estadoDigitado = estado
            const cidadeDigitada = cidade
            const ruaDigitada = rua
            mostrarCep(estadoDigitado, cidadeDigitada, ruaDigitada)
        }             
    }
    
    function mostrarCep(estado, cidade, rua) {
        const url = fetch(`https://viacep.com.br/ws/${estado}/${cidade}/${rua}/json/`)
        puxarCep(url)
    }
    
}
PesquisaPorRua()
    
function mostrarErro(mensagem){
    alert(mensagem)
}
