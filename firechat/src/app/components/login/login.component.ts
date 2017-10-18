import { Component} from '@angular/core';
//se importa el servicio ya que va a utilizarse
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {

  constructor(private _chatService:ChatService) { }

  ingresar(proveedor:string){
    // se llama al servicio con el proveedor (twitter o google)
    this._chatService.login(proveedor);
  }

}
