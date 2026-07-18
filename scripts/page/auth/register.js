"use strict";
import utils from "./auth-utils.js"

window.utils = {
	tryAgainModalBtn: utils.tryAgainModalBtn
};

async function signUp() {
    const submitBtn = document.querySelector("form.sign-up button[type='submit']");

    submitBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        try {
            const isValidForm = await validateForm();
            
            if(true == isValidForm.success) {
                const pUser = postUser();


                if(true == true) {
                    const rep = await pUser;

                    if(!rep?.success) {
                        utils.formErrorHandler(rep.code);
                    } else {
                        window.location.href = "dashboard.html";
                    }
                    // After dbase check and wrong log, then
                    // failedLogModal.classList.remove("hidden")
                }

            }
        } catch(err) {
            console.error(err);
        }

    });
}

function validateForm() {
    const formD = {
		"firstname": document.querySelector("form.sign-up input[name='firstname']"),
		"lastname": document.querySelector("form.sign-up input[name='lastname']"),
		"email": document.querySelector("form.sign-up input[name='email']"),
		"sex": document.querySelectorAll("form.sign-up input[name='sex']"),
		"password": document.querySelector("form.sign-up input[name='password']"),
		"rePassword" : document.querySelector("form.sign-up input[name='rePassword']"),
        "consentIs18": document.querySelector("form.sign-up input[name='is-18']"),
        "consentTerms": document.querySelector("form.sign-up input[name='consent-term']")
    };
	const errTxt = {
		"firstname": document.querySelector("form.sign-up .firstname-err-txt"),
		"lastname": document.querySelector("form.sign-up .lastname-err-txt"),
		"email": document.querySelector("form.sign-up .email-err-txt"),
		"sex": document.querySelector("form.sign-up .sex-err-txt"),
		"password": document.querySelector("form.sign-up .password-err-txt"),
		"rePassword" : document.querySelector("form.sign-up .rePassword-err-txt"),
		"weakPass": document.querySelector("form.sign-up .weakPassword-err-txt"),
		"passNoMatch": document.querySelectorAll("form.sign-up .noMatchPassword-err-txt"),
        "consentIs18": document.querySelector("form.sign-up .is18-err-txt"),
        "consentTerms": document.querySelector("form.sign-up .terms-err-txt")
	};

    return new Promise((resolve, reject) => {
        let isValidReg = 0;
        try {
            isValidReg += utils.validateInput(formD.firstname, errTxt.firstname, "others");
            isValidReg += utils.validateInput(formD.lastname, errTxt.lastname, "others");
            isValidReg += utils.validateInput(formD.email, errTxt.email, "email");
            isValidReg += utils.queryValidate(formD.sex[0], formD.sex[1], errTxt.sex);
            isValidReg += utils.valiPassStrength(formD.password, errTxt.weakPass, passCallback);
            isValidReg += utils.validateCheckbox(formD.consentIs18, errTxt.consentIs18);
            isValidReg += utils.validateCheckbox(formD.consentTerms, errTxt.consentTerms);
        } catch(err) {
            console.error(err);
        }
    
        if(!isValidReg) {
            const queryIndex = utils.checkQueryIndex(formD.sex);
            formD.email.focus();
            resolve({
                success: true,
                data: JSON.stringify({
                    firstname: formD.firstname,
                    lastname: formD.lastname,
                    email: formD.email,
                    sex: formD.sex[queryIndex].value,
                    password: formD.password
                })
            });
        } else {
            reject({
                success: false
            });
        }
    });

    function passCallback() {
        let isValidReg = 0;
        isValidReg += utils.validateInput(formD.password, errTxt.password, "others");
        isValidReg += utils.validateInput(formD.rePassword, errTxt.rePassword, "others");
        isValidReg += utils.matchPassword([formD.password, formD.rePassword], errTxt.passNoMatch);
        return isValidReg;
    }
}

const postUser = async (regData) => {
    try {
        const res = await fetch("http://localhost:6035/api/user/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: regData
        });

        const data = await res.json();

        if(!res.ok) {
            const error = new Error(rep.message);
            error.success = rep.success;
            error.status = res.status;
            throw error;
        }

        return rep;
    } catch (err) {
        const isOnline = await utils.isOnline();
        if (err instanceof TypeError) {
            err.code = "SERVER_CONNECTION_ERROR";
        } else if(!isOnline) {
            err.code = "NO_INTERNET_CONNECTION";
        } else {
            if(err.status === 401) {
                err.code = "INVALID_CREDENTIALS";
            } else if(err.status === 500) {
                err.code = "SERVER_ERROR";
            } else {            
                err.code = "UNKNOWN_ERROR";
            }
        }

        return {err: err.message, code: err.code};
    }
}

signUp();