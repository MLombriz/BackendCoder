import {
    red, green, bgYellow, bgBlack, bgWhite, bold
} from "https://deno.land/std@0.100.0/fmt/colors.ts";

import { serve } from "https://deno.land/std/http/mod.ts";

const server = serve({port: 8000}) //deno run --allow-net index.ts
for await (const req of server){
    req.respond({body: 'Hello Deno Server!'})
}
console.log(bgYellow(bold(red('Hello Deno!'))))