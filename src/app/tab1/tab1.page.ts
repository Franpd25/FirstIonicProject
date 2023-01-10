import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { InfiniteScrollCustomEvent, IonInfiniteScroll, ModalController } from '@ionic/angular';
import { Teams } from '../model/teams';
import { EditPage } from '../pages/edit/edit.page';
import { TeamsService } from '../services/teams.service';
import { UiService } from '../services/ui.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  
  ngOnInit(){   
  }

}
