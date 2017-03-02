package cs2212group14

class UrlMappings {

    static mappings = {
        "/api/signup"(controller: "user", action: "signUp", method: "POST")

        "/"(view:"/index")
        "/**"(view:"/index")
        "500"(view:'/error')
        "404"(view:'/notFound')
    }
}

