import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about/about.component';
import { HomepageComponent } from './homepage/homepage.component';
import { DetailsPageComponent } from './details-page/details-page.component';

const routes: Routes = [
    {path: '', component: HomepageComponent},
    {path: 'about', component: AboutComponent},
    {path: 'location/:locationId', component: DetailsPageComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}