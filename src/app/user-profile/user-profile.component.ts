import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent{
  @ViewChild('tabGroup') tabGroup;
  
  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  public barChartLabels:string[] = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;

  public barChartData:any[] = [
    {data: [65, 59, 80, 81, 56, 55, 40, 52, 73, 63, 48, 85], label: '3rd Year'},
    {data: [28, 48, 40, 19, 86, 27, 90, 59, 80, 81, 69, 67], label: '2nd Year'},
    {data: [58, 68, 32, 59, 76, 72, 71, 65, 55, 43, 99, 54], label: '1st Year'},
  ];

    // events
    public chartClicked(e:any):void {
      console.log(e);
    }

    public chartHovered(e:any):void {
      console.log(e);
    }
   
    public randomize():void {
      // Only Change 3 values
      let data = [
        Math.round(Math.random() * 100),
        59,
        80,
        (Math.random() * 100),
        56,
        (Math.random() * 100),
        40];
      let clone = JSON.parse(JSON.stringify(this.barChartData));
      clone[0].data = data;
      this.barChartData = clone;
      /**
       * (My guess), for Angular to recognize the change in the dataset
       * it has to change the dataset variable directly,
       * so one way around it, is to clone the data, change it and then
       * assign it;
       */
    }

    goToProject(events){
      console.log(this.tabGroup); // MdTabGroup Object
      console.log(this.tabGroup.selectedIndex); // null
      this.tabGroup.selectedIndex = 1;

    }
}
