'use server'

import {defineQuery} from 'groq'
import {fetchData} from "@/sanity/client";

const ABOUT_QUERY = defineQuery(`*[
    _type=="about"]{
        description[]{
            children[]{
                text
            }
        }
    }`
)

export async function aboutData() {
    const data = await fetchData(ABOUT_QUERY)
    // pass through model
    const text = data[0].description[0].children[0].text
    return {
        text: text,
    }
}