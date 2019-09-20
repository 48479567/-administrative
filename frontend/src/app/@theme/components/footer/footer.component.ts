import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
    <span class="created-by">
      Make with ð by
      <b><a href="https://github.com/48479567" target="_blank"> Kid-A</a></b>
      2019</span>
    <div class="socials">
      <a href="#" target="_blank" class="ion ion-social-github"></a>
      <a href="#" target="_blank" class="ion ion-social-facebook"></a>
      <a href="#" target="_blank" class="ion ion-social-twitter"></a>
      <a href="#" target="_blank" class="ion ion-social-linkedin"></a>
    </div>
  `,
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent { }
