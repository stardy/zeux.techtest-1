import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from "@angular/router";
import {Asset} from "./my-assets.component";
import {AssetService} from "../services/asset.service";
import {from} from "rxjs";
import {map} from "rxjs/operators";

@Injectable()
export class MyAssetsResolver implements Resolve<Array<Asset>> {

  private _cachedRequest: Promise<Array<Asset>>;

  private _filterAssetsByType(data: Array<Asset>, type: string) {
    type = type.toLocaleLowerCase();

    if (type == 'all') return data;
    return data.filter(x => x.assetTypeName.toLocaleLowerCase() == type);
  }

  constructor(private assetService: AssetService) {
  }

  resolve(route: ActivatedRouteSnapshot) {
    if (!this._cachedRequest) {
      this._cachedRequest = this.assetService.getItems('all').toPromise();
    }

    return from(this._cachedRequest).pipe(map(x => this._filterAssetsByType(x, route.paramMap.get('type'))));
  }

}
