import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(public router: Router, public alertController: AlertController) { }

  ngOnInit() {
  }
  click ( u: string, p: string) {
    if (u === 'addmin' && p === 'addmin') {
      this.router.navigate(['/menu' ]);
    }
    else if(u === 'cutomer' && p === 'cutomer') {
      this.router.navigate(['/home' ]);
    }
    else if (u!='addmin' && p!='addmin'){
      Swal.fire({
        title: 'กรุณากรอกรหัสให้ถูกต้อง',
        type: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Yes'

      })
    }
  }

}
