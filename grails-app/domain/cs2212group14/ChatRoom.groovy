package explainthatagain

class ChatRoom {

    static hasMany = [commentList: Comment]

    static constraints = {
        commentList nullable: true
    }
}
