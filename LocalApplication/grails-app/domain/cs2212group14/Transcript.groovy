package cs2212group14

import java.applet.AudioClip

class Transcript {

    //TODO: find a comfortable audio format
    static hasMany = [transcription: TranscriptString]
    static belongsTo = [session: Session]


    static constraints = {
//        recording nullable: false
        transcription nullable: true

    }
}
