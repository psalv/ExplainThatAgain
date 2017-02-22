package explainthatagain

class Professor extends User {

    static hasMany = [classesTeaching: Class]

    static constraints = {
        classesTeaching nullable:true
    }
}
