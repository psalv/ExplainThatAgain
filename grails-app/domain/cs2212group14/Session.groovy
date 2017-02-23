package cs2212group14

/*
A session contains the transcript of the content of the lecture, powerpoints and the
chatrooom. Students can click on the time button of the transcript to jump to the powerpoint
at that time spot. Students can add comments to chatroom. “Most confusing” graph is displayed.
 */
class Session {

    int sessionID
    static hasOne = [transcript: Transcript, powerpoint: Presentation, chatroom: ChatRoom, graph: Graph]
    File notes;

    //TODO: ChatRoom must be init

    static constraints = {
        transcript nullable: true
        powerpoint nullable: true
        graph nullable: true

    }

    def beginSession(){

    }

    def endSession(){

    }

    def uploadNotes(String path){

    }
}
