import * as DCL from 'metaverse-api'
import { Vector3Component } from 'metaverse-api';

interface IProps {
    scene:DCL.ScriptableScene,
    data:any
}

interface IState {
  position: Vector3Component,
  scale: Vector3Component,
  rotation: Vector3Component,
  infoRotation: number
}

let defaultScene:DCL.ScriptableScene;
let defaultData:any;

export class Land {
   props:IProps = { scene: defaultScene, data: defaultData };  
   state:IState = {
     position: { x: 10, y: 0.175, z: 9 },
     scale: { x: 0.28, y: 0.28, z: 0.28 },
     rotation: { x: 0, y: 0, z: 0 },
     infoRotation: 0
   }
   
   initialized:boolean = false;
   loop:number = 0;

    constructor(props:IProps) {
       this.props = props; 
       this.props.scene.state = this.state;   
       
       console.log(this);
   }

   public unmount() {
       clearInterval(this.loop);
       this.loop = 0;    
   }

   public render():DCL.ISimplifiedNode {
    if(this.initialized == false){
        this.initialized = true;
   
        this.loop = setInterval(() => {
            this.props.scene.setState({ infoRotation: this.state.infoRotation + 0.1 });
        });    
      }
   
      return (
         <entity id={this.props.data.key}>
             <material id="info_material" albedoTexture={ "list/" + this.props.data.key + "/textures/info.jpg"} roughness={0}/>
             <box position={{ x: 10, y: 10, z: 9 }} scale={{ x: 5, y: 2.5, z: 1 }} rotation={{ x: 0, y: this.state.infoRotation, z: 0 }}>
               <plane position={{ x: 0, y: 0, z: -0.51}} material="#info_material"/>
               <plane position={{ x: 0, y: 0, z: 0.51}} rotation={{ x: 0, y: 180, z: 0 }} material="#info_material"/>
             </box>
             <plane position={{ x: 10, y: 0, z: 10 }} scale={{x: 19.99, y: 19.99, z: 1 }} rotation={{x: 90, y: 0, z: 0}} color="#6666ff"/>
             <gltf-model position={this.state.position} scale={this.state.scale} src={ "list/" + this.props.data.key + "/models/land/scene.gltf"}/>
         </entity>
      );
   }
}

