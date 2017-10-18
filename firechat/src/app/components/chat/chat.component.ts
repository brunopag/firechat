import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html'
})
export class ChatComponent implements OnInit {

  mensaje:string = "";
  elemento:any;

  constructor(public _chatService:ChatService) {
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
    this._chatService.agregarMensaje(this.mensaje)
                      .then( ()=> console.log("hecho") );

    this.mensaje = "";

  }

}
