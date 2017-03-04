package cs2212group14

import grails.rest.RestfulController
import grails.web.RequestParameter

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

    def liven(@RequestParameter('courseName') String coursName, @RequestParameter('sessionName') String sessionName, @RequestParameter('user') String user){

    }

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
