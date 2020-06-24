import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EventosService } from '../../services/eventos.service';
import { RxwebValidators } from '@rxweb/reactive-form-validators';


@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html'
})
export class EventosComponent implements OnInit {

  formEventos:FormGroup;

  urls = [];
  urlPrincipal = null;
  urlCarousel = null;

  eventos = null;

  evento = {
    id_evento:null,
    nombre_evento:null,
    descripcion_evento:null
  }

  constructor(private fb:FormBuilder,
              private router:Router,
              private eventosService:EventosService) {}

  ngOnInit() {
    this.getEventos();
    this.formInit();
  }

  getEventos(){
    this.eventosService.getEventos().subscribe( resultado => this.eventos = resultado);
  }

  formInit(){
    this.formEventos = this.fb.group({
      nombre:['', [Validators.required]],
      fecha: this.fb.group({
        inicio:['', [Validators.required]],
        cierre:['', [Validators.required]],
      }),
      horario: this.fb.group({
        inicio:['', [Validators.required]],
        cierre:['', [Validators.required]],
      }),
      tipo:['', [Validators.required]],
      enlace:['', Validators.required],
      desc:['', [Validators.required]],
      ordenImg:['', Validators.required],
      imgPrincipal:['', [Validators.required, RxwebValidators.image({minHeight:690, maxHeight:2160, minWidth:950, maxWidth:4096})]],
      imgCarousel:['', [Validators.required, RxwebValidators.image({minWidth:1250, maxWidth:4096, minHeight:690, maxHeight:2160})]],
      imgsEvento: ['']
    })
  }

  editarEvento(){
    this.router.navigate(['editar-evento'])
  }

  get validacionNombre(){
    return this.formEventos.get('nombre').invalid && this.formEventos.get('nombre').touched
  }

  get validacionFechaInicio(){
    return this.formEventos.get('fecha.inicio').invalid && this.formEventos.get('fecha.inicio').touched
  }

  get validacionFechaCierre(){
    return this.formEventos.get('fecha.cierre').invalid && this.formEventos.get('fecha.cierre').touched
  }

  get validacionHorarioInicio(){
    return this.formEventos.get('horario.inicio').invalid && this.formEventos.get('horario.inicio').touched
  }

  get validacionHorarioCierre(){
    return this.formEventos.get('horario.cierre').invalid && this.formEventos.get('horario.cierre').touched
  }

  get validacionTipo(){
    return this.formEventos.get('tipo').invalid && this.formEventos.get('tipo').touched
  }

  get validacionEnlace(){
    return this.formEventos.get('enlace').invalid && this.formEventos.get('enlace').touched
  }

  get validacionDesc(){
    return this.formEventos.get('desc').invalid && this.formEventos.get('desc').touched
  }

  get validacionImg(){
    return this.formEventos.get('imgPrincipal').invalid && this.formEventos.get('imgPrincipal').pristine && this.formEventos.get('imgPrincipal').touched
  }

  get validacionImgCarousel(){
    return this.formEventos.get('imgCarousel').invalid && this.formEventos.get('imgCarousel').pristine && this.formEventos.get('imgCarousel').touched
  }

  get validacionTamImg(){
    return this.formEventos.get('imgPrincipal').invalid && this.formEventos.get('imgPrincipal').dirty
  }

  get validacionTamImgCarousel(){
    return this.formEventos.get('imgCarousel').invalid && this.formEventos.get('imgCarousel').dirty
  }

  get validacionOrden(){
    return this.formEventos.get('ordenImg').invalid && this.formEventos.get('ordenImg').touched
  }

  imgPrincipal(event){
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);

      reader.onload = (event:any) => {
        // console.log(event.target.result);
          this.urlPrincipal = event.target.result;
      }
    }
  }

  imgCarousel(event){
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);

      reader.onload = (event:any) => {
        // console.log(event.target.result);
          this.urlCarousel = event.target.result;
      }
    }
  }

  multiImg(event) {

    if (event.target.files && event.target.files[0]) {
        var filesAmount = event.target.files.length;
        for (let i = 0; i < filesAmount; i++) {
          var reader = new FileReader();

          reader.onload = (event:any) => {
            // console.log(event.target.result);
              this.urls.push(event.target.result);
          }
          reader.readAsDataURL(event.target.files[i]);
        }
    }
  }

  borrarImgPrincipal(){
    this.urlPrincipal = null;
    this.formEventos.controls['imgPrincipal'].setValue("")
  }

  borrarImgCarousel(){
    this.urlCarousel = null;
    this.formEventos.controls['imgCarousel'].setValue("")
  }

  borrarImgs( index:number ){
    if (index !== -1) {
      this.urls.splice(index, 1);
    }

    this.formEventos.controls['imgsEvento'].setValue("");
  }

  guardarEvento(){
    console.log(this.formEventos);
    if(this.formEventos.invalid){
      Object.values(this.formEventos.controls).forEach( control =>{

        if(control instanceof FormGroup){
          Object.values(control.controls).forEach( control => control.markAllAsTouched())
        }
        else{
          control.markAllAsTouched();
        }
      });
      return;
    }
  }
}
