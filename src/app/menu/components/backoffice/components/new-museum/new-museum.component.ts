import { MatSnackBar } from '@angular/material/snack-bar';
import { MuseumService } from 'src/app/services/museum.service';
import { Museum } from './../../../../../interfaces/museum';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

const regexCNPJ = "([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})"
const justNumbers = "^[0-9]*$"
const regexCEP = "[0-9]{5}-[0-9]{3}"

@Component({
  selector: 'app-new-museum',
  templateUrl: './new-museum.component.html',
  styleUrls: ['./new-museum.component.scss']
})
export class NewMuseumComponent implements OnInit {

  museumForm!: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private museumService: MuseumService,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.museumForm = this.formBuilder.group({
      name: ["", [Validators.required, Validators.maxLength(25), Validators.minLength(3)]],
      CNPJ: ["", [Validators.required, Validators.pattern(regexCNPJ)]],
      CEP: ["", [Validators.required, Validators.pattern(regexCEP)]],
      address: ["", [Validators.required]],
      numberAddress: ["", [Validators.required, Validators.pattern(justNumbers)]],
      complementAddress: [""],
      districtAddress: ["", [Validators.required, Validators.minLength(3)]],
      cityAddress: ["", [Validators.required, Validators.minLength(3)],],
      stateAddress: ["", [Validators.required]],
      description: ["", [Validators.required, Validators.maxLength(500)]]
    })
  }


  submitMuseum() {
    if (this.museumForm.valid) {
      const newMuseum: Museum = {
        name: this.museumForm.get("name")?.value,
        document: this.museumForm.get("CNPJ")?.value,
        address: {
          address: this.museumForm.get("address")?.value,
          numberAddress: this.museumForm.get("numberAddress")?.value,
          districtAddress: this.museumForm.get("districtAddress")?.value,
          complementAddress: this.museumForm.get("complementAddress")?.value,
          cityAddress: this.museumForm.get("cityAddress")?.value,
          stateAddress:  this.museumForm.get("stateAddress")?.value,
          CEP: this.museumForm.get("CEP")?.value
        },
        numberOfArtifacts: 10.000,
        description: this.museumForm.get("description")?.value
      }
      console.log(newMuseum)
      try {
        this.museumService.newMuseum(newMuseum).subscribe({
          next: res => this.snackbar.open(`O museu ${res.name} está sendo criado...`, "okay"),
          error: error => {
            const message = error.error.message
            this.snackbar.open(message, "okay")
          },
          complete: () => this.snackbar.open("Museu criado com sucesso", "okay")
        })
      } catch (error) {
        console.log(error)
      }
    }
  }

  get nameErrors() {
    return this.museumForm.get("name")?.errors
  }
  get cnpjErrors() {
    return this.museumForm.get("CNPJ")?.errors
  }
  get addressErrors() {
    return this.museumForm.get("address")?.errors
  }
  get numberAddressErrors() {
    return this.museumForm.get("numberAddress")?.errors
  }
  get districtAddressErrors() {
    return this.museumForm.get("districtAddress")?.errors
  }
  get complementAddressErrors() {
    return this.museumForm.get("complementAddress")?.errors
  }
  get cityAddressErrors() {
    return this.museumForm.get("cityAddress")?.errors
  }
  get stateAddressErrors() {
    return this.museumForm.get("stateAddress")?.errors
  }
  get cepErrors() {
    return this.museumForm.get("CEP")?.errors
  }
  get descriptionErrors() {
    return this.museumForm.get("description")?.errors
  }
}
