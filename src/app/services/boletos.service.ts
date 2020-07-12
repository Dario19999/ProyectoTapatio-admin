import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { retry } from 'rxjs/operators';
import { serialize } from 'object-to-formdata';

@Injectable({
  providedIn: 'root'
})
export class BoletosService {

  // url = "http://proyectotapatio.com/PT-API-P/boletos/";
  url = "http://localhost:8080/PT-API/boletos/";

  constructor(private http:HttpClient) { }

  crearBoleto( boleto:any ){
    const BOLETO_FD = serialize(boleto);
    return this.http.post(`${this.url}crearBoleto.php`, BOLETO_FD).pipe(retry(3))
  }

  crearPromoFecha( datos:any ){
    const PROMO_FECHA_FD = serialize(datos);
    return this.http.post(`${this.url}crearPromoFechas.php`, PROMO_FECHA_FD).pipe(retry(3))
  }

  crearPromoCodigo( datos:any ){
    const PROMO_CODIGO_FD = serialize(datos);
    return this.http.post(`${this.url}crearPromoCodigo.php`, PROMO_CODIGO_FD).pipe(retry(3))
  }

  modificarBoleto( info:number ){
    const INFO_BOLETO_FD = serialize(info);
    return this.http.post(`${this.url}modificarBoleto.php`, INFO_BOLETO_FD).pipe(retry(3))
  }

  getBoletos( id_evento:number ){
    return this.http.get(`${this.url}getBoletos.php?id_evento=${id_evento}`).pipe(retry(3))
  }

  getBoleto( id_boleto:number ){
    return this.http.get(`${this.url}getBoleto.php?id_boleto=${id_boleto}`).pipe(retry(3))
  }

  getPromosCodigo( id_boleto:number ){
    return this.http.get(`${this.url}getPromosCodigo.php?id_boleto=${id_boleto}`).pipe(retry(3))
  }

  getPromosFechas( id_boleto:number ){
    return this.http.get(`${this.url}getPromosFechas.php?id_boleto=${id_boleto}`).pipe(retry(3))
  }
}
