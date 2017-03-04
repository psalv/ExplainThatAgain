package com.explainthatagain

class ChatRoom {

    static hasMany = [commentList: Comment]
    static belongsTo = [session: Session]

    static constraints = {
        commentList nullable: true
        session nullable: true //so that ChatRoom can be created to add to Session
    }
}
