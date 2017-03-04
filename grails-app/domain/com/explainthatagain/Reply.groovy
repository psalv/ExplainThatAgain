package com.explainthatagain

import java.time.LocalDateTime

class Reply {

    String text
    static hasOne = [poster: User, commentThread: Comment]

    //TODO: find the right date/time to use
    LocalDateTime datePosted

    static constraints = {
        text size: 1..300, blank: false, nullable: false
        poster nullable: false
        commentThread nullable: false
        datePosted nullable: false
    }
}
