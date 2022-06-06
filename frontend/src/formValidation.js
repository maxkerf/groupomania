exports.checkFormInputs = function (formComponent) {
	const inputs = formComponent._.subTree.el.querySelectorAll("input");
	const errors = formComponent.errors;

	inputs.forEach(input => {
		if (!input.checkValidity()) errors[input.name] = input.validationMessage;
	});
};

exports.focusFirstInvalidFormInput = function (formComponent) {
	const form = formComponent._.subTree.el;
	const errors = formComponent.errors;

	for (const [key, value] of Object.entries(errors)) {
		if (value) return form.querySelector(`input[name=${key}]`).focus();
	}
};
