package com.explainthatagain

class Comment extends Reply {


    static hasMany = [replyList: Reply]

    static constraints = {
        replyList nullable: true
    }
}
