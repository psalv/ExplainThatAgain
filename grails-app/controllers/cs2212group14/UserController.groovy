package cs2212group14

import grails.rest.RestfulController
import grails.web.RequestParameter

/**
 * adds and deletes Admins, Sessions, and Courses to a User's account
 */
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

    /**
     *
     * @param userName
     * @param adminName
     * @return 200 if admin is added, 404 if User or admin does not exist or is already an admin
     */
    def addAdmin(@RequestParameter('user') String userName,@RequestParameter('adminName') String adminName){
        response.status = 404
        User user = User.find{username == userName}
        def admin = User.find{username == adminName}
        if (admin !=null){
            //if admin is a user, check to see if is already an admin
            //get list of admins
            def adminlist = user.getAdmins()
            def foundadmin = null
            for(User a: adminlist){
                if(a.getUserName().equals(adminName)){
                    foundadmin = a
                    break
                }
            }
            //if admin is not already an admin, make admin
            if(foundadmin == null){
                user.addToAdmins(admin)
                user.save(flush: true)
                System.out.println("admin added")
                response.status=200
            }else{
                System.out.println("User or admin does not exist or is already an admin")
                response.status = 400
            }
        }
    }

    /**
     *
     * @param userName
     * @param adminName
     * @return 200 if admin is deleted, 404 if User or admin does not exist or is not an admin
     */
    def deleteAdmin(@RequestParameter('user') String userName,@RequestParameter('adminName') String adminName){
        def user = User.find{username == userName}
        def admin = User.find{username == adminName}
        if (admin !=null){
            //if admin is a user, check to see if is already an admin
            //get list of admins
            def admins = user.getAdmins()
            def foundadmin = null
            for(User a: admins){
                if(a.getUserName().equals(adminName)){
                    foundadmin = a
                    break
                }
            }
            //if admin is an admin, delete it
            if(foundadmin != null){
                user.removeFromAdmins(admin)
                user.save(flush: true)
                System.out.println("admin removed")
                response.status=200
            }else{
                System.out.println("User or admin does not exist or is not an admin")
                response.status=400
            }
        }
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
                usr.removeFromCourses(course)
                course.delete(flush: true)
                usr.save(flush: true)
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
                    Session ses = new Session(sessionID: 2, sessionName: sessionName, course: course, active: false).save(flush: true)
                    Graph graph = new Graph(session: ses).save(flush: true)
                    ses.setGraph(graph)
                    ses.save(flush: true)
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
                    course.removeFromSessions(session)
                    session.delete(flush: true)
                    course.save(flush: true)
                    response.status = 200
                }

            }
        }
    }


}
