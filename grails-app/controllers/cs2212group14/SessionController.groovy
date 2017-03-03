package cs2212group14

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

    //creates a new Session with initialized instances of ChatRoom and Graph
    //sessionID is increments static variable in Session domain class
    //PARAM {classname: Class Object}
    def createSession(){
        def classstring = params.classname;
        def foundclass = Class.find{className == classstring}
        if (foundclass == null){
            // if the class doesn't exist
            System.out.print('no class found by classname: ' + classstring)
            response.status = 404
        }else {
            //create new chatroom and graph for session
            def chatroom = new ChatRoom()
            def graph = new Graph()
            //create new Session
            new Session(chatroom: chatroom, graph: graph, courseName: foundclass, sessionID: ++currentID).save()
            System.out.print('Session created')
            response.status = 200
        }
    }

    //Deletes a Class
    //PARAM {sessionID: String}
    def deleteSession() {
        def session = Session.find { sessionID == params.sessionID }
        if (session == null) {
            //session doesn't exist
            System.out.print("Session doesn't exist -SessionID: " + params.sessionID)
            response.status = 404
        } else {
            //deletes session
            session.delete(flush: true)
            System.out.print("Session deleted. SessionID: " + params.sessionID)
            response.status = 200
        }
    }

}
