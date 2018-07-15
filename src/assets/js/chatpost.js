//Me gusta y contador publicacion
let contadorPublicacion = [];
const heart = document.querySelector('i');
heart.addEventListener('click', ()=> {
  if (heart.classList.toggle('blue')){
    contadorPublicacion++;
  }else{
    contadorPublicacion--;
  }
  return contador.innerHTML = contadorPublicacion;
})  


//Crear nuevo comentario, me gusta, eliminar
const boton = document.getElementById('btn');
boton.addEventListener('click', () => {
    let comments = document.getElementById('comment').value;
    document.getElementById('comment').value = '';
    const cont = document.getElementById('cont');
    const newComments = document.createElement('div');

    //Para que aparezca si o si comentario
    if(comments.length === 0 || comments === null){
      alert ('Debes ingresar un mensaje');
      return false;
    }
    
    //corazon
    const heart = document.createElement('i');
    const contadorheart = document.createElement('span');
    heart.appendChild(contadorheart);
    heart.classList.add('fa', 'fa-heart', 'heart');
    //evento click corazon
    let contadorComentario = [];
    heart.addEventListener('click', ()=> {
      if (heart.classList.toggle('red')){
        contadorComentario++;
      }else{
        contadorComentario--;
      }
      return contadorheart.innerHTML = contadorComentario;
    })

    //Editar
    const edit = document.createElement('i');
    edit.classList.add('fas', 'fa-pencil-alt');
    //Evento click editar
    edit.addEventListener('click', ()=> {
      contenedorElemento.contentEditable = true;
      contenedorElemento.addEventListener('keydown', (event)=> {
        if (event.which == 13){
          let confirmarEditar = confirm('¿Estas seguro que quieres modificar tu comentario?');
          if (confirmarEditar == true) {
            contenedorElemento.removeAttribute('contentEditable');
          } else {

          }
        }
      })
    })
    
    //Basura
    const trash = document.createElement('i');
    trash.classList.add('fa', 'fa-trash', 'trash');
    //Evento click basura
    trash.addEventListener('click', ()=> {
        let confirmarEliminar = confirm('¿Estas seguro de eliminar?');
      if (confirmarEliminar == true) {
        cont.removeChild(newComments);
      }
    })

    //Crear p nuevo con comentario
    const contenedorElemento = document.createElement('p');
    let textNewComment = document.createTextNode(comments);
    contenedorElemento.appendChild(textNewComment);
    newComments.appendChild(heart);
    newComments.appendChild(edit);
    newComments.appendChild(trash);
    newComments.appendChild(contenedorElemento);
    cont.appendChild(newComments);
})