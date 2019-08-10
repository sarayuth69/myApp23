import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';
import Swal from 'sweetalert2/dist/sweetalert2.js';

import 'sweetalert2/src/sweetalert2.scss';
import { AlertController } from '@ionic/angular';
import { timeout } from 'q';


const newLocal = 'cartList/';
@Component({
  selector: 'app-fooditems',
  templateUrl: './fooditems.page.html',
  styleUrls: ['./fooditems.page.scss'],
})
export class FooditemsPage implements OnInit {
  sum = 0;
  item: any;
  table: any;
  index = 0;
  
  
  

  constructor(public router: Router,
    private route: ActivatedRoute,
    public database: AngularFireDatabase,
    public alertController: AlertController) { }

  ngOnInit() {
    this.route.params.subscribe(
      (param: any) => {
        this.table = param;
        console.log(this.table);
      }
    );
    this.database.list(`/cart/${this.table.name}`).valueChanges().subscribe(data => {
      this.item = data;
      console.log(data);
    });

    setTimeout(() => {
      this.item.forEach((element, index) => {
        this.sum += this.item[index].sum;
        console.log(this.sum);
      });
    }, 1000);
    
   
    

  }
  click(delet) {
    Swal.fire({
      title: 'คุณจะลบเมนูหรือไม่...?',
      text: "",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
       
        firebase.database().ref(`cart/${this.table.name}/${delet.foodID}`).remove();
        
      }
    })
  }
  
  total() {
    // this.item.forEach((element, index) => {
    //   this.sum += this.item[index].sum;
    //   console.log(this.sum);
    // });
    Swal.fire({
      title: 'พร้อมที่จะเช็คบินไหม??',
      text: this.sum,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'

    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
        firebase.database().ref(`cart/${this.table.name}`).remove();
        this.sum=0;
      }
    })
    
   
  }

}
