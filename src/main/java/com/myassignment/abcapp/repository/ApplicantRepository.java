package com.myassignment.abcapp.repository;

import com.myassignment.abcapp.model.Applicant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface ApplicantRepository extends JpaRepository<Applicant, Integer> {
    Applicant findByEmail(String email);

    @Query(name = "fetchMatchingProfiles",
            value = "select distinct a " +
                    "from Applicant  a, Job j " +
                    "where a.minSalary <= j.maxSalary " +
                    "and a.workingType = j.workingType " +
                    "and j.company.name  = ?1 "
    )
    List<Applicant> findMatchingProfiles(String companyName);
}