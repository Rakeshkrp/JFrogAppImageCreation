var currentPage = 'sourcing';
var serverIP = 'https://jpapi.managedorg.com/' 
//var serverIP = 'http://192.168.1.111:1337/';
var applicantId = '';
var requirementId = '';
var sourcingId = '';
var sourcingStage = '';
var token = localStorage.getItem('token');

axios.defaults.headers.common = {
    'Authorization': 'Bearer ' + token
};

function nameJoiner(data){
    var nameData  = '';
    if(data.firstName != ''){
        nameData += data.firstName;
    }
    if(data.middleName != ''){
        nameData += " "+data.middleName;
    }
    if(data.lastName != ''){
        nameData += " "+data.lastName;
    }
    return nameData;
}

function loadContent(type){
    
    if(type == '' || type == undefined){
        if(currentPage == ''){
            type='dashboard';
        } else{
            type=currentPage;
        }   
    }
    if(type != undefined){
        //CHECK USERS URL ACCESS HERE //
        $('#mainContentDiv').html('');
        url = 'pages/'+type+'.html';
        data = '';
        $('#mainContentDiv').load(url,data,function(response,status,xhr){
            if(status == 'error'){
                loadContent('noAccess');
            } else if(status == 'success'){
                $('.menu-link').removeClass('active');
                $('#'+type).addClass('active');
            }
        });
    } else {
        console.log('%cmanagedorg.js line:5 error', 'color: #007acc;', 'error');
    }
    pageLoader('hide');
}

function pageLoader(type,message){
    if(type == 'show'){
        $('#loaderDiv').removeClass('no-display');
    } else {
        $('#loaderDiv').addClass('no-display');
    }
    
}

function modalLoader(type,div){
    divData = div + " .modal-content"
    if(type == 'show'){
        KTApp.block(divData, {
            overlayColor: "#000000",
            state: "primary",
            message: "Loading..."
        })
    } else{
        KTApp.unblock(divData);
    }
    
}

// APPLICANT METHODS STARTS //

function buttonBlock(mode, btn){
    if(mode == 'show'){
        $(btn).attr('disabled', 'disabled');;
        $(btn).addClass('kt-spinner kt-spinner--right kt-spinner--light pr-30').attr('disabled', true);
    } else{
        $(btn).removeAttr('disabled');
        $(btn).removeClass('kt-spinner kt-spinner--right kt-spinner--light pr-30').attr('disabled', false);   
    }
}

function loadApplicantDetails(id){
    applicantId = '';
    swal.fire({
        title: 'Update Applicant Details',
        text: "Do You want to Continue?",
        icon: "question",
        buttonsStyling: false,
        customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-active-danger"
        },
        confirmButtonText: "<i class='far fa-thumbs-up'></i> Yes, Continue!",
        showCancelButton: true,
        cancelButtonText: "<i class='far fa-thumbs-down'></i> No, Cancel",
    }).then(function(response) {
        if(response.value){
            applicantId = id;
            loadContent('applicant_details');  
        }
    });
}

function deleteApplicant(id){
    swal.fire({
        title: 'Confirm Deletion',
        text: "Do You want to Continue?",
        icon: "error",
        buttonsStyling: false,
        customClass: {
            confirmButton: "btn btn-danger",
            cancelButton: "btn btn-active-success"
        },
        confirmButtonText: "<i class='far fa-trash-alt'></i> Yes, Delete!",
        showCancelButton: true,
        cancelButtonText: "<i class='la la-thumbs-down'></i> No, Cancel",
    }).then(function(response) {
        if(response.value){
            axios({
                method: "POST",
                url: serverIP+"candidates/delete_candidate",
                data: {id:id},
                headers: { "Content-Type": "application/json" }
            })
            .then(res => {
                if(!res.data.isActive){
                    toastr.success(data, "Applicant Deleted", { timeOut: 3000 });
                    loadContent('applicants');
                }
               
            })
            .catch((error) => {
                toastr.error(data, "Applicant Deletion Failed", { timeOut: 3000 }); 
            });
        }
    });
}
// APPLICANT METHODS ENDS //

// EDUCTAION METHODS STARTS //
function openAddEducation(education_profileId){
    $("#addEdu_profileId").val(education_profileId);    
    $("#add_applicant_education").modal('show');    
}

function editEducation(id){
    axios({
        method: "post",
        url: serverIP+"graphql",
        headers: {'Content-Type': 'application/json'},
        data: {
            query: `query educationData{
                educations(where:{isActive:true, id:"`+id+`"}){
                id
                major
                degree{
                  name
                }
                school{
                  name
                }
                grade
                startDate
                endDate
                candidate_profile{
                    id
                }
              }
            }`, 
        }
            
    })
    .then(res => {
        educationData = res.data.data.educations[0];
        document.getElementById("add_education_modal_form").reset();
        $("#addEdu_id").val(educationData.id);    
        $("#addEdu_school").val(educationData.school.name);    
        $("#addEdu_degree").val(educationData.degree.name);    
        $("#addEdu_grade").val(educationData.grade);    
        $("#addEdu_major").val(educationData.major);    
        $("#addEdu_startDate").val(educationData.startDate);    
        $("#addEdu_endDate").val(educationData.endDate);    
        openAddEducation(educationData.candidate_profile.id);
    })
    .catch((error) => {
        toastr.error(data, "Failed to Fetch Education Data", { timeOut: 3000 }); 
    });
}

function deleteEducation(id){  
    swal.fire({
        title: 'Confirm Deletion',
        text: "Do You want to Continue?",
        icon: "error",
        buttonsStyling: false,
        customClass: {
            confirmButton: "btn btn-danger",
            cancelButton: "btn btn-active-success"
        },
        confirmButtonText: "<i class='far fa-trash-alt'></i> Yes, Delete!",
        showCancelButton: true,
        cancelButtonText: "<i class='la la-thumbs-down'></i> No, Cancel",
    }).then(function(response) {
        if(response.value){
            axios({
                method: "POST",
                url: serverIP+"education/delete_education",
                data: {id:id},
                headers: { "Content-Type": "application/json" }
            })
            .then(res => {
                if(!res.data.isActive){
                    toastr.success(data, "Education Deleted", { timeOut: 3000 });
                    loadApplicantData();
                }
            })
            .catch((error) => {
                toastr.error(data, "Education Deletion Failed", { timeOut: 3000 }); 
            });
        }
    });
}
// EDUCTAION METHODS ENDS //

// EXPERIENCE METHODS STARTS //
function openAddExperience(exp_profileId){
    $("#addExp_profileId").val(exp_profileId);    
    $("#add_applicant_experience").modal('show');    
}

function editExperience(id){
    axios({
        method: "post",
        url: serverIP+"graphql",
        headers: {'Content-Type': 'application/json'},
        data: {
            query: `query experienceData{
                experiences(where:{isActive:true, id:"`+id+`"}){
                id
                client
                startDate
                endDate
                responsibility
                title
                candidate_profile{
                    id
                }
              }
            }`, 
        }
            
    })
    .then(res => {
        experienceData = res.data.data.experiences[0];
        document.getElementById("add_experience_modal_form").reset();
        $("#addExp_id").val(experienceData.id);    
        $("#addExp_client").val(experienceData.client);    
        $("#addExp_title").val(experienceData.title);    
        $("#addExp_startDate").val(experienceData.startDate);    
        $("#addExp_endDate").val(experienceData.endDate);    
        openAddExperience(experienceData.candidate_profile.id);
    })
    .catch((error) => {
        toastr.error(data, "Failed to Fetch Experinece Data", { timeOut: 3000 }); 
    });
}

function deleteExperience(id){  
    swal.fire({
        title: 'Confirm Deletion',
        text: "Do You want to Continue?",
        icon: "error",
        buttonsStyling: false,
        customClass: {
            confirmButton: "btn btn-danger",
            cancelButton: "btn btn-active-success"
        },
        confirmButtonText: "<i class='far fa-trash-alt'></i> Yes, Delete!",
        showCancelButton: true,
        cancelButtonText: "<i class='la la-thumbs-down'></i> No, Cancel",
    }).then(function(response) {
        if(response.value){
            axios({
                method: "POST",
                url: serverIP+"experience/delete_experience",
                data: {id:id},
                headers: { "Content-Type": "application/json" }
            })
            .then(res => {
                if(!res.data.isActive){
                    toastr.success(data, "Experience Deleted", { timeOut: 3000 });
                    loadApplicantData();
                }
            })
            .catch((error) => {
                toastr.error(data, "Education Deletion Failed", { timeOut: 3000 }); 
            });
        }
    });
}
// EXPERIENCE METHODS ENDS //

// CERTIFICATE METHODS STARTS //
function openAddCertificate(cert_profileId){
    $("#addCert_profileId").val(cert_profileId);    
    $("#add_applicant_certificate").modal('show');    
}

function editCertificate(id){
    axios({
        method: "post",
        url: serverIP+"graphql",
        headers: {'Content-Type': 'application/json'},
        data: {
            query: `query experiencesData{
                certificates(where:{isActive:true, id:"`+id+`"}){
                id
                certificate_type{
                  certificateName
                }
                certificate_authority{
                  name
                }
                startDate
                endDate
                candidate_profile{
                    id
                }
              }
            }`, 
        }
            
    })
    .then(res => {
        certificateData = res.data.data.certificates[0];
        document.getElementById("add_certificate_modal_form").reset();
        $("#addCert_id").val(certificateData.id);
        $("#addCert_certificate_type").val(certificateData.certificate_type.certificateName);
        $("#addCert_certificate_authority").val(certificateData.certificate_authority.name);
        $("#addCert_certificateDate").val(certificateData.title);
        $("#addCert_startDate").val(certificateData.startDate);
        $("#addCert_endDate").val(certificateData.endDate);
        openAddCertificate(certificateData.candidate_profile.id);
    })
    .catch((error) => {
        toastr.error(data, "Failed to Fetch Certificate Data", { timeOut: 3000 }); 
    });
}

function deleteCertificate(id){  
    swal.fire({
        title: 'Confirm Deletion',
        text: "Do You want to Continue?",
        icon: "error",
        buttonsStyling: false,
        customClass: {
            confirmButton: "btn btn-danger",
            cancelButton: "btn btn-active-success"
        },
        confirmButtonText: "<i class='far fa-trash-alt'></i> Yes, Delete!",
        showCancelButton: true,
        cancelButtonText: "<i class='la la-thumbs-down'></i> No, Cancel",
    }).then(function(response) {
        if(response.value){
            axios({
                method: "POST",
                url: serverIP+"certificate/delete_certificate",
                data: {id:id},
                headers: { "Content-Type": "application/json" }
            })
            .then(res => {
                if(!res.data.isActive){
                    toastr.success(data, "Certificate Deleted", { timeOut: 3000 });
                    loadApplicantData();
                }
            })
            .catch((error) => {
                toastr.error(data, "Certificate Deletion Failed", { timeOut: 3000 }); 
            });
        }
    });
}
// CERTIFICATE METHODS ENDS //

// CANDIDATE ADDREES METHODS STARTS //
function openAddAddress(cert_profileId){
    $("#addCert_profileId").val(cert_profileId);    
    $("#add_applicant_certificate").modal('show');    
}

function editAddress(id){
    axios({
        method: "post",
        url: serverIP+"graphql",
        headers: {'Content-Type': 'application/json'},
        data: {
            query: `query experiencesData{
                certificates(where:{isActive:true, id:"`+id+`"}){
                id
                certificate_type{
                  certificateName
                }
                certificate_authority{
                  name
                }
                startDate
                endDate
                candidate_profile{
                    id
                }
              }
            }`, 
        }
            
    })
    .then(res => {
        certificateData = res.data.data.certificates[0];
        document.getElementById("add_certificate_modal_form").reset();
        $("#addCert_id").val(certificateData.id);
        $("#addCert_certificate_type").val(certificateData.certificate_type.certificateName);
        $("#addCert_certificate_authority").val(certificateData.certificate_authority.name);
        $("#addCert_certificateDate").val(certificateData.title);
        $("#addCert_startDate").val(certificateData.startDate);
        $("#addCert_endDate").val(certificateData.endDate);
        openAddCertificate(certificateData.candidate_profile.id);
    })
    .catch((error) => {
        toastr.error(data, "Failed to Fetch Certificate Data", { timeOut: 3000 }); 
    });
}

function deleteAddress(id){  
    swal.fire({
        title: 'Confirm Deletion',
        text: "Do You want to Continue?",
        icon: "error",
        buttonsStyling: false,
        customClass: {
            confirmButton: "btn btn-danger",
            cancelButton: "btn btn-active-success"
        },
        confirmButtonText: "<i class='far fa-trash-alt'></i> Yes, Delete!",
        showCancelButton: true,
        cancelButtonText: "<i class='la la-thumbs-down'></i> No, Cancel",
    }).then(function(response) {
        if(response.value){
            axios({
                method: "POST",
                url: serverIP+"certificate/delete_certificate",
                data: {id:id},
                headers: { "Content-Type": "application/json" }
            })
            .then(res => {
                if(!res.data.isActive){
                    toastr.success(data, "Certificate Deleted", { timeOut: 3000 });
                    loadApplicantData();
                }
            })
            .catch((error) => {
                toastr.error(data, "Certificate Deletion Failed", { timeOut: 3000 }); 
            });
        }
    });
}
// CANDIDATE ADDREES METHODS ENDS //

// PROFILE METHODS STARTS //
function add_new_profile(){
    $('#add_profile_candidateId').val(applicantId);
    $("#add_new_profile").modal('show');
    setTimeout(() => {
        $("#newProfileName").focus();
    }, 500);
}

function deactivateProfile(){
    if(document.getElementById("deactivateAccountCheck").checked){
        deleteApplicant(applicantId);
    } else{
        toastr.error("Please tick the checkbox to continue", "Confirm Deactivation", { timeOut: 3000 }); 
    }
}

function makePrimaryProfile(id) {
    axios({
        method: "POST",
        url: serverIP+"candidate-profile/make_default",
        data: {id:id, candidateId: applicantId},
        headers: { "Content-Type": "application/json" }
    })
    .then(res => {
        if(!res.data.isActive){
            toastr.success(data, "Set as Default", { timeOut: 3000 });
            loadApplicantData();
        }
    })
    .catch((error) => {
        toastr.error(data, "Default Setting Failed", { timeOut: 3000 }); 
    });  
} 
// PROFILE METHODS ENDS //

// JOB REQUIREMENT // 
function deleteRequirement(id){  
    swal.fire({
        title: 'Confirm Deletion',
        text: "Do You want to Continue?",
        icon: "error",
        buttonsStyling: false,
        customClass: {
            confirmButton: "btn btn-danger",
            cancelButton: "btn btn-active-success"
        },
        confirmButtonText: "<i class='far fa-trash-alt'></i> Yes, Delete!",
        showCancelButton: true,
        cancelButtonText: "<i class='la la-thumbs-down'></i> No, Cancel",
    }).then(function(response) {
        if(response.value){
            axios({
                method: "POST",
                url: serverIP+"employment-terms/delete_requirement",
                data: {id:id},
                headers: { "Content-Type": "application/json" }
            })
            .then(res => {
                if(!res.data.isActive){
                    toastr.success(data, "Requirement Deleted", { timeOut: 3000 });
                    loadContent('requirements');
                }
            })
            .catch((error) => {
                toastr.error(data, "Requirement Deletion Failed", { timeOut: 3000 }); 
            });
        }
    });
}

function addCustomQuestion(){
    $('#add_CQ_requrementId').val(requirementId);
    $("#add_new_CQ_requirement_modal").modal('show');
    setTimeout(() => {
        $("#questionTitle").focus();
    }, 500);
}

function loadRequirementDetails(id){
    requirementId = '';
    swal.fire({
        title: 'Update Job Requirement Details',
        text: "Do You want to Continue?",
        icon: "question",
        buttonsStyling: false,
        customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-active-danger"
        },
        confirmButtonText: "<i class='far fa-thumbs-up'></i> Yes, Continue!",
        showCancelButton: true,
        cancelButtonText: "<i class='far fa-thumbs-down'></i> No, Cancel",
    }).then(function(response) {
        if(response.value){
            requirementId = id;
            loadContent('requirement_details');  
        }
    });
}
// JOB REQUIREMENT ENDS// 

// APPLICANT SOURCING //
function loadSourcingDetails(id){
    sourcingId = '';
    swal.fire({
        title: 'Update Sourcing Details',
        text: "Do You want to Continue?",
        icon: "question",
        buttonsStyling: false,
        customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-active-danger"
        },
        confirmButtonText: "<i class='far fa-thumbs-up'></i> Yes, Continue!",
        showCancelButton: true,
        cancelButtonText: "<i class='far fa-thumbs-down'></i> No, Cancel",
    }).then(function(response) {
        if(response.value){
            sourcingId = id;
            loadContent('sourcing_select');  
        }
    });
}

function updateCandidateSourcing(sourceEntryId,type){
    var nextStage = '';

    // MAKE THIS DYNAMIC ***** // 
    var statusUpdate = ''; //  GET FROM REJECTION POPUP  *****

    if(sourcingStage == "APPLICANTS"){
        nextStage = "PIPELINE";
    } else if(sourcingStage == "PIPELINE"){
        nextStage = "RECRUITING";
    } else if(sourcingStage == "RECRUITING"){
        nextStage = "SUBMISSION";
    } else if(sourcingStage == "SUBMISSION"){
        nextStage = "APPROVED";
    }

    // MAKE THIS DYNAMIC// 

    var jsonData = {id: sourceEntryId, type:type, status:statusUpdate, nextStage: nextStage };
    axios({
        method: "post",
        url: serverIP+"sourcing-details/update_candidate",
        data: jsonData,
        headers: { "Content-Type": "application/json" }
    })
    .then(response => {
        if(!response.data.isActive){
            toastr.success("Successfully Updated", { timeOut: 3000 }); 
            loadSourcingData();
        } else{
            toastr.error("Sourcing Updation Failed", { timeOut: 3000 });   
        }
    })
    .catch((error) => {
        toastr.error(error, "Sourcing Updation Failed", { timeOut: 3000 }); 
    });

}
// APPLICANT SOURCING ENDS//


// INVOICE MODULE //
function openAddInvoice(){
   // invoiceDate = (new Date()).toLocaleDateString().replace("///gi", "-");; 
   axios({
        method: "post",
        url: serverIP+"graphql",
        headers: {'Content-Type': 'application/json'},
        data: {
            query: `query Families{
                families(where:{isActive:true}){
                  id
                  name
                }
              }`, 
        }
    })
    .then(res => {
        families = res.data.data.families;
        var contentHTML = '<option  selected="true" disabled="disabled" value="">Select</option>';
        for(var i=0;i<families.length;i++){
            contentHTML += '<option id="'+families[i].name+'" value='+families[i].id+'>'+families[i].name+'</option>';
        }
        $('#addInvoice_family').html(contentHTML);
        $("#addInvoice_family").select2({
            dropdownParent: $("#add_invoice_modal")
        });
        
        invoiceDate = (new Date()).toISOString().split('T')[0];
        $("#addInvoice_invDate").val(invoiceDate);   
        $("#addInvoice_dueDate").val(invoiceDate);   
        $("#add_invoice_modal").modal('show');
        setTimeout(() => {
            $("#requirementTitle").focus(); 
        }, 500);
    })
    .catch((error) => {
        toastr.error(data, "Failed To load Family List", { timeOut: 3000 }); 
    });

}

function editInvoice(){
    swal.fire({
        title: 'Edit Invoice ?',
        text: "Do You want to Continue?",
        icon: "question",
        buttonsStyling: false,
        customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-active-danger"
        },
        confirmButtonText: "<i class='far fa-thumbs-up'></i> Yes, Continue!",
        showCancelButton: true,
        cancelButtonText: "<i class='far fa-thumbs-down'></i> No, Cancel",
    }).then(function(response) {
        if(response.value){
            alert('Under Development');
        }
    });
}

function deleteInvoice(){
    swal.fire({
        title: 'Confirm Deletion',
        text: "Do You want to Continue?",
        icon: "error",
        buttonsStyling: false,
        customClass: {
            confirmButton: "btn btn-danger",
            cancelButton: "btn btn-active-success"
        },
        confirmButtonText: "<i class='far fa-trash-alt'></i> Yes, Delete!",
        showCancelButton: true,
        cancelButtonText: "<i class='la la-thumbs-down'></i> No, Cancel",
    }).then(function(response) {
        if(response.value){
            alert('Under Development');
            // axios({
            //     method: "POST",
            //     url: serverIP+"employment-terms/delete_requirement",
            //     data: {id:id},
            //     headers: { "Content-Type": "application/json" }
            // })
            // .then(res => {
            //     if(!res.data.isActive){
            //         toastr.success(data, "Requirement Deleted", { timeOut: 3000 });
            //         loadContent('requirements');
            //     }
            // })
            // .catch((error) => {
            //     toastr.error(data, "Requirement Deletion Failed", { timeOut: 3000 }); 
            // });
        }
    }); 
}
// INVOICE MODULE ENDS//


// PAYMENT MODULE //
function initiatePayment(invoiceId){
    swal.fire({
        title: 'Make Payment',
        text: "Do You want to Continue?",
        icon: "info",
        buttonsStyling: false,
        customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-active-danger"
        },
        confirmButtonText: "<i class='fas fa-dollar-sign'></i> Yes, Continue!",
        showCancelButton: true,
        cancelButtonText: "<i class='la la-thumbs-down'></i> No, Cancel",
    }).then(function(response) {
        if(response.value){
            invPaymentData = {};
            axios({
                method: "POST",
                url: serverIP+"invoice/client_token",
                data: {id:invoiceId},
                headers: { "Content-Type": "application/json" }
            })
            .then(res => {
                var invoiceData = res.data;
                if(!invoiceData.isPaid){
                    wrapperHtml = '<div id="dropin-wrapper"><div id="checkout-message"></div><div id="dropin-container"></div><button id="submit-button"  class="btn btn-success">Submit payment</button></div>';
                    $('#dropin-wrapper-data').html(wrapperHtml);
                    $('#payModalInvFamName').html(invoiceData.familyName);
                    $('#payModalInvNo').html(invoiceData.invoiceNo);
                    $('#payModalInvDate').html(new Date(invoiceData.date).toDateString());
                    $('#payModalInvAmt').html(invoiceData.amount);
                    $('#payModalInvDescrpition').html(invoiceData.description);
                    
                    invPaymentData.invAmount = invoiceData.amount;
                    invPaymentData.invId = invoiceData.invId;
                    invPaymentData.invoiceNo = invoiceData.invoiceNo;
                    $("#add_invoicePayment_modal").modal('show');
                    var button = document.querySelector('#submit-button');
                    braintree.dropin.create({
                    authorization: 'sandbox_ndsvf67x_mj8f8x9ngw7hcdxy',
                    container: '#dropin-container'
                    }, function (createErr, instance) {
                        button.addEventListener('click', function () {
                            instance.requestPaymentMethod(function (requestPaymentMethodErr, payload) {                       
                                axios({
                                    method: "POST",
                                    url: serverIP+"invoice/make_payment",
                                    data: {nonce: payload.nonce, amount: invPaymentData.invAmount, invId: invPaymentData.invId, invoiceNo: invPaymentData.invoiceNo},
                                    headers: { "Content-Type": "application/json" }
                                })
                                .then(res => {
                                    result = res.data;
                                    instance.teardown(function (teardownErr) {
                                        if (teardownErr) {
                                            console.error('Could not tear down Drop-in UI!');
                                        } else {
                                            //console.info('Drop-in UI has been torn down!');
                                            $('#submit-button').remove();
                                        }
                                    });
    
                                    if (result.success) {
                                        $('#checkout-message').html('<h1>Success</h1><p>Your Drop-in UI is working! Check your <a href="https://sandbox.braintreegateway.com/login">sandbox Control Panel</a> for your test transactions.</p><p>Refresh to try another transaction.</p>');
                                    } else {
                                        console.log(result);
                                        $('#checkout-message').html('<h1>Error</h1><p>Check your console.</p>');
                                    }
                                })
                                .catch((error) => {
                                    console.log(error);
                                    toastr.error(data, "Payment Failed", { timeOut: 3000 }); 
                                });
                            });
                        });
                    });
                } else{
                    toastr.error("Please check the Payment status", "Invoice Already Paid", { timeOut: 3000 }); 
                }
            })
            .catch((error) => {
                console.log(error);
                toastr.error(data, "Requirement Deletion Failed", { timeOut: 3000 }); 
            });
        }
    }); 
        
}
// PAYMENT MODULE ENDS//

// INDIVIDUAL METHODS START //
function deleteIndividual(id){
    swal.fire({
        title: 'Confirm Deletion',
        text: "Do You want to Continue?",
        icon: "error",
        buttonsStyling: false,
        customClass: {
            confirmButton: "btn btn-danger",
            cancelButton: "btn btn-active-success"
        },
        confirmButtonText: "<i class='far fa-trash-alt'></i> Yes, Delete!",
        showCancelButton: true,
        cancelButtonText: "<i class='la la-thumbs-down'></i> No, Cancel",
    }).then(function(response) {
        if(response.value){
            axios({
                method: "POST",
                url: serverIP+"individuals/delete_member",
                data: {id:id},
                headers: { "Content-Type": "application/json" }
            })
            .then(res => {
                if(!res.data.isActive){
                    toastr.success(data, "Member Deleted", { timeOut: 3000 });
                    loadContent('member');
                }
               
            })
            .catch((error) => {
                toastr.error(error, "Member Deletion Failed", { timeOut: 3000 }); 
            });
        }
    });
}

function editMemberDetails(id){
    swal.fire({
        title: 'Edit Member?',
        text: "Do You want to Continue?",
        icon: "question",
        buttonsStyling: false,
        customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-active-danger"
        },
        confirmButtonText: "<i class='far fa-thumbs-up'></i> Yes, Continue!",
        showCancelButton: true,
        cancelButtonText: "<i class='far fa-thumbs-down'></i> No, Cancel",
    }).then(function(response) {
        if(response.value){
            axios({
                method: "post",
                url: serverIP+"graphql",
                headers: {'Content-Type': 'application/json'},
                data: {
                    query: `query Members{
                        individuals(where:{isActive:true, id:"`+id+`"}){
                            id
                            user{
                              id
                              names{
                                  firstName
                                  middleName
                                  lastName
                              }
                              email
                              addon_phone{
                                  number
                              }
                            }
                        }
                    }`, 
                }
                    
            })
            .then(res => {
                var memberData = res.data.data.individuals[0];
                document.getElementById("add_member_modal_form").reset();
                $("#add_member_modal_memberId").val(memberData.id);    
                $("#add_member_modal_firstName").val(memberData.user.names[0].firstName);    
                $("#add_member_modal_middleName").val(memberData.user.names[0].middleName);    
                $("#add_member_modal_lastName").val(memberData.user.names[0].lastName);    
                $("#add_member_modal_number").val(memberData.user.addon_phone != null ? memberData.user.addon_phone.number : '');    
                $("#add_member_modal_email").val(memberData.user.email);    
                $('#add_member_modal_email').attr('readonly', true);
                $("#add_member_modal").modal('show');    
            })
            .catch((error) => {
                toastr.error(data, "Failed to Fetch Experinece Data", { timeOut: 3000 }); 
            });
        }
    });
}
// APPLICANT METHODS ENDS //

// FAMILY METHODS START //
function openAddFamily(familyId){
    document.getElementById("add_family_modal_form").reset();
    axios({
         method: "post",
         url: serverIP+"graphql",
         headers: {'Content-Type': 'application/json'},
         data: {
             query: `query Members{
                individuals(where:{isActive:true, type:"MEMBER"}){
                    id
                    user{
                    id
                    names{
                        firstName
                        middleName
                        lastName
                    }
                    email
                    addon_phone{
                        number
                    }
                    }
                }
            }`, 
         }
     })
     .then(res => {
         members = res.data.data.individuals;
         var contentHTML = '';
         var contentHTMLHead = '<option id="head_0" value="">Select Family Head</option>';
         for(var i=0;i<members.length;i++){
             var name =  "";
             name =  members[i].user.names[0].firstName;
             if(members[i].user.names[0].middleName != null && members[i].user.names[0].middleName != ""){
                name += " "+ members[i].user.names[0].middleName;
             }
             if(members[i].user.names[0].lastName != null && members[i].user.names[0].lastName != ""){
                name += " "+ members[i].user.names[0].lastName;
             }
             if(members[i].user.addon_phone != null && members[i].user.addon_phone != ""){
                name += " - "+ members[i].user.addon_phone.number;
             }
             contentHTML += '<option id="member_'+members[i].id+'" value='+members[i].id+'>'+name+'</option>';
             contentHTMLHead += '<option id="head_'+members[i].id+'" value='+members[i].id+'>'+name+'</option>';
         }
         $('#addFamilyMembers').html(contentHTML);
         $('#addFamilyHead').html(contentHTMLHead);
         $("#addFamilyMembers").select2({
             dropdownParent: $("#add_family_modal")
         });
         $("#addFamilyHead").select2({
            dropdownParent: $("#add_family_modal")
        });
        if(familyId == undefined){
            $("#add_family_modal").modal('show');
            setTimeout(() => {
                $("#addFamilyName").focus(); 
            }, 500);
        } else {
            axios({
                method: "post",
                url: serverIP+"graphql",
                headers: {'Content-Type': 'application/json'},
                data: {
                    query: `query Family{
                            families(where:{isActive:true, id:"`+familyId+`"}){
                                id
                                name
                                members(where:{isActive:true}){
                                    id
                                }
                                head{
                                    id
                                }
                            }
                        }`, 
                }
                    
            })
            .then(res => {
                var familyData = res.data.data.families[0];
                document.getElementById("add_family_modal_form").reset();
                $("#addFamilyName").val(familyData.name);   
                let membersList = familyData.members.map(a => a.id);  
                $("#addFamily_familyId").val(familyData.id);   
                $("#addFamilyHead").select2().val(familyData.head.id).trigger("change");
                $('#addFamilyMembers').select2().val(membersList).trigger("change");
                $("#add_family_modal").modal('show');
            })
            .catch((error) => {
                toastr.error(error, "Failed to Fetch Family Data", { timeOut: 3000 }); 
            });

        }
        
     })
     .catch((error) => {
         toastr.error(error, "Failed To load Members List", { timeOut: 3000 }); 
     });
 
}

function deleteFamily(id){
    swal.fire({
        title: 'Confirm Deletion',
        text: "Do You want to Continue?",
        icon: "error",
        buttonsStyling: false,
        customClass: {
            confirmButton: "btn btn-danger",
            cancelButton: "btn btn-active-success"
        },
        confirmButtonText: "<i class='far fa-trash-alt'></i> Yes, Delete!",
        showCancelButton: true,
        cancelButtonText: "<i class='la la-thumbs-down'></i> No, Cancel",
    }).then(function(response) {
        if(response.value){
            axios({
                method: "POST",
                url: serverIP+"family/delete_family",
                data: {id:id},
                headers: { "Content-Type": "application/json" }
            })
            .then(res => {
                if(!res.data.isActive){
                    toastr.success(data, "Family Deleted", { timeOut: 3000 });
                    loadContent('family');
                }
               
            })
            .catch((error) => {
                toastr.error(error, "Family Deletion Failed", { timeOut: 3000 }); 
            });
        }
    });
}

function editFamilyDetails(id){
    swal.fire({
        title: 'Edit Family?',
        text: "Do You want to Continue?",
        icon: "question",
        buttonsStyling: false,
        customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-active-danger"
        },
        confirmButtonText: "<i class='far fa-thumbs-up'></i> Yes, Continue!",
        showCancelButton: true,
        cancelButtonText: "<i class='far fa-thumbs-down'></i> No, Cancel",
    }).then(function(response) {
        if(response.value){
            openAddFamily(id);
        }
    });
}
// FAMILY METHODS ENDS //