import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore'
import { Board, Task } from './board.model';
import firebase from "firebase/compat/app";
import FieldValue = firebase.firestore.FieldValue;
import { switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  /**
   * Creates a new board for the current user
   * @param data data for board
   */
  async createBoard(data: Board){
    const user = await this.afAuth.currentUser;
    return this.db.collection('boards').add({
      ...data,
      uid: user?.uid,
      tasks: [{ description: 'Hello!', label: 'yellow'}],
    });
  }

  /**
   * Delete board
   * @param boardId board-id
   */
  deleteBoard(boardId: string){
    return this.db.collection('boards')
            .doc(boardId)
            .delete()
  }

  /**
   * Update the tasks on board
   * @param boardId board-id
   * @param tasks list of tasks
   */
  updateTasks(boardId: string, tasks: Task[]){
    return this.db.collection('boards')
            .doc(boardId)
            .update({ tasks })
  }

  /**
   * Remove a specific task from the board
   * @param boardId board-id
   * @param task task to remove
   */
  removeTask(boardId: string, task: Task) {
    return this.db.collection('boards')
            .doc(boardId)
            .update({ tasks: FieldValue.arrayRemove(task) })
  }

  /**
   * Get all boards owned by current user
   * @returns boards order by priority
   */
  getUserBoards() {
    return this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.db
          .collection<Board>('boards', ref => 
            ref?.where('uid', '==', user?.uid).orderBy('priority')
          )
          .valueChanges({ idField: 'id' })
        } else {
          return [];
        }
      })
    )
  }

  /**
   * Run a batch write to change the priority of each board for sorting
   * @param boards list of boards
   */
  sortBoards(boards: Board[]) {
    const db = firebase.firestore();
    const batch = db.batch();
    const refs = boards.map(b => db.collection('boards').doc(b.id));
    refs.forEach((ref, idx) => batch.update(ref, { priority: idx }));
    batch.commit();
  }

  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore) { }
}