import { BrowserModule } from '@angular/platform-browser';

import { NgModule } from '@angular/core';
import{FormsModule} from '@angular/forms';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { WallComponent } from './wall/wall.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { WelcomeComponent } from './welcome/welcome.component';

import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';

import { ReactiveFormsModule } from '@angular/forms'; //añadimos un formulario
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';

import { SingInFormComponent } from './login/sing-in-form/sing-in-form.component';
import { SingWithFbButtonComponent } from './login/sing-with-fb-button/sing-with-fb-button.component';
import { SingWithGButtonComponent } from './login/sing-with-g-button/sing-with-g-button.component';


import { environment } from '../environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';

import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CarrouselComponent } from './welcome/carrousel/carrousel.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { PublicacionesComponent } from './wall/publicaciones/publicaciones.component';
import { PublicacionesService } from './services/publicaciones.service';
import { AddPublishComponent } from './wall/add-publish/add-publish.component';
import { AddImgComponent } from './wall/add-publish/add-img/add-img.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    WallComponent,
    WelcomeComponent,
    SingInFormComponent,
    SingWithFbButtonComponent,
    SingWithGButtonComponent,
    CarrouselComponent,
    PublicacionesComponent,
    AddPublishComponent,
    AddImgComponent
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatButtonModule,
    MatFormFieldModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFirestoreModule.enablePersistence(),
    MatCardModule,
    MatSnackBarModule,
    NgbModule,
    FormsModule

  ],
  providers: [AuthService, AngularFirestore, AuthGuard, PublicacionesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
