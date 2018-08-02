import * as DCL from 'metaverse-api'
import { ControlPanel } from 'src/ControlPanel'

let list = require('customscene.json').scene.lands;
let index = -1;

let lands:any = [];

for(const i of Object.keys(list)){
    lands.push(list[i]);
    lands[lands.length - 1].key = i;
}

let Land:any = null;

export default class MultidimensionalScene extends DCL.ScriptableScene<any, any> {

  createLand() {
    Land = require("./list/" + lands[index].key + "/Land").Land;
    Land = new Land({ scene: this, data: lands[index] });
    console.log(lands[index]);
  }
  
  sceneDidMount() {
    this.eventSubscriber.on('controlpanel_upbutton_click', () => {
        if(index >= lands.length - 1) return;
        if(Land && Land.unmount){
          Land.unmount();
        }

        index++;
        
        this.createLand();

        if(Land)this.forceUpdate();
    });

    this.eventSubscriber.on('controlpanel_downbutton_click', () => {
        if(index <= 0) return;
        if(Land && Land.unmount){
          Land.unmount();
        }

        index--;

        this.createLand();

        if(Land)this.forceUpdate();
    });
  }

  sceneWillUnmount() {

  }

  async render() { 
    return (
      <scene>
        <ControlPanel position={{ x: 10, y: 2, z: 0.1 }} scale={{ x: 0.6, y: 0.6, z: 0.1 }}/>
        { Land ? Land.render() : null }
      </scene>
    )
  }
}

/*
    "0ab4ce6e-5e95-473b-94a6-695c10b7a8c8": true,
    "09b9a22b-9d00-46d5-8a2a-8d0894c510cc": true,
    "04e3392f-1981-48f1-b6c6-ba3446ad3b79": true,
    "d8427b56-f960-455e-b6cb-70277fa06a44": true,
    "545d2771-387b-4631-a0e9-30fe69318fcf": true,
    "edc3080f-0eab-479f-873f-7fb5c301ab2e": true,
    "3d81cb61-829d-46c8-bcb8-d010c4ab7b97": true
*/
