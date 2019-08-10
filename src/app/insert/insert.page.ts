import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase';
import { AngularFireDatabase } from 'angularfire2/database';
import { AlertController, ModalController } from '@ionic/angular';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';

@Component({
  selector: 'app-insert',
  templateUrl: './insert.page.html',
  styleUrls: ['./insert.page.scss'],
})
export class InsertPage implements OnInit {
  foodID
  foodname
  foodtype
  foodprice
  item: any;


  constructor(
    public router: Router,
              public database: AngularFireDatabase,
              private route: ActivatedRoute,
              public alertController: AlertController
  ) { }

  ngOnInit() {
  }
  insertfood(){
    
    console.log(this.foodID);
    firebase.database().ref('tablemenu/' + this.foodID).once('value').then(data => {
      const list = data.val();
      if (list == null) {
        const cart = {
          foodID: this.foodID,
          foodname: this.foodname,
          foodprice: this.foodprice,
          foodtype: this.foodtype,
        
        };
        const update = {};
        update['tablemenu/' + this.foodID] = cart;
        firebase.database().ref().update(update);
        Swal.fire('เพิ่มอาหารสำเร็จแล้ว', 'กรุณาเช็ครายการของคุณ', 'success');
      
        
      }
    });

  }
 
}