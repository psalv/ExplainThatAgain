package cs2212group14

class UserAuthority {

    static belongsTo = [authority: Authority, user: User]

    static constraints = {
        authority nullable:false
        user nullable:false
    }
}
