/*Activity:
-Create a login page for our React application with the following specifications:

1. Import all necessary packages and hooks (useState, useEffect, Form, etc)

2. Create a form with an email and password input and implement proper two-way binding

3. Using useEffect, make sure to add form validation that checks if the email and password inputs are blank

4. If either field is blank, show a disabled button. If not, show an enabled button

5. Create a function called loginUser that sends a fetch request to the appropriate API endpoint that includes a request body containing the email and password inputs' values

6. When the form is submitted, the loginUser function is called

7. Log the API/server response in the console so that we can see the token

8. If the response from the API/server is true (meaning login is successful), show a sweetalert with a success icon that says "Login successful - Welcome to Zuitt!"

9. If the response from the API/server is false (meaning login is unsuccessful), show a sweetalert with an error icon that says "Authentication failed - Check your login details and try again"

10. When done, make sure to import the page in App.js, remove <Register /> and add the login component to test

When done, copy Login.js to any folder and push your work to Gitlab, then paste to Boodle under React.js - Effects, Events, and Forms
*/