import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Teams } from 'src/app/model/teams';
import { TeamsService } from 'src/app/services/teams.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  @Input('data') data:Teams;
  private todo: FormGroup;
  constructor(
    private formBuilder:FormBuilder,
    private teamsS:TeamsService,
    private uiS:UiService,
    private modalCTRL:ModalController
  ) {
   
  }
  ngOnInit() {
    if(!this.data){
      console.log("Crear nota");
    } else{
      this.todo = this.formBuilder.group({
        name :[this.data.name,[Validators.required,
                    Validators.minLength(15)]]
      })
    }
  }

  async logForm(){
    if(!this.todo.valid) return;
    await this.uiS.showLoading();
    try{
      if(!this.data){
        await this.teamsS.addTeams({
          name:this.todo.get('name').value
        });
        this.todo.reset("");
        this.uiS.showToast("¡Nota insertada correctamente!");
      }else{
        await this.teamsS.updateTeam(
          {id:this.data.id,
           name:this.todo.get('name').value
          }
        );
        this.uiS.showToast("¡Nota actualizada correctamente!");
      }
    }catch(err){
      console.error(err);
      this.uiS.showToast(" Algo ha ido mal ;( ","danger");
    } finally{
      this.uiS.hideLoading();
      this.modalCTRL.dismiss( {id:this.data.id,
        name:this.todo.get('name').value
       });
    }
  }
}
