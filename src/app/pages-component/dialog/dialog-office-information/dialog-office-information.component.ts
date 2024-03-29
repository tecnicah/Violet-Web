import { Component, Inject, OnInit, ViewChild, ɵConsole } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { DialogContactsComponent } from '../dialog-contacts/dialog-contacts.component';
import { DialogDocumentsLeadClientComponent } from '../dialog-documents-lead-client/dialog-documents-lead-client.component';
import { DialogWireTransferComponent } from '../dialog-wire-transfer/dialog-wire-transfer.component';
import { DialogGeneralMessageComponent } from '../general-message/general-message.component';
import { DialogDocumentsView } from './../dialog-documents-view/dialog-documents-view.component';

@Component({
  selector: 'app-dialog-office-information',
  templateUrl: './dialog-office-information.component.html',
  styleUrls: ['./dialog-office-information.component.scss']
})
export class DialogOfficeInformationComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogOfficeInformationComponent>,
    public _services: ServiceGeneralService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public _dialog: MatDialog) { }

    caCountry: any[] = [];
    ccity:any[] = [];
    caTypeOffice:any[] = [];
    ca_accountType: any[] = [];
    ca_creditCard: any[] = [];
    ca_currency: any[] = [];
    caDocumentType: any[] = [];
    ca_account: any[] = [];

    officeContacts: any;

    paymentMetod: boolean = false;

    ELEMENT_DATA: any[] = [
      {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
      {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
      {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
      {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
      {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'}
    ];
    // filtros
    public filterCountry: any = { name: '' };
    public filterState: any = { name: '' };
    public filterCity: any = { name: '' };

    dataSource = new MatTableDataSource(this.ELEMENT_DATA);

  @ViewChild(MatSort) sort: MatSort;

    siete: string[] =  ['uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete'];

    userData = JSON.parse(localStorage.getItem('userData'));

   //*********************************************//
	public permission_read : boolean = false;
	public permission_write : boolean = false;
	public permission_delete : boolean = false;
	public permission_edit : boolean = false;
	consultaPermisos(){
		console.log("CONSULTA PARA PERMISOS DE USUARIO");
		let url = localStorage.getItem('url_permisos');
		this._services.service_general_get('Role/'+url).subscribe(data=>{
			if(data.success){
			   console.log("Permisos: ", data.result.value)
			   this.permission_read = data.result.value[0].reading;
			   this.permission_write = data.result.value[0].writing;
			   this.permission_edit = data.result.value[0].editing;
			   this.permission_delete = data.result.value[0].deleting;
			}
		})
  }
  //*********************************************//
  ngOnInit(): void {
    this.consultaPermisos();
    console.log(this.data);
    if(this.data.officeContacts){
      console.log('office contact', this.data.officeContacts);
      this.officeContacts = new MatTableDataSource(this.data.officeContacts);
    }else{
      this.data.officeContacts = [];
      this.data.documentOfficeInformations = [];
    }
    if(!this.data.paymentInformationOffices){
      this.data.paymentInformationOffices = [];
      this.data.paymentInformationOffices.push({
        wireTransferPaymentInformationOffices: [],
        id: 0,
        idOfficeInformation: this.data.id,
        fiscalInvoice: false,
        creditCard: false,
        checks: false,
        payToOrderOf: "",
        cash: false,
        comment: "",
        generalComment: "",
        createdBy: this.userData.id,
        createdDate: new Date(),
        updatedBy: this.userData.id,
        updatedDate: new Date(),
      })
    }

    if(this.data.idCountry != null && this.data.idCountry != undefined && this.data.idCountry != 0){
      this.getState(this.data);
      this.getcity(this.data);
    }
    this.catalogos();
    console.log('data push', this.data);
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  ca_contactType = [];
  ca_city = [];
  ca_state =[];
  async catalogos() {
    // Catalogue/Generic/Countries
    this._services.service_general_get('Catalogue/Generic/Countries').subscribe(r =>{
      if(r.success){
        this.caCountry = r.result;
      }
    })
    console.log('country', this.caCountry);
    // this.caCountry = await this._services.getCatalogueFrom('GetCountry');GetTypeOffice
    this.caTypeOffice = await this._services.getCatalogueFrom('GetTypeOffice');
    this.ca_accountType = await this._services.getCatalogueFrom('GetBankAccountType');
    this.ca_creditCard = await this._services.getCatalogueFrom('GetCreditCard');
    this.ca_currency = await this._services.getCatalogueFrom('GetCurrency');
    this.caDocumentType = await this._services.getCatalogueFrom('GetDocumentType/1');
    this.ca_account = await this._services.getCatalogueFrom('GetBankAccountType');
    this.ca_contactType = await this._services.getCatalogueFrom('GetContactType');
    // this.ca_city = await this._services.getCatalogueFrom('GetCity');
  }

  // state
  getState(data) {
    this._services.service_general_get("Catalogue/Generic/States/" + data.idCountry).subscribe((data => {
      if (data.success) {
        this.ca_state = data.result;
      }
    }))
  }

  getcity(data) {
    console.log('data para consultar el city', data);
    // this.ccity = [];
    // Catalogue/GetState?country=
    // Catalogue/Generic/Cities/1
    this._services.service_general_get("Catalogue/Generic/Cities/" + data.idState).subscribe((data => {
      if (data.success) {
        this.ccity = data.result;
      }
    }))
  }

  get_contacType(id){
    for (let i = 0; i < this.ca_contactType.length; i++) {
      if(this.ca_contactType[i].id == id){
        return this.ca_contactType[i].type;
      }
    }
    return id;
  }
  // trae el nombre de la city
  get_city(id) {
    if (this.officeContacts.data[0].idCountry = !undefined && this.officeContacts.data[0].idCity) {
      for (let i = 0; i < this.ccity.length; i++) {
        if(this.ccity[i].id == id){
          return this.ccity[i].name;
        }
      }
      return id;
    }
  }

  get_account(id){
    for (let i = 0; i < this.ca_account.length; i++) {
      if(this.ca_account[i].id == id){
        return this.ca_account[i].accountType;
      }
    }
    return id;
  }

  getDocument(id){
    for (let i = 0; i < this.caDocumentType.length; i++) {
      const element = this.caDocumentType[i];
      if(id == element.id){
        return element.documentType;
      }
    }
  }

  DialogDocumentsLeadClientComponent(data){
    if(data == null){
      data = {id: 0};
    }
    const dialogRef = this._dialog.open(DialogDocumentsLeadClientComponent, {
      data: data, width: '90%'
  });

  dialogRef.afterClosed().subscribe(result => {

     if(result.success){
       result.idOfficeInformation = this.data.id;
       console.log(result);
       this.data.documentOfficeInformations.push(result);
     }

  });
  }

  typename(){
    for (let i = 0; i < this.caTypeOffice.length; i++) {
      const element = this.caTypeOffice[i];
      if(this.data.idTypeOffice == element.id){
        this.data.typeOffice = element.type;
      }
    }
  }

  countryname(){
    for (let i = 0; i < this.caCountry.length; i++) {
      const element = this.caCountry[i];
      if(this.data.idCountry == element.id){
        this.data.country = element.name;
      }
    }
  }

  cityname(){
    for (let i = 0; i < this.ccity.length; i++) {
      const element = this.ccity[i];
      if(this.data.idCity == element.id){
        // this.data.typeOffice = element.state;
        this.data.city = element.city;
      }
    }
  }
  //////////////////////////////////////////////////////////////////////////////////////
  //contacts
  validCountry(data, i) {
    if (this.data.idCountry == undefined) {
      this.active_country = true;
      const dialog = this._dialog.open(DialogGeneralMessageComponent, {
        data: {
          header: "Atention",
          body: "Required a Country"
        },
        width: "350px"
      });
    }
    else {
      this.active_country = false;
      this.dialogContact(data, i);
    }

  }

  dialogContact(contact: any, i){
    let data;
    if(contact == null){
      data= {id : 0, action: "new", idState : this.data.idState };
    }
    else{

      data = {
        action: i,
        id: contact.id,
        idOfficeInformation: contact.idOfficeInformation,
        idContactType: contact.idContactType,
        contactName: contact.contactName,
        tittle: contact.tittle,
        phoneNumber: contact.phoneNumber,
        email: contact.email,
        idCity: contact.idCity,
        idState: this.data.idState,
        idContactTypeNavigation: contact.idContactTypeNavigation,
        idOfficeInformationNavigation: contact.idOfficeInformationNavigation
      };
    }
    console.log('data', data);
    const dialogRef = this._dialog.open(DialogContactsComponent, {
      data: data,
      width: '90%'
  });

  dialogRef.afterClosed().subscribe(result => {
      if(result.success){
        if(result.action == "new"){
          result.idOfficeInformation = this.data.id;
          if(this.data.id == 0){
            this.data.officeContacts.push(result);
          }else{
            this._services.service_general_putnoapi('AddOfficeContact',result).subscribe(r =>{
              if(r.success){
              const dialog = this._dialog.open(DialogGeneralMessageComponent, {
                data: {
                  header: "Success",
                  body: "Inserted data"
                },
                width: "350px"
              });
              }
            })
          }
        }else{
        this._services.service_general_putnoapi('UpdateOfficeContact',result).subscribe(r =>{
          if(r.success){
            const dialog = this._dialog.open(DialogGeneralMessageComponent, {
              data: {
                header: "Success",
                body: "Updated data"
              },
              width: "350px"
            });
          }
        })
        }
        console.log(this.data.officeContacts);
        this.officeContacts = new MatTableDataSource(this.data.officeContacts);
      }
    });
  }

  editWireTransfer(data_, i){
    const dialogRef = this._dialog.open(DialogWireTransferComponent, {
      data: data_,
      width: "95%"
     });

     dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if(result.success){
        this.data.paymentInformationOffices[0].wireTransferPaymentInformationOffices[i] = result;
      }
     })
  }

  addWireTransfer(){
    const dialogRef = this._dialog.open(DialogWireTransferComponent, {
      width: "95%"
     });

     dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if(result.success){
        result.idPaymentInformationOffice = this.data.id;
        if(this.data.paymentInformationOffices[0].wireTransferPaymentInformationOffices){
          this.data.paymentInformationOffices[0].wireTransferPaymentInformationOffices.push(result)
        }else{
          this.data.paymentInformationOffices.push({
            wireTransferPaymentInformationOffices: [result]
          })
        }
        debugger
    }
     })
  }

  //*************************************************************//
  //VALIDACIONES//
  active_type:boolean = false;
  active_comercialName:boolean = false;
  active_legalName:boolean = false;
  active_country :boolean = false;
  active_state :boolean = false;
  active_city :boolean = false;
  active_address :boolean = false;
  active_code: boolean = false;
  active_contact: boolean = false;


  
  valida_form(){
    if(this.data.idTypeOffice == undefined){
      this.active_type = true;
    }
    if(this.data.commercialName == undefined || this.data.commercialName.length == 0){
      this.active_comercialName = true;
    }
    if(this.data.legalName == undefined || this.data.legalName.length == 0){
      this.active_legalName = true;
    }
    if(this.data.idState == undefined){
      this.active_state = true;
    }
    if(this.data.idCountry == undefined){
      this.active_country = true;
    }
    if(this.data.idCity == undefined){
      this.active_city = true;
    }
    if(this.data.currentAddress == undefined || this.data.currentAddress.length == 0){
      this.active_address = true;
    }
    if(this.data.zipCode == undefined || this.data.zipCode.length == 0){
      this.active_code = true;
    }
    if (this.data.officeContacts == undefined || this.data.officeContacts.length == 0) {
      window.scrollTo(0, 350);
      const dialog = this._dialog.open(DialogGeneralMessageComponent, {
        data: {
          header: "Contact",
          body: "Contact Required"
        },
        width: "350px"
      });
      this.active_contact = true;

    }


    if(this.data.idTypeOffice != undefined && this.data.commercialName != undefined && this.data.legalName != undefined
      && this.data.idCountry != undefined && this.data.idState != undefined && this.data.idCity != undefined && this.data.currentAddress != undefined
      &&  this.data.zipCode != undefined  &&  this.data.officeContacts.length != 0){
      this.save();
    }
  }

  save(){
     // extraer el nombre de city ya que al crear una oficina en un NP&C no se obtiene el nombre y hay que mandarlo para que se pinte
     if(this.data.action == 'new'){
      this.ccity.forEach(city => {
        if(city.id == this.data.idCity){
          this.data.city = city.name;
        }
      });
    }
    console.log('data office', this.data);
    this.data.success = true;
    this.dialogRef.close(this.data);
  }
}
