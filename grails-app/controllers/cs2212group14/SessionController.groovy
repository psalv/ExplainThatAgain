package cs2212group14

import grails.rest.RestfulController

class SessionController extends RestfulController{

    static allowedMethods = [createSession: 'POST', show: 'GET']
    static responseFormats = ['json', 'xml']

    SessionController(){
        super(Session)
    }

    def index() {
    }


    def list() {
        params.max = Math.min(params.max ? params.int('max') : 10, 100)
        [sessionPageInstanceList: Session.list(params), sessionPageInstanceTotal: Session.count()]
    }

    def show() {
        def sessionInstance = Session.findBySessionID(Integer.parseInt(params.sessionId))

        if (!sessionInstance) {
            redirect action: "list"
        }
        else {
            [sessionInstance: sessionInstance]
        }
    }

    def returnTo(){
        render(view: "/index")
    }

    //creates a new Session with initialized instances of ChatRoom and Graph
    //sessionID is increments static variable in Session domain class
    //PARAM {classname: Course Object}
    def createSession(){
        def classstring = params.classname
        def foundclass = Course.find{courseName == classstring}
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
}
