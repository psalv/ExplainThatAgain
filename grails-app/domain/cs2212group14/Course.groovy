package cs2212group14

class Course {

    String courseName
    //TODO: determine how to do start and end dates
    //Date startDate, endDate

    static belongsTo = [prof: Professor]
    static hasMany = [sessions: Session]


    static constraints = {
        sessions nullable: true
        courseName nullable: false
    }
}
