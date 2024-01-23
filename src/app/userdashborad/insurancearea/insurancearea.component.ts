import { Component, OnInit } from '@angular/core';
import { InsuranceService } from 'src/app/services/insurance.service';
import { RegisterService } from 'src/app/services/register.service';
import { UserinsurancedetailService } from 'src/app/services/userinsurancedetail.service';
import jspdf from 'jspdf';
import 'jspdf-autotable';



declare var require: any;
const { saveAs } = require('file-saver');

@Component({
  selector: 'app-insurancearea',
  templateUrl: './insurancearea.component.html',
  styleUrls: ['./insurancearea.component.css']
})
export class InsuranceareaComponent implements OnInit {
  userdetail!: any;
  userId!: any;

  ListOfUserInsurance!: Array<any>;
  ListOfPersonalUserInsurance!: Array<any>;
  freeInsurance = "free";
  paidInsurance = "paid";
  adminAccess: boolean = false;
  paidInsuranceView: boolean = false;
  FreeInsuranceView: boolean = false;
  emptycardview: boolean = false;
  ListOfUserFreeInsurance!: Array<any>;
  ListOfUserpaidInsurance!: Array<any>;
  ListOfUserAdminAcessInsurance!: Array<any>;

  title='arun'
  data={
    name:'Arun',
    email:'arunarun2gs@gmail.com'
  }

  constructor(private registerservice: RegisterService, private userinsurance: UserinsurancedetailService) { }

  ngOnInit() {
    this.userdetail = this.registerservice.loginUserId();
    this.userId = this.userdetail.userId;

    this.userinsurance.loadData().subscribe(x => {
      this.ListOfUserInsurance = x;

      this.ListOfPersonalUserInsurance = this.ListOfUserInsurance.filter(plan => plan.data.userid === this.userId);

      this.ListOfUserFreeInsurance = this.ListOfPersonalUserInsurance.filter(plan => plan.data.kindOfInsurance === this.freeInsurance);
      console.log(this.ListOfUserFreeInsurance)

      this.ListOfUserpaidInsurance = this.ListOfPersonalUserInsurance.filter(plan => plan.data.kindOfInsurance === this.paidInsurance);

      this.ListOfUserAdminAcessInsurance = this.ListOfPersonalUserInsurance.filter(plan => plan.data.adminAccess === this.adminAccess);

      if (this.ListOfUserFreeInsurance.length > 0) {
        this.FreeInsuranceView = true
      }
      if (this.ListOfUserpaidInsurance.length > 0) {
        this.paidInsuranceView = true
      }
      if (this.ListOfUserFreeInsurance.length <= 0 && this.ListOfUserpaidInsurance.length <= 0) {
        this.emptycardview = true;
      }
    });
  }

  generatepdf(insurance: any) {
    const pdf = new jspdf();

    // Set header
    const header = [['CompanyName', 'RaodMaster Insurance']];
    const data = [
      ['Vehicle Number', insurance.data.VehicleNumber],
      ['Insurance Provider', insurance.data.insuranceprovider],
      ['Policy Name', insurance.data.policyname],
      ['Policy Type', insurance.data.policytype],
      ['Policy ID', insurance.data.policyid],
      ['Policy Duration', insurance.data.policyduration],
      ['Policy Category', insurance.data.policycategory],
      ['Policy Price', insurance.data.policyprice],
      ['Insurance Start Date', insurance.data.TakeInsurancedate.toDate()],
      ['Insurance Expiry Date', insurance.data.ExpirationDate.toDate()],
      ['User Name', `${insurance.data.firstname} ${insurance.data.lastname}`],
      ['User Email', insurance.data.email],
      ['policystatus', insurance.data.adminAccess ? 'Active' : 'Inactive']
    ];

    // Center the "RoadMaster" heading
    const title = 'RoadMaster';
    const fontSize = 20; // Set your desired font size
    pdf.setFontSize(fontSize);

    // Set the text color to blue
    pdf.setTextColor(0, 0, 255); // RGB value for blue

    const titleWidth = pdf.getStringUnitWidth(title) * fontSize / pdf.internal.scaleFactor;
    const centerX = (pdf.internal.pageSize.width - titleWidth) / 2;

    const startY = 20; // Adjust the startY to leave space for the title
    pdf.text(title, centerX, startY); // Adjust the y-coordinate as needed

    // Reset text color
    pdf.setTextColor(0, 0, 0); // Reset to black

    // Use the autoTable method from jspdf-autotable
    (pdf as any).autoTable({
      head: header,
      body: data,
      startY: startY + 10, // Adjust the startY to reduce the gap
      styles: { cellPadding: 7 } // Adjust the padding as needed
    });

    // Add a dynamic footer
    const currentDate = new Date();
    const insuranceCompany = 'Your Insurance Company Name';

    const footerText = `
      Generated on: ${currentDate.toLocaleDateString()} ${currentDate.toLocaleTimeString()}
      Insurance Company: ${insuranceCompany}
      Your additional footer text goes here.
    `;

    pdf.setFontSize(12); // Set the font size for the footer
    const footerWidth = pdf.getStringUnitWidth(footerText) * 12 / pdf.internal.scaleFactor;
    const footerX = (pdf.internal.pageSize.width - footerWidth) / 2;
    const footerY = pdf.internal.pageSize.height - 20; // Adjust the y-coordinate for the footer
    // pdf.text(footerText, footerX, footerY);

    const blob = pdf.output('blob');
    saveAs(blob, `insurance_${insurance.data.policyid}.pdf`);
  }
  
  
  
}
