import { Component, OnInit, Input } from '@angular/core';
import { ThemePalette, ProgressSpinnerMode } from '@angular/material';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  searchBarUp;
  leftSidebar;


  
  constructor(){

  }

  ngOnInit() {
  }



}


