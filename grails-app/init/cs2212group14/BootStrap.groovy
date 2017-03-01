package cs2212group14

class BootStrap {

    def init = { servletContext ->
        def test="test"
        new Professor(realname: test, username: test, password: test, email: test, verified: true).save()
        new Class(owner: Professor.findByRealName(test), className: test).save()
        new Session(class: Class.findByClassName(test), sessionID: 1).save()
        new Graph(session: Session.findBySessionID(1), graphID: 1).save()
    }
    def destroy = {
    }
}
