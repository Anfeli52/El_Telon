package com.andres.proyectos.el_telon.recomendation;

import com.andres.proyectos.el_telon.recomendation.Edge;
import com.andres.proyectos.el_telon.recomendation.Node;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Graph {
    private final Map<Node, List<Edge>> adjList;

    public Graph() {
        this.adjList = new HashMap<>();
    }
    public void addNode(Node node) {
        adjList.putIfAbsent(node, new ArrayList<>());
    }

    public void addEdge(Node source, Node destination, double weight) {
        addNode(source);
        addNode(destination);

        adjList.get(source).add(new Edge(source, destination, weight));
        adjList.get(destination).add(new Edge(destination, source, weight));
    }

    public List<Edge> getNeighbors(Node node) {
        return adjList.getOrDefault(node, new ArrayList<>());
    }

    public void printGraph() {
        for (Map.Entry<Node, List<Edge>> entry : adjList.entrySet()) {
            System.out.print("[" + entry.getKey().getType() + ": " + entry.getKey().getName() + "] conecta con: ");
            for (Edge edge : entry.getValue()) {
                System.out.print(edge.getDestination().getName() + " (peso: " + edge.getWeight() + ") | ");
            }
            System.out.println();
        }
    }
}