import * as DCL from 'metaverse-api'
import { Vector3Component } from 'metaverse-api';

interface IProps {
  position: Vector3Component,
  rotation?: Vector3Component,
  scale: Vector3Component
}

const BUTTON_SCALE = 0.3;

export const ControlPanel = (props:IProps) => {
    return (
        <entity position={props.position} rotation={props.rotation}>
           <box scale={props.scale}>
              <circle 
                  scale={{ 
                    x: props.scale.y > props.scale.x ? BUTTON_SCALE : (1 / (props.scale.x / props.scale.y)) * BUTTON_SCALE, 
                    y: props.scale.y > props.scale.x ? (1 / (props.scale.y / props.scale.x)) * BUTTON_SCALE : BUTTON_SCALE, 
                    z: 1
                  }} 
                  position={{ x: 0, y: BUTTON_SCALE / 1.5, z: -0.51 }} 
                  id="controlpanel_upbutton"
                  color="#ff4000"/>             
              <circle 
                  scale={{ 
                    x: props.scale.y > props.scale.x ? BUTTON_SCALE : (1 / (props.scale.x / props.scale.y)) * BUTTON_SCALE, 
                    y: props.scale.y > props.scale.x ? (1 / (props.scale.y / props.scale.x)) * BUTTON_SCALE : BUTTON_SCALE, 
                    z: 1
                  }}  
                  position={{ x: 0, y: -BUTTON_SCALE / 1.5, z: -0.51 }} 
                  id="controlpanel_downbutton"
                  color="#ff4000"/>
           </box>
        </entity>
    )
}