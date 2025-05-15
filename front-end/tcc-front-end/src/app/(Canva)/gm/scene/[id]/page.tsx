'use client'
import { useSceneData } from "@/app/hooks/useSceneData"
import { Stage } from "react-konva"

export default function ScenePage(){
    const sceneData = useSceneData();
    return (
        <Stage></Stage>
    )
}