package cs2212group14

class BootStrap {

    def init = { servletContext ->
        new Professor(realName: "test", username: "test", password: "test", email: "test@test.ca", verified: true).save(flush: true, failOnError: true)
        new Course(prof: Professor.findByRealName("test"), courseName: "test").save(flush: true, failOnError: true)
        new Session(course: Course.findByCourseName("test"), sessionID: 1).save(flush: true, failOnError: true)
        new Graph(session: Session.findBySessionID(1), graphID: 1).save(flush: true, failOnError: true)

        println Professor.findAll()
        println Course.findAll()
        println Session.findAll()
        println Graph.findAll()
    }
    def destroy = {
    }
}
