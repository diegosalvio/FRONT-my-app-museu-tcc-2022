import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MuseumService } from 'src/app/services/museum.service';
import { Museum } from 'src/app/interfaces/museum';

const regexCNPJ = "([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})"
const justNumbers = "^[0-9]*$"
const regexCEP = "[0-9]{5}-[0-9]{3}"

@Component({
  selector: 'app-edit-museum',
  templateUrl: './edit-museum.component.html',
  styleUrls: ['./edit-museum.component.scss']
})
export class EditMuseumComponent implements OnInit {

  editMuseumForm!: FormGroup
  idMuseum: string | undefined = ''

  constructor(
    private fb: FormBuilder,
    private museumService: MuseumService,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.editMuseumForm = this.fb.group({
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
    this.getMuseum()
    this.editMuseumForm.disable()
  }

  getMuseum() {
    this.museumService.getOneMuseumByName('masp').subscribe({
      next: (res) => {
        this.editMuseumForm.patchValue({
          name: res.name,
          CNPJ: res.document,
          description: res.description,
          CEP: res.address.CEP,
          address: res.address.address,
          numberAddress: res.address.numberAddress,
          complementAddress: res.address.complementAddress,
          districtAddress: res.address.districtAddress,
          cityAddress: res.address.cityAddress,
          stateAddress: res.address.stateAddress
        })
        this.idMuseum = res._id
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  editInput(control: string) {
    this.editMuseumForm.get(control)?.enable()
  }

  submitEditMuseum() {
    if (this.editMuseumForm.valid) {
      const editedMuseum: Museum = {
        name: this.editMuseumForm.get("name")?.value,
        document: this.editMuseumForm.get("CNPJ")?.value,
        address: {
          address: this.editMuseumForm.get("address")?.value,
          numberAddress: this.editMuseumForm.get("numberAddress")?.value,
          districtAddress: this.editMuseumForm.get("districtAddress")?.value,
          complementAddress: this.editMuseumForm.get("complementAddress")?.value,
          cityAddress: this.editMuseumForm.get("cityAddress")?.value,
          stateAddress:  this.editMuseumForm.get("stateAddress")?.value,
          CEP: this.editMuseumForm.get("CEP")?.value
        },
        description: this.editMuseumForm.get("description")?.value
      }
      console.log(editedMuseum)
      this.museumService.updateMuseum(this.idMuseum, editedMuseum).subscribe({
        next: (res) => {
          console.log("Museu editado: ", res)
        },
        error: error => console.log(error),
        complete: () => {
          this.snackbar.open("Edições feitas com sucesso!", "fechar", {
            duration: 2000
          })
        }
      })
    }
  }

  get nameErrors() {
    return this.editMuseumForm.get("name")?.errors
  }
  get cnpjErrors() {
    return this.editMuseumForm.get("CNPJ")?.errors
  }
  get addressErrors() {
    return this.editMuseumForm.get("address")?.errors
  }
  get numberAddressErrors() {
    return this.editMuseumForm.get("numberAddress")?.errors
  }
  get districtAddressErrors() {
    return this.editMuseumForm.get("districtAddress")?.errors
  }
  get complementAddressErrors() {
    return this.editMuseumForm.get("complementAddress")?.errors
  }
  get cityAddressErrors() {
    return this.editMuseumForm.get("cityAddress")?.errors
  }
  get stateAddressErrors() {
    return this.editMuseumForm.get("stateAddress")?.errors
  }
  get cepErrors() {
    return this.editMuseumForm.get("CEP")?.errors
  }
  get descriptionErrors() {
    return this.editMuseumForm.get("description")?.errors
  }
}
