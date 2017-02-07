package explainthatagain

class Class {

    static belongsTo = [owner: Professor]
    static hasMany = [admins: User, students: Student, sessionList: Session]

    //TODO: need to initially add owner to admin

    static constraints = {

        students nullable: true
        sessionList nullable: true

    }
}
