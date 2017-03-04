package cs2212group14

import grails.rest.RestfulController
import grails.web.RequestParameter

class UserController extends RestfulController{

    static allowedMethods = [show: 'GET', addCourse: 'POST', deleteCourse: 'POST', addSession: 'POST', deleteSession: 'POST']
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


    def addCourse(@RequestParameter('courseName') String coursName, @RequestParameter('user') String user){
        response.status = 404
        println "Course name sent is: " + coursName

        def usr = User.findByUsername(user)
        if(usr != null){
            def courses = usr.getCourses()
            def course = null

            for(Course c: courses){
                if(c.getCourseName().equals(coursName)){
                    course = c
                    break
                }
            }

            if(course == null){
                new Course(user: usr, courseName: coursName).save(flush: true)
                response.status = 200
            }
        }
    }

    def deleteCourse(@RequestParameter('courseName') String coursName, @RequestParameter('user') String user){
        response.status = 404
        println "Course name sent is: " + coursName

        def usr = User.findByUsername(user)
        if(usr != null){
            def courses = usr.getCourses()
            def course = null

            for(Course c: courses){
                if(c.getCourseName().equals(coursName)){
                    course = c
                    break
                }
            }

            if(course != null){
                course.delete(flush: true)
//                usr.removeFromCourses(course)
//                usr.save(flush: true)
                response.status = 200
            }
        }
    }

    def addSession(@RequestParameter('courseName') String coursName, @RequestParameter('sessionName') String sessionName, @RequestParameter('user') String user){
        response.status = 404
        println "Session name sent is: " + sessionName

        def usr = User.findByUsername(user)
        println usr
        if(usr != null){
            def courses = usr.getCourses()
            def course = null

            for(Course c: courses){
                if(c.getCourseName().equals(coursName)){
                    course = c
                    break
                }
            }

            if(course != null){
                def sessions = course.getSessions()
                def session = null


                for(Session s: sessions){
                    if(s.getSessionName().equals(sessionName)){
                        session = s
                        break
                    }
                }

                if(session == null){
                    new Session(sessionID: 2, sessionName: sessionName, course: course, active: false).save(flush: true)
                    response.status = 200
                }

            }
        }
    }

    def deleteSession(@RequestParameter('courseName') String coursName, @RequestParameter('sessionName') String sessionName, @RequestParameter('user') String user){
        response.status = 404
        println "Session name sent is: " + sessionName

        def usr = User.findByUsername(user)
        println usr
        if(usr != null){
            def courses = usr.getCourses()
            Course course = null

            for(Course c: courses){
                if(c.getCourseName().equals(coursName)){
                    course = c
                    break
                }
            }

            if(course != null){
                def sessions = course.getSessions()
                Session session = null


                for(Session s: sessions){
                    if(s.getSessionName().equals(sessionName)){
                        session = s
                        break
                    }
                }

                if(session != null){
                    session.delete(flush: true)
//                    course.removeFromSessions(session)
//                    course.save(flush: true)
                    response.status = 200
                }

            }
        }
    }


}
