package com.explainthatagain

class GraphInstance {

    int confused = 0
    int slide

    static belongsTo = [graph: Graph]

    static constraints = {
        slide nullable: false
    }

    void incrementConfused() {
        confused++
    }

}
