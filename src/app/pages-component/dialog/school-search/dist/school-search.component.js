"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.SchoolSearchComponent = void 0;
var core_1 = require("@angular/core");
var dialog_1 = require("@angular/material/dialog");
var dialog_school_details_component_1 = require("../dialog-school-details/dialog-school-details.component");
var general_confirmation_component_1 = require("../general-confirmation/general-confirmation.component");
var general_message_component_1 = require("../general-message/general-message.component");
var loader_1 = require("app/shared/loader");
var dialog_deletepaymentconcept_component_1 = require("../dialog-deletepaymentconcept/dialog-deletepaymentconcept.component");
var dialog_addchild_component_1 = require("../dialog-addchild/dialog-addchild.component");
var dialog_documents_view_component_1 = require("../dialog-documents-view/dialog-documents-view.component");
var dialog_request_payment_new_component_1 = require("../dialog-request-payment-new/dialog-request-payment-new.component");
var dialog_documents_relocation_component_1 = require("../dialog-documents-relocation/dialog-documents-relocation.component");
var SchoolSearchComponent = /** @class */ (function () {
    function SchoolSearchComponent(dialogRef, data, _services, _dialog) {
        this.dialogRef = dialogRef;
        this.data = data;
        this._services = _services;
        this._dialog = _dialog;
        //****************************************************//
        //VARIABLES//
        this.vista = false;
        this.ca_requestType = [];
        this.school_search = {};
        this.calculo = {};
        this.user = {};
        this.temporalDocument = [];
        this.payments = [];
        //TABLE SCHOOL INFORMATION//
        this.dataSourceSchool = [];
        this.displayedColumnsSchool = ['School No.', 'School Name', 'Dependent', '$ Per Month', 'Currency', 'Schooling Status', 'Actions'];
        //TABLE REQUEST PAYMENT//
        this.dataSourcePayment = [];
        //EXTENSION//
        this.dataSource = [];
        this.displayedColumns = ['Authorized By', 'Autho Date', 'Autho Acceptance Date', 'Time'];
        this.displayedColumnsPayment = ['Payment', 'Amount', 'ManagementFee', 'WireFee', "AdvanceFee", 'Service', 'Recurrence', 'action'];
        //LOADER//
        this.__loader__ = new loader_1.LoaderComponent();
        this.cr = "Reply";
        //***************************************************************************//
        //CONSULTA CATALOGOS//
        this.ca_privacy = [];
    }
    //***************************************************************************//
    SchoolSearchComponent.prototype.ngOnInit = function () {
        this.__loader__.showLoader();
        console.log("DATA DE LA TABLA: ", this.data);
        this.user = JSON.parse(localStorage.getItem('userData'));
        this.get_catalogos();
    };
    SchoolSearchComponent.prototype.get_catalogos = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c, _d, _e, _f;
            var _this = this;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        this.__loader__.showLoader();
                        //this.ca_document = await this._services.getCatalogueFrom('GetDocumentType');
                        this._services.service_general_get('Catalogue/GetDocumentType/1').subscribe((function (data) {
                            if (data.success) {
                                _this.ca_document = data.result;
                                console.log(_this.ca_document);
                            }
                        }));
                        //this.ca_estatus = await this._services.getCatalogueFrom('GetStatus');
                        this._services.service_general_get("Catalogue/GetStatusWorkOrder?category=15").subscribe((function (data) {
                            console.log(data);
                            if (data.success) {
                                _this.ca_estatus = data.result;
                            }
                        }));
                        _a = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetPrivacy')];
                    case 1:
                        _a.ca_privacy = _g.sent();
                        _b = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetRequestType')];
                    case 2:
                        _b.ca_requestType = _g.sent();
                        _c = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetRelationship')];
                    case 3:
                        _c.relation_ship = _g.sent();
                        _d = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetLanguages')];
                    case 4:
                        _d.languages = _g.sent();
                        _e = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetCountry')];
                    case 5:
                        _e.nacionality = _g.sent();
                        _f = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetGradeSchooling')];
                    case 6:
                        _f.grade = _g.sent();
                        this._services.service_general_get('RelocationServices/GetSchoolingSearchById?id=' + this.data.data.service[0].id).subscribe((function (data) {
                            console.log('id', _this.data.data.service[0].id);
                            if (data.success) {
                                console.log('DATA CONSULTA SCHOOL SEARCH: ', data);
                                _this.school_search = data.result;
                                _this.vista = true;
                                //this.dataSourceSchool = this.school_search.schoolingInformations;
                                _this.dataSource = _this.school_search.extensionSchoolingSearches;
                                if (_this.school_search.commentSchoolingSearches.length == 0) {
                                    _this.addReply();
                                }
                                console.log('data school', _this.school_search);
                                _this.get_payment();
                                _this.getDataSchool();
                            }
                        }));
                        this.__loader__.hideLoader();
                        return [2 /*return*/];
                }
            });
        });
    };
    //**********************************************************************************//
    //**METHODS PAYMENTS (NEW PAYMENT)**//
    SchoolSearchComponent.prototype.addPayment = function (data) {
        var _this = this;
        console.log('workOrderServicesId', this.school_search.workOrderServicesId);
        if (data == null) {
            data = {
                serviceRecord: this.data.data.serviceRecordId,
                sr: this.data.data.serviceRecordId,
                workOrderServices: this.school_search.workOrderServicesId,
                workOrder: this.data.data.workOrderId,
                service: this.data.data.id_server,
                id: 0,
                type: 2,
                supplierType: 3
            };
        }
        else {
            data.type = 2;
            data.supplierType = 3;
            data.id = data.requestPaymentId;
            data.serviceRecord = this.data.data.serviceRecordId;
            data.sr = this.data.data.serviceRecordId;
            data.service = this.data.data.id_server;
        }
        console.log("Data al abrir modal de payment concept: ", data);
        var dialogRef = this._dialog.open(dialog_request_payment_new_component_1.DialogRequestPaymentNewComponent, {
            data: data,
            width: "95%"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            _this.get_payment();
            ;
        });
    };
    //**EDIT REQUEST PAYMENT**//
    SchoolSearchComponent.prototype.editPayment = function (data) {
        var _this = this;
        data.type = 2;
        data.supplierType = 3;
        data.id = data.requestPaymentId;
        data.serviceRecord = this.data.data.serviceRecordId;
        data.sr = this.data.data.serviceRecordId;
        data.service = this.data.data.id_server;
        var dialogRef = this._dialog.open(dialog_request_payment_new_component_1.DialogRequestPaymentNewComponent, {
            data: data,
            width: "95%"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            _this.get_payment();
        });
    };
    //**CONSULTA PAYMENT**//
    SchoolSearchComponent.prototype.get_payment = function () {
        var _this = this;
        console.log('Extracion de datos');
        this._services.service_general_get("RequestPayment/GetRequestedPayments?WorkOrderServicesId=" + this.school_search.workOrderServicesId).subscribe((function (data) {
            if (data.success) {
                console.log('datos de tabla request', data);
                _this.calculo = data.result.value;
                _this.calculo.total = _this.calculo.ammountSubTotal + _this.calculo.managementFeeSubTotal + _this.calculo.wireFeeSubTotal + _this.calculo.advanceFeeSubTotal;
                _this.payments = data.result.value.payments;
                // console.log('datos de la tabla' + data.result.value.payments);
            }
            console.log('2° datos de la tabla' + _this.payments);
        }));
    };
    SchoolSearchComponent.prototype.deletePaymentConcept = function (data) {
        var _this = this;
        var dialogRef = this._dialog.open(dialog_deletepaymentconcept_component_1.DialogDeletepaymentconceptComponent, {
            width: "20%"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log(result);
            if (result.success) {
                _this._services.service_general_delete("RequestPayment/DeletePaymentConcept/" + data.id + "/" + result.type).subscribe((function (data) {
                    if (data.success) {
                        var dialog = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                            data: {
                                header: "Success",
                                body: data.message
                            },
                            width: "350px"
                        });
                        _this.get_payment();
                        ;
                    }
                }));
            }
        });
    };
    //**********************************************************************************//
    //**METHODS COMMENTS (NEW)**//
    SchoolSearchComponent.prototype.addReply = function () {
        console.log(this.user);
        this.school_search.commentSchoolingSearches.push({
            "id": 0,
            "schoolingSearchId": this.school_search.id,
            "reply": null,
            "userId": this.user.id,
            "createdBy": this.user.id,
            "createdDate": new Date(),
            "updateBy": this.user.id,
            "updatedDate": new Date(),
            "user": this.user
        });
        if (this.school_search.commentSchoolingSearches.length == 1) {
            this.cr = "Comment";
        }
        else {
            this.cr = "Reply";
        }
    };
    //**********************************************************************************//
    //**METHODS ADD DOCUMENT**//
    SchoolSearchComponent.prototype.addDocument = function () {
        var _this = this;
        this.data.typeDocument = 1;
        this.data.location = this.data.data.location;
        var dialogRef = this._dialog.open(dialog_documents_relocation_component_1.DialogDocumentsRelocationComponent, {
            width: "95%",
            data: this.data
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log(result);
            if (result.success) {
                result.schoolingSearchId = _this.school_search.id;
                _this.temporalDocument.push(result);
            }
        });
    };
    //**********************************************************************************//
    //**DELETE DOCUMENTO FROM DATABASE**//
    SchoolSearchComponent.prototype.deleteDocument_DB = function (id) {
        var _this = this;
        var dialogRef = this._dialog.open(general_confirmation_component_1.GeneralConfirmationComponent, {
            data: {
                header: "Delete confirmation",
                body: "Are you sure to delete this document?"
            },
            width: "350px"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log(result);
            if (result) {
                _this._services.service_general_delete("RelocationServices/DeleteDocumentSS?id=" + id).subscribe((function (data) {
                    if (data.success) {
                        var dialog = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                            data: {
                                header: "Success",
                                body: data.result
                            },
                            width: "350px"
                        });
                        _this.ngOnInit();
                    }
                }));
            }
        });
    };
    //**********************************************************************************//
    //**DELETE DOCUMENT FROM VAR TEMPORALS**//
    SchoolSearchComponent.prototype.deleteDocument_LOCAL = function (position) {
        var _this = this;
        var dialogRef = this._dialog.open(general_confirmation_component_1.GeneralConfirmationComponent, {
            data: {
                header: "Delete confirmation",
                body: "Are you sure to delete this document?"
            },
            width: "350px"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log(result);
            if (result) {
                _this.temporalDocument.splice(position, 1);
            }
        });
    };
    //**********************************************************************************//
    //**METHODS REMINDER (NEW)**//
    SchoolSearchComponent.prototype.addReminder = function () {
        this.school_search.reminderSchoolingSearches.push({
            "id": 0,
            "schoolingSearchId": this.school_search.id,
            "reminderDate": null,
            "reminderComments": null,
            "createdBy": this.user.id,
            "createdDate": new Date()
        });
    };
    //**DELETE REMINDER**//
    SchoolSearchComponent.prototype.removeReminder = function (i, id) {
        var _this = this;
        var dialogRef = this._dialog.open(general_confirmation_component_1.GeneralConfirmationComponent, {
            data: {
                header: "Delete confirmation",
                body: "Are you sure to delete Reminder?"
            },
            width: "350px"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log(result);
            if (result) {
                if (id == 0) {
                    _this.school_search.reminderSchoolingSearches.splice(i, 1);
                }
                else {
                    _this._services.service_general_delete("RelocationServices/DeleteReminderSS?id=" + id).subscribe((function (data) {
                        if (data.success) {
                            var dialog = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                                data: {
                                    header: "Success",
                                    body: "Reminder deleted"
                                },
                                width: "350px"
                            });
                            _this.ngOnInit();
                        }
                    }));
                }
            }
        });
    };
    //**********************************************************************************//
    SchoolSearchComponent.prototype.getDataSchool = function () {
        var _this = this;
        //BRING DATA TABLE SCHOOLING LIST//
        this._services.service_general_get('SchoolsList/GetAllSchool?sr=' + Number(this.data.sr)).subscribe((function (data_schooling_list) {
            console.log('DATA CONSULTA SCHOOLING LIST: ', data_schooling_list);
            if (data_schooling_list.success) {
                //console.log('DATA CONSULTA SCHOOLING LIST: ',data_schooling_list);
                _this.dataSourceSchool = data_schooling_list.message;
                //BRING DATA TABLE PAYMENTS/
                _this.getDependent();
                _this.get_payment();
            }
        }));
    };
    //AGREGAR ESCUELA//
    SchoolSearchComponent.prototype.addSchool = function () {
        var _this = this;
        var data_ = {
            id: 0,
            workOrderId: this.data.data.workOrderId,
            service: this.data.data.serviceRecordId,
            serviceTypeId: this.data.data.serviceTypeId,
            sr: this.data.sr
        };
        var dialogRef = this._dialog.open(dialog_school_details_component_1.DialogSchoolDetailsComponent, {
            data: data_,
            width: "95%"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            _this.getDataSchool();
        });
    };
    //EDITAR ESCUELA//
    SchoolSearchComponent.prototype.editSchool = function (data_, tipo) {
        var _this = this;
        if (tipo == 1) {
            data_ = {
                id: data_,
                sr: Number(this.data.sr)
            };
        }
        else {
            data_.sr = Number(this.data.sr);
        }
        console.log("Editar escuela: ", data_);
        var dialogRef = this._dialog.open(dialog_school_details_component_1.DialogSchoolDetailsComponent, {
            data: data_,
            width: "95%"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            _this.getDataSchool();
        });
    };
    //**********************************************************************************//
    SchoolSearchComponent.prototype.getDependent = function () {
        var _this = this;
        this.school_search.schoolingInformations.forEach(function (E) {
            for (var i = 0; i < _this.dataSourceSchool.length; i++) {
                if (E.name == _this.dataSourceSchool[i].name && _this.dataSourceSchool[i].status == 'Permente School') {
                    _this._services.service_general_get("SchoolsList/GetSchool?key=" + _this.dataSourceSchool[i].id).subscribe((function (data) {
                        console.log(data);
                        if (data.success) {
                            E.school = data.result;
                        }
                    }));
                }
            }
        });
        console.log("OBJETO FINALLLLLLL: ", this.school_search);
    };
    //**********************************************************************************//
    //RELATION SHIP//
    SchoolSearchComponent.prototype.getNameRelationShip = function (id) {
        for (var i = 0; i < this.relation_ship.length; i++) {
            if (this.relation_ship[i].id == id) {
                return this.relation_ship[i].relationship;
            }
        }
    };
    //LANGUAGES//
    SchoolSearchComponent.prototype.getLanguages = function (id) {
        if (id != null) {
            for (var i = 0; i < this.languages.length; i++) {
                if (this.languages[i].id == id.id) {
                    return this.languages[i].name;
                }
            }
        }
        else {
            return "--";
        }
    };
    //NACIONALITY//
    SchoolSearchComponent.prototype.getNacionality = function (id) {
        if (id != null && id.id != undefined) {
            for (var i = 0; i < this.nacionality.length; i++) {
                if (this.nacionality[i].id == id.id) {
                    return this.nacionality[i].name;
                }
            }
        }
        else {
            for (var i = 0; i < this.nacionality.length; i++) {
                if (this.nacionality[i].id == id) {
                    return this.nacionality[i].name;
                }
            }
        }
    };
    //GRADE//
    SchoolSearchComponent.prototype.getGrade = function (id) {
        for (var i = 0; i < this.grade.length; i++) {
            if (this.grade[i].id == id) {
                return this.grade[i].grade;
            }
        }
    };
    //DOCUMENT TYPE//
    SchoolSearchComponent.prototype.getDocument = function (id) {
        for (var i = 0; i < this.ca_document.length; i++) {
            if (this.ca_document[i].id == id) {
                return this.ca_document[i].documentType;
            }
        }
    };
    //**********************************************************************************//
    //ELIMINAR HIJO//
    SchoolSearchComponent.prototype.deleteChild = function (pos) {
        this.school_search.schoolingInformations[pos].active = false;
    };
    //AGREGAR HIJO//
    SchoolSearchComponent.prototype.addChild = function () {
        var _this = this;
        if (this.school_search.schoolingInformations.length > 0) {
            var dialogRef = this._dialog.open(dialog_addchild_component_1.DialogAddchildComponent, {
                width: "350px",
                data: this.school_search.schoolingInformations
            });
            dialogRef.afterClosed().subscribe(function (result) {
                _this.school_search.schoolingInformations = result;
                console.log("NUEVOS HIJOS: ", _this.school_search);
            });
        }
        else {
            var dialog = this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                data: {
                    header: "Attention",
                    body: "No data child"
                },
                width: "350px"
            });
        }
    };
    //**********************************************************************************//
    SchoolSearchComponent.prototype.save = function () {
        var _this = this;
        this.__loader__.showLoader();
        this.school_search.documentSchoolingSearches = this.temporalDocument;
        this.school_search.updateBy = this.user.id;
        this.school_search.updatedDate = new Date();
        this.school_search.createdBy = this.user.id;
        this.school_search.createdDate = new Date();
        var data_comment_aux = this.school_search.commentSchoolingSearches;
        this.school_search.commentSchoolingSearches = [];
        for (var i = 0; i < data_comment_aux.length; i++) {
            if (data_comment_aux[i].reply != null && data_comment_aux[i].reply != undefined && data_comment_aux[i].reply.trim() != '') {
                this.school_search.commentSchoolingSearches.push(data_comment_aux[i]);
            }
        }
        console.log("SAVE INFORMATION: ", this.school_search);
        this.temporalDocument = [];
        this._services.service_general_put("RelocationServices/PutSchoolingSearch", this.school_search).subscribe((function (data) {
            if (data.success) {
                console.log(data);
                _this.__loader__.hideLoader();
                var dialog = _this._dialog.open(general_message_component_1.DialogGeneralMessageComponent, {
                    data: {
                        header: "Success",
                        body: "Update Data"
                    },
                    width: "350px"
                });
                _this.dialogRef.close();
                _this.ngOnInit();
            }
        }));
    };
    SchoolSearchComponent.prototype.showDocumentDialogDetails = function (document, service_line) {
        if (service_line === void 0) { service_line = undefined; }
        var dialogRef = this._dialog.open(dialog_documents_view_component_1.DialogDocumentsView, {
            width: "95%",
            data: {
                sr_id: this.data.sr,
                document: document,
                sl: 1,
                name_section: "only_one_service"
            }
        });
    };
    //PRIVACY//
    SchoolSearchComponent.prototype.getPrivacyName = function (id) {
        for (var i = 0; i < this.ca_privacy.length; i++) {
            if (this.ca_privacy[i].id == id) {
                return this.ca_privacy[i].privacy;
                // return this.applicant[i].name + ' / ' + this.applicant[i].relationship;
            }
        }
    };
    SchoolSearchComponent = __decorate([
        core_1.Component({
            selector: 'app-school-search',
            templateUrl: './school-search.component.html',
            styleUrls: ['./school-search.component.scss']
        }),
        __param(1, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], SchoolSearchComponent);
    return SchoolSearchComponent;
}());
exports.SchoolSearchComponent = SchoolSearchComponent;
