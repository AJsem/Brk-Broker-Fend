"use strict";
import utils from "./auth-utils.js"

window.utils = {
	tryAgainModalBtn: utils.tryAgainModalBtn
};

async function signIn() {
	const formEmail = document.querySelector("form.sign-in input[name='email']");
	const formPassword = document.querySelector("form.sign-in input[name='password']");
    const checkbox = document.querySelector("form.sign-in input[name='checkbox']");
	const formSubmitBtn = document.querySelector("form.sign-in button[type='submit']");

	formSubmitBtn.addEventListener("click", async (e) => {
		const rememberMe = checkbox.checked;
		e.preventDefault();
		let isValidLog = false;
		let err = 0;

		err += utils.validateSignForm(formEmail);
		err += utils.validateSignForm(formPassword);

		if (!err) {
			try {
				const pUser = postUser(formEmail.value, formPassword.value, rememberMe);
				
				formPassword.value = "";
				formEmail.focus();

				// const isHuman = await utils.humanVerification(true); 
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
			} catch(err) {
				console.error(err);
			}
		} 
	});
}


async function postUser(user_email, password, rememberMe) {
	try {
		const res = await fetch("http://localhost:6035/api/user/auth/login", {
			method : "POST",
			headers : {
				"Content-Type" : "application/json"
			},
			body : JSON.stringify({
				user_email,
				password,
				rememberMe
			})
		});

		const rep = await res.json();

		if(!res.ok) {
			const error = new Error(rep.message);
			error.success = rep.success;
			error.status = res.status;
			throw error;
		}

		return rep;
	} catch(err) {
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

signIn();