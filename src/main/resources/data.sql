DROP TABLE IF EXISTS companies;

CREATE TABLE companies (
                              company_id INT AUTO_INCREMENT  PRIMARY KEY,
                              name VARCHAR(250) NOT NULL,
                              phone VARCHAR(250) NOT NULL
);

DROP TABLE IF EXISTS jobs;

CREATE TABLE jobs (
                              job_id INT AUTO_INCREMENT  PRIMARY KEY,
                              name VARCHAR(250) NOT NULL,
                              description VARCHAR(250) NOT NULL
);

DROP TABLE IF EXISTS applicants;

CREATE TABLE applicants (
                              applicant_id INT AUTO_INCREMENT  PRIMARY KEY,
                              name VARCHAR(250) NOT NULL,
                              email VARCHAR(250) NOT NULL,
                              phone VARCHAR(250) NOT NULL
);

INSERT INTO companies (name, phone) VALUES
('CompanyName1', '1234567'),
('CompanyName2', '1234567'),
('CompanyName3', '1234567');

INSERT INTO jobs (name, description) VALUES
('JobName1', 'JobDesc1'),
('JobName2', 'JobDesc2'),
('JobName3', 'JobDesc3');

INSERT INTO applicants (name, email, phone) VALUES
('ApplicantName1', 'applicant@Email1', '1234567'),
('ApplicantName2', 'applicant@Email2', '1234567'),
('ApplicantName3', 'applicant@Email3', '1234567');
