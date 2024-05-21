// import { Component, Injector } from "@angular/core";
// import { Router } from "@angular/router";
// import { finalize } from "rxjs/operators";
// import { AppComponentBase } from "@shared/app-component-base";
// import {
//   AccountServiceProxy,
//   RegisterInput,
//   RegisterOutput,
// } from "@shared/service-proxies/service-proxies";
// import { accountModuleAnimation } from "@shared/animations/routerTransition";
// import { AppAuthService } from "@shared/auth/app-auth.service";

// @Component({
//   templateUrl: "./register.component.html",
//   animations: [accountModuleAnimation()],
// })
// export class RegisterComponent extends AppComponentBase {
//   model: RegisterInput = new RegisterInput();
//   saving = false;

//   constructor(
//     injector: Injector,
//     private _accountService: AccountServiceProxy,
//     private _router: Router,
//     private authService: AppAuthService
//   ) {
//     super(injector);
//   }

//   save(): void {
//     this.saving = true;
//     this._accountService
//       .register(this.model)
//       .pipe(
//         finalize(() => {
//           this.saving = false;
//         })
//       )
//       .subscribe((result: RegisterOutput) => {
//         if (!result.canLogin) {
//           this.notify.success(this.l("SuccessfullyRegistered"));
//           this._router.navigate(["/login"]);
//           return;
//         }

//         // Autheticate
//         this.saving = true;
//         this.authService.authenticateModel.userNameOrEmailAddress =
//           this.model.userName;
//         this.authService.authenticateModel.password = this.model.password;
//         this.authService.authenticate(() => {
//           this.saving = false;
//         });
//       });
//   }
// }

import { Component } from "@angular/core";
import {
  FormControl,
  FormControlOptions,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrl: "./register.component.css",
})
export class RegisterComponent {
  constructor(private _Router: Router) {}

  isShowPassword: boolean = false;
  isShowRePassword: boolean = false;

  handlePass(inputId: string) {
    if (inputId === "password") {
      this.isShowPassword = !this.isShowPassword;
    } else if (inputId === "repassword") {
      this.isShowRePassword = !this.isShowRePassword;
    }
  }

  registerForm: FormGroup = new FormGroup(
    {
      name: new FormControl("", [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(15),
      ]),
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required]),
      rePassword: new FormControl(""),
      // phone: new FormControl('', [
      //   Validators.required,
      //   Validators.pattern(/01[1250][0-9]{8}/),
      // ]),
    },
    { validators: [this.confirmPassword] } as FormControlOptions
  );

  confirmPassword(group: FormGroup): void {
    const password = group.get("password");
    const rePassword = group.get("rePassword");

    if (rePassword?.value == "") {
      rePassword?.setErrors({ required: true });
    } else if (password?.value !== rePassword?.value) {
      rePassword?.setErrors({ mismatch: true });
    }
  }

  handleForm() {
    console.log(this.registerForm.value);
    if (this.registerForm.valid) {
      Swal.fire({
        title: "Success",
        text: "Register success",
        icon: "success",
        confirmButtonText: "Ok",
      }).then(() => {
        setTimeout(() => {
          this._Router.navigate(["/login"]);
        }, 3000);
      });
    }
  }
}
