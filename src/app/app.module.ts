import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AngularFireModule} from '@angular/fire/compat'
import { environment } from 'src/environments/environment';
import { TeamsService } from './services/teams.service';
import { UiService } from './services/ui.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextToSpeechWeb } from '@capacitor-community/text-to-speech';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule.forRoot(), 
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    TeamsService,
    UiService,
    TextToSpeechWeb,
    
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
