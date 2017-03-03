package cs2212group14

import grails.rest.RestfulController

class AdminController extends RestfulController  {

    static responceFormats = ['json', 'xml']
    static allowedMethods = [addAdmin: 'POST']


    def index() {
        render"Admin Control"
    }

    def addAdmin(){
        def user = User.find{username == params.username}
        def admin = User.find{username == params.admin}
        if (user == null || admin == null){
            System.out.print("Nope, the user or admin doesn't exist")
            response.status = 404
        }else{
            user.addToAdmins(admin)
            user.save()
            System.out.print("admin added")
            responce.status = 200

        }
    }
}

