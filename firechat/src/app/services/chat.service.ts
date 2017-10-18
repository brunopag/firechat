import { Injectable } from '@angular/core';
//import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Mensaje } from '../interfaces/mensaje.interface';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class ChatService {
  //private itemsCollection: AngularFirestoreCollection<Mensaje>;
  chats: Observable<Mensaje[]>;

  usuario:any = null;

  constructor(private db: AngularFireDatabase, public afAuth: AngularFireAuth) {
        if(localStorage.getItem('usuario')){
          this.usuario = JSON.parse(localStorage.getItem('usuario'))
        }
      }

  cargarMensajes(){
    this.chats = this.db.list('/chats', ref => ref.limitToLast(10)).valueChanges();
    //this.chats = db.list('/chats', ref => ref.orderByChild('mensaje').equalTo('Hola')).valueChanges();
    return this.chats;
  }

  agregarMensaje(texto:string){
    let mensaje:Mensaje = {
      nombre: this.usuario.displayName,
      mensaje: texto,
      uid: this.usuario.uid
    };

    return this.db.list('chats').push(mensaje);
  }

  login(proveedor:string) {
    let provider:any;

    if(proveedor == 'google'){
      provider = new firebase.auth.GoogleAuthProvider();
    }else{
      provider = new firebase.auth.TwitterAuthProvider();
    }

    this.afAuth.auth.signInWithPopup( provider )
    .then(res => {
                  this.usuario = res.user;
                  localStorage.setItem('usuario', JSON.stringify(this.usuario))
                });
  }

  logout() {
    localStorage.removeItem('usuario');
    this.usuario = null;
    this.afAuth.auth.signOut();
  }

}
