package cs2212group14

class Comment extends Reply {


    static hasMany = [replyList: Reply]

    static constraints = {
        replyList nullable: true
    }
}
