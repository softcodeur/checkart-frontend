import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {User} from '../models/user';
import {environment} from "../../environments/environment";
import {Origine} from '../models/origine';
import {Motif} from '../models/motif';
import {Favoris} from '../models/favoris';
import {Tapis} from '../models/tapis';
import {TapisMotif} from '../models/tapis-motif';
import {TapisOrigine} from '../models/tapis-origine';

let API_URL = "http://localhost:7600/checkart/api/admin";
@Injectable({
  providedIn: 'root'
})
export class AdminService {
  currentUser: User;
  headers: HttpHeaders;
  formData: Tapis = new Tapis();
  tapisMotifs: TapisMotif[] = [];
  tapisOrigines: TapisOrigine[] = [];

  constructor(private http: HttpClient) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.headers = new HttpHeaders({
      authorization:'Bearer ' + this.currentUser.token,
      "Content-Type":"application/json; charset=UTF-8"
    });
  }
   createUser(user: User): Observable<any> {
    return this.http.post(API_URL + "/user-create", JSON.stringify(user),
  {headers: this.headers});
  }

  updateUser(user: User): Observable<any> {
    return this.http.put(API_URL + "/user-update", JSON.stringify(user),
  {headers: this.headers});
  }

  deleteUser(user: User): Observable<any> {
    return this.http.post(API_URL + "/user-delete", JSON.stringify(user),
  {headers: this.headers});
  }



  findAllUsers(): Observable<any> {
    return this.http.get(API_URL + "/user-all",
  {headers: this.headers});
  }

  createOrigine(origine: Origine): Observable<any> {
    return this.http.post(API_URL + "/origine-create", JSON.stringify(origine),
      {headers: this.headers});
  }

  updateOrigine(origine: Origine): Observable<any> {
    return this.http.put(API_URL + "/origine-update", JSON.stringify(origine),
      {headers: this.headers});
  }

  deleteOrigine(origine: Origine): Observable<any> {
    return this.http.post(API_URL + "/origine-delete", JSON.stringify(origine),
      {headers: this.headers});
  }


  findAllOrigines(): Observable<any> {
    return this.http.get(API_URL + "/origine-all",
      {headers: this.headers});
  }



  createMotif(motif: Motif): Observable<any> {
    return this.http.post(API_URL + "/motif-create", JSON.stringify(motif),
      {headers: this.headers});
  }

  updateMotif(motif: Motif): Observable<any> {
    return this.http.put(API_URL + "/motif-update", JSON.stringify(motif),
      {headers: this.headers});
  }

  deleteMotif(motif: Motif): Observable<any> {
    return this.http.post(API_URL + "/motif-delete", JSON.stringify(motif),
      {headers: this.headers});
  }



  findAllMotifs(): Observable<any> {
    return this.http.get(API_URL + "/motif-all",
      {headers: this.headers});
  }


  createTapis(tapis): Observable<any> {
    const uploadImageData = new FormData();
this.formData.tapis_motifs = this.tapisMotifs;
this.formData.tapis_origines = this.tapisOrigines;

    const formdata: FormData = new FormData();

    let body = {
      "nom": tapis.nom,
      "description": tapis.desc   ,
      "taille": tapis.taille  ,
      "couleur":   tapis.couleur,
      "tapis_origines":  this.formData.tapis_origines ,
      "tapis_motifs":  this.formData.tapis_motifs  ,
      "uri":tapis.image ,
    }

    formdata.append("nom", tapis.nom );

    formdata.append("description",tapis.desc  );

    formdata.append("taille", tapis.taille  );
    formdata.append("couleur",  tapis.couleur  );

    formdata.append("tapis_origines", JSON.stringify(this.formData.tapis_origines));

    formdata.append("tapis_motifs",    JSON.stringify(this.formData.tapis_motifs));
    formdata.append("image", tapis.image  );




    console.log("BBbBBB");
    console.log(formdata);

    return this.http.post(API_URL + "/tapis-create", formdata,
      {headers: this.headers});
  }

  updateTapis(tapis: Tapis): Observable<any> {
    return this.http.put(API_URL + "/tapis-update", JSON.stringify(tapis),
      {headers: this.headers});
  }

  deleteTapis(tapis: Tapis): Observable<any> {
    return this.http.post(API_URL + "/tapis-delete", JSON.stringify(tapis),
      {headers: this.headers});
  }



  findAllTapis(): Observable<any> {
    return this.http.get(API_URL + "/tapis-all",
      {headers: this.headers});
  }



  createFavoris(favoris: Favoris): Observable<any> {
    return this.http.post(API_URL + "/favoris-create", JSON.stringify(favoris),
      {headers: this.headers});
  }

  updateFavoris(favoris: Favoris): Observable<any> {
    return this.http.put(API_URL + "/favoris-update", JSON.stringify(favoris),
      {headers: this.headers});
  }

  deleteFavoris(favoris: Favoris): Observable<any> {
    return this.http.post(API_URL + "/favoris-delete", JSON.stringify(favoris),
      {headers: this.headers});
  }


  findAllFavoris(): Observable<any> {
    return this.http.get(API_URL + "/favoris-all",
      {headers: this.headers});
  }





}