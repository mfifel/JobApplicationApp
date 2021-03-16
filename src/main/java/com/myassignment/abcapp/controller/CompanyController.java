package com.myassignment.abcapp.controller;

import com.myassignment.abcapp.model.Company;
import com.myassignment.abcapp.repository.CompanyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/companies")
public class CompanyController {

  @Autowired
  CompanyRepository companyRepository;

  @GetMapping(value = { "/listAllCompany" }, produces = MediaType.APPLICATION_JSON_VALUE)
  public List<Company> listAllCompany() {
    return companyRepository.findAll();
  }


  @PostMapping(value = { "/register" })
  public Company register(@RequestBody Company company){
    return companyRepository.save(company);
  }


  @PutMapping(value = { "/update" })
  public Company update(@RequestBody Company company){
    return companyRepository.save(company);
  }

  @GetMapping(value = { "/getByName" } , produces = MediaType.APPLICATION_JSON_VALUE)
  public Company getByName(@RequestParam String name){
    return companyRepository.findByName(name);
  }
}
