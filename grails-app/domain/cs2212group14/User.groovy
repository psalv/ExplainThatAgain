package cs2212group14

class User {

    static hasMany = [posts: Reply, courses: Course]
    static hasOne = [username: String, realname: String, email: String, password: String]

    static constraints = {
        realname nullable: false
        username nullable: false, unique: true
        password size: 4..15, blank: false
        email email: true, blank: false
    }

    def getUserName(){
        return userName
    }
}
