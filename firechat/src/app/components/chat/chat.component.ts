import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html'
})
export class ChatComponent implements OnInit {

  // el mensaje es modificado en la "vista" (el html del componente)
  mensaje:string = "";
  elemento:any;

  constructor(public _chatService:ChatService) {
    // cargarMensajes devuelve un observable al que se subscribe para que se ejecute cada vez qe haya un cambio.
    this._chatService.cargarMensajes().subscribe(() => {
      console.log("Mensajes cargados");
    })
  }

  ngOnInit() {
  }

  enviar(){
    if(this.mensaje.length == 0){
      return;
    }
    // se envia el mensaje al servicio para que lo agregue a firebase.
    this._chatService.agregarMensaje(this.mensaje)
                      .then( ()=> console.log("hecho") );

    this.mensaje = "";

  }

}
