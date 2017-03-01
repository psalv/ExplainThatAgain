package cs2212group14

import grails.rest.RestfulController

class GraphController extends RestfulController{

    GraphController(){
        super(Graph)
    }

    def index() { }

    def addInstance() {

        def session = Session.findBySessionID((Integer)params.sessionID)

        println "in instance"
        if(session != null){
            println "found session"
            def graph = session.getGraph()
            if(graph != null){
                new GraphInstance(graph: graph, slide: params.slide).save()
                response.status = 200
                return
            }
        }
        println "did not find session"
        response.status = 404

    }


    def updateInstance() {
//        def uname = params.userName
//        System.out.print(uname + ": ")
//        def account = UserAccount.find{userName == uname}
//        if(account == null){
//            account = new UserAccount(userName: uname, password: "2212")
//            new Profile(ownerAccount: account).save()
//            System.out.print('created')
//            response.status = 200
//        }
//        else{
//            // Find a better response code...
//            System.out.println('already there')
//            response.status = 404
//        }
    }

}
