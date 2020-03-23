package com.example.helloworld.core;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;
import java.util.Objects;

@Data
@Entity
@Table(name = "players")
@NamedQueries(
    {
        @NamedQuery(
            name = "com.example.helloworld.core.Player.findAll",
            query = "SELECT p FROM Player p"
        )
    })
@AllArgsConstructor
@NoArgsConstructor
public class Player {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "number")
    private long number;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "pos", nullable = false)
    private String pos;

    @Column(name = "nat", nullable = false)
    private String nat;

    @Column(name = "height", nullable = false)
    private Double height;

    @Column(name = "weight", nullable = false)
    private Integer weight;

    @Column(name = "dob", nullable = false)
    @Temporal(TemporalType.DATE)
    private Date dob;

    @Column(name = "birthplace", nullable = false)
    private String birthplace;
}