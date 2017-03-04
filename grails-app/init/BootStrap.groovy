import com.explainthatagain.Course
import com.explainthatagain.Graph
import com.explainthatagain.Session
import com.explainthatagain.Role
import com.explainthatagain.User
import com.explainthatagain.UserRole

class BootStrap {

    def init = { servletContext ->
        def role = new Role(authority: 'ROLE_USER').save()
        def user = new User(username: 'test', password: '2212').save()
        UserRole.create(user, role, true)

        new User(realname: "test", username: "test", password: "test", email: "test@test.ca", verified: true).save(flush: true, failOnError: true)
        new User(realname: "test", username: "test123", password: "test123", email: "test@test.ca", verified: true).save(flush: true, failOnError: true)
        new Course(user: User.findByRealname("test"), courseName: "test").save(flush: true, failOnError: true)
        new Session(course: Course.findByCourseName("test"), sessionID: 1, sessionName: 'test', active: true).save(flush: true, failOnError: true)
        new Graph(session: Session.findBySessionID(1), graphID: 1).save(flush: true, failOnError: true)

        println User.findAll()
        println Course.findAll()
        println Session.findAll()
        println Graph.findAll()
    }
    def destroy = {
    }
}
