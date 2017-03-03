package cs2212group14

import grails.rest.RestfulController


class ClassController extends RestfulController {

    static allowedMethods = [createClass: 'POST', deleteClass: 'DELETE', getSessions: 'GET']
    static responceFormats = ['json', 'xml']

    ClassController(){
        super(Class)
    }

    def index() {
        render "I am a ClassController"
    }

    //creates a new Class
    //PARAM {classname: String, user: String}
    def createClass(){
        def classstring = params.classname
        def user = User.find{username == params.user}
        if (user == null){
            // if the prof doesnt exist
            System.out.print('no user found by username: ' + params.user)
            response.status = 404
        }else{
            //creates new prof and adds profs to admin as well
            new Class(professor: professor, admins: professor, className: classstring).save()
            System.out.print('Class created. Name: '+ classstring)
            response.status = 200
        }
    }

    //Deletes a Class
    //PARAM {classname: String}
    def deleteClass(){
        def foundclass = Class.find{className == params.classname}
        if (foundclass == null){
            //class doesn't exist
            System.out.print("Class doesn't exist -Class Name: " + params.classname)
            response.status = 404
        }else{
            //deletes class
            foundclass.delete(flush: true)
            System.out.print('Class deleted. Class Name: '+ classname)
            response.status = 200
        }
    }

    //returns all the sessions in a Class
    //PARAMS {classname: Class}
    def getSessions(){
        System.out.println('request received.')
        def foundclass = Class.find{className == params.classname}

        if(foundclass!=null){
            respond foundclass.getSessions()
        }
        else{
            response.status = 404
        }
    }
    

}
