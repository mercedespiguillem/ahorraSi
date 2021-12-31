// USO DE JQUERYS PARA MODIFICAR ESTILOS

$(document).ready(function () {
  $(".header").css({ backgroundColor: "white" });
  $("h1").css({ color: "#57966E", fontWeight: 600 });
  $(".welcome").css({
    textAlign: "left",
    color: "#61A87B",
  });

  // CLASE CONSTRUCTORA USUARIO

  class Usuario {
    constructor(nombre, email, edad, pais) {
      this.nombre = nombre;
      this.email = email;
      this.pais = pais;
    }
  }

  // INSTANCIANDO UN NUEVO USUARIO CON LA CLASE CONSTRUCTORA Y OBTENIENDO LOS DATOS GUARDADOS EN EL LOCAL STORAGE
  const newUser = new Usuario(
    localStorage.getItem("usuario"),
    localStorage.getItem("email"),
    localStorage.getItem("pais")
  );

  let usersList = [];
  usersList = userFromStorage("Lista de usuarios") || [];
  // localStorage.setItem("Lista de usuarios", JSON.stringify(newUser));

  $("#btnSubmit").on("click", () => {
    usersList.push(newUser);
    localStorage.setItem("Lista de usuarios", JSON.stringify(usersList));
  });

  function userFromStorage(key) {
    if (localStorage.getItem(key)) {
      return JSON.parse(localStorage.getItem(key));
    }
  }
  // FUNCION QUE GUARDA EN EL LOCAL STORAGE LOS DATOS DEL USUARIO AL HACER CLIC EN SUBMIT Y CREA UNA CARD DE BIENVENIDA

  let button = document.getElementById("btnSubmit");
  button.addEventListener("click", saveToLocal);

  function createCard(user, element) {
    if (element.childNodes[0]) {
      element.removeChild(element.childNodes[2]);
    }
    const card = document.createElement("div");
    card.className = "card row col-md-5 d-flex align-content-center m-3 p-3";

    card.innerHTML = `<h2>Hola ${user}!</br> Bienvenido a AhorraSí! </h2>`;

    element.appendChild(card);
  }

  function saveToLocal(e) {
    e.preventDefault();

    localStorage.setItem("usuario", formName.value);
    localStorage.setItem("email", formEmail.value);
    localStorage.setItem("pais", formCountry.value);

    let user = localStorage.getItem("usuario");
    const element = document.getElementById("registro");
    createCard(user, element);
  }

  // FUNCION QUE CALCULA EL TOTAL DE INGRESOS Y LOS MUESTRA EN UNA CARD

  const inputSalary = document.getElementById("sueldo");
  const inputExtraIncomes = document.getElementById("otros");
  const where2 = document.getElementById("incomes");
  let button2 = document.getElementById("btn2");
  button2.addEventListener("click", totalIncomes);

  function showCard(total, where2) {
    if (where2.childNodes[0]) {
      where2.removeChild(where2.childNodes[2]);
    }
    const cardTotal = document.createElement("div");

    cardTotal.className =
      "card row col-md-5 d-flex align-content-center m-3 p-3";
    cardTotal.innerHTML = `<h2>Tu total de ingresos es: </br> $${total}</h2>`;
    where2.appendChild(cardTotal);
  }

  function totalIncomes(event) {
    event.preventDefault();
    localStorage.setItem("salary", inputSalary.value);
    localStorage.setItem("Extra incomes", inputExtraIncomes.value);

    let total = "";
    total = Number(inputSalary.value) + Number(inputExtraIncomes.value);
    console.log(total);
    localStorage.setItem("Total de ingresos mensuales", total);
    return showCard(total, where2);
  }

  // ARRAY DE GASTOS FIJOS

  let gastosFijos = [
    {
      id: "0",
      nombre: "Alquiler",
      valor: 0,
    },
    {
      id: "1",
      nombre: "Comida",
      valor: 0,
    },
    {
      id: "2",
      nombre: "Electricidad",
      valor: 0,
    },
    {
      id: "3",
      nombre: "Gas",
      valor: 0,
    },
    {
      id: "4",
      nombre: "Agua",
      valor: 0,
    },
    {
      id: "5",
      nombre: "Celular",
      valor: 0,
    },
    {
      id: "6",
      nombre: "Gimnasio",
      valor: 0,
    },
  ];

  // GUARDO EL ARRAY CON VALORES DE GASTOS EN CERO EN EL LOCALSTORAGE

  localStorage.setItem("Gastos en cero", JSON.stringify(gastosFijos));

  // FUNCION QUE CALCULA EL TOTAL DE LOS GASTOS Y LOS MUESTRA EN UNA CARD Y MODIFICA LOS VALORES DE LOS GASTOS DEL ARRAY DE GASTOS FIJOS

  const where3 = document.getElementById("expenses");

  let button3 = document.getElementById("btn3");

  button3.addEventListener("click", totalExpenses);

  let balance = "";

  function totalExpenses(event) {
    event.preventDefault();
    localStorage.setItem("Gastos de alquiler", inputRent.value);
    localStorage.setItem("Gastos de comida", inputFood.value);
    localStorage.setItem("Gastos de electricidad", inputTaxes1.value);
    localStorage.setItem("Gastos de gas", inputTaxes2.value);
    localStorage.setItem("Gastos de agua", inputTaxes3.value);
    localStorage.setItem("Gastos de celular", inputTaxes4.value);
    localStorage.setItem("Gastos de gimnasio", inputTaxes5.value);

    expensesValues();

    let totalExpenses = "";
    totalExpenses =
      Number(inputRent.value) +
      Number(inputTaxes1.value) +
      Number(inputTaxes2.value) +
      Number(inputTaxes3.value) +
      Number(inputTaxes4.value) +
      Number(inputTaxes5.value) +
      Number(inputFood.value);

    console.log(totalExpenses);
    localStorage.setItem("Total de gastos", totalExpenses);

    balance = Number(
      localStorage.getItem("Total de ingresos mensuales") -
        localStorage.getItem("Total de gastos")
    );
    balanceTotal();

    return showCardExpenses(totalExpenses, where3);
  }

  function showCardExpenses(totalExpenses, where3) {
    // la card aparece una sola vez al hacer clic en el boton
    if (where3.childNodes[0]) {
      where3.removeChild(where3.childNodes[2]);
    }
    const cardTotalExpenses = document.createElement("div");

    cardTotalExpenses.id = "cardExpenses";
    cardTotalExpenses.className =
      "card row col-md-6 d-flex align-content-center m-3 p-2";

    cardTotalExpenses.innerHTML = `<h2>Tus gastos fijos totales son: $${totalExpenses}</h2>`;
    where3.appendChild(cardTotalExpenses);
  }

  // funcion que modifica los valores de los gastos del array de gastos fijos y los guarda en JSON en el localstorage

  function expensesValues() {
    let itemsStorage = [
      localStorage.getItem("Gastos de alquiler"),
      localStorage.getItem("Gastos de comida"),
      localStorage.getItem("Gastos de electricidad"),
      localStorage.getItem("Gastos de gas"),
      localStorage.getItem("Gastos de agua"),
      localStorage.getItem("Gastos de celular"),
      localStorage.getItem("Gastos de gimnasio"),
    ];

    for (i = 0; i < gastosFijos.length; i++) {
      gastosFijos[i].valor = itemsStorage[i];
    }

    localStorage.setItem("Tus gastos fijos", JSON.stringify(gastosFijos));
    console.log(gastosFijos);
  }

  // funcion que crea una card con el saldo final

  function balanceTotal() {
    localStorage.setItem("Tu saldo es", balance);
    $("#divExpenses").append(
      `<div class="card col col-md-6 d-flex align-content-center p-2 ">
          <h2 class="p-3 ">Tu saldo es $${balance}</h2></div>`
    );
  }

  balance = Number(
    localStorage.getItem("Total de ingresos mensuales") -
      localStorage.getItem("Total de gastos")
  );

  $("#btn10").click(() => {
    let percent = 10;
    let savings = Number((balance * percent) / 100);
    console.log("Tu ahorro mensual es `${savings}`");

    calculeSavings(savings);
  });

  $("#btn20").click(() => {
    let percent = 20;
    let savings = Number((balance * percent) / 100);
    console.log("Tu ahorro mensual es `${savings}`");

    calculeSavings(savings);
  });

  $("#btn30").click(() => {
    let percent = 30;
    let savings = (balance * percent) / 100;
    console.log("Tu ahorro mensual es `${savings}`");

    calculeSavings(savings);
  });
  $("#btn40").click(() => {
    let percent = 40;
    let savings = (balance * percent) / 100;
    console.log("Tu ahorro mensual es `${savings}`");

    calculeSavings(savings);
  });
  $("#btn50").click(() => {
    let percent = 50;
    let savings = (balance * percent) / 100;
    console.log("Tu ahorro mensual es `${savings}`");

    calculeSavings(savings);
  });
  $("#btn60").click(() => {
    let percent = 60;
    let savings = (balance * percent) / 100;
    console.log("Tu ahorro mensual es `${savings}`");

    calculeSavings(savings);
  });
  $("#btn70").click(() => {
    let percent = 70;
    let savings = (balance * percent) / 100;
    console.log("Tu ahorro mensual es `${savings}`");

    calculeSavings(savings);
  });
  $("#btn80").click(() => {
    let percent = 80;
    let savings = (balance * percent) / 100;
    console.log("Tu ahorro mensual es `${savings}`");

    calculeSavings(savings);
  });

  $("#btn90").click(() => {
    let percent = 90;
    let savings = (balance * percent) / 100;
    console.log("Tu ahorro mensual es `${savings}`");

    calculeSavings(savings);
  });
  $("#btn100").click(() => {
    let percent = 100;
    let savings = (balance * percent) / 100;
    console.log("Tu ahorro mensual es `${savings}`");

    calculeSavings(savings);
  });

  function calculeSavings(savings) {
    $("#mes2").append(`<td>$${parseInt(savings * 2)}</td>`);
    $("#mes3").append(`<td>$${parseInt(savings * 3)}</td>`);
    $("#mes6").append(`<td>$${parseInt(savings * 6)}</td>`);
    $("#mes12").append(`<td>$${parseInt(savings * 12)}</td>`);
    $("#mes18").append(`<td>$${parseInt(savings * 18)}</td>`);
    $("#mes24").append(`<td>$${parseInt(savings * 24)}</td>`);

    $("#tabla").slideDown("slow");
  }

  // JQUERYS

  // seccion registro

  $("div.background2").prepend(
    ' <h2 class="col-md-12 titles">¡Registrate y comencemos!</h2>'
  );
  $("h2.titles").fadeIn("slow");

  // seccion ingresos

  $("#btnSubmit").click(() => {
    $("#form2").slideDown("slow");
  });

  // seccion gastos

  $("#btn2").click(() => {
    $("#divExpenses").slideDown("slow");
  });

  // eventos relacionados a los iconos

  $("#btnIcon1").click(() => {
    // $("#inputRent").show();
    $("#inputRent").slideDown("slow");
  });

  $("#btnIcon2").click(() => {
    $("#inputFood").slideDown("slow");
  });

  $("#btnIcon3").click(() => {
    $("#inputTaxes1").slideDown("slow");
    $("#inputTaxes2").slideDown("slow");
    $("#inputTaxes3").slideDown("slow");
  });

  $("#btnIcon4").click(() => {
    $("#inputTaxes4").slideDown("slow");
  });

  $("#btnIcon5").click(() => {
    $("#inputTaxes5").slideDown("slow");
  });

  $("#btnIcon1").click(() => {
    $("#btn3").show();
  });

  // seccion ahorros

  $("#savings").prepend(
    '<h2  class="col-md-12 titles"> ¿Qué porcentaje de tu saldo querés ahorrar? </h2>'
  );

  $("#btn3").click(() => {
    $("#savings").slideDown("slow");
  });



// LLAMADA A AJAX

const URLJSON = "miJson.json";

$("#btnSubmit").click(() => {
  $.getJSON(URLJSON, function (respuesta, estado) {
    if (estado === "success") {
      for (const dato of respuesta) {
        $("body").prepend(
          `<div class="alert alert-danger "role="alert">
            <h5>${dato.alerta}</h5>
          </div>`
        );
      }
    }
  });
});


});
