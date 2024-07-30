import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
  styles: [`
    .outline{  
    border: 2px solid #264653;
    background-color: white;
    color: #264653;
    }
    .fill{
    background: #264653;
    color: #FFFFFF;
    border: 2px solid #264653;
    }
    `
  ]
})
export class ButtonComponent {
  @Input() text: any;
  @Input() customClasses: string | string[] = '';
  @Input() buttonType: string = 'button';



}
