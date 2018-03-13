import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {WebsiteService} from '../../../services/website.service.client';
import {Website} from '../../../models/website.model.client';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-website-new',
  templateUrl: './website-new.component.html',
  styleUrls: ['../../../app.component.css']
})
export class WebsiteNewComponent implements OnInit {
  @ViewChild('f') websiteForm: NgForm;
  websiteId: String;
  name: String;
  description: String;
  userId: String;
  websites = [];

  constructor(private websiteService: WebsiteService, private activatedRoute: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(
        (params: any) => {
          return this.websiteService.findWebsiteByUser(params['uid']).subscribe((returnWebsites: Website[]) => {
            this.userId = params['uid'];
            this.websites = returnWebsites;
          });
        }
      );
  }

  create() {
    const website = new Website('', '', '', '');
    website.name = this.websiteForm.value.name;
    website.description = this.websiteForm.value.description;
    website.developerId = this.userId;
    return this.websiteService.createWebsite(this.userId, website).subscribe( (returnWebsite: Website) => {
    });
  }
}
