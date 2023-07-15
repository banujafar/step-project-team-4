# step-project2-team-4
Project Description
You need to create a page where a Secretary can create cards describing scheduled visits to doctors.

The page should include:

- Page Header:
1. In the top left corner - logo. You can use any logo.
2. In the top right corner - "Login" button. After successful authentication, it should be replaced with the "Create Visit" button.
3. Below the Header - a form for filtering visits. The form should include 3 fields:
   -Search by visit title/content.
   -Filter by status (Open/Done) - whether the visit has been completed or not.
   -Filter by urgency (High, Normal, Low) of the visit.
4. Below the filter form - a list of created visits.

## Technologies used

The following technologies were used in the development of this project:

- HTML5
- CSS3
- JavaScript
- Webpack
- Browser-sync-webpack-plugin
- Copy-webpack-plugin
- Html-webpack-plugin
- Imagemin-webpack-plugin

## Technical Requirements
1. On the first visit to the page, the board should display the message No items have been added. The same message should be displayed if the user has no added cards (e.g., if they have deleted all of them).
2. Clicking the Login button opens a modal window where the user enters their email and password. If the credentials are correct, the user is presented with a list of previously created visits on the page.
3. Clicking the Create Visit button opens a modal window where a new card can be created.
4. Use the ES6 class syntax for creating classes.
5. For AJAX requests, you can use either fetch or axios.
6. After any AJAX request, the page should not be refreshed. When adding/deleting a card or performing similar operations with the server, the entire list of cards should not be reloaded. Instead, use the data from the server response and JavaScript to update the information on the page.
7. Previously added notes should not disappear when the page is refreshed or closed.
8. It is desirable to divide the project into modules using ES6 modules.

## Create Visit Modal Window

- The modal window should include:
1. A dropdown list (select) for selecting a doctor. Depending on the selected doctor, fields specific to that doctor's visit should appear below the dropdown list.
2. The list should have three options: Cardiologist, Dentist, Therapist.
3. After selecting a doctor from the list, fields for making an appointment with that doctor should appear below. Several fields are common for all three doctors:
  Visit purpose
  Brief visit description
  Dropdown - urgency level (normal, priority, urgent)
  Full name
3. Each doctor also has unique fields to fill in. If the Cardiologist option is chosen, the following additional fields should appear for entering information:
  Normal blood pressure
  Body Mass Index (BMI)
  Previously diagnosed cardiovascular diseases
  Age
4. If the Dentist option is chosen, the following additional information needs to be filled in:
  Last visit date
5. If the Therapist option is chosen, the following additional information needs to be filled in:
  Age
6. Create button. When the button is clicked, an AJAX request is sent to the corresponding endpoint, and if the response contains information about the newly created visit, a visit card is created on the Visits Board page, and the modal window is closed.
7. Close button - closes the modal window without saving information or creating a visit card. Clicking outside the modal window area also closes the modal window.
8. All input fields, regardless of the selected option, except for the additional comments field, are mandatory. Data validation is not required.
   
## Visit Card Description
- The card created upon clicking appears on the Visits Board. 
- It should include:
  Full name (entered during card creation)
  Doctor the person is scheduled to visit
  Show More button. When clicked, the card expands to display the rest of the information entered during the visit creation.
  Edit button. When clicked, the card switches to a form where the entered fields can be edited. It should be similar to the modal window used for creating a visit card.
  Close icon (cross) in the top right corner. When clicked, the card will be deleted.
  Visit Filters
- You need to implement card filters (an input field for searching by title or visit description, filters by status and priority) on the frontend. This means that when the value of any form element changes (selected item in the list or text entered in the input field), you should filter the list of previously obtained cards from the server and display the updated information on the screen.

## Classes
- The JavaScript code must include the following classes:
  Modal class (modal window);
  Visit class (describing common fields and methods for all visits to any doctor);
  Subclasses VisitDentist, VisitCardiologist, VisitTherapist;
## Team Members

1. Aydan Yunus
2. Banu Jafarli

## Task Distribution

### Aydan Yunus
 - Login
 - Create visit

### Banu Jafarli
 - Filtering
 - Modal view
