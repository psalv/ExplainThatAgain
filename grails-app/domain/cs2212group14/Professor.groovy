package cs2212group14

class Professor extends User {

    static hasMany = [courses: Course]

    static constraints = {
        courses nullable:true
    }

}
