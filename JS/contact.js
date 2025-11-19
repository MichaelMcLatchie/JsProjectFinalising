/**
 * @fileoverview contact.js handles client side form submission, validation, done through localstorage (no GET)
 * @author Michael McLatchie
 */


document.addEventListener("DOMContentLoaded", () => {
	const form = document.getElementById("contactForm");
	const container = document.querySelector(".container");

	if (!form) {
		console.error("Contact form not found");
		return;
	}

	form.addEventListener("submit", (e) => {
		e.preventDefault(); // always prevent refresh

		// Add Bootstrap validation styling
		form.classList.add("was-validated");

		// Stop here if form is invalid
		if (!form.checkValidity()) {
			return;
		}

		// Gather form data
		const formData = {
			fullName: document.getElementById("fullName").value,
			email: document.getElementById("email").value,
			messageType: document.getElementById("messageType").value,
			message: document.getElementById("message").value,
			agreedToTerms: document.getElementById("invalidCheck").checked,
			timestamp: new Date().toISOString(),
		};

		try {
			// Save to localStorage
			saveSubmission(formData);

			// Prepare text file and download
			const text = formatSubmissionText(formData);
			triggerTextDownload(
				text,
				`${formData.email}-submission-${new Date().toISOString()}.txt`
			);

			// Show success message
			showAlert(
				"success",
				"Success! Your message has been submitted and saved locally. The submission has been downloaded as a text file."
			);

			// Reset form
			form.reset();
			form.classList.remove("was-validated");
		} catch (err) {
			console.error("Error handling form submission:", err);
			showAlert(
				"danger",
				"Error! There was a problem submitting your message. Please try again."
			);
		}
	});

            // Helper Functions

	function getAllSubmissions() {
		try {
			const stored = localStorage.getItem("formSubmissions");
			return stored ? JSON.parse(stored) : [];
		} catch (err) {
			console.error("Failed to read submissions from localStorage:", err);
			return [];
		}
	}

	function saveSubmission(submission) {
		try {
			const submissions = getAllSubmissions();
			submissions.push(submission);
			localStorage.setItem("formSubmissions", JSON.stringify(submissions));
			console.log("Submission saved to localStorage");
		} catch (err) {
			console.error("Failed to save submission to localStorage:", err);
			throw err;
		}
	}
	// formats submission into a text file
	function formatSubmissionText(submission) {
		const lines = [
			`Contact Form Submission`,
			`Submitted: ${new Date(submission.timestamp).toLocaleString()}`,
			``,
			`Full Name: ${submission.fullName}`,
			`Email: ${submission.email}`,
			`Message Type: ${submission.messageType}`,
			`Message: ${submission.message}`,
			`Agreed to Terms: ${submission.agreedToTerms ? "Yes" : "No"}`,
			``,
		];
		return lines.join("\n");
	}

	function triggerTextDownload(text, filename = "submission.txt") {
		const blob = new Blob([text], { type: "text/plain" });
		const url = URL.createObjectURL(blob);
		const link = document.createElement("a");
		link.href = url;
		link.download = filename;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
		setTimeout(() => URL.revokeObjectURL(url), 5000);
	}

	function showAlert(type, message) {
		// Remove any existing alerts first
		const existingAlert = container.querySelector(".alert");
		if (existingAlert) existingAlert.remove();

		const alert = document.createElement("div");
		alert.className = `alert alert-${type} alert-dismissible fade show mt-3`;
		alert.innerHTML = `
			${message}
			<button type="button" class="btn-close" data-bs-dismiss="alert"></button>
		`;
		// Insert alert above the card, currently does the side of the card... whoops
		container.prepend(alert);
	}
});
