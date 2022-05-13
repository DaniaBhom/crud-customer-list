import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';

import { ElementDialogComponent } from 'src/app/shared/element-dialog/element-dialog.component';
import { CadastroClientes } from './../../models/CadastroClientes';

const ELEMENT_DATA: CadastroClientes[] = [
  {id: 1, name: 'Dylan Williams', email: 'dylanwilliams@gmail.com', wathsapp: '+1 (347) 971-2211'},
  {id: 2, name: 'Audrey Miller', email: 'audreymiller@gmail.com', wathsapp: '+1 (347) 9971-2222'},
  {id: 3, name: 'James Anderson', email: 'jamesanderson@gmail.com', wathsapp: '+1 (862) 9971-2233'},
  {id: 4, name: 'Thomas Clark', email: 'thomasclark@gmail.com', wathsapp: '+1 (347) 9971-2244'},
  {id: 5, name: 'Jimmy Thompson', email: 'jimmythompson@gmail.com', wathsapp: '+1 (347) 9971-2255'},
  {id: 6, name: 'Matthew Scott', email: 'matthewscott@gmail.com', wathsapp: '+1 (862) 9971-2266'},
  {id: 7, name: 'Bridget Faria', email: 'bridgetfaria@gmail.com', wathsapp: '+1 (912) 9971-2277'},
  {id: 8, name: 'Hope Medeiros', email: 'hopemedeiros@gmail.com', wathsapp: '+1 (347) 9971-2288'},
  {id: 9, name: 'Bruce Edwards', email: 'bruceedwards@gmail.com', wathsapp: '+1 (912) 9971-2299'},
  {id: 10, name: 'Jill Baker', email: 'jillbaker@gmail.com', wathsapp: '+1 (347) 9971-2200'},
];


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  })

export class HomeComponent implements OnInit {
  @ViewChild(MatTable)
  table!: MatTable<any>;
  displayedColumns: string[] = ['id', 'name', 'email', 'wathsapp', 'actions'];
  dataSource = ELEMENT_DATA;

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
  }

  openDialog(element: CadastroClientes | null): void {
    const dialogRef = this.dialog.open(ElementDialogComponent, {
      width: '250px',
      data: element === null ? {
        id: null,
        name: '',
        email: '',
        wathsapp: null
      } : {
        id: element.id,
        name: element.name,
        email: element.email,
        wathsapp: element.wathsapp
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result !== undefined) {
        if (this.dataSource.map(p => p.id).includes(result.id)) {
          this.dataSource[result.id - 1] = result;
          this.table.renderRows();
        } else {
        this.dataSource.push(result);
        this.table.renderRows();
        }
      }
    });
  }

  editElement(element: CadastroClientes): void {
  this.openDialog(element);
  }

  deleteElement(id: number): void {
    this.dataSource = this.dataSource.filter(p => p.id !== id);
  }
}


