const url = 'http://localhost:3000/productos/panaderia';

//Mostrar Productos de BD
const contenedor = document.getElementById('data')
let resultado = ''
let opcion = 'nuevo'
let cantidad_cat = 6; //cant prod en cat. momentaneo
sql1 = 'SELECT COUNT(*) FROM productos WHERE Id_cat="2";' //X

const Carga_Datos = (datos) => {

    for(let i=0; i < cantidad_cat; i++){
        resultado += `
        <div class="col mb-4">
        <div class="card" style="width: 18rem;color: aliceblue; background-color: rgb(236, 143, 20);">
            <img src="${datos[i].Imagen}" width="100px" height="300px" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${datos[i].Precio} Bs.</h5>
              <p class="card-text">${datos[i].Nombre}</p>
              <input type="button" class="btn btn-outline-light" onclick="ConfirmDemo();" value="Comprar"/>
            </div>
        </div>
    </div>
    `


    }
    contenedor.innerHTML = resultado
}

fetch(url)
    .then(response => response.json())
    .then(data => {
        //console.log(data)
        Carga_Datos(data)
    })
    .catch(error => console.log(error))



const on = (element, event, selector, handler) => {
    element.addEventListener(event, e => {
        if(e.target.closest(selector)){
            handler(e)
        }
    })
}

//Procedimiento Borrar
on(document, 'click', '.btnEliminar', e => {
    console.log('BORRADO')
    let mensaje = ''
    const fila = e.target.parentNode.parentNode
    const codigo = fila.firstElementChild.innerHTML
    fetch(url+'/'+codigo, { method: 'DELETE' })
        .then( response => {
            response.json()
            console.log(response.json())
            mensaje=response.json()
        } )
        .then( ()=> location.reload())
    console.log(mensaje)
})

//Procedimiento adicion y modificacion
frmData.addEventListener('submit', (e) => {
    e.preventDefault()
    if(opcion=='nuevo'){
        console.log('OPCION Nuevo')
        fetch(url,{
            method:'POST',
            headers:{'Content-type':'application/json'},
            body: JSON.stringify(
                {   id_persona:id_persona.value,
                    fechaoper:fechaoper.value,
                    usuario:usuario.value
                }             
            )        
        })
        .then( response => response.json())
        .then( data => {
            const nuevo_dato =[]
            nuevo_dato.push(data)            
            //Carga_Datos(nuevo_producto)
        })
        .then( ()=> location.reload())
    }
    if(opcion=='editar'){    
        console.log('OPCION EDITAR')
        console.log(url+'/'+codigo)
        fetch(url+'/'+codigo,{
            method: 'PUT',
            headers: {'Content-Type':'application/json' },
            body: JSON.stringify({
                id_persona:id_persona.value,
                fechaoper:fechaoper.value,
                usuario:usuario.value
            })
        })
        .then( response => response.json() )
        //.then( response => location.reload() )
        .then( data => {
            const modi_dato=[]
            modi_dato.push(data)
           // Carga_Productos(modi_producto)
        })
        .then( ()=> location.reload())
        //.catch(error => console.log(error))
    }
})

//Procedimiento Editar
let codigo = 0
on(document, 'click', '.btnEditar', e => {    
    const fila = e.target.parentNode.parentNode
    // console.log(fila.children[0].innerHTML)
    // console.log('Modificacion') 
    codigo = fila.children[0].innerHTML   
    const id_personaForm = fila.children[1].innerHTML
    const fechaoperForm = fila.children[2].innerHTML
    const usuarioForm = fila.children[3].innerHTML
    console.log(usuarioForm)
    id_persona.value =  id_personaForm
    fechaoper.value =  fechaoperForm
    usuario.value =  usuarioForm
    opcion = 'editar'     
})