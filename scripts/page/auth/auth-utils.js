const emailRegexPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegexPattern = /(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%\^&*()_\-+=\]\[}{)\\/;:'"|]).{6,}/;
const errColor = "rgb(248, 103, 6)";
const borderDefaultColor = "rgba(64, 57, 80, .7)";
const modal = {
	noInternet: document.querySelector("div.modal.failed-reg.internetIssue"),
	serverDown: document.querySelector("div.modal.failed-reg.serverLogModal"),
	failedLog: document.querySelector("div.modal.failed-log.isNotUser"),
	successReg: document.querySelector("div.modal.success-reg"),
	userExistReg: document.querySelector("div.modal.failed-reg.isAUser"),
	loading: document.querySelector("div.modal.loading")
};

function validateSignForm(inPut) {
	let err = 0;
	if(inPut) {
		if(inPut.value.trim() === "") {
			inPut.style.borderColor = errColor;
			err = 1;
		}

		inPut.addEventListener("blur", e => {
		if(inPut.value.trim() !== "") {
			inPut.style.borderColor = borderDefaultColor;
		}
		});
	}

	return err;
}

function validateInput(inPut, errM, type) {
	let err = 0;
	if((typeof type) != 'string') {
		console.log("Only strings accepted as type in validateInput()");
		throw("Error: Invalid argument type");
	}
	
	type = type.toLowerCase();
	switch(type) {
		case "email":
			if (!emailRegexPattern.test(inPut.value.trim())) {
				errM.classList.remove("hidden");
				inPut.style.borderColor = errColor;
				err = 1;
			}
			inPut.addEventListener("blur", () => {
				if (emailRegexPattern.test(inPut.value.trim())) {
					errM.classList.add("hidden");
					inPut.style.borderColor = borderDefaultColor;
				}		
			});
			break;
		case "others":
			if(inPut) {
				if(inPut.value.trim() === "") {
					inPut.style.borderColor = errColor;
					errM.classList.remove("hidden");
					err = 1;
				}
				inPut.addEventListener("blur", e => {
					if(inPut.value.trim() !== "") {
						inPut.style.borderColor = borderDefaultColor;
						errM.classList.add("hidden");
					}
				});
			}
			break;
		default:
			console.log(`Unknown type "${type}" at validateInput()`);
	}
	
	return err;
}

function matchPassword(passwords, errMs) {
	let err = 0;

	if (passwords[0].value.trim() === "" || passwords[1].value.trim() === "") {
		return err;
	} else if (passwords[0].value.trim() !== passwords[1].value.trim()) {
		errMs.forEach(errM => {
			errM.classList.remove("hidden");
		});
		err = 1;
	} else {
		errMs.forEach(errM => {
			errM.classList.add("hidden");
		});
	}
	return err;
}

function valiPassStrength(password, errM, callback) {
	const err = callback();
	let bool = false;

	if(!err) {
		bool = passwordRegexPattern.test(password.value.trim());
		if(!bool) {
			errM.classList.remove("hidden");
			password.addEventListener("blur", () => {
				bool = passwordRegexPattern.test(password.value.trim());
				if(bool)
					errM.classList.add("hidden");
			});
		}
	}

	return bool ? 0 : 1;
}

function queryValidate(inPut_1, inPut_2OrErr, errM) {
	let err = 0;
	if (!inPut_1.checked && !inPut_2OrErr.checked) {
		errM.classList.remove("hidden");
		err = 1;

		inPut_1.addEventListener("change", () => errM.classList.add("hidden"));
		inPut_2OrErr.addEventListener("change", () => errM.classList.add("hidden"));
	} 	

	return err;
}

function checkQueryIndex(query) {
	let index = -1;
	query.forEach((que, indx) => {
		if (que.checked == true) {
			index = indx;
		}
	})
	return index;
}

function validateCheckbox(checkbox, errM) {
	let err = 0;

	if (!checkbox.checked) {
		errM.classList.remove("hidden");
		err = 1;

		checkbox.addEventListener("change", () => errM.classList.add("hidden"));
	}

	return err;
}

const isOnline = async () => {
	if (!navigator.onLine) return false;

	try {
		await fetch("https://www.google.com", 
					{
						method : "HEAD",
						mode : "no-cors"
					});
		return true;
	} catch(err) {
		console.log(err);
		return false;
	}
}

const tryAgainModalBtn = function (el) {
	const parent = el.parentElement.parentElement;
	parent.classList.add("hidden");
}

const formErrorHandler = function (errCode) {
	switch(errCode) {		
		// Below are error(s) related to SignIn Page only
		case "INVALID_CREDENTIALS":
			modal.failedLog.classList.remove("hidden");	
			break;
		// Below are errors related to SignUp Page only
		case "USER_EXISTS":
			modal.userExistReg.classList.remove("hidden");
			break;
		case "INVALID_FIELDS":
			modal.serverDown.classList.remove("hidden");
			break;
		case "PENDING_ERROR":
			window.alert("Your account is creating is pending. Please check your email for the verification link. If you haven't received the email, please contact support with error code: ERX4001");
			break;
		// Below are errors related to both pages
		case "NO_INTERNET_CONNECTION":
			modal.noInternet.classList.remove("hidden");
			break;
		case "SERVER_CONNECTION_ERROR":
			modal.serverDown.classList.remove("hidden");
			break;	
		case "SERVER_ERROR":
			modal.serverDown.classList.remove("hidden");
			break;
		case "UNKNOWN_ERROR":
			modal.serverDown.classList.remove("hidden");
			break;
		default:
			modal.serverDown.classList.remove("hidden");
	}
}

export default {
	modal,
	validateSignForm,
	validateInput,
	matchPassword,
	valiPassStrength,
	queryValidate,
	checkQueryIndex,
	validateCheckbox,
	isOnline,
	tryAgainModalBtn,
	formErrorHandler
}