package cs2212group14

class Class {

    String className
    //TODO: determine how to do start and end dates
    //Date startDate, endDate

    static belongsTo = [user: User]
    static hasMany = [admins: User, sessions: Session]


    static constraints = {
        sessions nullable: true

    }
}
