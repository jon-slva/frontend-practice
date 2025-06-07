// --------------------- INTERVIEW INSTRUCTIONS ---------------------
// Follow these steps in order:
// 1. Fetch and display existing todos:
//    • In useEffect, call GET http://localhost:3000/api/todo to retrieve todo list.
//    • Store response in state (useState).
//    • Conditionally render a "Loading..." message until data arrives.
//    • Render todos in a <table> with columns: Task, Status (checkbox), Due Date, Actions.
// 2. Add a new todo:
//    • Create controlled input state for a new task title.
//    • Implement an "Add Task" button that sends POST http://localhost:3000/api/todo with { title, dueDate: new Date().toISOString(), completed: false }.
//    • When POST succeeds, append the new todo to state and clear input.
// 3. Toggle completion status:
//    • In the Status column, render a checkbox reflecting todo.completed.
//    • On click, send PUT http://localhost:3000/api/todo/:id with updated completed value.
//    • On success, update that todo’s completed status in state.
// 4. Delete a todo:
//    • In the Actions column, render a "Delete" button for each row.
//    • On click, send DELETE http://localhost:3000/api/todo/:id.
//    • On success, remove the todo from state to update the UI.
// 5. Error handling and edge cases:
//    • Display console errors if any fetch/post/put/delete fails.
//    • Prevent adding empty titles (disable button or ignore).
//
// Build in this exact order. Once step 1 works, move on to step 2, and so on.
// -------------------------------------------------------------------
