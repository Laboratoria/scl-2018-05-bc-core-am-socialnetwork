    //corazon
    const heart = document.createElement('i');
    heart.classList.add('fa', 'fa-heart', 'heart');
    //evento click corazon
    heart.addEventListener('click', ()=> {
      heart.classList.toggle('red');
    })
    
    //Basura
    const trash = document.createElement('i');
    trash.classList.add('fa', 'fa-trash', 'trash');
    //Evento click basura
    trash.addEventListener('click', ()=> {
      cont.removeChild(newComments);
    })

const boton = document.getElementById('btn');
boton.addEventListener('click', () => { /*Es igual a function ()*/
    let comments = document.getElementById('comment').value;
    document.getElementById('comment').value = '';
    const cont = document.getElementById('cont');
    const newComments = document.createElement('div');
    
    //corazon
    const heart = document.createElement('i');
    heart.classList.add('fa', 'fa-heart', 'heart');
    //evento click corazon
    heart.addEventListener('click', ()=> {
      heart.classList.toggle('red');
    })
    
    //Basura
    const trash = document.createElement('i');
    trash.classList.add('fa', 'fa-trash', 'trash');
    //Evento click basura
    trash.addEventListener('click', ()=> {
      cont.removeChild(newComments);
      if (confirm('Estas seguro de eliminar')) {
          
      }
      else
      {
          return false;
      }
    })
    


    //Crear p nuevo con comentario
    const contenedorElemento = document.createElement('p');
    let textNewComment = document.createTextNode(comments);
    contenedorElemento.appendChild(textNewComment);
    newComments.appendChild(heart);
    newComments.appendChild(trash);
    newComments.appendChild(contenedorElemento);
    cont.appendChild(newComments);

    heart.addEventListener('click', () => {
        heart.classList.toggle('red');
    })
    trash.addEventListener('click', () => {
        cont.removeChild(newComments);
    })
    chck.addEventListener('click', () => {
        contenedorElemento.classList.toggle('strike-out');//linea horizontal sobre el texto
    })
}) 