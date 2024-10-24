const tarifasBase = { 
    'blanco_negro': {
        '150-300dpi': 12.00,
        '450-900dpi': 12.60
    },
    'color': {
        '150-300dpi': 13.50,
        '450-900dpi': 14.10
    }
};

// Tarifas adicionales por cada página extra
const incrementosPorPagina = {
    'blanco_negro': {
        '150-300dpi': 2,  
        '450-900dpi': 2.6
    },
    'color': {
        '150-300dpi': 3.5,
        '450-900dpi': 4.1
    }
};

// Definir los valores de las páginas y las fotos
const paginas = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
const fotos = [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36, 39, 42, 45];


const encabezado = document.createElement('tr');
const columnas = ['Número de páginas', 'Número de fotos', 
                  'Blanco y Negro (150-300 dpi)', 'Blanco y Negro (450-900 dpi)', 
                  'Color (150-300 dpi)', 'Color (450-900 dpi)'];


function calcularCosto(tipo, resolucion, numPaginas) {
    const tarifaBase = tarifasBase[tipo][resolucion];  // Tarifa base
    const incrementoBase = incrementosPorPagina[tipo][resolucion];  // Incremento base

    let costoTotal = tarifaBase;  // Comenzar con el costo base
    let incrementosActuales = incrementoBase;  // Inicializar el incremento actual

    // Para páginas adicionales
    for (let i = 1; i <= numPaginas; i++) {
        // Verifica si la página actual es un múltiplo de 5
        if (i > 1 && paginas[i - 1] % 5 === 0) {
            incrementosActuales = Math.max(incrementosActuales - 0.2, 0); // Reducir en 0.2 pero no permitir que sea negativo
            if (i>9){
                costoTotal += 0.2;  // Reduce en 0,2 si el número de páginas es mayor a 9
            }
        }

        // Sumar el incremento actual al costo total
        if (i > 1) {
            costoTotal += incrementosActuales;  // Sumar el incremento actual solo si hay más de 1 página
        }
 
    }

    return costoTotal.toFixed(2);  // Retornar el costo total formateado
}




// Función para generar la tabla
function generarTabla() {
    const tabla = document.createElement('table');
    tabla.border = "1";  // Añadir borde a la tabla
    // Añadir encabezados a la tabla
    columnas.forEach(texto => {
        const th = document.createElement('th');
        th.appendChild(document.createTextNode(texto));
        encabezado.appendChild(th);
    });
    tabla.appendChild(encabezado);

    // Crear las filas con los datos calculados
    for (let i = 0; i < paginas.length; i++) {
        const fila = document.createElement('tr');

        // Crear y añadir celdas (Número de páginas y fotos)
        const tdPaginas = document.createElement('td');
        tdPaginas.appendChild(document.createTextNode(paginas[i]));
        fila.appendChild(tdPaginas);
        
        const tdFotos = document.createElement('td');
        tdFotos.appendChild(document.createTextNode(fotos[i]));
        fila.appendChild(tdFotos);

        // Crear y añadir las celdas calculadas para cada tipo de impresión y resolución
        const tipos = ['blanco_negro', 'color'];
        const resoluciones = ['150-300dpi', '450-900dpi'];
        
        tipos.forEach(tipo => {
            resoluciones.forEach(resolucion => {
                const td = document.createElement('td');
                const costo = calcularCosto(tipo, resolucion, paginas[i]);
                td.appendChild(document.createTextNode(`${costo} €`));
                fila.appendChild(td);
            });
        });
        
        // Añadir la fila calculada a la tabla
        tabla.appendChild(fila);
    }

    // Insertar la tabla en el contenedor de la página
    document.getElementById('tablaCostes').appendChild(tabla);
}

// Mostrar y ocultar la tabla al hacer clic en el botón
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('toggleTable').addEventListener('click', function() {
        const contenedorTabla = document.getElementById('tablaCostes');
        if (!contenedorTabla.hasChildNodes()) {
            generarTabla();  // Generar la tabla solo una vez
        }
        contenedorTabla.style.display = contenedorTabla.style.display === 'none' ? 'block' : 'none';
    });
});
