Bellow are the steps that you need to follow to run the application properly:



1- NEEDED SOFTWARE AND TOOLS TO BE INSTALLED
1.1 - IntelliJ  ( or other IDE)
1.2 - MySQL DBMS (server and client software)
1.3 - JAVA 8
1.4 - MAVEN (by default the IDE uses the bundled one)

2- RUN DB SERVER  AND CREAT INITIAL TABLES
2.1- open MySQL client software (mySQLworkbench) --> configure password and user as mentioned in application.properties
2.2- run DB server if necessary via server status
2.3- execute sql scripts /resources/create_schema.sql and  /resources/data.sql

3- Open the project in IntelliJ (or other IDE)
4- at first time the IDE will automatically install all needed dependencies provided in pom.xml file
   OR accept downloading and installing if IDE asked for.



5- In Maven view perform:  Clean + compile + install

6- Run as Sprint Boot app
   - via menu bar OR (run --> run 'AbcappApplication'
   - go the file 'AbcappApplication.java' --> right click and run OR
   - via command line : go to project folder and perform  maven command  'mvn spring-boot:run'
     (if you are not using the bundled one)

   - Access it on browser at localhost:8080


7-test senario
- open the App on localhost:8080
- register some companies
- subscribe some applicants
- post some jobs (that fits the applicant(s) job requirements)
- as company you can list matching profiles
- as applicant you can list matching jobs

