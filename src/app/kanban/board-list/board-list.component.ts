import { Component } from '@angular/core';
import { Board } from '../board.model';
import { Subscription } from 'rxjs';
import { BoardService } from '../board.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-board-list',
  templateUrl: './board-list.component.html',
  styleUrls: ['./board-list.component.scss']
})
export class BoardListComponent {
  boards!: Board[];
  sub?: Subscription;

  ngOnInit(){
    this.sub = this.boardService
                .getUserBoards()
                .subscribe(boards => (this.boards = boards));
  }

  ngOnDestroy(){
    this.sub?.unsubscribe();
  }

  drop(event: CdkDragDrop<string[]>){
    moveItemInArray(this.boards!, event.previousIndex, event.currentIndex);
    this.boardService.sortBoards(this.boards!);
  }

  constructor(public boardService: BoardService) {}
}
