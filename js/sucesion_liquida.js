document.addEventListener('DOMContentLoaded', function () {

    const valorUVT_Ano = 47065 ;
  
    const inputs = [
      'bienes_inmuebles',
      'inversiones_financieras',
      'bienes_inversiones',
      'compras_consumos_totales'
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
  
      const limitePatrimonioBruto = 211792500;
      const limiteIngresosBrutos = 65891000;
      const limiteConsumosTarjeta = 65891000;
      const limiteComprasConsumosTotales = 65891000;
  
  
      const patrimonioBruto = parseFloat(document.getElementById("bienes_inmuebles").value);
      const ingresosBrutos = parseFloat(document.getElementById("inversiones_financieras").value);
      const consumosTarjeta = parseFloat(document.getElementById("bienes_inversiones").value);
      const comprasConsumosTotales = parseFloat(document.getElementById("compras_consumos_totales").value);
      
      let mensaje = '';
  
      if (patrimonioBruto > limitePatrimonioBruto) {
        mensaje += '\n El total de los bienes inmuebles exceden lo establecido por la Dian con limite de 211.792.500 COP\n';
      }
      if (ingresosBrutos > limiteIngresosBrutos) {
        mensaje += '\nEl total de inversiones financieras exceden lo establecido por la Dian con limite de 65.891.000 COP\n';
      }
      if (consumosTarjeta > limiteConsumosTarjeta) {
        mensaje += '\nLos bienes inversiones exceden lo establecido por la Dian con limite de 65.891.000 COP\n';
      }
      if (comprasConsumosTotales > limiteComprasConsumosTotales) {
        mensaje += '\nlas ganancias ocasionales generadas por la venta de bienes o activos Totales excede lo establecido por la Dian con limite de 65.891.000 COP\n';
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
          title: "No tiene que declarar renta",
          text: "No se excedió en ningún limite establecido por la Dian",
          icon: "info"
        });
  
      }
    });
  });
  