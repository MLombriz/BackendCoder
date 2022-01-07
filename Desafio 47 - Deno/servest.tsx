// @deno-types="https://deno.land/x/servest@1.3.1/types/react/index.d.ts"
import React from "https://dev.jspm.io/react/index.js"
// @deno-types="https://deno.land/x/servest@1.3.1/types/react-dom/index.d.ts"
import ReactDOMServer from "https://dev.jspm.io/react-dom/server.js"
import { createApp } from "https://deno.land/x/servest@1.3.1/mod.ts"
const app = createApp()
let visitas: number = 0

app.handle("/", async (req)=>{
    await req.respond({
        status: 200,
        headers: new Headers({
            "content-type": "text/html; charset=UTF-8",
        }),
        body: "Hello Deno!",
    })
})

app.listen({port: 8888})