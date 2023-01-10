import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import '@capacitor-community/text-to-speech';
import { Plugins } from '@capacitor/core';
const { TextToSpeech } = Plugins;

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  
  text: string;
  constructor() {}

  ngOnInit() {
    
  }

  speakText() {
    TextToSpeech.speak({
      text:this.text
    })
  }

}
