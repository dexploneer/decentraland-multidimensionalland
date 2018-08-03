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
