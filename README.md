Here's a professional and well-structured README file for your frontend assignment:

---

# **Interactive Kanban Board Application**

An interactive **Kanban board application** built using **ReactJS** that dynamically adjusts its layout based on user-selected grouping and sorting options. This project is built to fulfill the requirements of the frontend assignment.

---

## **Features**
1. **Dynamic Grouping:**
   - **By Status**: Tickets grouped by their current status (e.g., Done, Todo, In Progress).
   - **By User**: Tickets grouped by the assigned user.
   - **By Priority**: Tickets grouped based on priority levels (e.g., Urgent, High, Medium, Low).
   
2. **Sorting Options:**
   - **By Priority**: Sort tickets in descending order of priority.
   - **By Title**: Sort tickets alphabetically by their title.

3. **Persistent State:**
   - The selected grouping and sorting preferences are saved and persist even after a page reload.

4. **Responsive Design:**
   - The application is fully responsive, ensuring an optimal user experience across devices.

5. **Custom UI:** 
   - A visually appealing and custom CSS design that mirrors the provided screenshots.

---

## **API Used**
The application interacts with the following API to fetch ticket data:
```
https://api.quicksell.co/v1/internal/frontend-assignment
```

---

## **Priority Levels**
The tickets are categorized into the following priority levels:

| **Priority Level** | **Label**       |
|---------------------|-----------------|
| 4                   | Urgent         |
| 3                   | High           |
| 2                   | Medium         |
| 1                   | Low            |
| 0                   | No Priority    |

---

## **Technologies Used**
1. **Frontend Framework:** ReactJS
2. **CSS:** Pure CSS

---

## **Project Setup**
To run the project locally, follow these steps:

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/pratyashha/quicksell.git
   cd quicksell
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Start the Development Server:**
   ```bash
   npm run dev
   ```
   The application will be accessible at `http://localhost:5173`.

4. **Build for Production:**
   ```bash
   npm run build
   ```
   This will generate the production-ready files in the `dist` directory.

---

## **How to Use**
1. Open the application in your browser.
2. Click the **Display** button to select a grouping option:
   - **Status**, **User**, or **Priority**.
3. Use the **Ordering** dropdown to sort tickets by **Priority** or **Title**.
4. Interact with the board to view tickets dynamically arranged based on your preferences.

---

## **Hosting**
The project is hosted and accessible at:
[**Quicksell Kanban Board Live Demo**](https://quicksell.vercel.com)

---

## **Assets**
All required assets and icons have been integrated into the project. If any asset is missing, download the provided assets from:
[Assignment Assets](https://prod-files-secure.s3.us-west-2.amazonaws.com/867c6222-5e73-49fb-b21f-a276ba2d258b/76bcb3fe-d025-4ad4-9247-e38c2935b859/Untitled.zip)

---

## **Evaluation Criteria**
1. Functionality: Fully meets the assignment requirements.
2. Design Accuracy: Matches the provided design screenshots.
3. Business Logic Optimization: Clean and efficient logic implementation.
4. Component Structure: Modular, reusable, and maintainable components.

---

## **Submission**
The source code has been zipped and submitted as per the requirements. Additionally, the hosted link has been provided for evaluation.

---

## **Contact**
For any queries or feedback, feel free to reach out:
- **Name**: Pratyasha Tripathy
- **Email**: [pratyasha.616@gmail.com]

---