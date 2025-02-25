import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogService } from '../../services/dialog.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'generic-form',
  templateUrl: './generic-form.component.html',
  styleUrls: ['./generic-form.component.css'],
})
export class GenericFormComponent implements OnChanges {
  @Input() data: any = {};
  @Input() onSubmitFunction!: any;

  @Input() isCreation: boolean = false;

  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogService: DialogService,
    private toastService: ToastService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.createForm();
    }
  }

  createForm() {
    const excludedFields = ['id', 'posts', 'comments'];

    const formControls = Object.keys(this.data)
      .filter((field) => !excludedFields.includes(field))
      .reduce((acc, field) => {
        acc[field] = [
          this.isCreation ? '' : this.data[field] || '',
          Validators.required,
        ];
        return acc;
      }, {} as Record<string, any>);

    this.form = this.fb.group(formControls);
  }

  onSubmit() {
    if (this.form.valid && this.onSubmitFunction) {
      const formData = this.form.value;

      if (this.isCreation) {
        this.onSubmitFunction(formData);
      } else {
        this.onSubmitFunction(this.data['id'], formData);
      }

      if (this.isCreation) {
        this.form.reset();
      }
    } else {
      this.toastService.showToast('Error al completar los campos', 'error');
    }
  }

  editElement = () => {
    this.dialogService.openDialog(
      `${this.isCreation ? 'Crear Elemento' : 'Editar Elemento'}`,
      `${
        this.isCreation
          ? '¿Seguro que quieres crear el elemento?'
          : '¿Seguro que quieres editar el elemento?'
      }`,
      'Eliminar',
      'Cancelar',
      () => {
        this.onSubmit();
      },
      `${
        this.isCreation
          ? 'Se ha creado el elemento exitosamente'
          : 'Se ha editado el elemento correctamente'
      }`,
      'success'
    );
  };

  objectKeys(obj: { [key: string]: any }): string[] {
    return Object.keys(obj);
  }
}
