package cs2212group14

/*
A session contains the transcript of the content of the lecture, powerpoints and the
chatrooom. Students can click on the time button of the transcript to jump to the powerpoint
at that time spot. Students can add comments to chatroom. “Most confusing” graph is displayed.
 */
class Session {

    static hasOne = [transcript: Transcript, powerpoint: Presentation, chatroom: ChatRoom, graph: Graph, sessionID: Integer, active: Boolean]
    static belongsTo = [course: Course]
    File notes


    static constraints = {
        transcript nullable: true
        powerpoint nullable: true
        chatroom nullable: true
        graph nullable: true
        notes nullable: true
        sessionID nullable: false

    }

    def endSession(){

    }

    def uploadNotes(String path){

    }
}
