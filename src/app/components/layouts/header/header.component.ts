import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(public translate: TranslateService) {
    this.translate.addLangs(['en', 'ar']);
    this.translate.setDefaultLang('en');

    const browserLang = this.translate.getBrowserLang();
    this.translate.use(browserLang && browserLang.match(/en|ar/) ? browserLang : 'en');
  }

  switchLang() {
    const currentLang = this.translate.currentLang;
    const newLang = currentLang === 'ar' ? 'en' : 'ar';
    this.translate.use(newLang);
    document.documentElement.setAttribute('lang',newLang) 
   }

}
