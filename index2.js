'use strict';

//USER STORIES

// A shopping list should be rendered to the page
// You should be able to add items to the list
// You should be able to check items on the list
// You should be able to delete items from the list

// You should be able to press a switch/checkbox to toggle between displaying all items or displaying only items that are unchecked
// You should be able to type in a search term and the displayed list will be filtered by item names only containing that search term
// You should be able to edit the title of an item

// render STORE shopping list

const STORE = {
    items:[
      { name: 'apples', checked: false },
      { name: 'oranges', checked: false },
      { name: 'milk', checked: true },
      { name: 'bread', checked: false }
    ],
    filter: false,
  } 
    
  

//------------------------------------------------------------------------
// Creating HTML, Looping through shopping list, render new shopping list HTML

function generateItemElement(item, itemIndex, template) {
  return `
      <li class="js-item-index-element" data-item-index="${itemIndex}">
        <span class="shopping-item js-shopping-item ${
          item.checked ? 'shopping-item__checked' : ''
        }">${item.name}</span>
        <div class="shopping-item-controls">
          <button class="shopping-item-toggle js-item-toggle">
              <span class="button-label">check</span>
          </button>
          <button class="shopping-item-delete js-item-delete">
              <span class="button-label">delete</span>
          </button>
        </div>
      </li>`;
}

function generateShoppingItemsString(shoppingList) {
  const items = shoppingList.map((item, index) =>
    generateItemElement(item, index)
  );
  return items.join('');
}

function renderShoppingList() {
  //renders or shows the shopping list in the DOM
  //for each item in STORE, generate a string representing an <li> with:
  const shoppingListItemsString = generateShoppingItemsString(STORE.items);
  $('.js-shopping-list').html(shoppingListItemsString);
}

//--------------------------------------------------------------------
// Add items to list

function addItemToShoppingList(itemName) {
  console.log(`Adding "${itemName}" to shopping list`);
  STORE.items.push({ name: itemName, checked: false });
}

function handleNewItemSubmit() {
  console.log('`handleNewItemSubmit` ran');

  $('#js-shopping-list-form').submit(function(event) {
    event.preventDefault();

    const newItemName = $('.js-shopping-list-entry').val();
    $('.js-shopping-list-entry').val('');

    addItemToShoppingList(newItemName);
    renderShoppingList();
  });
}

//-----------------------------------------------------------------------
// Checked on/off items

function toggleCheckedForListItem(itemIndex) {
  console.log('Toggling checked property for item at index ' + itemIndex);
  STORE.items[itemIndex].checked = !STORE.items[itemIndex].checked;
}

function getItemIndexFromElement(item) {
  const itemIndexString = $(item)
    .closest('.js-item-index-element')
    .attr('data-item-index');
  return parseInt(itemIndexString, 10);
}

// check items on list
function handleItemCheckClicked() {
  $('.js-shopping-list').on('click', `.js-item-toggle`, event => {
    console.log('`handleItemCheckClicked` ran');
    const itemIndex = getItemIndexFromElement(event.currentTarget);

    toggleCheckedForListItem(itemIndex);
    renderShoppingList();
  });
}

//-----------------------------------------------------------------------
// Delete items on list
function deleteItemOffShoppingList(item) {
  STORE.items.splice(item, 1);
}

function handleDeleteItemClicked() {
  console.log('`handleDeleteItemClicked` ran');
  $('.js-shopping-list').on('click', '.js-item-delete', function(event) {
    const itemIndex = getItemIndexFromElement(event.currentTarget);

    deleteItemOffShoppingList(itemIndex);
    renderShoppingList();
  });
}

//-----------------------------------------------------------------------
//Toggle displaying items - checked vs unchecked

function handleToggleCheckUncheckedItems() {}

//-----------------------------------------------------------------------
//Search displays list with filtered item names containing the search term

function handleSearch() {}

//-----------------------------------------------------------------------
//Edit title of an item

function handleEditTitle() {}

//-----------------------------------------------------------------------
// DOM
function handleShoppingList() {
  renderShoppingList();
  handleNewItemSubmit();
  handleItemCheckClicked();
  handleDeleteItemClicked();
  handleToggleCheckUncheckedItems();
}

$(handleShoppingList);
