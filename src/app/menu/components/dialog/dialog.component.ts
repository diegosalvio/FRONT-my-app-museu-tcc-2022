import { Component, Inject, Input, OnInit } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { HeaderComponent } from '../header/header.component';

export interface DialogData {
  title: string
  body: string
  action: string
}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  title: string | undefined
  body: string | undefined
  action: string | undefined


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  ngOnInit(): void {
    this.title = this.data.title
    this.body = this.data.body
    this.action = this.data.action
  }

}
