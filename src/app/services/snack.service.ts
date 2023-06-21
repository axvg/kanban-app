import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SnackService {
  authError(){
    this.snackBar.open('you must be logged in!', 'OK', {
      duration: 5000,
    })

    return this.snackBar._openedSnackBarRef
    ?.onAction()
    .pipe(
      tap(_ => this.router.navigate(['/login']))
    )
    .subscribe();
  }

  constructor(private snackBar: MatSnackBar, private router: Router) { }
}
