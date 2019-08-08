import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, NavigationEnd} from '@angular/router';
import {AssetService} from "../services/asset.service";

@Component({
  selector: 'app-my-assets',
  templateUrl: './my-assets.component.html',
  styleUrls: ['./my-assets.component.scss']
})
export class MyAssetsComponent implements OnInit {

  public assetTypes: Array<AssetType>;
  public assets: Array<Asset>;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private assetService: AssetService) {
  }

  ngOnInit() {
    this.reloadAssets();

    this.assetService.getTypes()
      .subscribe((dataAssetTypes: Array<AssetType>) => {
        this.assetTypes = dataAssetTypes;
      });

    this.router.events
      .subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.reloadAssets();
        }
      });
  }

  reloadAssets() {
    this.route.data.subscribe((assets) => {
      this.assets = assets.data;
    });
  }

}

export class AssetType {
  constructor(
    public id: number,
    public name: string) {
  }
}

export class Asset {
  constructor(
    public id: number,
    public name: string,
    public percent: number,
    public sum: number,
    public type: AssetType,
    public assetTypeName: string) {
  }
}
