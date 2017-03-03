package com.explainthatagain

class UrlMappings {

    static mappings = {
        "/api/signup"(controller: "user", action: "signUp", method: "POST")


        "/"(view:"/index")
        "/**"(view:"/index")
    }
}
