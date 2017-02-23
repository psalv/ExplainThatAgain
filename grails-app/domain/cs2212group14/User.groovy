package cs2212group14

class User {

    String realName
    String username
    String email
    String password

    static hasMany = [posts: Reply]

    static constraints = {
        realName nullable: false
        username nullable: false
        password size: 5..15, blank: false
        email email: true, blank: false
    }
}
