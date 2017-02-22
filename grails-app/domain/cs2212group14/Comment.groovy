package explainthatagain

class Comment extends Reply {

    static hasMany = [replyList: Reply, usersViewed: User]

    static constraints = {
        replyList nullable: true
        usersViewed nullable: true
    }
}
