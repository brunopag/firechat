import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Mensaje } from '../interfaces/mensaje.interface';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

//Importacion para usar Firestore
//import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

@Injectable()
export class ChatService {
  //private itemsCollection: AngularFirestoreCollection<Mensaje>;
  chats: Observable<Mensaje[]>;

  usuario:any = null;

  constructor(private db: AngularFireDatabase, public afAuth: AngularFireAuth) {
    // Si el usuario esta guardado en el localStorage, lo obtengo y lo guardo en la variable usuario despues de convertirlo de JSON a objeto
        if(localStorage.getItem('usuario')){
          this.usuario = JSON.parse(localStorage.getItem('usuario'))
        }
      }

  cargarMensajes(){
    // Consulta para obtener los ultimos 10 mensajes dentro de Chat, valueChanges() hace que este observando cambios
    this.chats = this.db.list('/chats', ref => ref.limitToLast(10)).valueChanges();
    // Ejemplo de como filtrar un campo, en este ejemplo filtra los mensajes iguales a Hola
    //this.chats = db.list('/chats', ref => ref.orderByChild('mensaje').equalTo('Hola')).valueChanges();
    return this.chats;
  }

  agregarMensaje(texto:string){
    let mensaje:Mensaje = {
      //La data displayName y uid vienen del objeto usuario del fireAuth
      nombre: this.usuario.displayName,
      mensaje: texto,
      uid: this.usuario.uid
    };
    //Metodo push para agregar el objeto mensaje a chats
    return this.db.list('chats').push(mensaje);
  }

  login(proveedor:string) {
    let provider:any;

    if(proveedor == 'google'){
      provider = new firebase.auth.GoogleAuthProvider();
    }else{
      provider = new firebase.auth.TwitterAuthProvider();
    }

    // signInWithPopup devuelve una promesa, que a traves de then se puede acceder a la respuesta
    this.afAuth.auth.signInWithPopup( provider )
    .then(res => {
                  // guardo el usuario en la variable
                  this.usuario = res.user;
                  // guardo la vatiable en el localStorage convirtiendola en JSON
                  localStorage.setItem('usuario', JSON.stringify(this.usuario))
                });
  }

  logout() {
    // borro el usuario del localStorage
    localStorage.removeItem('usuario');
    // borro la variable usuario
    this.usuario = null;
    // signOut del firebase Auth
    this.afAuth.auth.signOut();
  }

}
