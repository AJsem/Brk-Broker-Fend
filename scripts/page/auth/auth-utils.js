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

const tryAgainModalBtn = function (el) {
	const parent = el.parentElement.parentElement;
	parent.classList.add("hidden");
}

export default {
	modal,
	validateSignForm,
	tryAgainModalBtn
}