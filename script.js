document.addEventListener("DOMContentLoaded", init);
const myButton1 = document.querySelector(".myButton1");
const myButton2 = document.querySelector(".myButton2");
let form1 = document.querySelector("#form1");
let form2 = document.querySelector("#form2");
let consultar = document.querySelector("#consultar");
let nombre = document.querySelector("#nombre");
let banco = document.querySelector("#banco");
let moneda = document.querySelector("#moneda");
let get = document.getElementById("consultar");
let nombre2 = document.getElementById("nombre2").value;
let banco2 = document.getElementById("banco2").value;
let moneda2 = document.getElementById("moneda2").value;
let btn = document.querySelector(".btn");
let footer = document.querySelector(".footer");
let buleano1 = true;
let buleano2 = true;
let suma = [];
function init() {
  search();
}
myButton1.addEventListener("click", () => {
  abrirFormulario1();
});
myButton2.addEventListener("click", () => {
  abrirFormulario2();
});
consultar.addEventListener("click", () => {
  enviar();
});
nombre.addEventListener("change", () => {
  primerCampo();
});
banco.addEventListener("change", () => {
  segundoCampo();
});
moneda.addEventListener("change", () => {
  tercerCampo();
});
get.addEventListener("click", () => {
  enviar();
});
btn.addEventListener("click", () => {
  save();
});
function abrirFormulario1() {
  if (buleano1) {
    form1.classList.toggle("show1");
    buleano1 = false;
  } else {
    form1.classList.toggle("show1");
    buleano1 = true;
  }
}
function abrirFormulario2() {
  if (buleano2) {
    form2.classList.toggle("show2");
    buleano2 = false;
  } else {
    form2.classList.toggle("show2");
    buleano2 = true;
  }
}

async function search() {
  let response = await fetch(
    "https://app-operaciones.onrender.com/operaciones/registro/transfer"
  );
  let consulta = await response.json();
  let html = "";
  for (record of consulta) {
    let row = `<tr>
    <td>${record.fecha}</td>
    <td>${record.nombre}</td>
    <td>${record.tarjeta}</td>
    <td>${record.banco}</td>
    <td>${record.moneda}</td>
     <td>${record.monto}</td>
    <td class="Delete">
      <a href="#" onclick="remove(${record.id})" class="btnDelete">❌</a>
    </td>
  </tr>`;
    html = html + row;
  }
  document.querySelector("#customers > tbody").outerHTML = html;
}
async function enviar() {
  let tarjeta2 = document.querySelector("#tarjeta2").value;
  let ver = await fetch(
    `https://app-operaciones.onrender.com/operaciones/registro/transfer?tarjeta=${tarjeta2}`
  );
  let response = await ver.json();
  let html = "";
  for (record of response) {
    let row = `<tr>
    <td>${record.monto}</td>
    <td>${record.nombre}</td>
    <td>${record.tarjeta}</td>
    <td>${record.banco}</td>
    <td>${record.moneda}</td>
     <td>${record.fecha}</td>
  </tr>`;
    html = html + row;
  }
  document.querySelector("#customer > tbody").outerHTML = html;
  suma.push(record.monto);
  footer.innerHTML = `$${suma.reduce((red, num) => red + num)}`;
}
async function remove(id) {
  respuesta = confirm("¿Está seguro de eliminarlo?");
  if (respuesta) {
    await fetch(
      `https://app-operaciones.onrender.com/operaciones/registro/transfer/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    window.location.reload();
  }
}

function primerCampo() {
  const valor1 = document.querySelector("#nombre").value;
  switch (valor1) {
    case "1":
      nombre2 = "Joaris";
      break;
    case "2":
      nombre2 = "Juan";
      break;
    case "3":
      nombre2 = "Iliana";
      break;
  }
}
function segundoCampo() {
  const valor2 = document.querySelector("#banco").value;
  switch (valor2) {
    case "1":
      banco2 = "METROPOLITANO";
      break;
    case "2":
      banco2 = "BANDEC";
      break;
    case "3":
      banco2 = "BPA";
      break;
  }
}
function tercerCampo() {
  const valor3 = document.querySelector("#banco").value;
  switch (valor3) {
    case "1":
      moneda2 = "CUP";
      break;
    case "2":
      moneda2 = "MLC";
      break;
  }
}

const dato = new Date();
let mes = dato.getMonth();
let year = dato.getFullYear();
let dia = dato.getDate();
var segundos;
var horas;
var minutos;
const data = new Date();
segundos = data.getSeconds();
horas = data.getHours();
minutos = data.getMinutes();

async function save() {
  let data = {
    fecha: `${year}-${mes}-${dia}:${horas}-${minutos}-${segundos}`,
    tarjeta: document.getElementById("tarjeta1").value,
    nombre: nombre2,
    banco: banco2,
    moneda: moneda2,
    monto: document.getElementById("monto").value,
  };
  if (
    data.nombre === "" ||
    data.tarjeta === "" ||
    data.banco === "" ||
    data.monto === 0 ||
    data.monto === "" ||
    isNaN(data.monto) ||
    data.moneda === ""
  ) {
    alert("datos incorrectos");
  } else {
    await fetch(
      "https://app-operaciones.onrender.com/operaciones/registro/transfer",
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    window.location.reload();
  }
}
if (dia === 1) {
  async function removeAll() {
    await fetch(
      `https://app-operaciones.onrender.com/operaciones/registro/transfer`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    window.location.reload();
  }
}
