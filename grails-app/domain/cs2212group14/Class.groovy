package cs2212group14

class Class {

    String className
    //TODO: determine how to do start and end dates
    //Date startDate, endDate

    static belongsTo = [professor: Professor]
    static hasMany = [admins: User, students: Student, sessions: Session]


    static constraints = {

        students nullable: true
        sessions nullable: true

    }
}
