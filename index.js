/*
Grandpa has a Christmas wish list to keep track of all the gifts he wants to ask for. But there’s a problem: if he forgets he’s already added something, the list gets clogged up with duplicates. This happened last year, and he ended up with 8 talking picture frames on Christmas Day!

Your task is to complete the `checkDuplicate()` function 👇 to ensure no duplicates are added to the list. But here’s the tricky part: Grandpa sometimes hits the spacebar more than once, making it harder to spot duplicates.

For example, only one of these entries should be added to the list — the others should be flagged as duplicates:

- "talking picture frames"
- "talking  picture frames"
- "talking picture    frames"
- " talking picture frames "

**Your tasks:**
1. Ensure no duplicates can be added to the list.
2. Account for extra spaces at the beginning/end and between words.
 
**Stretch Goals:**
1. Case Sensitivity: Handle cases where capitalization differs. For example:
   - `"Cat Hammock"` should be flagged as a duplicate of `"cat hammock"`.
   - Preserve Grandpa’s original capitalization (e.g., if `"Cat Hammock"` is added first, that should be added to the list). Do not simply convert all entries to lower case - Grandpa might well want to capitalize some words. 

2. Additional Features: Add functionality to delete or edit items on the list.
*/

// Get references to DOM elements
const itemInput = document.getElementById('item-input');
const addItemButton = document.getElementById('add-item-button');
const shoppingList = document.getElementById('shopping-list');
const listArr = [];
const normalizedSet = new Set(); // Set to store normalized strings for checking duplicates

// Function to check item is not duplicate
function checkDuplicate() {
    // Trim leading/trailing spaces and normalize spaces between words
    const originalText = itemInput.value.trim();
    const normalizedText = originalText
        .replace(/\s+/g, ' ') // Replace multiple spaces with a single space
        .toLowerCase(); // Normalize to lowercase for comparison

    if (normalizedSet.has(normalizedText)) {
        alert('This item is already on the list!');
    } else if (originalText.length > 0) { // Ensure the input is not empty
        normalizedSet.add(normalizedText); // Add normalized version to the set
        listArr.push(originalText); // Store the original text
        renderList();
    } else {
        alert('Please enter a valid item!');
    }
}

// Function to add an item to the shopping list
function renderList() {
    shoppingList.innerHTML = '';
    listArr.forEach((gift, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = gift;

        // Add Edit and Delete buttons
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.onclick = () => editItem(index);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteItem(index);

        listItem.appendChild(editButton);
        listItem.appendChild(deleteButton);
        shoppingList.appendChild(listItem);
    });
    itemInput.value = ''; // Clear the input field
}

// Function to delete an item from the list
function deleteItem(index) {
    const normalizedText = listArr[index]
        .trim()
        .replace(/\s+/g, ' ')
        .toLowerCase();
    listArr.splice(index, 1); // Remove from the array
    normalizedSet.delete(normalizedText); // Remove from the normalized set
    renderList();
}

// Function to edit an item on the list
function editItem(index) {
    const originalText = listArr[index];
    itemInput.value = originalText; // Populate the input field with the original text
    deleteItem(index); // Remove the current item (it will be re-added when edited)
}

// Add event listener to button
addItemButton.addEventListener('click', checkDuplicate);

// Allow adding items by pressing Enter key
itemInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        checkDuplicate();
    }
});

