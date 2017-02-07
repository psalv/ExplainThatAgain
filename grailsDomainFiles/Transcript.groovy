package explainthatagain

import java.applet.AudioClip

class Transcript {

    //TODO: find a comfortable audio format
    AudioClip recording
    static hasMany = [transcription: TranscriptString]

    static constraints = {
        recording nullable: false
        transcription nullable: true
    }
}
