import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { FeedbackComponent } from "./feedback/feedback.component";
import { ProfileComponent } from "./profile/profile.component";
import { AboutComponent } from "./about/about.component";
import { HomeComponent } from "./home/home.component";
import { ContactusComponent } from "./contactus/contactus.component";
import { IndexComponent } from "./index/index.component";
import { AuthGuard } from "./services/auth.guard";
import { SearchresultComponent } from "./searchresult/searchresult.component";
import { ShopDashboardComponent } from "./shop-dashboard/shop-dashboard.component";

const routes: Routes = [
  { path: "index", component: IndexComponent },
  { path: "", redirectTo: "/index", pathMatch: "full" },
  { path: "home", component: HomeComponent, canActivate: [AuthGuard] },
  { path: "feedback", component: FeedbackComponent },
  { path: "profile", component: ProfileComponent },
  { path: "about", component: AboutComponent },
  { path: "contactus", component: ContactusComponent },
  { path: "shopdashboard", component: ShopDashboardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
