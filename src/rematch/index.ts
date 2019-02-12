import { init } from "@rematch/core";
import * as React from "react";
import * as models from "./models";
const {useContext} = React;
type INameSpace = null | string | string[] ;

interface Ires{
  dispatch:any,
  store?:object,
  [key:string]:any
}

export const CONTEXT = React.createContext({});

export const store = init({
  models
});



export function   useStore(nameSpace:INameSpace){
  const { getState, dispatch } = useContext(CONTEXT) as any;
  const res:Ires = {
    dispatch
  };
  function addStore(key:string){
    res[key] = getState()[key] 
  }
  if(nameSpace){
    if(Array.isArray(nameSpace)){
      nameSpace.forEach((str)=>{
        addStore(str)
      })
    }
    if(typeof nameSpace === 'string'){
      addStore(nameSpace)
    }
  }else{
    res.store = getState()
  }
  return res
}
  