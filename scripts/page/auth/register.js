"use strict";
import utils from "./auth-utils.js"

window.utils = {
	tryAgainModalBtn: utils.tryAgainModalBtn
};

function signUp() {
    const submitBtn = document.querySelector("form.sign-up button[type='submit']");

    submitBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        try {
            const isValidForm = await validateForm();
            
            if(true === isValidForm) {
                alert("Account: Created");
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
            console.log(err);
        }
    
        if(!isValidReg) {
            resolve(true);
        } else {
            reject(false);
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

signUp();