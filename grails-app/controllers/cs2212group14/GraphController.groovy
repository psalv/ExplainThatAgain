package cs2212group14

import grails.rest.RestfulController

/**
 * Controls the Graph changing the current slide
 */
class GraphController extends RestfulController{

    static allowedMethods = [addInstance: 'POST', updateInstance: 'POST']
    static responseFormats = ['json', 'xml']

    GraphController(){
        super(Graph)
    }

    def index() { }

    def addInstance() {

        response.status = 404
        println "\nSlide number sent to add instance: " + (String)params.slide
        def session = Session.findBySessionID(Integer.parseInt(params.sessionID))

        if(session != null){
            def graph = session.getGraph()
            if(graph != null){
                new GraphInstance(graph: graph, slide: params.slide).save(flush: true, failOnError: true)
                response.status = 200
            }
        }
    }

    def updateInstance() {

        response.status = 404
        println "\nSlide number sent to update confusion: " + (String)params.slide
        def session = Session.findBySessionID(Integer.parseInt(params.sessionID))
        println GraphInstance.findAll()

        if(session != null){
            def graph = session.getGraph()
            if(graph != null){
                def inst = null

                // todo: this can be sped up
                for(GraphInstance i: graph.getGraphPoints()){
                    if(i.getSlide() == Integer.parseInt(params.slide)){
                        inst = i
                        break
                    }
                }
                if(inst != null){
                    inst.incrementConfused()
                    inst.save(flush: true, failOnError: true)
                    println "Current confusion: " + inst.getConfused()
                    response.status = 200
                }
            }
        }
    }
}

