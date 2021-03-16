package com.myassignment.abcapp.repository;

import com.myassignment.abcapp.model.Job;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface JobRepository extends JpaRepository<Job, Integer> {

 @Query(name = "fetchMatchingJobs",
       value = "select j " +
               "from Job j, Applicant a " +
               "where a.minSalary <= j.maxSalary " +
               "and a.workingType = j.workingType " +
               "and a.email = ?1"
      )
 List<Job> findMatchingJobs(String applicantEmail);
}
