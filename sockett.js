// const fm = document.querySelector('#intro');
//     fm.addEventListener('submit', (e) => {
//       console.log("hello");
//       e.stopPropagation();
//     });


    const socket = io({
      auth: {
        serverOffset: 0
      }
    });
    const form=document.getElementById('form');
    const input=document.getElementById('input');
    const message=document.getElementById('messages');
    form.addEventListener('submit',(e)=>{
     e.preventDefault();
        if(input.value){
            socket.emit('chat message ',input.value);
            input.value='';
        }
    })
    socket.on('chat message ',(msg,serverOffset)=>{
        const item=document.createElement('li');
        item.textContent=msg;
        message.appendChild(item);
        window.scrollTo(0,document.body.scrollHeight);
      //  socket.auth.serverOffset=serverOffset;
    })

    
    
  