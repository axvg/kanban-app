import { Component, Input } from '@angular/core';
import { Board } from '../board.model';
import { BoardService } from '../board.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent {
  @Input() board!: Board;

  taskDrop(event: any) {
    moveItemInArray(this.board.tasks!, event.previousIndex, event.currentIndex);
    this.boardService.updateTasks(this.board.id!, this.board.tasks!)
  }

  constructor(private boardService: BoardService) {}
}
