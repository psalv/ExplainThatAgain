package explainthatagain

import java.sql.Time

/*
Contains a reference to a powerpoint presentation (or other format) for the session,
as well as the time at which each slide on the presentation was changed. Can find the active
slide given a time input, or the time that a slide was active given the slide.
 */
class Presentation {

    File presentation
    //TODO: why is this an array
    Time[] timeChanged

    static belongsTo = [session: Session]

    static constraints = {
        session nullable: false
    }
}
