'use client'

import { fetchData } from "@/app/services/api"

export default function homePage(){
    const tables = fetchData('table/findAll');
}