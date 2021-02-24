import { Component, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy {

  destroyed$ = new Subject<void>();

  constructor(private dataService: DataService, private router: Router) { }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  login(loginForm: NgForm): void {
    if (loginForm.valid) {
      this.dataService.login(loginForm.value).pipe(takeUntil(this.destroyed$))
        .subscribe(res => {
          if (res) {
              this.router.navigate(['home']);
            }
        });
    }
  }

}
