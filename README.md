# Web Development Project 4 - *Veni Vici Nepal*

Submitted by: **Bigyan Timalsina**

This web app: **Veni Vici Nepal** is an interactive web application that allows users to explore the beautiful landmarks, culture, and history of Nepal. Users can discover various places with images, names, and descriptions, and view a history of previously seen locations.

Time spent: **5** hours spent in total

## Required Features

The following **required** functionality is completed: 

- [x] **Application features a button that creates a new simulated API fetch request on click and displays at least three attributes and an image obtained from the returned JSON data**
  - The data is loaded from a local JSON file (`nepalData.js`) which simulates an API response.
  - The type of attribute displayed for each image is consistent: name, type, and description.
- [x] **Only one item/data from the simulated API call response is viewable at a time and at least one image is displayed per call**
  - A single result is displayed at a time.
  - Displayed attributes match the displayed image.
- [x] **Simulated API call response results appear random to the user**
  - Clicking the “Discover” button shows a random new place from the dataset.
- [ ] **Clicking on a displayed value for one attribute adds it to a displayed ban list**
- [ ] **Attributes on the ban list prevent further images/API results with that attribute from being displayed**

---

The following **optional** features are implemented:

- [x] Users can see a stored history of their previously displayed results from this session
  - A dedicated history section displays all the previously viewed places.
  - Each time the “Discover” button is clicked, the history updates with the newest result.
- [x] Added beautiful and responsive custom CSS styling for better user experience.

---

The following **additional** features are implemented:

* [x] Logo click returns the user to the dashboard or main explore screen.
* [x] Smooth animations and hover effects for cards and buttons.
* [x] Locally hosted images displayed with each data entry.

---

## Video Walkthrough

Here's a walkthrough of implemented user stories:

<img src=''Video Walkthrough width='' alt='Video Walkthrough' />

GIF created with ...  
adobe express for macOS

---

## Notes

While building this project, the main challenge was simulating an API-like behavior using local JSON data and managing dynamic rendering of new random items with each click.  
Styling was carefully adjusted to make the site look visually appealing and consistent across devices.

---

## License

    Copyright 2025 Bigyan Timalsina

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
