package cs2212group14

import grails.rest.RestfulController

class SessionController extends RestfulController{

    static allowedMethods = [createSession: 'POST']
    static responseFormats = ['json', 'xml']

    SessionController(){
        super(Session)
    }

    def index() {
        render "hello. I am session controller"
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
            new Session(chatroom: chatroom, graph: graph, class: foundclass, sessionID: ++currentID).save()
            System.out.print('Session created')
            response.status = 200
        }
    }
}
