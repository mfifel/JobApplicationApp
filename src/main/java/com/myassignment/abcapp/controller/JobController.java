package com.myassignment.abcapp.controller;

import com.myassignment.abcapp.model.Job;
import com.myassignment.abcapp.repository.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/jobs")
public class JobController {

    @Autowired
    JobRepository jobRepository;

    @RequestMapping(value = {"/listAllJobs"}, produces = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.GET)
    public List<Job> listAllJobs() {
        return jobRepository.findAll();
    }

    //for the company
    @PostMapping(value = { "/post" })
    public Job post(@RequestBody Job job){
        return jobRepository.save(job);
    }

    //for the applicant
    @GetMapping(value = {"/findMatchingJobs"}, produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Job> getMatchingJobs(@RequestParam("email") String  applicantEmail){
        return jobRepository.findMatchingJobs(applicantEmail);
    }

}
