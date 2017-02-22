package explainthatagain

/*
Contains a list of when users pressed the “I’m confused” button on the screen,
as well as the time at which they pressed it. Given a starting and ending time,
can find the number of users who were confused in between the start and end time.
 */
class Graph {

    static belongsTo = [session: Session]

    // <Time:User>
    def confusedMap = [:]


    static constraints = {
    }
}
