# Sunrise 2024 GitHub Assessment

### NOTE: If you are not able to create a branch and push to this origin, please fork this repoistory and make a Pull Request

[Click here to fork this repo](https://github.com/CaravelLabs/sunrise-2024/fork)

## Task Details

**Overview**:
The Taskboard System is designed to streamline the process of assigning, managing, and tracking tasks for employees within an organization. The system will ensure that tasks are completed sequentially and efficiently, providing a clear progression path for employees as they work through their assignments.

**Project Requirements:**

- Task Structure:
    - The task board will consist of 10 tasks.
    - Each task belongs to a distinct section within different groups.
    - Tasks are generated and made active only after the tasks of the previous group have been completed.
    - The first task is auto-created upon the initialization of the program.
- API/Function Specifications:
    - Get Active Tasks: Retrieve the list of currently active tasks that employees are working on.
    - Get All Tasks: Retrieve the complete list of tasks, including active, pending, and completed tasks.
    - Get Completed Tasks: Retrieve the list of tasks that have been completed by employees.
    - Create New Task: Endpoint for creating a new task in the system.
    - Update Task: Endpoint for updating the details or status of an existing task.
    -Delete Task: Endpoint for deleting a task from the system.

**Functional Requirements:**

- Sequential Task Generation:
    - Tasks are unlocked in a sequential manner.
    - Employees must complete all tasks within a group before tasks from the next group become available.
    - Upon completing a task, the next task in the sequence becomes active.
- Auto-Initialization:
    - When the program initializes, the first task is automatically created and assigned to the employee.
- Task Management:
    - Employees can view their active tasks.
    - Employees can mark tasks as completed.
## Design

We have added a sample design documentation for you to better understand the flow of the task.
<br>
[Sample Design Documentation](https://www.figma.com/design/oBC0zPGhL1VzV2Bm31D2bR/Task-Board-Documentation?node-id=17-2327)


## Documentation

Documentation to some of the libraries or tech stacks that you might be using in this assessment:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [Ant Design](https://ant.design/components/overview/) - design library documentation
- [Material UI](https://mui.com/material-ui/getting-started/) - material UI documentation

_We suggest using Ant Design for the UI_

## Getting Started

First, route yourself to the web folder

```bash
cd web
```

Then run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Expectations
- Clone the repository and make your own branch based on the branch naming guidelines stated in the PR Guidelines.
- Implement the logic according to the given functional requirements and implement the UI with a framework of your choice ( _MaterialUI/AntDesign Recommended_ ).
- ```web/src/modules/taskManager.ts``` will be the boilerplate for the APIs that you will create. The logic that you will create is upto you but these functions need to be part of your code. 
<br>**DO NOT CHANGE THE NAMES OF THE FUNCTIONS OTHERWISE THE TESTS WON'T RUN.**
- Variables should be named properly according to camelCase.
- Maintain the casing as showcased in the repository. [ camel Casing and Pascal Casing where it should be]
- Command to run test : npm run test [ inside web folder ]

- For Brownie Points :
    - Code following design patterns ( strategy, MVC, MVVM , singleton , factory ), solid principles and coding standards and practices( eg, variable naming, formatted code, oops principles )
    - UI enhancement on the original screens
    - Writing own test cases ( as unit tests )
    <br>
    **Please remember it is important to pass the basic test cases. The rest will only be taken into consideration if you pass the original test cases.**

## Pull Request (PR) Guidelines
- Every Person should **NOT** make more than 1 pull request.
 - Create your branch based on your Firstname and Lastname with a suitable name. For example:
 "John Doe"'s branch will be called **jdoe/sunrise-2024**
- Pull Requests should have screenshots of UI attached and proper description behind your work. Adding Videos/GIFs to your PR to showcase your work is encouraged.
- Please make sure all the status checks are passed after you make the PR.
