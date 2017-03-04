package com.explainthatagain

class UrlMappings {

    static mappings = {
        "/api/signup"(controller: "user", action: "signUp", method: "POST")
        "/api/facebookSignin"(controller: "user", action: "facebookSignin", method: "POST")

        "/"(view:"/index")
        "/**"(view:"/index")
    }
}
