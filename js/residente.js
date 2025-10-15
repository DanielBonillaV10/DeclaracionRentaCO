document.addEventListener('DOMContentLoaded', function () {

  const valorUVT_Ano = 47065 ;

  const inputs = [
    'patrimonio_bruto',
    'ingresos_brutos',
    'consumos_tarjeta',
    'compras_consumos_totales',
    'consignaciones_bancarias'
  ];

  inputs.forEach(function (input) {
    const inputElement = document.getElementById(input);
    const conversionElement = document.getElementById(`${input}_conversion`);

    inputElement.addEventListener('input', function () {
      const value = parseFloat(inputElement.value);
      if (!isNaN(value)) {
        
        const uvts = (value / valorUVT_Ano).toFixed(2);
        conversionElement.textContent = `UVT: ${uvts}`;
      } else {
        conversionElement.textContent = '';
      }
    });
  });

  document.getElementById("datosFormulario").addEventListener("submit", function (event) {
    event.preventDefault();

    const limitePatrimonioBruto = 190854000;
    const limiteIngresosBrutos = 59376800;
    const limiteConsumosTarjeta = 59377000;
    const limiteComprasConsumosTotales = 59377000;
    const limiteConsignacionesBancarias = 59377000;

    const patrimonioBruto = parseFloat(document.getElementById("patrimonio_bruto").value);
    const ingresosBrutos = parseFloat(document.getElementById("ingresos_brutos").value);
    const consumosTarjeta = parseFloat(document.getElementById("consumos_tarjeta").value);
    const comprasConsumosTotales = parseFloat(document.getElementById("compras_consumos_totales").value);
    const consignacionesBancarias = parseFloat(document.getElementById("consignaciones_bancarias").value);

    let mensaje = '';

    if (patrimonioBruto > limitePatrimonioBruto) {
      mensaje += '\nEl Patrimonio Bruto excede lo establecido por la Dian con limite de 190.854.000 COP\n';
    }
    if (ingresosBrutos > limiteIngresosBrutos) {
      mensaje += '\nLos Ingresos Brutos exceden lo establecido por la Dian con limite de 59.376.800 COP\n';
    }
    if (consumosTarjeta > limiteConsumosTarjeta) {
      mensaje += '\nLos Consumos con Tarjeta de Crédito exceden lo establecido por la Dian con limite de 59.377.000 COP\n';
    }
    if (comprasConsumosTotales > limiteComprasConsumosTotales) {
      mensaje += '\nEl Valor de Compras y Consumos Totales excede lo establecido por la Dian con limite de 59.377.000 COP\n';
    }
    if (consignacionesBancarias > limiteConsignacionesBancarias) {
      mensaje += '\nEl Valor de Consignaciones Bancarias excede lo establecido por la Dian con limite de 59.377.000 COP\n';
    }

    if (mensaje) {
      Swal.fire({
        title: "Tiene que declarar renta",
        text: mensaje,
        icon: "warning",
        confirmButtonText: "Ok",
      });
    } else {
      Swal.fire({
        title: "No tiene que declara renta",
        text: "No se excedió en ningún limite establecido por la Dian",
        icon: "info"
      });
    }
  });
});
