# Signup Form Local Storage Script

A simple vanilla JavaScript script that validates name and phone number fields, saves valid data to browser `localStorage`, and displays total signups on page load.

## Requirements

* **HTML Structure**: An HTML document containing a form element with `id="form"`, an input with `id="name"`, and an input with `id="phone"`.
* **Phone Validation**: Phone numbers must match Ethiopian formats starting with `+251` or `0`, followed by `9` or `7`, and 8 digits (`/^(?:\+251|0)(?:9|7)\d{8}$/`).
* **Name Validation**: Names accept letters, spaces, hyphens, and dashes (`/^[a-zA-Z\s -]+$/`).
* **Storage**: Valid entries are saved as objects inside an array in `localStorage` under the key `signups`.
* **User Feedback**: Uses browser `alert()` popups for validation errors, success confirmations, and the initial page-load signup count.

## Self-Checklist

- [ ] Form ID (`id="form"`) matches the JavaScript selector.
- [ ] Name input has `id="name"`.
- [ ] Phone input has `id="phone"`.
- [ ] Submitting empty or wrong phone patterns triggers the correct alert error.
- [ ] Submitting invalid name characters triggers the correct alert error.
- [ ] Valid data resets the form and updates `localStorage`.
- [ ] Refreshing the page triggers the load alert showing the total signups count.
