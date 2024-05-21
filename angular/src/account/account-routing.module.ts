import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { AccountComponent } from "./account.component";
import { ConfirmEmailComponent } from "../confirm-email/confirm-email.component";

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: "",
        component: AccountComponent,
        children: [
          { path: "login", component: LoginComponent },
          { path: "register", component: RegisterComponent },
          { path: "confirm-email", component: ConfirmEmailComponent },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class AccountRoutingModule {}
