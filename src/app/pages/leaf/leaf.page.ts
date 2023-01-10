import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Teams } from 'src/app/model/teams';
import { TeamsService } from 'src/app/services/teams.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-leaf',
  templateUrl: './leaf.page.html',
  styleUrls: ['./leaf.page.scss'],
})

export class LeafPage implements OnInit {
  @Input('data') data:Teams;
  todo: FormGroup;
  constructor(
    private formBuilder:FormBuilder,
    private teamsS:TeamsService,
    private uiS:UiService,
    private modalC: ModalController
  ) {}

  ngOnInit() {
    this.todo = this.formBuilder.group({
      name :['',[Validators.required,
                  Validators.maxLength(15)]]
    })
  }

  public async logForm() {
    if(!this.todo.valid) return;
    await this.uiS.showLoading();
    try{
      await this.teamsS.addTeams({
        name:this.todo.get('name').value
      });
      this.todo.reset("");
      this.uiS.showToast("¡Team insert succecfully!");
    }catch(err) {
      console.error(err);
      this.uiS.showToast(" Algo ha ido mal ;( ","danger");
    } finally {
      this.uiS.hideLoading();
      this.modalC.dismiss({
        name: this.todo.get('name').value
      });
    }
  }
}