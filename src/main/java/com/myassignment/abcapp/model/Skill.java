package com.myassignment.abcapp.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import javax.persistence.*;


@Entity
@Table(name = "skills")
@Data
@NoArgsConstructor
public class Skill {

@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
@Column(name = "skill_id")
private Integer skillId;


@Column
private String description;

@Column
@Enumerated(EnumType.STRING)
private Level level;

public Skill(String description, Level level) {
    this.description = description;
    this.level = level;
    }

}