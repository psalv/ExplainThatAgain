package explainthatagain

class UserAuthority {

    static belongsTo = [authority: Authority, user: User]

    static constraints = {
        authority nullable:false
        user nullable:false
    }
}
