package com.explainthatagain

/*
Contains a list of when users pressed the “I’m confused” button on the screen,
as well as the time at which they pressed it. Given a starting and ending time,
can find the number of users who were confused in between the start and end time.
 */
class Graph {

    int graphID

    static belongsTo = [session: Session]
    static hasMany = [graphPoints: GraphInstance]

    static constraints = {
        session nullible: true //so that ChatRoom can be created to add to Session
        graphPoints nullable: true
    }
}
