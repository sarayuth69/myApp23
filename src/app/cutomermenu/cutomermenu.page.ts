import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase';
import { AngularFireDatabase } from 'angularfire2/database';
import { AlertController, ModalController } from '@ionic/angular';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';

@Component({
  selector: 'app-cutomermenu',
  templateUrl: './cutomermenu.page.html',
  styleUrls: ['./cutomermenu.page.scss'],
})
export class CutomermenuPage implements OnInit {
  food;
  table: any;
  foodleangth: any;
  item: any;
  constructor(public router: Router,
              public database: AngularFireDatabase,
              private route: ActivatedRoute,
              public alertController: AlertController) { }

  ngOnInit() {
    this.database.list('/tablemenu/').valueChanges().subscribe(data => {
      this.food = data;
      this.foodleangth = data.length + 1;
      console.log(this.foodleangth);
    });
    this.route.params.subscribe(
      (param: any) => {
        this.table = param;
        console.log(this.table);
      }
    );

  }
 
  showmenu() {
    this.router.navigate([ '/fooditems' , this. table ]);
  }
  async onClick(item) {
    firebase.database().ref('cart/' + this.table.name + '/' + item.foodID).once('value').then(data => {
      const list = data.val();
      let d = new Date();
      let curr_date = d.getDate();
      let curr_month = d.getMonth() + 1; //Months are zero based
      let curr_year = d.getFullYear();
      let curr_hourse = d.getHours();
      let curr_minutes = d.getMinutes();
      let curr_secounds = d.getSeconds();
      if (list == null) {
        const cart = {
          foodID: item.foodID,
          foodname: item.foodname,
          foodprice: item.foodprice,
          foodtype: item.foodtype,
          amount: 1,
          day: curr_date + "-" + curr_month + "-" +  curr_year + ", " + curr_hourse + ":" + curr_minutes + ":" + curr_secounds,
          status: 1,
          sum: item.foodprice,
          placeID: 1
        };
        const update = {};
        update['cart/' + this.table.name + '/' + item.foodID] = cart;
        firebase.database().ref().update(update);
        Swal.fire('สั่งอาหารสำเร็จแล้ว', 'กรุณาเช็ครายการของคุณ', 'success');
      } else {
        if (data.val().foodID && item.foodID) {
          const cart = {
            foodID: item.foodID,
            foodname: item.foodname,
            foodprice: item.foodprice,
            foodtype: item.foodtype,
            day: curr_date + "-" + curr_month + "-" +  curr_year + ", " + curr_hourse + ":" + curr_minutes + ":" + curr_secounds,
            status: 1,
            placeID: 1,
            amount: list.amount+1 ,
            sum: list.sum + list.foodprice,
          };
          const update = {};
          update['cart/' + this.table.name + '/' + item.foodID] = cart;
          firebase.database().ref().update(update);
          Swal.fire('สั่งอาหารสำเร็จแล้ว', 'กรุณาเช็ครายการของคุณ', 'success');
        } else {
          const cart = {
            foodID: item.foodID,
            foodname: item.foodname,
            foodprice: item.foodprice,
            foodtype: item.foodtype,
            amount: 1,
            day: curr_date + "-" + curr_month + "-" +  curr_year + ", " + curr_hourse + ":" + curr_minutes + ":" + curr_secounds,
            status: 1,
            sum: item.foodprice,
            placeID: 1
          };
          const update = {};
          update['cart/' + this.table.name + '/' + item.foodID] = cart;
          firebase.database().ref().update(update);
          Swal.fire('สั่งอาหารสำเร็จแล้ว', 'กรุณาเช็ครายการของคุณ', 'success');

        }
      }
    });
  
  }
}

