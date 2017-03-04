package com.explainthatagain

import grails.rest.RestfulController

class SessionController extends RestfulController{

    static allowedMethods = [createSession: 'POST', show: 'GET', deleteSession: 'DELETE']
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
