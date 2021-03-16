$(document).ready(function () {
    $("nav").load("../templates/navbar.html");
});

function loadTemplate(template,childTemplate) {
    $('#main-content').load("../templates/" + template + ".html");
    switch (childTemplate) {
        case "post-job":
            sessionStorage.setItem('childTemplate', 'post-job');
            break;
        case "list-profiles":
            sessionStorage.setItem('childTemplate', 'list-profiles');
            break;
        case "update-company":
            sessionStorage.setItem('childTemplate', 'update-company');
            break;
        case "list-jobs":
            sessionStorage.setItem('childTemplate', 'list-jobs');
            break;
        case "update-profile":
            sessionStorage.setItem('childTemplate', 'update-profile');
            break;
    }
}

//******************** COMPANY ***********************
function registerCompany() {
    var companyData = {
        name              : $('input[name=name]').val(),
        phone             : $('input[name=phoneNumber]').val()
    };
    //check if the company already exists
    if(companyExists(companyData.name)){
        alert('company already exists !...');
        return;
    }
    $.ajax({
        url: '/companies/register',
        type: "post",
        dataType: "json",
        data: JSON.stringify(companyData),
        contentType: "application/json; charset=utf-8",
        success: function () {
            $('#main-content').load("../templates/register-company.html");
            alert('Saved successfully!');
        },
        error: function (error) {
            alert('Data could not be saved...please try later again!');
        },
    });
}

function companyExists(companyName) {
    var exist = null;
    $.ajax({
        url: '/companies/getByName?name='+ companyName,
        type: "get",
        dataType: "json",
        async: false,
        success: function (data) {
            exist = (data != null);
        },
        error: function (error) {
            exist = false;
        },
    });
    return exist;
}

function verifyCompany() {
    $.ajax({
        url: '/companies/getByName?name='+ $('input[name=name]').val(),
        type: "get",
        dataType: "json",
        success: function (data) {
            sessionStorage.setItem('companyData', JSON.stringify(data));
            var childTemplate = sessionStorage.getItem('childTemplate');
            //load child template
            switch (childTemplate) {
                case 'post-job':
                    $('#main-content').load("../templates/post-job.html");
                    break;
                case 'list-profiles':
                    $('#main-content').load("../templates/list-profiles.html",function () {
                        listMatchingProfiles();
                    });
                    break;
                case 'update-company':
                    $('#main-content').load("../templates/update-company.html", function () {
                        displayCompanyData();
                    });
                    break;
            }
        },
        error: function (error) {
            alert('company could not be found...are you registered ?');
        },
    });
}

function postNewJob() {
    var jobData = {
        name                : $('input[name=name]').val(),
        description         : $('input[name=description]').val(),
        maxSalary           : $('input[name=maxSalary]').val(),
        workingType         : $('select[name=type]').val(),
        company             :  JSON.parse(sessionStorage.getItem('companyData'))
    };

    $.ajax({
        url: '/jobs/post',
        type: "post",
        dataType: "json",
        data: JSON.stringify(jobData),
        contentType: "application/json; charset=utf-8",
        success: function () {
            $('#main-content').load("../templates/post-job.html");
            alert('Saved successfully!');
        },
        error: function (error) {
            alert('job could not be saved...please try later again!');
        },
    });
}

function listMatchingProfiles() {
    var companyName = JSON.parse(sessionStorage.getItem('companyData')).name;
    $.ajax({
        url: 'applicants/findMatchingProfiles?companyName='+ companyName,
        type: "get",
        dataType: "json",
        success: function (data, status, xhr) {
            drawProfilesTable(data);
        }
    });
}

function drawProfilesTable(data) {
    var rows = [];

    for (var i = 0; i < data.length; i++) {
        rows.push(drawProfileRow(data[i]));
    }

    $("#matchingProfiles").append(rows);
}

function drawProfileRow(rowData) {
    var row = $("<tr/>");
    row.append($("<td>" + rowData.name + "</td>"));
    row.append($("<td>" + rowData.email + "</td>"));
    row.append($("<td>" + rowData.phone + "</td>"));
    row.append($("<td>" + rowData.minSalary + "</td>"));
    row.append($("<td>" + rowData.workingType + "</td>"));
    row.append($("<td style='font-size: smaller'>" + displaySkills(rowData.skills) + "</td>"));
    return row;
}

function displaySkills(data) {
    var skills = "- ";
    for (var i = 0; i < data.length; i++) {
        skills = skills + data[i].description + ":" + data[i].level +  " -";
    }
    return skills;
}


function displayCompanyData() {
     var company = JSON.parse(sessionStorage.getItem('companyData'));
    $.ajax({
        success: function () {
            $('input[name="name"]').val(company.name);
            $('input[name="phoneNumber"]').val(company.phone);
        }
    });
}


function updateCompany() {
    var company = {
        name       : $('input[name=name]').val(),
        phone      : $('input[name=phoneNumber]').val(),
        companyId  : JSON.parse(sessionStorage.getItem('companyData')).companyId
    };
    $.ajax({
        url: '/companies/update',
        type: "put",
        dataType: "json",
        data: JSON.stringify(company),
        contentType: "application/json; charset=utf-8",
        success: function () {
            alert('Updated successfully!');
        },
        error: function (error) {
            alert('company could not be updated...please try later again!');
        },
    });
}
//******************** END COMPANY ***********************
//******************** APPLICANT ***********************
function subscribe() {
    var applicantData = {
        name                : $('input[name=name]').val(),
        email               : $('input[name=email]').val(),
        phone               : $('input[name=phone]').val(),
        minSalary           : $('input[name=minSalary]').val(),
        workingType         : $('select[name=type]').val(),
        skills              :  JSON.parse(sessionStorage.getItem('addedSkills'))
    };
    //check if the applicant already exists
    if(ApplicantExists(applicantData.email)) {
        alert('You already subscribed !...');
        return;
    }

    $.ajax({
        url: '/applicants/subscribe',
        type: "post",
        dataType: "json",
        data: JSON.stringify(applicantData),
        contentType: "application/json; charset=utf-8",
        success: function () {
            $('#main-content').load("../templates/subscribe-applicant.html");
            alert('Saved successfully!');
        },
        error: function (error) {
            alert('your data could not be saved...please try later again!');
        },
    });
    sessionStorage.removeItem("addedSkills");
}
function ApplicantExists(applicantEmail) {
    var exist = null;
    $.ajax({
        url: '/applicants/getByEmail?email='+ applicantEmail,
        type: "get",
        dataType: "json",
        async: false,
        success: function (data) {
            exist = (data != null);
        },
        error: function (error) {
            exist = false;
        },
    });
    return exist;
}

function addSkill() {
    var addedSkills = [];
    var skill = {
        description :  $('input[name="description"]').val(),
        level       :  $('select[name="level"]').val()
    };
    if(sessionStorage.getItem('addedSkills') == null){
        sessionStorage.setItem('addedSkills', JSON.stringify(addedSkills));
    }
    else{
        addedSkills = JSON.parse(sessionStorage.getItem('addedSkills'));
    }
    addedSkills.push(skill);
    $('#addedSkills').append("- " + skill.description + ":" + skill.level +"<br>");
    sessionStorage.setItem('addedSkills', JSON.stringify(addedSkills));
}

function verifyApplicant() {
    $.ajax({
        url: '/applicants/getByEmail?email='+ $('input[name=email]').val(),
        type: "get",
        dataType: "json",
        success: function (data) {
            sessionStorage.setItem('applicantData', JSON.stringify(data));
            var childTemplate = sessionStorage.getItem('childTemplate');
            //load child template
            switch (childTemplate) {
                case 'list-jobs':
                    $('#main-content').load("../templates/list-jobs.html", function () {
                        listMatchingJobs();
                    });
                    break;
                case 'update-profile':
                    $('#main-content').load("../templates/update-profile.html", function () {
                        displayApplicantData();
                    });
                    break;
            }
        },
        error: function (error) {
            alert('Applicant could not be found...are you subscribed ?');
        },
    });
}

function listMatchingJobs() {
    var applicantMail = JSON.parse(sessionStorage.getItem('applicantData')).email;
    $.ajax({
        url: 'jobs/findMatchingJobs?email='+ applicantMail,
        type: "get",
        dataType: "json",
        success: function (data, status, xhr) {
            drawMatchingJobsTable(data);
        }
    });
}

function drawMatchingJobsTable(data) {
    var rows = [];
    for (var i = 0; i < data.length; i++) {
        rows.push(drawMatchingJobRow(data[i]));
    }

    $("#matchingjobs").append(rows);
}

function drawMatchingJobRow(rowData) {
    var row = $("<tr />");
    row.append($("<td>" + rowData.name + "</td>"));
    row.append($("<td>" + rowData.description + "</td>"));
    row.append($("<td>" + rowData.maxSalary + "</td>"));
    row.append($("<td>" + rowData.workingType + "</td>"));
    row.append($("<td>" + rowData.company.name + "</td>"));
    row.append($("<td>" + rowData.company.phone + "</td>"));
    return row;
}


function displayApplicantData() {
        var applicant = JSON.parse(sessionStorage.getItem('applicantData'));
        //build skill section
        var skills = $("#skillSection");
        for (var i = 0; i < applicant.skills.length; i++) {
            skills.append($("<input type=text class=form-control id=description"+i+ " value="+ applicant.skills[i].description + ">"));
            skills.append($("<select  class=form-control id=level"+i+ " required=true >" +
                            "<option>" + applicant.skills[i].level + "</option>" +
                            "<option>BASIC</option>" +
                            "<option>AVERAGE</option>" +
                            "<option>PROFICIENT</option>" +
                            "<option>EXPERT</option>" +
                            "</select> <br>"));
        }

        $('input[name="name"]').val(applicant.name);
        $('input[name="email"]').val(applicant.email);
        $('input[name="phone"]').val(applicant.phone);
        $('input[name="minSalary"]').val(applicant.minSalary);
        $('select[name="type"]').val(applicant.workingType);
        $("#skillSection").append(skills);
        sessionStorage.setItem('existingSkills', JSON.stringify(applicant.skills));
}


function updateApplicant() {
    //add new added skills to existing skills
    var existingSkills =  JSON.parse(sessionStorage.getItem('existingSkills'));
    var addedSkills =  JSON.parse(sessionStorage.getItem('addedSkills'));
    for (var i = 0; i < existingSkills.length; i++) {
        var newSkill = {
            description:  $('#description' + i ).val(),
            level      :  $('#level' + i ).val(),
        };
        addedSkills.push(newSkill);
    }
    var applicantData = {
        applicantId         : JSON.parse(sessionStorage.getItem('applicantData')).applicantId,
        name                : $('input[name=name]').val(),
        email               : $('input[name=email]').val(),
        phone               : $('input[name=phone]').val(),
        minSalary           : $('input[name=minSalary]').val(),
        workingType         : $('select[name=type]').val(),
        skills              :  addedSkills
    };
    $.ajax({
        url: '/applicants/update',
        type: "put",
        dataType: "json",
        data: JSON.stringify(applicantData),
        contentType: "application/json; charset=utf-8",
        success: function () {
            alert('Updated successfully!');
        },
        error: function (error) {
            alert('your data could not be updated...please try later again!');
        },
    });
    sessionStorage.removeItem("addedSkills");
    sessionStorage.removeItem("existingSkills");
}


//******************** END APPLICANT ***********************
