package cs2212group14

class GraphInstance {

    int confused = 0
    int slide

    static belongsTo = [graph: Graph]

    static constraints = {
        slide nullable: false
    }

}
