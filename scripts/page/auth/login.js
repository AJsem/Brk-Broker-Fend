"use strict";
import utils from "./auth-utils.js"

window.utils = {
	tryAgainModalBtn: utils.tryAgainModalBtn
};

async function signIn() {
	const formEmail = document.querySelector("form.sign-in input[name='email']");
	const formPassword = document.querySelector("form.sign-in input[name='password']");
    const checkbox = document.querySelector("form.sign-in input[name='checkbox']")
	const formSubmitBtn = document.querySelector("form.sign-in button[type='submit']");

	formSubmitBtn.addEventListener("click", async (e) => {
		e.preventDefault();
		let isValidLog = false;
		let err = 0;

		err += utils.validateSignForm(formEmail);
		err += utils.validateSignForm(formPassword);

		if (false == true) {
			try {
				const pUser = postUser(formEmail.value, formPassword.value);
				formPassword.value = "";
				formEmail.focus();
				const isHuman = await utils.humanVerification(true); 
				if(isHuman == true) {
					const rep = await pUser;

						if(!rep?.success) {
						console.error(rep.code);
						switch(rep.code) {
							case "NO_INTERNET_CONNECTION":
								utils.modal.noInternet.classList.remove("hidden");
								break;
							case "SERVER_CONNECTION_ERROR":
								utils.modal.serverDown.classList.remove("hidden");
								break;
							case "INVALID_CREDENTIALS":
								utils.modal.failedLog.classList.remove("hidden");	
								break;
							case "SERVER_ERROR":
								utils.modal.serverDown.classList.remove("hidden");
								break;
							case "UNKNOWN_ERROR":
								window.alert("An unknown error occurred. Please try again later");
								break;
							default:
								window.alert("An unknown error occurred. Please try again later");
						}
					} else {
						// localStorage.setItem("trk", rep.token);
						// window.location.href = "dashboard.html";
					}
					// After dbase check and wrong log, then
					// failedLogModal.classList.remove("hidden")
				}
			} catch(err) {
				console.log(err);
			}
		} 
	});
}


signIn();