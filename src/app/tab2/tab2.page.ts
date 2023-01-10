import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InfiniteScrollCustomEvent, ModalController } from '@ionic/angular';
import { Teams } from '../model/teams';
import { EditPage } from '../pages/edit/edit.page';
import { LeafPageRoutingModule } from '../pages/leaf/leaf-routing.module';
import { LeafPageModule } from '../pages/leaf/leaf.module';
import { LeafPage } from '../pages/leaf/leaf.page';
import { TeamsService } from '../services/teams.service';
import { UiService } from '../services/ui.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  @ViewChild('infinitescroll') infinitescroll : ElementRef;
  public teams:Teams[] =[];
  constructor(private teamsS:TeamsService,
    private uiS:UiService,
    private modalCtrl: ModalController) {

  }
  async ngOnInit(){
    await this.uiS.showLoading();
    this.teams = await this.teamsS.getTeams(true);
    this.uiS.hideLoading();
  }

  async openForm() {
    const modal = this.modalCtrl.create({
      component: LeafPage,
      componentProps: {
        // aquí puedes pasar cualquier propiedad que necesites en tu formulario modal

      }
    });
    (await modal).present();
  }

  async ionViewDidEnter(){}

  public async editTeam(team:Teams){
    const modal = await this.modalCtrl.create({
      component: EditPage,
      componentProps:{data:team}
    });
    await modal.present();

    const { data, role } = await modal.onWillDismiss();
    if(!role){
      //actualizar
      this.teams=this.teams.map((e)=>{
        if(e.id==data.id){
          return data;
        }else{
          return e;
        }
      })
    }
    console.log(data);
    

  }
  public async loadTeams(event){
    this.teams = await this.teamsS.getTeams(true);
    event.target.complete();
  }

  public async loadMoreTeams(event){
    let newTeams:Teams[] = await this.teamsS.getTeams();
    this.teams=this.teams.concat(newTeams);
    (event as InfiniteScrollCustomEvent).target.complete();
  }

  public deleteTeam(team){
    team.hided = true;
    
    const timeout = setTimeout(()=>{
      this.teamsS.removeTeam(team.id);
      this.teams = this.teams.filter(t=> t.id!=team.id);
    },3000);
    this.uiS.showToastOptions("Deshacer borrado",()=>{
      clearTimeout(timeout); //cancelada la cuenta atrás para el borrado en ddbb
      team.hided = undefined;
    });

  }
}
