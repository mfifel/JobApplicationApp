package com.myassignment.abcapp.controller;

import com.myassignment.abcapp.model.Applicant;
import com.myassignment.abcapp.repository.ApplicantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/applicants")
public class ApplicantController {

    @Autowired
    ApplicantRepository applicantRepository;

    @GetMapping(value = {"/listAllApplicants"}, produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Applicant> listAllApplicants() {
        return applicantRepository.findAll();

    }

    @PostMapping(value = "/subscribe")
    public Applicant subscribe(@RequestBody Applicant applicant){
        return applicantRepository.save(applicant);
    }


    @PutMapping(value = "/update")
    public Applicant update(@RequestBody Applicant applicant){
        return applicantRepository.save(applicant);
    }

    @GetMapping(value = {"/getByEmail"}, produces = MediaType.APPLICATION_JSON_VALUE)
    public Applicant getByEmail(@RequestParam("email") String  email){
        return applicantRepository.findByEmail(email);
    }

    //for the company
    @GetMapping(value = {"/findMatchingProfiles"}, produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Applicant> getMatchingProfiles(@RequestParam("companyName") String  companyName){
        return applicantRepository.findMatchingProfiles(companyName);
    }

}
