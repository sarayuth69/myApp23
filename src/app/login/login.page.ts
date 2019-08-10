import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import { AlertController } from '@ionic/angular';
import { AngularFireDatabase } from 'angularfire2/database';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  ID;
  IDlength;
  username;
  password;

  constructor(public router: Router,
  public alertController: AlertController,
  public database: AngularFireDatabase,
  ) { }

  ngOnInit() {  

  }
  register(){
    this.router.navigate(['/register' ]);

  }
  click (username,password){
    
    this.database.list('/user/').valueChanges().subscribe(data => {
      this.ID = data;
      this.IDlength = data.length + 1;
      console.log(this.IDlength);
        data.forEach(element => {
          if ( username === 'addmin' && password === 'addmin') {
            console.log("log1");
            this.router.navigate(['/menu' ]);
            
          }else if( username === element.username && password === element.password) {
          console.log(username);
          console.log(password);
          console.log("log2");
          this.router.navigate(['/home', element ]);

        }
      });
    });
  }
}



    
    
      
       
