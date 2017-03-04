package com.explainthatagain

class Course {

    //TODO: determine how to do start and end dates
    //Date startDate, endDate

    static belongsTo = [user: User]
    static hasMany = [sessions: Session]
    static hasOne = [courseName: String]


    static constraints = {
        sessions nullable: true
        courseName nullable: false
    }
}
