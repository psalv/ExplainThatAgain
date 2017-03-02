package cs2212group14

class UrlMappings {

    static mappings = {
        "/$controller/$action?/$id?(.$format)?"{
            constraints {
                // apply constraints here
            }
        }


        "/"(view:"/index")
//        "/session/session"(view:"session/session")
//        "/session/session"(controller:"staticViews")
        "500"(view:'/error')
        "404"(view:'/notFound')
    }
}

