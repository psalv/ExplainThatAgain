package explainthatagain

/*
A session contains the transcript of the content of the lecture, powerpoints and the
chatrooom. Students can click on the time button of the transcript to jump to the powerpoint
at that time spot. Students can add comments to chatroom. “Most confusing” graph is displayed.
 */
class Session {

    private int sessionID
    static hasOne = [transcript: Transcript, powerpoint: Presentation, chatroom: ChatRoom, graph: Graph]


    //TODO: ChatRoom must be init

    static constraints = {
        transcript nullable: true
        powerpoint nullable: true
        graph nullable: true

    }
}
