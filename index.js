'use strict';

//USER STORIES

// A shopping list should be rendered to the page
// You should be able to add items to the list
// You should be able to check items on the list
// You should be able to delete items from the list

//item name rendered as inner text
//item's index in the store set as a data attribute for the <li>
//item's checked state (true or false) rendered as the presence or absence of a  CSS class for indicating checked items
//join together the individual item strings into one long string
//insert the <li>s string inside the .js-shopping-list <ul> into the DOM

// render STORE shopping list

const STORE = {
  items:[
    { name: 'apples', checked: false },
    { name: 'oranges', checked: false },
    { name: 'milk', checked: true },
    { name: 'bread', checked: false }
  ],
  filter: false,
  searchFilter: '',
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
          <button class="js-Edit-Button">
            <span>Edit</span>
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
  function displayedItems () {  
    if(STORE.filter === true) {
        return STORE.items.filter(item => item.checked); 
    } else if (STORE.searchFilter !== "") {
        return STORE.items.filter(item => item.name === STORE.searchFilter); 
    } else {
        return STORE.items;
    }
  }
  // const displayedItems = STORE.filter ? STORE.items.filter(item => item.checked): STORE.searchFilter !== "" ? STORE.items.filter(item => item.name === STORE.searchFilter): STORE.items;
  const shoppingListItemsString = generateShoppingItemsString(displayedItems());
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
function deleteItemOffShoppingList (item) {
  STORE.items.splice(item, 1);
}

function handleDeleteItemClicked() {
  console.log('`handleDeleteItemClicked` ran');
  $(".js-shopping-list").on("click", ".js-item-delete", function(event) {
    const itemIndex = getItemIndexFromElement(event.currentTarget);
    
    deleteItemOffShoppingList(itemIndex);
    renderShoppingList();
  });
}

//-----------------------------------------------------------------------
//-----------------------------------------------------------------------


function handleToggleAllCheckedOrAllItems () {
  let checkBox = $('input[type="checkbox"]');

    checkBox.change(function(event) {
      STORE.filter = $(this).prop('checked');
    renderShoppingList();
  });
}


  
function handleSearchBarEntry() {
  $(".searchBarDiv").submit(function(event){
      event.preventDefault();
      const value = $(".js-SearchBar").val();
      STORE.searchFilter = value;
      $(".js-SearchBar").val("");
      renderShoppingList();
  });
  
}

function changesItemName () {

}

function rendersEditForm () {
  let dog =
    `<form>
      <label for="changedNameValue" >Change Name Here</label>
      <input class="js-Changed-Name-Text" type="text" placeholder="Change Name here" name="changedNameValue">
      <button class="js-Form-Button-For-EditName" type="submit">SubmitButton</button
     </form>`;
   return dog;
}

function handleRendersEditForm() {
  $(".js-Edit-Button").on("click", function(event) {
    $(".editItem").html(rendersEditForm());
  });
}

function editItemName() {
  
}

function handleEditValue () {
  $(".js-Form-Button-For-EditName").submit(function(event) {
    
    event.preventDefault();
    console.log("hello")
    let newName = $(this).val();
    editItemName(newName);
  });
 }


//-----------------------------------------------------------------------
// DOM
function handleShoppingList() {
  renderShoppingList();
  handleNewItemSubmit();
  handleItemCheckClicked();
  handleDeleteItemClicked();
  handleToggleAllCheckedOrAllItems();
  handleSearchBarEntry();
  handleRendersEditForm();
  changesItemName();
}

$(handleShoppingList);
