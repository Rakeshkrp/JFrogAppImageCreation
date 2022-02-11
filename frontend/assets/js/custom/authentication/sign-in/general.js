"use strict";
var KTSigninGeneral = function () {
    var t, e, i;
    return {
        init: function () {
            t = document.querySelector("#kt_sign_in_form"), e = document.querySelector("#kt_sign_in_submit"), i = FormValidation.formValidation(t, {
                fields: {
                    email: {
                        validators: {
                            notEmpty: {
                                message: "Email address is required"
                            },
                            emailAddress: {
                                message: "The value is not a valid email address"
                            }
                        }
                    },
                    password: {
                        validators: {
                            notEmpty: {
                                message: "The password is required"
                            }
                        }
                    }
                },
                plugins: {
                    trigger: new FormValidation.plugins.Trigger,
                    bootstrap: new FormValidation.plugins.Bootstrap5({
                        rowSelector: ".fv-row"
                    })
                }
            }), e.addEventListener("click", (function (n) {
                n.preventDefault(), i.validate().then((function (i) {
                    "Valid" == i ? (e.setAttribute("data-kt-indicator", "on"), e.disabled = !0, setTimeout((function () {
                        var identfier = t.querySelector('[name="email"]').value;
                        var password = t.querySelector('[name="password"]').value;
                        var serverIP = 'https://jpapi.managedorg.com/' 
                        //var serverIP = 'http://192.168.1.111:1337/';
                        $.ajax({
                            url: serverIP+'auth/local',
                            type: 'post',
                            dataType: 'json',
                            data: {"identifier":identfier, "password": password},
                            success: function (response) {
                                localStorage.setItem('token', response.jwt);
                                e.removeAttribute("data-kt-indicator"), e.disabled = !1, Swal.fire({
                                    text: "Welcome "+response.user.username+", You have successfully logged in!",
                                    icon: "success",
                                    buttonsStyling: !1,
                                    confirmButtonText: "Ok, got it!",
                                    customClass: {
                                        confirmButton: "btn btn-primary"
                                    }
                                }).then((function (e) {
                                    e.isConfirmed && (t.querySelector('[name="email"]').value = "", t.querySelector('[name="password"]').value = "");
                                    window.location.replace("index.html");
                                }))
                            },
                            error: function (jqXHR, exception) {
                                if(jqXHR.responseJSON.statusCode == '400'){
                                   window.location.replace("pages/sign-in.html");
                                }
                            }
                        });
                     
                    }), 100)) : Swal.fire({
                        text: "Sorry, looks like there are some errors detected, please try again.",
                        icon: "error",
                        buttonsStyling: !1,
                        confirmButtonText: "Ok, got it!",
                        customClass: {
                            confirmButton: "btn btn-primary"
                        }
                    })
                }))
            }))
        }
    }
}();
KTUtil.onDOMContentLoaded((function () {
    KTSigninGeneral.init()
}));