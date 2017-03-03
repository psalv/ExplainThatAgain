package cs2212group14

import grails.rest.RestfulController


class ClassController extends RestfulController {

    static allowedMethods = [createClass: 'POST']
    static responceFormats = ['json', 'xml']

    ClassController(){
        super(Course)
    }

    def index() {
        render "I am a ClassController"
    }


    //creates a new Course
    //PARAM {classname: String, prof: Professor}
    def createClass(){
        def classstring = params.classname
        def prof = Professor.find{username == params.prof}
        if (prof == null){
            // if the prof doesnt exist
            System.out.print('no prof found by username: ' + params.prof)
            response.status = 404
        }else{
            //creates new prof and adds profs to admin as well
            new Course(professor: professor, admins: professor, className: classstring).save()
            System.out.print('Course created. Name: '+ classstring)
            response.status = 200
        }
    }
}
