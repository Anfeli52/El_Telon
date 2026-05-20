package com.andres.proyectos.el_telon.recommendation.structure;

import lombok.Getter;

import java.util.Objects;

@Getter
public class Node {
    private final String email;
    private final NodeType type;
    private final String name;

    public Node(String email, NodeType type, String name) {
        this.email = email;
        this.type = type;
        this.name = name;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Node node = (Node) o;
        return Objects.equals(email, node.email) && type == node.type;
    }

    @Override
    public int hashCode() {
        return Objects.hash(email, type);
    }
}
