import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PageService} from '../../../services/page.service.client';
import {NgForm} from '@angular/forms';
import {Page} from '../../../models/page.model.client';

@Component({
  selector: 'app-page-edit',
  templateUrl: './page-edit.component.html',
  styleUrls: ['../../../app.component.css']
})
export class PageEditComponent implements OnInit {
  @ViewChild('f') pageForm: NgForm;
  userId: String;
  websiteId: String;
  pageId: String;
  name: String;
  page: Page;
  title: String;

  constructor(private pageService: PageService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {

    this.activatedRoute.params
      .subscribe(
        params => {
          return this.pageService.findPageById(params['pid']).subscribe((returnPage: Page) => {
            this.userId = params['uid'];
            this.websiteId = params['wid'];
            this.pageId = params['pid'];
            this.page = returnPage;
            this.name = this.page.name;
            this.title = this.page.title;

          });

        }
      );
  }

  update() {
    this.page.name = this.pageForm.value.name;
    this.page.title = this.pageForm.value.title;
    return this.pageService.updatePage(this.pageId, this.page).subscribe((returnPage: Page) => {});
  }

  delete() {
    return this.pageService.deletePage(this.pageId).subscribe((returnPage: Page) => {});
  }
}
