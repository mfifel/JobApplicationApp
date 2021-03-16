package com.myassignment.abcapp.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import javax.persistence.*;
import java.util.*;

@Entity
@Table(name = "applicants")
@Data
@NoArgsConstructor
public class Applicant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "applicant_id")
    private Integer applicantId;

    @Column
    private String name;

    @Column
    private String email;

    @Column
    private String phone;

    @Column
    private double minSalary;

    @Column
    @Enumerated(EnumType.STRING)
    private WorkingType workingType;

    @ManyToMany(cascade =  CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinTable(name = "applicant_skill",
            joinColumns = @JoinColumn(name = "applicant_id"),
            inverseJoinColumns = @JoinColumn(name = "skill_id")
    )
    private List<Skill> skills = new LinkedList<>();
}
