import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  footerItems=[
    'Online Banking Guarantee',
    'Site Help & accessbility',
    'Security and privacy',
    'Legal']
  constructor() {}

  ngOnInit(): void {}
}
