/* Elements Constant Declarations */

const header = document.querySelector('header');
const addIcon = document.querySelectorAll('.add');
const removeIcon = document.querySelectorAll('.remove');
const adultInput = document.getElementById('adultinput');
const childInput = document.getElementById('childinput');
const infantInput = document.getElementById('infantinput');
const totalDisplay = document.querySelector('.totaldisplay');
const adultForms = document.querySelector('.formsforadults');
const childForms = document.querySelector('.formsforchildren');
const infantForms = document.querySelector('.formsforinfants');
const adultNoneAdded = document.querySelector('#adultnone');
const childNoneAdded = document.querySelector('#childnone');
const infantNoneAdded = document.querySelector('#infantnone');
const alertBox = document.querySelector('.customalert');
const generalButton = document.querySelector('.generalbutton');
const formButton = document.querySelector('.button');
const mainPage = document.querySelector('main');
const summaryBox = document.querySelector('.summarybox');
const addBlur = document.querySelectorAll('.addblur');
const summaryCancelButton = document.querySelector('.cancelsummary');
const formNumber = document.querySelector('.formnumber');
const totalPrice = document.querySelector('.totalprice');
const summaryTable = document.querySelector('table');
const bookingSection = document.querySelector('.displaybookings')
const editForm = document.querySelector('.recordedit')
const summaryFilm = document.querySelector('.summaryfilm')

/* Let Variable Declarations */

let adultIncrement = 1;
let childIncrement = 1;
let infantIncrement = 1;
let formID = 1;
let totalNumber = 0;
let checker = false;
let summarized = false;
let tableRecord;

/* Objects Constant Declaration */

const allFormSections = {
	adults: adultForms,
	children: childForms,
	infants: infantForms,
};

const ageInputs = {
	adults: adultInput,
	children: childInput,
	infants: infantInput,
};

const formIncrements = {
	adults: adultIncrement,
	children: childIncrement,
	infants: infantIncrement,
};

const whenNoneAdded = {
	adults: adultNoneAdded,
	children: childNoneAdded,
	infants: infantNoneAdded,
};

const prices = {
	adult: 500,
	child: 300,
	infant: 200,
};

/* Logic for the header */

window.addEventListener('scroll', () => {
	if (window.scrollY > 24) {
		header.style.position = 'fixed';
		header.style.top = '0';
		header.style.zIndex = '9';
		document.body.style.paddingTop = '9rem';
		header.style.padding = '1.5rem 8%';
	} else {
		header.style.position = 'none';
		header.style.padding = '3rem 8%';
	}
});

/* Logic for adding users */

addIcon.forEach((item) => {
	item.addEventListener('click', () => {
		const section =
			item.parentElement.previousElementSibling.textContent.toLowerCase();
		const theForm = document.createElement('div');

		function checkAge() {
			switch (section) {
				case 'adults':
					return 'Adult';
				case 'children':
					return 'Child';
				case 'infants':
					return 'Infant';
			}
		}

		theForm.innerHTML = `
        <div class="form">
                            <div class="formtag">${checkAge()} ${
			formIncrements[section]
		}</div>
                            <div class="fullname input">
                                <label for="fullname${formID}">FullName</label>
                                <input type="text" id="fullname${formID}" oninput="validateIndieForms(event)">
    							<div class="validatemessage"></div>
                            </div>
                            <div class="email input">
                                <label for="email${formID}">Email</label>
                                <input type="text" id="email${formID}" oninput="validateIndieForms(event)">
    							<div class="validatemessage"></div>
                            </div>
                            <div class="phone input">
                                <label for="phone${formID}">Phone</label>
                                <input type="text" id="phone${formID}" oninput="validateIndieForms(event)">
    							<div class="validatemessage"></div>
                            </div>
                            <div class="gender input">
                                <label for="gender${formID}">Gender</label>
								<select name="gender${formID}" id="gender${formID}" onchange="validateIndieForms(event)">
               					    <option value=""></option>
               					    <option value="Male">Male</option>
                    				<option value="Female">Female</option>
                				</select>
    							<div class="validatemessage"></div>
                            </div>
                            <div class="age input">
                                <label for="age${formID}">Age</label>
                                <input type="number" id="age${formID}" oninput="validateIndieForms(event)">
    							<div class="validatemessage"></div>
                            </div>
                            <div class="button" onclick="validateForms(event), preGeneralFunction()">Add </div>
                        </div>`;
		if (totalNumber < 9) {
			allFormSections[section].appendChild(theForm);
		}

		allFormSections[section].parentElement.style.display = 'block';
		generalButton.style.display = 'block';

		if (totalNumber < 9) {
			formIncrements[section]++;
			formID++;
		}

		let theNumber = parseInt(ageInputs[section].value);
		if (totalNumber < 9) {
			theNumber += 1;
		} else {
			alertBox.style.top = '7%';
			alertBox.lastElementChild.textContent =
				"You can't add more than 9 passengers";
			setTimeout(() => {
				alertBox.style.top = '-28%';
			}, 2000);
			totalDisplay.style.color = 'red';
			setTimeout(() => {
				totalDisplay.style.color = 'black';
			}, 2000);
		}
		ageInputs[section].value = theNumber;

		totalNumber =
			Number(adultInput.value) +
			Number(childInput.value) +
			Number(infantInput.value);
		totalDisplay.textContent = totalNumber;

		checker = false;
		generalButton.style.backgroundColor = 'rgba(68, 137, 255, 0.5)';
	});
});

/* Logic for removing users */

removeIcon.forEach((item) => {
	item.addEventListener('click', () => {
		const section =
			item.parentElement.previousElementSibling.textContent.toLowerCase();

		let theNumber = parseInt(ageInputs[section].value);

		if (theNumber >= 1) {
			theNumber -= 1;
		} else {
			theNumber = 0;
		}

		if (totalNumber == 1) {
			generalButton.style.display = 'none';
		}

		ageInputs[section].value = theNumber;

		if (formIncrements[section] > 1) {
			allFormSections[section].lastElementChild.remove();
			formIncrements[section]--;
		} else {
			formIncrements[section] = 1;
		}

		if (formIncrements[section] == 1) {
			allFormSections[section].parentElement.style.display = 'none';
		}

		totalNumber =
			Number(adultInput.value) +
			Number(childInput.value) +
			Number(infantInput.value);
		totalDisplay.textContent = totalNumber;
	});
});

/* Form Validation for All Forms */

function validateForms(event) {
	const allFields = event.target.parentElement.children;
	if (allFields[1].children[1].value == '') {
		allFields[1].children[1].style.border = '1px solid red';
		allFields[1].lastElementChild.textContent =
			"Passenger's fullname must be filled in";
	} else {
		if (allFields[1].children[1].value.length < 4) {
			allFields[1].children[1].style.border = '1px solid red';
			allFields[1].lastElementChild.textContent =
				"Fullname can't be less than 4 characters";
		} else {
			allFields[1].children[1].style.border = 'none';
			allFields[1].lastElementChild.textContent = '';
		}
	}

	if (allFields[2].children[1].value == '') {
		allFields[2].children[1].style.border = '1px solid red';
		allFields[2].lastElementChild.textContent =
			"Passenger's email must be filled in";
	} else {
		if (allFields[2].children[1].value.length < 4) {
			allFields[2].children[1].style.border = '1px solid red';
			allFields[2].lastElementChild.textContent =
				"Email can't be less than 4 characters";
		} else {
			allFields[2].children[1].style.border = 'none';
			allFields[2].lastElementChild.textContent = '';
		}
	}

	if (allFields[3].children[1].value == '') {
		allFields[3].children[1].style.border = '1px solid red';
		allFields[3].lastElementChild.textContent =
			"Passenger's phone must be filled in";
	} else {
		if (allFields[3].children[1].value.length < 4) {
			allFields[3].children[1].style.border = '1px solid red';
			allFields[3].lastElementChild.textContent =
				"Phone can't be less than 4 characters";
		} else {
			allFields[3].children[1].style.border = 'none';
			allFields[3].lastElementChild.textContent = '';
		}
	}

	if (allFields[4].children[1].value == '') {
		allFields[4].children[1].style.border = '1px solid red';
		allFields[4].lastElementChild.textContent =
			"Passenger's gender must be selected";
	} else {
		allFields[4].children[1].style.border = 'none';
		allFields[4].lastElementChild.textContent = '';
	}

	if (allFields[5].children[1].value == '') {
		allFields[5].children[1].style.border = '1px solid red';
		allFields[5].lastElementChild.textContent =
			"Passenger's age must be filled in";
	} else {
		if (allFields[5].children[1].value < 5) {
			allFields[5].children[1].style.border = '1px solid red';
			allFields[5].lastElementChild.textContent =
				"Passengers can't be below age 5";
		} else {
			allFields[5].children[1].style.border = 'none';
			allFields[5].lastElementChild.textContent = '';
		}
	}

	if (
		allFields[1].children[1].value.length >= 4 &&
		allFields[2].children[1].value.length >= 4 &&
		allFields[3].children[1].value.length >= 4 &&
		allFields[4].children[1].value !== '' &&
		allFields[5].children[1].value >= 5
	) {
		event.target.style.backgroundColor = 'rgba(68, 137, 255, 0.5)';
		event.target.textContent = 'Added';
		if(event.target.className.includes('new')) {
			event.target.textContent = 'Update';
			event.target.style.backgroundColor = ' #448aff';
			editForm.style.display = 'none';
			header.style.filter = 'blur(5px)';
			summaryBox.style.filter = 'none';
			addBlur.forEach((item) => {
				item.style.filter = 'blur(5px)';
			});
			summaryFilm.style.display = 'none';
			for (let i = 0; i < 4; i++) {
				tableRecord.children[i].textContent = editForm.firstElementChild.children[i + 1].children[1].value
			}
			tableRecord.children[4].innerHTML = `${
				editForm.firstElementChild.children[5].children[1].value
			} <span id="ageinitial"> ${
				tableRecord.children[4].textContent[tableRecord.children[4].textContent.length - 1]
			}</span>`;
		}
	}
}

function validateIndieForms(event) {
	if (isNaN(parseInt(event.target.value))) {
		if (!event.target.value) {
			event.target.style.border = '1px solid red';
			event.target.nextElementSibling.textContent = 'Please fill up this field';
		} else {
			if (event.target.value.length >= 4) {
				event.target.nextElementSibling.textContent = '';
				event.target.style.border = 'none';
			}
		}
	} else {
		if (event.target.id.includes('age')) {
			if (event.target.value !== '' && event.target.value >= 5) {
				event.target.nextElementSibling.textContent = '';
				event.target.style.border = 'none';
			} else {
				event.target.nextElementSibling.textContent =
					"Passengers can't be below age 5";
				event.target.style.border = '1px solid red';
			}
		} else {
			if (event.target.value.length >= 4) {
				event.target.nextElementSibling.textContent = '';
				event.target.style.border = 'none';
			}
		}
	}
}

function preGeneralFunction() {
	const theAdultForms = adultForms.children;
	const theChildForms = childForms.children;
	const theInfantForms = infantForms.children;

	const totalForms = [...theAdultForms, ...theChildForms, ...theInfantForms];

	let validationString = '';

	totalForms.map((item) => {
		validationString += item.children[0].lastElementChild.textContent;
	});

	if (!validationString.includes('Add ')) {
		generalButton.style.backgroundColor = '#448aff';
		checker = true;
	}
}

const generalFunction = () => {
	if (!checker) {
		alertBox.style.top = '7%';
		alertBox.lastElementChild.textContent =
			'You need to fill in and add all the forms';
		setTimeout(() => {
			alertBox.style.top = '-28%';
		}, 2000);
		totalDisplay.style.color = 'red';
		setTimeout(() => {
			totalDisplay.style.color = 'black';
		}, 2000);
	} else {
		header.style.filter = 'blur(5px)';
		addBlur.forEach((item) => {
			item.style.filter = 'blur(5px)';
			item.style.zIndex = '0';
			item.style.transition = 'all ease-in-out 1s';
		});
		summaryBox.style.display = 'block';
		summaryBox.style.opacity = '0.3';
		summaryBox.style.top = '28%';
		summaryBox.style.transition = 'all ease-in-out 1s';
		setTimeout(() => {
			summaryBox.style.opacity = '0.95';
			summaryBox.style.top = '15%';
			summarized = true;
		}, 0);
		formNumber.textContent = `You have ${writeTotal()} reserved for ${writeAdults()}${childConjuct()} ${writeChildren()}${infantConjuct()} ${writeInfants()}`;
		totalPrice.textContent = `$${
			adultInput.value * 500 + childInput.value * 300 + infantInput.value * 200
		}`;
		updateTable();
	}
};

function writeTotal() {
	if (totalNumber > 1) {
		return `${totalNumber} seats`;
	} else {
		return `${totalNumber} seat`;
	}
}

function writeAdults() {
	if (totalNumber > 0) {
		if (adultInput.value > 1) {
			return `${adultInput.value} adults`;
		} else if (adultInput.value > 0) {
			return `${adultInput.value} adult`;
		} else {
			return '';
		}
	} else {
		return 'nobody'
	}
}

function writeChildren() {
	if (childInput.value > 1) {
		return `${childInput.value} children`;
	} else if (childInput.value > 0) {
		return `${childInput.value} child`;
	} else {
		return '';
	}
}

function writeInfants() {
	if (infantInput.value > 1) {
		return `${infantInput.value} infants`;
	} else if (infantInput.value > 0) {
		return `${infantInput.value} infant`;
	} else {
		return '';
	}
}

function childConjuct() {
	if (adultInput.value > 0) {
		if (childInput.value > 0) {
			if (infantInput.value > 0) {
				return `, `;
			}
			return ` and `;
		} else {
			return '';
		}
	} else {
		return '';
	}
}

function infantConjuct() {
	if (adultInput.value > 0 || childInput.value > 0) {
		if (infantInput.value > 0) {
			return ` and`;
		} else {
			return '';
		}
	} else {
		return '';
	}
}

generalButton.addEventListener('click', generalFunction);

summaryCancelButton.addEventListener('click', () => {
	const confirmCancel = confirm(
		'This whole session will be lost. Do u wish to continue?'
	);

	if(confirmCancel) {
		history.go(0)
	}
});

const tableArray = []

function updateTable() {
	const theAdultForms = adultForms.children;
	const theChildForms = childForms.children;
	const theInfantForms = infantForms.children;

	const totalForms = [...theAdultForms, ...theChildForms, ...theInfantForms];

	

	totalForms.forEach((item) => {
		const tableRow = document.createElement('tr');

		tableRow.innerHTML = `<td>${
			item.children[0].children[1].children[1].value
		}</td>
		                        <td>${
															item.children[0].children[2].children[1].value
														}</td>
		                        <td>${
															item.children[0].children[3].children[1].value
														}</td>
		                        <td>${
															item.children[0].children[4].children[1].value
														}</td>
		                        <td>${
															item.children[0].children[5].children[1].value
														}<span id="ageinitial"> ${item.children[0].children[0].textContent
			.split(' ')[0]
			.charAt(0)}</span></td>
		                        <td  id="${item.children[0].children[0].textContent
															.split(' ')[0]
															.toLowerCase()}"><i class="fas fa-pen" onclick="editRecord(event)"></i><i class="fas fa-xmark" onclick="deleteRecord(event)"></i></td>`;

		if (
			!tableArray
				.join()
				.includes(item.children[0].children[2].children[1].id.split('').pop())
		) {
			tableArray.push(
				item.children[0].children[2].children[1].id.split('').pop()
			);
			summaryTable.appendChild(tableRow);
		}
	});
}

function editRecord(event) {
	editForm.style.display = 'block'
	tableRecord = event.target.parentElement.parentElement;
	for (let i = 0; i < 4; i++) {
		editForm.firstElementChild.children[i + 1].children[1].value =
			event.target.parentElement.parentElement.children[i].textContent

	}
	editForm.firstElementChild.children[5].children[1].value = parseInt(
		event.target.parentElement.parentElement.children[4].textContent.slice(
			0,
			event.target.parentElement.parentElement.children[4].textContent.length - 1
		)
	);

	header.style.filter = 'blur(5px) saturate(0.25)';
	summaryBox.style.filter = 'blur(5px)';
	addBlur.forEach((item) => {
		item.style.filter = 'blur(5px) saturate(0.25)';
	});
	summaryFilm.style.display = 'block'
}

function deleteRecord(event) {
	event.target.parentElement.parentElement.remove()

	totalNumber -= 1
	ageInputs[event.target.parentElement.id.toLowerCase() + 's'].value -= 1

	formNumber.textContent = `You have ${writeTotal()} reserved for ${writeAdults()}${childConjuct()} ${writeChildren()}${infantConjuct()} ${writeInfants()}`;
	totalPrice.textContent = `$${
		parseInt(totalPrice.textContent.substring(1)) - prices[event.target.parentElement.id]
	}`;
}


