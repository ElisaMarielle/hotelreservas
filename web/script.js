const urlq = "http://localhost:3000/quartos/"
const urlr = "http://localhost:3000/reservas/"
//---------//
const cadquarto = document.querySelector('.modal-create')
const cadreserva = document.querySelector('.modal-reserva')
//---------//
const main = document.querySelector('.main-content')
const contreservas = document.querySelector('.main-reservas')
//---------//
const formq = document.getElementById("formQuarto")
const formr = document.getElementById("formReserva")
//---------//
const tbody = document.getElementById("tbody")
const tbodyr = document.getElementById("tbodyr")
const quartos = []
const reservas = []
let reservaAtual = null;
let quartoAtual = null;

//--------------------------------------------------//

function abrirModal(){
    cadquarto.style.display = "flex"
}
function fecharModalq(){
    cadquarto.style.display = "none"
}

//--------------------------------------------------//

function abrirModalReservas(){
    cadreserva.style.display = "flex"
}
function fecharModalReservas(){
    cadreserva.style.display = "none"
    contreservas.style.display = "flex"
}

//--------------------------------------------------//

formq.addEventListener("submit", cadastrarQuarto);
async function cadastrarQuarto(e) {
    e.preventDefault();
    const dados = {
        numero: document.getElementById("numero").value.trim(),
        tipo: document.getElementById("tipo").value
    }

    await fetch(urlq + "cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dados)
    });
    cadastrarQuarto()
    fecharModalq();
    carregarQuartos()
}

//----------------------------------------------------------//

carregarQuartos();

function carregarQuartos(){
    fetch(urlq + 'listar')
    .then(response => response.json())
    .then(data =>{
        quartos.length = 0;
        quartos.push(...data);
        listarQuartos();
    })
    .catch(e =>alert('Problemas com a conexão da API'));
}

//----------------------------------------------------------//

function listarQuartos(){
    tbody.innerHTML = '';

    quartos.forEach(quarto =>{
        tbody.innerHTML += `
            <tr>
                <td>${quarto.numero}</td>
                <td>${quarto.tipo}</td>
                <td>
                    <button class="button-c" onclick="verReservas()">
                        <i class="fa-regular fa-eye"></i>Ver Reservas
                    </button>
                    <button class="button-e" onclick="excluirQuartoAtual(${quarto.id})">
                        <i class="fa-regular fa-trash-can"></i>Excluir
                    </button>
                </td>
            </tr>
        `;
    });
}

function excluirQuartoAtual(id){
    if(!confirm("Deseja excluir esse quarto?")) return;
    fetch(urlq + 'excluir/' + id, {
        method: 'DELETE',
    })
    .then(() => {
        alert("Quarto excluído com sucesso.");
        carregarQuartos();
    })
    .catch(() => alert("Erro ao excluir quarto."));
}




function verReservas(quarto) {
    main.style.display = "none";
    contreservas.style.display = "flex";
    carregarReservas();
}

function voltar(){
    contreservas.style.display = "none"
    main.style.display = "flex"
}


formr.addEventListener("submit", cadastrarReserva);
async function cadastrarReserva(e) {
    e.preventDefault();
    const dados = {
        hospede: document.getElementById("hospede").value,
        data_entrada: document.getElementById("data_entrada").value,
        data_saida: document.getElementById("data_saida").value
    }

    await fetch(urlr + "cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dados)
    });
    cadastrarReserva()
    fecharModalReservas();
    carregarReservas()
}

//----------------------------------------------------------//

carregarReservas();

function carregarReservas(){
    fetch(urlr + 'listar')
    .then(r => r.json())
    .then(data => {
        reservas.length = 0;
        reservas.push(...data);
        listarReservas();
    });
}

//----------------------------------------------------------//

function listarReservas(){
    tbodyr.innerHTML = '';

    reservas.forEach(reserva =>{
        tbodyr.innerHTML += `
            <tr>
                <td>${reserva.hospede}</td>
                <td>${reserva.data_entrada}</td>
                <td>${reserva.data_saida}</td>
                <td>
                    <button class="button-e" onclick="excluirReserva(${reserva.id})">
                        <i class="fa-regular fa-trash-can"></i>Excluir
                    </button>
                </td>
            </tr>
        `;
    });
}

function excluirReserva(id) {
    if (!confirm("Deseja excluir essa reserva?")) return;
    fetch(urlr + "excluir/" + id, {
        method: "DELETE"
    })
    .then(res => {
        if (!res.ok) throw new Error();
        alert("Reserva excluída com sucesso");
        carregarReservas();
    })
    .catch(() => {
        alert("Erro ao excluir reserva");
    });
}