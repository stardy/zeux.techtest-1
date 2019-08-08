import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Asset, AssetType} from "../my-assets/my-assets.component";

@Injectable()
export class AssetService {
  constructor(private http: HttpClient) {
  }

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  public getTypes(): Observable<Array<AssetType>> {
    const uriAssetTypes = '/api/asset/GetTypes';

    return this.http.get<Array<AssetType>>(uriAssetTypes, this.httpOptions);
  }

  public getItems(type?: string): Observable<Array<Asset>> {
    const uriAsset = '/api/asset/Get/' + type;
    return this.http.get<Array<Asset>>(uriAsset, this.httpOptions)
  }
}
