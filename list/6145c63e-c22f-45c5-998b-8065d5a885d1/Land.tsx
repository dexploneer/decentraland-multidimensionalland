import * as DCL from 'metaverse-api'
import { Vector3Component } from 'metaverse-api';


interface IProps {
    scene:DCL.ScriptableScene,
    data:any
}

interface IState {
  position: Vector3Component,
  scale: Vector3Component,
  rotation: Vector3Component
}


let defaultScene:DCL.ScriptableScene;
let defaultData:any;

export class Land {
    props:IProps = { scene: defaultScene, data: defaultData };  
    
    state:IState = {
        position: { x: 10, y: 0, z: 10 },
        scale: { x: 0.45, y: 0.45, z: 0.45 },
        rotation: { x: 0, y: 0, z: 0 }
    }
     
    initialized:boolean = false;
 
     constructor(props:IProps) {
        this.props = props; 
        this.props.scene.state = this.state;   
    }
 
    public unmount() {

    }
 
    public render():DCL.ISimplifiedNode {
        if(!this.initialized){
            this.initialized = true;
        }

       return (
        <entity id={this.props.data.key}>
            <plane position={{ x: 10, y: 0, z: 10 }} scale={{ x: 19.99, y: 19.99, z: 1 }} rotation={{ x: 90, y: 0, z: 0 }} color="#bbbbbb" />
            <gltf-model position={this.state.position} scale={this.state.scale} rotation={this.state.rotation} src={ "list/" + this.props.data.key + "/models/city/scene.gltf"}/>           
        </entity>
       );
    }
 }