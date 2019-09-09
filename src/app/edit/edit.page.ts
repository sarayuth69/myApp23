import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase';
import { AngularFireDatabase } from 'angularfire2/database';
import { AlertController, ModalController } from '@ionic/angular';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  foodID
  foodname
  foodprice
  foodtype
  item: any;

  constructor(public router: Router,
    public database: AngularFireDatabase,
    private route: ActivatedRoute,
    public alertController: AlertController,
    public modalController: ModalController) { }

  ngOnInit() {
    this.route.params.subscribe(
      (param: any) => {
        this.item = param;
        console.log(this.item);
        this.foodID = this.item.foodID
        this.foodname = this.item.foodname
        this.foodprice = this.item.foodprice
        this.foodtype = this.item.foodtype
      }
    );
  }
edit(){
  firebase.database().ref('tablemenu/' + this.foodID).once('value').then(data => {
  const list = data.val();
    
      const cart = {
        foodID: this.foodID,
        foodname: this.foodname,
        foodprice: this.foodprice,
        foodtype: this.foodtype,
      
      };
      console.log(cart);
      const update = {};
      update['tablemenu/' + this.foodID] = cart;
      firebase.database().ref().update(update);
      Swal.fire('เพิ่มอาหารสำเร็จแล้ว', 'กรุณาเช็ครายการของคุณ', 'success');
  
  });

}
  





upload(files){
  
  // let files = this.fileField.getFiles();
  console.log(files);
}
}
