
// Variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

// Listeners
cargarEventListeners()

function cargarEventListeners() {
    // Acá agrega un curso presionando "Agregar al carrito"
    listaCursos.addEventListener('click', agregarCurso);

    // elimina curso del carrito
    carrito.addEventListener('click', eliminarCurso)

    // Vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = []; // reseteamos el arreglo

        limpiarHTML(); // Eliminamos todo el HTML del carrito
    })
   
}

// Functions Here //
// Función que añade el curso al carrito
function agregarCurso(e) {
    e.preventDefault();
    
     // Delegation para agregar-carrito
    if(e.target.classList.contains('agregar-carrito')) {
        const cursoSelecionado = e.target.parentElement.parentElement;
          // Enviamos el curso seleccionado para tomar sus datos
        leerDatosCurso(cursoSelecionado)
    }
}

// Elimina curso del carrito

function eliminarCurso(e) {
    console.log('borrando curso');
    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id');
        // Elimina del arreglo de articulosCarrito por el data-id
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId )
        carritoHTML(); // Iterar sobre el carrito y mostrar su HTML
    }
   
}


// Lee los datos del curso
function leerDatosCurso(curso) {
     
    // crea un objeto con el contenido del curso
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    // Revisa si un elemento ya existe en el carrito
    const existe = articulosCarrito.some( curso => curso.id === infoCurso.id)
    if(existe) {
        // Actualizamos la cantidad
        const cursos = articulosCarrito.map( curso => {
            if( curso.id === infoCurso.id ) {
                curso.cantidad++
                return curso; // Retorna el objeto actualizado
            }else{
                return curso; // retorna los objetos que no son los duplicados
            }
        })
        articulosCarrito = [...cursos]
    } else {
        // Agregamos el curso al carrito
        articulosCarrito = [...articulosCarrito, infoCurso];
    }

    console.log(articulosCarrito);

    carritoHTML();

}



// Muestra el curso seleccionado en el Carrito
function carritoHTML() {

    // limpiar el HTML
        limpiarHTML();
    // Recorre el carrito y genera el HTML
    articulosCarrito.forEach( curso => {
        const {imagen, titulo, precio, cantidad, id} = curso;
        const row = document.createElement('tr');
        row.innerHTML = ` 
            <td>
                ${titulo}
            </td>
            <td>
                <img src='${imagen}' width=100>
            </td>
            <td>
                ${precio}
            </td>
            <td>
                ${cantidad}
            </td>
            <td>
                <a href="#" class="borrar-curso" data-id="${id}">X</a>
            </td>
        `;
        // agrega el HTML del carrito en el tbody
        contenedorCarrito.appendChild(row);
    });

} 
    // Elimina los cursos del tbody
    function limpiarHTML() {
        // Forma lenta
        // contenedorCarrito.innerHTML = '';

        while( contenedorCarrito.firstChild) {
            contenedorCarrito.removeChild(contenedorCarrito.firstChild)
        }
    }

















/* const agregarCarrito = document.querySelector('.agregar-carrito');
let itemToCarr = document.querySelector('#lista-carrito tbody');

agregarCarrito.addEventListener('click', () => {
    // const newP = document.createElement('P');
    // newP.textContent = 'Nuevo producto'
    // itemToCarr.appendChild(newP)
    // itemToCarr.appendChild document.createElement('TH')
    itemToCarr.appendChild(addItem(0))
})

function addItem(i) {
    // const trItem = document.createElement('TR');
    const thItem = document.createElement('TH');        
    // itemToCarr.appendChild(trItem)
    thItem.append(document.querySelector('.card').children[i])

}


console.log(addItem(0));
// console.log(document.querySelector('.card').children);
// console.log(document.querySelector('.card').children[0]);

// addItem(0)
// console.log(document.querySelector('.card')); */
