import {Component, ElementRef, TemplateRef, ViewChild} from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {FormBuilder, Validators} from "@angular/forms";
import {RequestService} from "../../services/request.service";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  constructor(private dialog: MatDialog,
              private router: Router,
              private fb: FormBuilder,
              private requestService: RequestService) {
  }

  @ViewChild('popupPhone') popupPhone!: TemplateRef<ElementRef>;
  @ViewChild('popup') popup!: TemplateRef<ElementRef>;
  dialogRef: MatDialogRef<any> | null = null;
  openPhonePopup() {
    this.dialogRef = this.dialog.open(this.popupPhone);
  }

  closePopup() {
    this.dialogRef?.close();
    this.router.navigate(['/']);
  }

  serviceForm = this.fb.group({
    name: ['', [Validators.required, Validators.pattern(/^([А-ЯA-Z][а-яa-zА-ЯA-Z\-]{1,})?(\s[А-ЯA-Z][а-яa-zА-ЯA-Z\-]{1,})?(\s[А-ЯA-Z][а-яa-zА-ЯA-Z\-]{1,})?$/)]],
    phone: ['', [Validators.required, Validators.pattern(/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{11}$/)]],
    service: [' '],
    type: ['consultation'],
  })

  submitConsultation() {
    if (this.serviceForm.value.name && this.serviceForm.value.phone && this.serviceForm.value.service && this.serviceForm.value.type) {
      this.requestService.getNewRequestPhone(this.serviceForm.value.name, this.serviceForm.value.phone, this.serviceForm.value.service, this.serviceForm.value.type)
        .subscribe(() => {
          this.dialogRef?.close();
          this.dialogRef = this.dialog.open(this.popup);
        })
    }
  }
}
