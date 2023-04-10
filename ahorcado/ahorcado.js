const palabrAdivinar = ingresarPalabra();
   let arrCoincidencias = []; // esto es para corregir!
   let intentos = 0; // contador de intentos
   let intentosf=0;//contador intentos fallidos
   const imagenes = [
    "img/1.PNG",
    "img/2.PNG",
    "img/3.PNG",
    "img/4.PNG",
    "img/5.PNG",
    "img/6.PNG",
    
  ];
  let indiceImagenActual = 0;
  
   
   const letra = document.querySelector("input");
   letra.oninput = function () {
     soloLetras(letra.value, palabrAdivinar);
   };
   
   function validarPalabra(palabra) {
     const pattern = /^[a-zA-Z]+$/;
     return pattern.test(palabra);
   }
   
   function ingresarPalabra() {
     let palabra = "";
     while (!validarPalabra(palabra)) {
       palabra = prompt("Ingresa una palabra para adivinar!");
     }
     const arrPalabra = palabra.split("");
     console.log(arrPalabra);
     document.getElementById("tablero").innerHTML = `
       <table border="1">
           <tr>
               ${creaTablero(arrPalabra)}    
           </tr>    
       </table>
     `;
     return arrPalabra;
   }
   
   
   function creaTablero(arrPalabra) {
     let tablero = "";
     arrPalabra.forEach((letra) => {
       tablero = tablero + "<td> ? </td>";
     });
     return tablero;
   }
   
   function soloLetras(cadena, palabrAdivinar) {
    const pattern = new RegExp("[a-zA-Z]");
    console.log(pattern.test(cadena));
    if (!pattern.test(cadena)) {
      document.querySelector("input").value = "";
      document.getElementById("status").innerHTML =
        "Solo puedes ingresar letras!!!..";
      return false;
    } else {
       // incrementar el contador de intentos
       intentos++;
      if (intentosf == 6) { // si se supera el límite de intentos
        document.getElementById("status").innerHTML = "Perdiste :(";
          letra.disabled = true; // deshabilitar el campo de entrada
          return false;
      } 
      else {
        document.getElementById("tablero").innerHTML = `
          <table border="1">
              <tr>
                  ${buscarCoincidencia(cadena, palabrAdivinar)}    
              </tr>    
          </table>
        `;
        return true;
      }
    }
  }
  
  
   
   function buscarCoincidencia(letra, arrPalabra) {
    let tablero = "";
    let coincidencias = 0;

    arrPalabra.forEach((caracter, index) => {
      if (caracter == letra) {
        tablero = tablero + "<td>" + caracter + " </td>";
        coincidencias = coincidencias + 1;
        arrCoincidencias[index] = letra; // actualizar el arreglo de coincidencias
      } else if (arrCoincidencias[index]) {
        // si ya se adivinó la letra en un intento anterior, mostrarla
        tablero = tablero + "<td>" + arrCoincidencias[index] + " </td>";
      } else {
        
        tablero = tablero + "<td> ? </td>";
      }
    });
    if (coincidencias > 0) {
    // Verificar si se adivinó la palabra completa
    if (arrCoincidencias.join("") == arrPalabra.join("")) {
      document.getElementById("status").innerHTML = `GANASTE en ${intentos} intentos`;

    }
     else {
      leyendaCoincidencia(coincidencias);
    }
} else {
    document.getElementById("status").innerHTML = `No hubo coincidencias en el intento ${intentos} :(`;
    mostrarSiguienteImagen();
  }
    return tablero;
  }
  
   function leyendaCoincidencia(coincidencias) {
     if (coincidencias > 0) {
       document.getElementById(
         "status"
       ).innerHTML = `Hubo ${coincidencias} coincidencia en el intento ${intentos}!!!`;
     } else {
       document.getElementById("status").innerHTML = `No hubo coinciencias en el intento ${intentos} :(`;
     }
   }

   function mostrarSiguienteImagen() {
    const imagen = document.getElementById("imagen");
    imagen.src = imagenes[indiceImagenActual];
    indiceImagenActual++;
    intentosf++;
    if (indiceImagenActual >= imagenes.length) {
      indiceImagenActual = 0;
      
    }
  }

  
  