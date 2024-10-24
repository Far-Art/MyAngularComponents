import {Injectable} from '@angular/core';

// import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ElementCaptureService {

  constructor(/*private http: HttpClient*/) { }

  captureHTML(element?: Element | null) {
    // Get the full HTML of the element or the current page
    const htmlContent = element?.outerHTML ?? document.documentElement.outerHTML;
    // Get the active styles
    const styles = this.getStyles();
    // Combine the HTML and styles into a complete HTML page
    const fullHTML = this.buildHTMLPage(htmlContent, styles);
    this.saveHTML(fullHTML);
  }

  private getStyles(): string {
    let styleText = '';
    // Get all <style> tags
    const styleTags = Array.from(document.querySelectorAll('style'));
    // Collect inline styles
    styleTags.forEach(styleTag => {
      styleText += styleTag.outerHTML;
    });
    // Get all linked <link> stylesheet files
    const linkTags = Array.from(document.querySelectorAll('link[rel="stylesheet"]'));
    // Collect external stylesheets
    linkTags.forEach(linkTag => {
      styleText += linkTag.outerHTML;
    });
    return styleText;
  }

  private buildHTMLPage(content: string, styles: string): string {
    const date = new Date();
    const formattedDate = `${this.getFormattedNumber(date.getDate())}/${this.getFormattedNumber(date.getMonth() + 1)}/${date.getFullYear()} ${this.getFormattedNumber(date.getHours())}:${this.getFormattedNumber(date.getMinutes())}:${this.getFormattedNumber(date.getSeconds())}`;
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>Captured Element => ${formattedDate}</title>
        ${styles}
      </head>
      <body inert>
        ${content}
      </body>
      </html>
    `;
  }

  private saveHTML(htmlContent: string) {
    const blob = new Blob([htmlContent], {type: 'text/html'});
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `page-snapshot-${new Date().toISOString()}.html`;
    link.click();
    // this.http.post('https://your-server-url/api/save-html', { htmlContent });
  }

  private getFormattedNumber(num: number): string {
    return num < 10 && num >= 0 ? '0' + num : '' + num;
  }
}
