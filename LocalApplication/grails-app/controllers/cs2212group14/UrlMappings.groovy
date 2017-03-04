package cs2212group14

class UrlMappings {

    static mappings = {
        "/api/addCourse"(controller: "user", action: "addCourse", method: "POST")
        "/api/addInstance"(controller: "graph", action: "addInstance", method: "POST")
        "/api/updateInstance"(controller: "graph", action: "updateInstance", method: "POST")
        "/"(view:"/index")
        "500"(view:'/error')
        "404"(view:'/notFound')
    }
}

