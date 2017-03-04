package cs2212group14

import grails.rest.RestfulController
import grails.web.RequestParameter

class UserController extends RestfulController{

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

    def addAdmin(@RequestParameter('user') String userName,@RequestParameter('adminName') String adminName){
        def user = User.find{username == userName}
        def admin = User.find{username == adminName}
        if (user==null || admin ==null) {
            System.out.println("User or admin does not exist")
            response.status = 400
        }else{
            if (user.belongsToAdmins(admin))
            user.addToAdmins(admin)
            user.save(flush: true)
            System.out.println("admin added")
            response.status=200
        }
    }

    def deleteAdmin(@RequestParameter('user') String userName,@RequestParameter('adminName') String adminName){
        def user = User.find{username == userName}
        def admin = User.find{username == adminName}
        if (user==null || admin ==null){
            System.out.println("User or admin does not exist")
            response.status=400
        }else{
            user.removeFromAdmins(admin)
            user.save(flush: true)
            System.out.println("admin removed")
            response.status=200
        }
    }



    def addCourse(@RequestParameter('courseName') String courseName){
        response.status = 404
        println "Course name sent is: " + courseName

        def course = Course.findByCourseName(courseName)

        if(course == null){
            def graph = session.getGraph()
            if(graph != null){
                new GraphInstance(graph: graph, slide: params.slide).save()
                response.status = 200
            }
        }
    }


    def addSession(@RequestParameter('courseName') String courseName, @RequestParameter('sessionName') String sessionName){
        response.status = 404
        println "\nSession name sent is: " + sessionName


        def session = Session.findBySessionID(Integer.parseInt(params.sessionID))

        if(session != null){
            def graph = session.getGraph()
            if(graph != null){
                new GraphInstance(graph: graph, slide: params.slide).save()
                response.status = 200
            }
        }
    }

}
