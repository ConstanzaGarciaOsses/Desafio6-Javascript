let ArrUnidadesMedidaFiltrado = [];

// Aqui llamamos a la API: 
async function getMonedas(){
    try{
    const res = await fetch("https://mindicador.cl/api")
    const data = await res.json()
    return data;
    }catch (error){
    throw new  Error("Errores con la API");
    }
    }

   document.addEventListener("DOMContentLoaded", function(){
   async function crearSelectMonedas(){
    try{
        const data = await getMonedas();
        
        const ArrUnidadesMedida = Object.values(data).map((obj) => {
                return {
                    moneda: obj.nombre,
                    valor: obj.valor,
                    fecha: obj.fecha,
                }
        });

       // Filtramos los elementos no definidos 
       ArrUnidadesMedidaFiltrado  = ArrUnidadesMedida.filter((element) => {
        return element.moneda !== undefined && 
        element.valor !== undefined && 
        element.fecha !== undefined;
        });

      const selectMoneda = document.getElementById("Moneda");
      selectMoneda.innerHTML = "";

      const defaultOption = document.createElement("option");
      defaultOption.value = "select";
      defaultOption.text = "Selecciona la moneda";
      selectMoneda.appendChild(defaultOption);

      ArrUnidadesMedidaFiltrado.forEach((element) => {
        const option = document.createElement("option");
        option.value = element.moneda;
        option.text = element.moneda;
        selectMoneda.appendChild(option);
      });

    }catch{

    }
   }

   crearSelectMonedas();
});

async function ConversorDeMonedas(){
    const cantidadInput = document.getElementById('Cantidad');
    const selectInput = document.getElementById('Moneda').value;

    const cantidad = parseFloat(cantidadInput.value);

    if(!cantidad){
        alert("Seleccione la cantidad");
        return;
    }

    if(selectInput === 'select'){
        alert("Seleccione la moneda");
    }

    if(cantidad <= 0){
        alert("Debe escoger un numero mayor que 0.");
    }

    try{

    const ArrValorMoneda = ArrUnidadesMedidaFiltrado.map(element => {
        return {
            moneda : element.moneda,
            valor: element.valor,
        }
    });

    const EncuentroMoneda = ArrValorMoneda.find(objeto => objeto.moneda === selectInput);

    if (EncuentroMoneda) {
        const valorSeleccionado = EncuentroMoneda.valor;
        const calculado = cantidad / valorSeleccionado
        const calculado2TF = calculado.toFixed(2);

        document.getElementById("Resultado").innerHTML = "El valor convertido corresponde a un total de " + calculado2TF + " " + EncuentroMoneda.moneda;
    } else {

    }

    }catch (error){
        console.log();
     throw new  Error("Error al convertir la mondeda");
    } 
}

window.onload = function() {
    const cantidadInput = document.getElementById("Cantidad");
    cantidadInput.value = ""; 
};