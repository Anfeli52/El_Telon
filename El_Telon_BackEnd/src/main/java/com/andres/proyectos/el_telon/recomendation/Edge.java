package com.andres.proyectos.el_telon.recomendation;

public class Edge {
    private final Node source;
    private final Node destination;
    private double weight;

    public Edge(Node source, Node destination, double weight) {
        this.source = source;
        this.destination = destination;
        this.weight = weight;
    }

    // Getters
    public Node getSource() { return source; }
    public Node getDestination() { return destination; }
    public double getWeight() { return weight; }
    public void setWeight(double weight) { this.weight = weight; }
}