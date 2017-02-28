package cs2212group14

/*
A session contains the transcript of the content of the lecture, powerpoints and the
chatrooom. Students can click on the time button of the transcript to jump to the powerpoint
at that time spot. Students can add comments to chatroom. “Most confusing” graph is displayed.
 */
class Session {

    public static int currentID = 0
    int sessionID
    static hasOne = [transcript: Transcript, powerpoint: Presentation, chatroom: ChatRoom, graph: Graph]
    static belongsTo = [class: Class]
    File notes;


    static constraints = {
        transcript nullable: true
        powerpoint nullable: true

    }

    def endSession(){

    }

    def uploadNotes(String path){

    }
}
