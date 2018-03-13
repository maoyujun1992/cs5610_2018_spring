export class Widget {
  _id: String;
  widgetType: String;
  pageId: String;
  size: String;
  text: String;
  width: String;
  url: String;

  constructor(_id, widgetType, pageId, size, text, width, url) {
    this._id = _id;
    this.widgetType = widgetType;
    this.size = size;
    this.pageId = pageId;
    this.url = url;
    this.width = width;
    this.text = text;
  }
}
