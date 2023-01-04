const ingresos = [new Ingreso("Quincena", 420), new Ingreso("Ventas", 620)];

const egresos = [new Egreso("Zapatillas", 185), new Egreso("Consola", 600)];

let cargarApp = () => {
  cargarCabecero();
  cargarIngresos();
  cargarEgresos();
};

function totalIngresos() {
  let totalIngresos = 0;
  for (let ingreso of ingresos) {
    totalIngresos += ingreso.valor;
  }
  return totalIngresos;
}

function totalEgresos() {
  let totalEgresos = 0;
  for (let egreso of egresos) {
    totalEgresos += egreso.valor;
  }
  return totalEgresos;
}

function cargarCabecero() {
  let presupuesto = totalIngresos() - totalEgresos();
  let porcentajeEgreso = totalEgresos() / totalIngresos();
  document.getElementById("presupuesto").innerHTML = formatoMoneda(presupuesto);
  document.getElementById("porcentaje").innerHTML =
    formatoPorcentaje(porcentajeEgreso);
  document.getElementById("ingresos").innerHTML = formatoMoneda(
    totalIngresos()
  );
  document.getElementById("egresos").innerHTML = formatoMoneda(totalEgresos());
}

function formatoMoneda(valor) {
  return valor.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionGigits: 2,
  });
}

function formatoPorcentaje(valor) {
  return valor.toLocaleString("en-US", {
    style: "percent",
    minimumFractionDigits: 2,
  });
}

function cargarIngresos() {
  let ingresoshtml = "";

  for (let ingreso of ingresos) {
    ingresoshtml += crearingresoshtml(ingreso);
  }

  document.getElementById("lista-ingresos").innerHTML = ingresoshtml;
}

function crearingresoshtml(ingreso) {
  let ingresohtml = `<div class="elemento limpiarEstilos">
    <div class="elemento_descripcion">${ingreso.descripcion}</div>
    <div class="derecha limpiarEstilos">
        <div class="elemento_valor">+ ${formatoMoneda(ingreso.valor)}</div>
        <div class="elemento_eliminar">
            <button class="elemento_eliminar--btn"><ion-icon name="close-outline" onclick="eliminaringreso(${
              ingreso.id
            })"></ion-icon>
            </button>
        </div>
    </div>
</div>`;
  return ingresohtml;
}

function eliminaringreso(id) {
  let ideliminar = ingresos.findIndex((ingreso) => ingreso.id === id);
  ingresos.splice(ideliminar, 1);
  cargarCabecero();
  cargarIngresos();
}

function cargarEgresos() {
  let egresoshtml = "";

  for (let egreso of egresos) {
    egresoshtml += crearegresoshtml(egreso);
  }

  document.getElementById("lista-egresos").innerHTML = egresoshtml;
}

function crearegresoshtml(egreso) {
  let egresohtml = ` <div class="elemento limpiarEstilos">
    <div class="elemento_descripcion">${egreso.descripcion}</div>
    <div class="derecha limpiarEstilos">
        <div class="elemento_valor">- ${formatoMoneda(egreso.valor)}</div>
        <div class="elemento_porcentaje">${formatoPorcentaje(
          egreso.valor / totalEgresos()
        )}</div>
        <div class="elemento_eliminar">
            <button class="elemento_eliminar--btn"><ion-icon name="close-outline" onclick="eliminaregreso(${
              egreso.id
            })"></ion-icon>
            </button>
        </div>
    </div>
</div>`;
  return egresohtml;
}

function eliminaregreso(id) {
  let eliminaregreso = egresos.findIndex((egreso) => egreso.id === id);
  egresos.splice(eliminaregreso, 1);
  cargarCabecero();
  cargarEgresos();
}

function agregarDato() {
  let descripcion = document.getElementById("descripcion");
  let valor = document.getElementById("valor");
  let tipo = document.getElementById("tipo");

  if (descripcion.value !== "" && valor.value !== "") {
    if (tipo.value == "ingreso") {
      ingresos.push(new Ingreso(descripcion.value, +valor.value));
      cargarCabecero();
      cargarIngresos();
    } else if (tipo.value == "egreso") {
      egresos.push(new Egreso(descripcion.value, +valor.value));
      cargarCabecero();
      cargarEgresos();
    }
  } else {
    alert("Por favor Complete todos los campos");
  }
}
