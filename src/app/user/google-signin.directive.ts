import { Directive, HostListener } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from 'firebase/auth';

@Directive({
  selector: '[appGoogleSignin]'
})
export class GoogleSigninDirective {

  @HostListener('click')
  onClick(){
    this.afAuth.signInWithPopup(new GoogleAuthProvider())
  }

  constructor(private afAuth: AngularFireAuth) { }
}
