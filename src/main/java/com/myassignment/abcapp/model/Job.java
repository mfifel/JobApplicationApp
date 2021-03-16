package com.myassignment.abcapp.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import javax.persistence.*;

@Entity
@Table(name = "jobs")
@Data
@NoArgsConstructor
public class Job {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "job_id")
  private Integer jobId;

  @Column
  private String name;

  @Column
  private String description;

  @Column (nullable = false)
  private double maxSalary;

  @Column (nullable = false)
  @Enumerated(EnumType.STRING)
  private WorkingType workingType;

  @ManyToOne(cascade = CascadeType.MERGE, fetch = FetchType.EAGER)
  @JoinColumn(name="company_id")
  private Company company;

  public Job(String name, String description, double maxSalary, WorkingType workingType) {
    this.name = name;
    this.description = description;
    this.maxSalary = maxSalary;
    this.workingType = workingType;
  }

}
