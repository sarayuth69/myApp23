/* eslint-disable node/no-deprecated-api */
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import { AlertController } from '@ionic/angular';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  ID;
  IDlength;
  usname;
  pasword;

  constructor(public router: Router,
  public alertController: AlertController,
  public database: AngularFireDatabase,
  ) { }

  ngOnInit() {  

  }
  register(){
    this.router.navigate(['/register' ]);
    this.database.list('/user/').valueChanges().subscribe(data => {
    this.ID = data;
    this.IDlength = data.length + 1;
    console.log(this.IDlength);
    });
  }
  
  click (usname,pasword){
    firebase.database().ref(`user`).once('value').then(data=>{
      console.log(data.val());
      for (let index = 1; index < data.val().length; index++) {
        const element = data.val()[index];
        
         if ( usname === 'addmin' && pasword === 'addmin') {
            this.router.navigate(['/menu' ]);
          }/* tslint:disable:object-literal-sort-keys */
          else if( usname === data.val()[index].username && pasword === data.val()[index].password) {
          console.log(usname);
          console.log(pasword); 
          this.router.navigate(['/home', data.val()[index] ]);
          console.log(data.val()[index]);
          }
      }
        
      });
         

  
    //
    //   this.ID = data;
    //   this.IDlength = data.length + 1;
    //   console.log(this.IDlength);
    //     data.forEach((data, i) => {
    //       if ( usname === 'addmin' && pasword === 'addmin') {
    //         console.log("log1");
    //         this.router.navigate(['/menu' ]);
            
    //       }/* tslint:disable:object-literal-sort-keys */
    //       else if( usname === data.username && pasword === data.password) {
            
    //       console.log(usname);
    //       console.log(pasword); 
    //       this.router.navigate(['/home', data ]);

    //     }
    //   });
    // });
  }

}
