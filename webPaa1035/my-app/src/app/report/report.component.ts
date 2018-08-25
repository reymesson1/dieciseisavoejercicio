import { Component, OnInit, ElementRef ,ViewChild} from '@angular/core';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';


@Component({
  selector: 'report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent {
  title = 'my-app';
  toggle : boolean = false;

  @ViewChild('content') content:ElementRef;
  constructor() { }

  ngOnInit() {
  }

  public captureScreen()
  {
    this.toggle = !this.toggle;
    var data = document.getElementById('convert');

    pdfMake.vfs = pdfFonts.pdfMake.vfs;

    html2canvas(data).then(canvas => {
      var imgWidth = 208; 
      var pageHeight = 295;  
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;
      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jspdf('p', 'mm', 'a4');
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)            
      pdf.save('MYPdf.pdf')  
      pdfMake.createPdf(pdf).open();                               
    });  
   
    var dd = {
      content: [
        {
          text: 'The following page displays correctly with the image',
          pageBreak: 'after'
        },        
        {
          text: 'The following page does not display correctly - there are just two blank pages',
          pageBreak: 'after'
        }        
      ],
    }

    pdfMake.createPdf(dd).open();


    
  }

}