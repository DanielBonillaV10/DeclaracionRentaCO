document.addEventListener('DOMContentLoaded', function (){

    const valorUVT_Ano = 47065 ;

    const inputs = [
        'bienes_inmuebles',
        'inversiones_financieras',
        'ingresos_generados',
        'participacion_establecimientos'
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
    
        const limitebienesinmuebles = 1000000;
        const limiteinversionesfinancieras = 59377000;
        const limiteingresosgenerados = 100000000;
        const limiteparticipacion_establecimientos = 300000000;

        const bienesinmuebles = parseFloat(document.getElementById("bienes_inmuebles").value);
        const inversionesfinancieras = parseFloat(document.getElementById("inversiones_financieras").value);
        const ingresosgenerados = parseFloat(document.getElementById("ingresos_generados").value);
        const participacionestablecimientos = parseFloat(document.getElementById("participacion_establecimientos").value);
    
        let mensaje = '';
    
        if (bienesinmuebles > limitebienesinmuebles) {
          mensaje += '\nLos bienes inmuebles excede lo establecido por la Dian con limite de 10.000.000 COP\n';
        }
        if (inversionesfinancieras > limiteinversionesfinancieras) {
          mensaje += '\nLas inversiones Financieras exceden lo establecido por la Dian con limite de 59.377.000 COP\n';
        }
        if (ingresosgenerados > limiteingresosgenerados) {
          mensaje += '\nLos ingresos generados exceden lo establecido por la Dian con limite de 100,000,000 COP\n';
        }
        if (participacionestablecimientos > limiteparticipacion_establecimientos) {
          mensaje += '\nEl Valor de las participaciones en establecimientos Totales excede lo establecido por la Dian con limite de 300,000,000 COP\n';
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
    