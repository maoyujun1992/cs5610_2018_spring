import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {WidgetService} from '../../../services/widget.service.client';
import {DomSanitizer} from '@angular/platform-browser';
import {Widget} from '../../../models/widget.model.client';

@Component({
  selector: 'app-widget-list',
  templateUrl: './widget-list.component.html',
  styleUrls: ['../../../app.component.css']
})
export class WidgetListComponent implements OnInit {
  widgets = [{}];
  widget = {};
  pageId: String;

  constructor(private domSanitizer: DomSanitizer, private widgetService: WidgetService, private activatedRoute: ActivatedRoute) {
  }

  getUrl(url: String) {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(url.toString());
  }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(
        params => {
          return this.widgetService.findWidgetsByPageId(params['pid']).subscribe((data: any) => {
            this.pageId = params['pid'];
            this.widgets = data;
          });
        }
      );
  }

  reorderWidgets(indexes) {
    // call widget service function to update widget as per index
    console.log(this.pageId);
    this.widgetService.reorderWidgets(indexes.startIndex, indexes.endIndex, this.pageId)
      .subscribe(
        (data) => console.log(data)
      );
  }
}
