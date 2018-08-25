import {Component, Inject} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { RestSourceData } from 'src/app/model/rest.datasource';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

@Component({
  selector: 'view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent {
  position = 'my-app'; 
  masterData; 

  constructor(private route:ActivatedRoute,private data: RestSourceData){
    this.data.getMaster();
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    var dd = { content: 'This is an sample PDF printed with pdfMake' };
    pdfMake.createPdf(dd).open();
    
  }

  ngOnInit(){
    
    if(this.data.master.length>0){
      this.position = this.route.snapshot.params['id'];
      let filteredData = this.data.master.filter(
        (master) => master.position.indexOf(this.position) !== -1
      );
      this.masterData = filteredData[0];      
    }
  }

  
}