'use client'
import { useSceneData } from "@/app/hooks/useSceneData"
import { Stage } from "react-konva"

export default function ScenePage({id}: {id:string}){
    const sceneData = useSceneData(+id);
    return (
        <Stage></Stage>
    )
}