import { Component} from '@angular/core';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {

  constructor(private _chatService:ChatService) { }

  ingresar(proveedor:string){
    this._chatService.login(proveedor);
  }

}
