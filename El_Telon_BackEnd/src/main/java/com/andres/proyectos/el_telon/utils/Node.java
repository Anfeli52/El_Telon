package com.andres.proyectos.el_telon.utils;

import lombok.Data;

@Data
public class Node {
    private long id;
    private String type;
    private String name;

    public Node(long id, String type, String name){
        this.id = id;
        this.type = type;
        this.name = name;
    }

}
