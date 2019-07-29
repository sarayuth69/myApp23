import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase';
import { AngularFireDatabase } from 'angularfire2/database';
import { AlertController, ModalController } from '@ionic/angular';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';



@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  food;
  table: any;
  foodleangth: any;
  delet: any;
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
  insert(){
    this.router.navigate([ '/insert']);
  }
  delets(delet) {
  
    Swal.fire({
      title: 'คุณจะลบเมนูนี้หรือไม่...?',
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
        firebase.database().ref(`tablemenu/${delet.foodID}`).remove();
        console.log(delet);

      }
    })
  
  }
  showmenu() {
    this.router.navigate([ '/fooditems' , this. table ]);
  }
  async onClick(item) {
    firebase.database().ref('cart/' + this.table.name + '/' + item.foodID).once('value').then(data => {
      const list = data.val();
      if (list == null) {
        const cart = {
          foodID: item.foodID,
          foodname: item.foodname,
          foodprice: item.foodprice,
          foodtype: item.foodtype,
          amount: 1,
          day: new Date(),
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
            day: new Date(),
            status: 1,
            placeID: 1,
            amount: list.amount ,
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
            day: new Date(),
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
