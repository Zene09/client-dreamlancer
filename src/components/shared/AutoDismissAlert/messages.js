const messages = {
	// User Auth Messages
	signUpSuccess: "Successfully registered! You've been signed in as well.",
	signUpFailure:"Registration failed. Email may be taken, or passwords don't match.",
	signInSuccess: 'Welcome!',
	signInFailure:'Failed to sign in. Check your email and password and try again.',
	signOutSuccess: 'Come back soon!',
	changePasswordSuccess: 'Password changed successfully!',
	changePasswordFailure:'Failed to change passwords. Check your old password and try again.',
	// Job Messages
	getJobsFailure: 'Error fetching jobs.',
	createJobSuccess: 'Job created Successfully!',
	createJobFailure: 'Something went wrong, please try again.',
	updateJobSuccess: 'Job updated Successfully!',
	updateJobFailure: 'Couldn\'t update job, please try again.',
	removeJobSuccess: 'Job has been destroyed!',
	removeJobFailure: 'Couldn\'t remove job, please try again.',
}

module.exports = messages