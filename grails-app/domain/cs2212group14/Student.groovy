package explainthatagain

class Student extends User {

    static hasMany = [classesViewing : Class]

    static constraints = {
        classesViewing nullable:true
    }
}
