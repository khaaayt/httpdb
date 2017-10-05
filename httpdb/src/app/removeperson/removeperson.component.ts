import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { DbService } from '../services/db.service';
import { NgForm } from '@angular/forms';
import { IPerson } from '../interfaces/iperson';

import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Component({
  selector: 'app-removeperson',
  templateUrl: './removeperson.component.html',
  styleUrls: ['./removeperson.component.css']
})
export class RemovepersonComponent implements OnInit {
  @Output() modifyClicked = new EventEmitter<any>();
  baseURL = 'https://katepearl-10f61.firebaseio.com/';
  rootNode = 'people';
  peopleCollection: Array<IPerson> = [];
  refID: any;

  fname: string;
  lname: string;

  person: object;
  constructor(private dbService: DbService) { }

  ngOnInit() {
    this.loadData();
  }
    loadData() { 
     this.dbService.getAllData(`${this.baseURL}/${this.rootNode}.json`)
     .subscribe(
       (response) => {
         this.peopleCollection = response;
        } ,
       (error) => console.log(error)
     );
  }
  delData(refID) {
    // console.log(dataID);
    this.dbService.deleteData(`${this.baseURL}/${this.rootNode}/${refID}.json`)
       .subscribe(
         (response) => console.log(response),
         (error) => console.log(error)
       );
  }

}
