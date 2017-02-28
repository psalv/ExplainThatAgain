package cs2212group14

import grails.boot.GrailsApp
import grails.boot.config.GrailsAutoConfiguration

class Application extends GrailsAutoConfiguration {
    static void main(String[] args) {
        GrailsApp.run(Application, args)

        def prof = new Professor(realName: 'jake', userName: 'jakejake', email: 'aaa@gmal.com',
                        password: 'jakejakejake')
        System.out.println(prof.realName)
    }
}