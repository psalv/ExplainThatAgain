package cs2212group14

import grails.rest.RestfulController
import grails.web.RequestParameter

/**
 * Controls a session 'going live' and handles ending a session
 */
class SessionController extends RestfulController{

    static allowedMethods = [createSession: 'POST', show: 'GET', deleteSession: 'DELETE', liven: 'POST']
    static responseFormats = ['json', 'xml']

    SessionController(){
        super(Session)
    }

    def index() {
    }


    def show() {
        def sessionInstance = Session.findBySessionID(Integer.parseInt(params.sessionId))
        if(sessionInstance == null || !sessionInstance.getActive()){
            // todo: make this redirect to a page not found
            render(view: "/notFound")
        }
        else {
            [sessionInstance: sessionInstance]
        }
    }

    def returnToIndex(){
        render(view: "/index")
    }

    /**
     *
     * @param courseName
     * @param sessionName
     * @param user
     * @return 200 if Session is Live, 404 if Session or Course dont exist
     */
    def liven(@RequestParameter('courseName') String courseName, @RequestParameter('sessionName') String sessionName, @RequestParameter('user') String user){
        response.status = 404
        def course = Course.find{courseName == courseName}
        def session = Session.find{sessionName == sessionName}

        if (course != null){
            def sessions = course.getSessions()
            def foundsession = null

            for(Session s: sessions) {
                if (s.getSessionName().equals(sessionName)) {
                    foundsession = s
                    break
                }
            }

            if (foundsession != null && foundsession.liveStatus()==false){
                foundsession.goLive()
                System.out.println("Session is Live!")
                response.status = 200
            }else{
                System.out.println("Session or Course may not exist")
            }
        }
    }

    /**
     * For now, turns a session active to false
     */
    def endSession (){
        def sessionInstance = Session.findBySessionID(Integer.parseInt(params.sessionId))

        println sessionInstance.getActive()

        if(sessionInstance != null && sessionInstance.getActive()){
            sessionInstance.setActive(false)
            sessionInstance.save(flush: true, failOnError: true)
        }

        println sessionInstance.getActive()
        println params
        returnToIndex()
    }

}