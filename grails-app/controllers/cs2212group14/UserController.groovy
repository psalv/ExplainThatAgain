package cs2212group14

import grails.rest.RestfulController
import grails.web.RequestParameter

class UserController extends RestfulController{

    static allowedMethods = [show: 'POST', addCourse: 'POST', deleteCourse: 'POST', addSession: 'POST', deleteSession: 'POST']
    static responseFormats = ['json', 'xml']

    UserController(){
        super(User)
    }
    def index() {
    }

    def show() {
        def user = User.findByUsername(params.username)
        if(user == null){
            // todo: make this redirect to a page not found
            render(view: "/notFound")
        }
        else {
            [user: user]
        }
    }

    def returnToIndex(){
        render(view: "/index")
    }


//
//    def addAdmin(@RequestParameter('username') String username){
//        def user = User.findByUsername(username)
//        def admin = User.find{username == params.admin}
//        if (user == null || admin == null){
//            System.out.print("Nope, the user or admin doesn't exist")
//            response.status = 400
//        }else{
//            user.addToAdmins(admin)
//            user.save()
//            System.out.print("admin added")
//            response.status = 200
//        }
//    }
//
//    def deleteAdmin(@RequestParameter('username') String username){
//        def user = User.findByUsername(username)
//        def admin = User.find{username==params.admin}
//        if (user==null || admin ==null){
//            System.out.print("User or admin does not exist")
//            response.status=400
//        }else{
//            user.delete()
//            user.save()
//            System.out.print("admin deleted")
//            response.status=200
//        }
//    }



    def addCourse(@RequestParameter('courseName') String courseName, @RequestParameter('user') String user){
        response.status = 404
        println "Course name sent is: " + courseName

        def usr = User.findByUserName(user)
        if(usr != null){
            def course = usr.getCourses().find{courseName: courseName}

            if(course == null){
                new Course(user: usr).save(flush: true)
                response.status = 200
            }
        }
    }

//    def addSession(@RequestParameter('courseName') String courseName, @RequestParameter('sessionName') String sessionName){
//        response.status = 404
//        println "Course name sent is: " + courseName
//
//        def course = Course.findByCourseName(courseName)
//
//        if(course != null){
//            new Course(graph: graph, slide: params.slide).save(flush: true)
//            response.status = 200
//        }
//    }
//
//    def addSession(@RequestParameter('courseName') String courseName, @RequestParameter('sessionName') String sessionName){
//        response.status = 404
//        println "\nSession name sent is: " + sessionName
//
//
//        def session = Session.findBySessionID(Integer.parseInt(params.sessionID))
//
//        if(session != null){
//            def graph = session.getGraph()
//            if(graph != null){
//                new GraphInstance(graph: graph, slide: params.slide).save(flush: true)
//                response.status = 200
//            }
//        }
//    }

}
