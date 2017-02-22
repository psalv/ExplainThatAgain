package explainthatagain

class Class {

    String className
    Date startDate, endDate

    static belongsTo = [owner: Professor]
    static hasMany = [admins: User, students: Student, sessionList: Session]

    //TODO: need to initially add owner to admin

    static constraints = {

        className nullable: false
        students nullable: true
        sessionList nullable: true

    }
}
