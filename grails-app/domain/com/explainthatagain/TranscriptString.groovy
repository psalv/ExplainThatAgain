package com.explainthatagain

import java.sql.Time

class TranscriptString {

    static belongsTo = [transcript: Transcript]
    String transcriptedAudio
    Time timeSpoken

    static constraints = {
        transcript nullable: false
        transcriptedAudio nullable: false
        timeSpoken nullable: false
    }
}
