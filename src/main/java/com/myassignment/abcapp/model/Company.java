package com.myassignment.abcapp.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import javax.persistence.*;

@Entity
@Table(name = "companies")
@Data
@NoArgsConstructor
public class Company {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "company_id")
  private Integer companyId;

  @Column
  private String name;

  @Column
  private String phone;

  public Company(String name, String phone) {
    this.name = name;
    this.phone = phone;
  }

}
