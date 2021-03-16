package com.myassignment.abcapp.repository;

import com.myassignment.abcapp.model.Company;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CompanyRepository extends JpaRepository<Company, Integer> {
    Company findByName(String name);
}
