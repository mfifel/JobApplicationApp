package com.myassignment.abcapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

@SpringBootApplication
public class AbcappApplication  extends SpringBootServletInitializer {

	public static void main(String[] args) {
		SpringApplication.run(AbcappApplication.class, args);
	}

	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
		return application.sources(com.myassignment.abcapp.AbcappApplication.class);
	}

}
