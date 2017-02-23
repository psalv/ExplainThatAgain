package cs2212group14

class ChatRoom {

    static hasMany = [commentList: Comment]
    static belongsTo = [session: Session]

    static constraints = {
        commentList nullable: true
    }
}
