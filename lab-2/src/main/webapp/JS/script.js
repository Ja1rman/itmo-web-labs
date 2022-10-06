import {main} from "./main.js";

const xhr = new XMLHttpRequest();
let done = false
xhr.open("get", "./?cookie=1")
setTimeout(()=>{if (!done){
    done = true
    main([])
}
}, 7000)
xhr.onloadend = ()=>{
    if(!done) {
        done = true
        if (xhr.status === 200){
            try{
                main(JSON.parse(xhr.responseText))
            } catch (e){
                main([])
            }
        }
        else
            main([])
    }
}
xhr.send()