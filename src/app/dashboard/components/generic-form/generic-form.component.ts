import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'generic-form',
  templateUrl: './generic-form.component.html',
  styleUrls: ['./generic-form.component.css'],
})
export class GenericFormComponent implements OnInit {
  @Input() typeForm: 'coment' | 'user' | 'post' | '' = '';
  form!: FormGroup;
  fields: string[] = [];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.createForm();
  }

  // Crear el formulario dinámicamente usando los valores vacíos de FORM_FIELDS
  createForm() {
    // const formControls = this.fields.reduce((acc, field) => {
    //   // Usamos el valor vacío correspondiente para cada campo
    //   const typedKey =
    //     field as keyof (typeof FORM_FIELDS)[typeof this.typeForm];
    //   acc[field] = [FORM_FIELDS[this.typeForm][typedKey]];
    //   return acc;
    // }, {} as Record<string, any>);
    // this.form = this.fb.group(formControls); // Creamos el formulario con FormBuilder
  }

  onSubmit() {
    console.log(this.form.value);
  }
}
