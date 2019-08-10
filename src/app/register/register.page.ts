import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase';
import { AngularFireDatabase } from 'angularfire2/database';
import { AlertController, ModalController } from '@ionic/angular';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  email
  lastname
  name
  password
  phone
  username
  zip
  ID
  IDlength
  
  constructor(
    public router: Router,
              public database: AngularFireDatabase,
              private route: ActivatedRoute,
              public alertController: AlertController,
              public modalController: ModalController
  ) { }

  ngOnInit() {
    this.database.list('/user/').valueChanges().subscribe(data => {
      this.ID = data;
      this.IDlength = data.length + 1;
      console.log(this.IDlength);
    });
  }
  regis(name,lastname,email,phone,zip,username,password,IDlength){
      if(name==""){
        Swal.fire({
          type: 'error',
          title: 'กรุณากรอกข้อมูลให้ครบ',
          text: 'Something went wrong!',
          footer: '<a href>Why do I have this issue?</a>'
        })
      }else if(lastname==""){
        Swal.fire({
          type: 'error',
          title: 'กรุณากรอกข้อมูลให้ครบ',
          text: 'Something went wrong!',
          footer: '<a href>Why do I have this issue?</a>'
        })
      }else if(email==""){
        Swal.fire({
          type: 'error',
          title: 'กรุณากรอกข้อมูลให้ครบ',
          text: 'Something went wrong!',
          footer: '<a href>Why do I have this issue?</a>'
        })
      }else if(phone==""){
        Swal.fire({
          type: 'error',
          title: 'กรุณากรอกข้อมูลให้ครบ',
          text: 'Something went wrong!',
          footer: '<a href>Why do I have this issue?</a>'
        })
      }else if(zip==""){
        Swal.fire({
          type: 'error',
          title: 'กรุณากรอกข้อมูลให้ครบ',
          text: 'Something went wrong!',
          footer: '<a href>Why do I have this issue?</a>'
        })
      }
      else if(username==""){
        Swal.fire({
          type: 'error',
          title: 'กรุณากรอกข้อมูลให้ครบ',
          text: 'Something went wrong!',
          footer: '<a href>Why do I have this issue?</a>'
        })
      }else if(password==""){
        Swal.fire({
          type: 'error',
          title: 'กรุณากรอกข้อมูลให้ครบ',
          text: 'Something went wrong!',
          footer: '<a href>Why do I have this issue?</a>'
        })
      }
    
   else{
    firebase.database().ref('user/').once('value').then(data => {
      const list = data.val();
        const cart = {
          email: email,
          lastname: lastname,
          name:  name,
          password: password,
          phone: phone,
          username: username,
          zip: zip,
          userID:this.IDlength
        };
        console.log(cart);
        const update = {};
        update['user/' + this.IDlength] = cart;
        firebase.database().ref().update(update);
        Swal.fire({
          position: 'top-end',
          type: 'success',
          title: 'เพิ่มสมาชิกเรียบร้อย',
          showConfirmButton: false,
          timer: 1500
        })
        this.router.navigate(['/login' ]);
      
    });
   }
   
}
}
