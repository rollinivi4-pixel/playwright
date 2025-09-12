/**
 * Bootstrap Dropdown Examples and Explanations
 * This file demonstrates various Bootstrap dropdown implementations and interactions
 */

// ========================================
// 1. BASIC DROPDOWN SETUP
// ========================================

/**
 * Basic dropdown initialization
 * This function creates a simple dropdown programmatically
 */
function createBasicDropdown() {
    // Create dropdown container
    const dropdownContainer = document.createElement('div');
    dropdownContainer.className = 'dropdown';
    dropdownContainer.id = 'basicDropdown';

    // Create dropdown button
    const dropdownButton = document.createElement('button');
    dropdownButton.className = 'btn btn-secondary dropdown-toggle';
    dropdownButton.type = 'button';
    dropdownButton.setAttribute('data-bs-toggle', 'dropdown');
    dropdownButton.setAttribute('aria-expanded', 'false');
    dropdownButton.textContent = 'Basic Dropdown';
    dropdownButton.id = 'basicDropdownButton';

    // Create dropdown menu
    const dropdownMenu = document.createElement('ul');
    dropdownMenu.className = 'dropdown-menu';
    dropdownMenu.setAttribute('aria-labelledby', 'basicDropdownButton');

    // Create menu items
    const menuItems = ['Action', 'Another action', 'Something else here'];
    menuItems.forEach(item => {
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        link.className = 'dropdown-item';
        link.href = '#';
        link.textContent = item;
        link.addEventListener('click', (e) => {
            e.preventDefault();
            console.log(`Selected: ${item}`);
            handleDropdownSelection(item);
        });
        listItem.appendChild(link);
        dropdownMenu.appendChild(listItem);
    });

    // Assemble dropdown
    dropdownContainer.appendChild(dropdownButton);
    dropdownContainer.appendChild(dropdownMenu);

    return dropdownContainer;
}

// ========================================
// 2. DROPDOWN WITH DIFFERENT STYLES
// ========================================

/**
 * Creates dropdowns with different Bootstrap button styles
 */
function createStyledDropdowns() {
    const styles = [
        { class: 'btn-primary', text: 'Primary' },
        { class: 'btn-success', text: 'Success' },
        { class: 'btn-warning', text: 'Warning' },
        { class: 'btn-danger', text: 'Danger' },
        { class: 'btn-info', text: 'Info' }
    ];

    const container = document.createElement('div');
    container.className = 'row';

    styles.forEach((style, index) => {
        const col = document.createElement('div');
        col.className = 'col-md-2 mb-3';

        const dropdown = document.createElement('div');
        dropdown.className = 'dropdown';

        const button = document.createElement('button');
        button.className = `btn ${style.class} dropdown-toggle`;
        button.type = 'button';
        button.setAttribute('data-bs-toggle', 'dropdown');
        button.textContent = style.text;

        const menu = document.createElement('ul');
        menu.className = 'dropdown-menu';

        // Add sample menu items
        ['Option 1', 'Option 2', 'Option 3'].forEach(option => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.className = 'dropdown-item';
            a.href = '#';
            a.textContent = option;
            a.addEventListener('click', (e) => {
                e.preventDefault();
                console.log(`${style.text} dropdown - Selected: ${option}`);
            });
            li.appendChild(a);
            menu.appendChild(li);
        });

        dropdown.appendChild(button);
        dropdown.appendChild(menu);
        col.appendChild(dropdown);
        container.appendChild(col);
    });

    return container;
}

// ========================================
// 3. DROPDOWN WITH HEADERS AND DIVIDERS
// ========================================

/**
 * Creates a dropdown with organized sections using headers and dividers
 */
function createOrganizedDropdown() {
    const dropdown = document.createElement('div');
    dropdown.className = 'dropdown';

    const button = document.createElement('button');
    button.className = 'btn btn-info dropdown-toggle';
    button.type = 'button';
    button.setAttribute('data-bs-toggle', 'dropdown');
    button.textContent = 'Organized Menu';

    const menu = document.createElement('ul');
    menu.className = 'dropdown-menu';

    // Account Actions Section
    const accountHeader = document.createElement('li');
    const accountHeaderText = document.createElement('h6');
    accountHeaderText.className = 'dropdown-header';
    accountHeaderText.textContent = 'Account Actions';
    accountHeader.appendChild(accountHeaderText);
    menu.appendChild(accountHeader);

    // Account items
    const accountItems = ['Profile', 'Settings', 'Preferences'];
    accountItems.forEach(item => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.className = 'dropdown-item';
        a.href = '#';
        a.textContent = item;
        a.addEventListener('click', (e) => {
            e.preventDefault();
            console.log(`Account action: ${item}`);
        });
        li.appendChild(a);
        menu.appendChild(li);
    });

    // Divider
    const divider = document.createElement('li');
    const hr = document.createElement('hr');
    hr.className = 'dropdown-divider';
    divider.appendChild(hr);
    menu.appendChild(divider);

    // System Section
    const systemHeader = document.createElement('li');
    const systemHeaderText = document.createElement('h6');
    systemHeaderText.className = 'dropdown-header';
    systemHeaderText.textContent = 'System';
    systemHeader.appendChild(systemHeaderText);
    menu.appendChild(systemHeader);

    // System items
    const systemItems = ['Help', 'Documentation', 'Logout'];
    systemItems.forEach(item => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.className = 'dropdown-item';
        a.href = '#';
        a.textContent = item;
        a.addEventListener('click', (e) => {
            e.preventDefault();
            console.log(`System action: ${item}`);
        });
        li.appendChild(a);
        menu.appendChild(li);
    });

    dropdown.appendChild(button);
    dropdown.appendChild(menu);

    return dropdown;
}

// ========================================
// 4. SPLIT BUTTON DROPDOWN
// ========================================

/**
 * Creates a split button dropdown
 */
function createSplitButtonDropdown() {
    const btnGroup = document.createElement('div');
    btnGroup.className = 'btn-group';

    // Main action button
    const mainButton = document.createElement('button');
    mainButton.type = 'button';
    mainButton.className = 'btn btn-primary';
    mainButton.textContent = 'Action';
    mainButton.addEventListener('click', () => {
        console.log('Main action clicked');
        alert('Main action executed!');
    });

    // Dropdown toggle button
    const dropdownToggle = document.createElement('button');
    dropdownToggle.type = 'button';
    dropdownToggle.className = 'btn btn-primary dropdown-toggle dropdown-toggle-split';
    dropdownToggle.setAttribute('data-bs-toggle', 'dropdown');
    dropdownToggle.setAttribute('aria-expanded', 'false');

    const visuallyHidden = document.createElement('span');
    visuallyHidden.className = 'visually-hidden';
    visuallyHidden.textContent = 'Toggle Dropdown';
    dropdownToggle.appendChild(visuallyHidden);

    // Dropdown menu
    const menu = document.createElement('ul');
    menu.className = 'dropdown-menu';

    const menuItems = [
        { text: 'Another action', action: () => console.log('Another action') },
        { text: 'Something else here', action: () => console.log('Something else') },
        { text: 'Separated link', action: () => console.log('Separated link') }
    ];

    menuItems.forEach((item, index) => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.className = 'dropdown-item';
        a.href = '#';
        a.textContent = item.text;
        a.addEventListener('click', (e) => {
            e.preventDefault();
            item.action();
        });
        li.appendChild(a);
        menu.appendChild(li);

        // Add divider before last item
        if (index === menuItems.length - 2) {
            const dividerLi = document.createElement('li');
            const hr = document.createElement('hr');
            hr.className = 'dropdown-divider';
            dividerLi.appendChild(hr);
            menu.appendChild(dividerLi);
        }
    });

    btnGroup.appendChild(mainButton);
    btnGroup.appendChild(dropdownToggle);
    btnGroup.appendChild(menu);

    return btnGroup;
}

// ========================================
// 5. DROPDOWN DIRECTIONS
// ========================================

/**
 * Creates dropdowns with different directions
 */
function createDirectionalDropdowns() {
    const directions = [
        { class: 'dropdown', text: 'Dropdown (Down)' },
        { class: 'dropup', text: 'Dropup (Up)' },
        { class: 'dropstart', text: 'Dropstart (Left)' },
        { class: 'dropend', text: 'Dropend (Right)' }
    ];

    const container = document.createElement('div');
    container.className = 'row';

    directions.forEach(direction => {
        const col = document.createElement('div');
        col.className = 'col-md-3 mb-3';

        const dropdown = document.createElement('div');
        dropdown.className = direction.class;

        const button = document.createElement('button');
        button.className = 'btn btn-secondary dropdown-toggle';
        button.type = 'button';
        button.setAttribute('data-bs-toggle', 'dropdown');
        button.textContent = direction.text;

        const menu = document.createElement('ul');
        menu.className = 'dropdown-menu';

        // Add menu items
        ['Action 1', 'Action 2', 'Action 3'].forEach(item => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.className = 'dropdown-item';
            a.href = '#';
            a.textContent = item;
            a.addEventListener('click', (e) => {
                e.preventDefault();
                console.log(`${direction.text} - Selected: ${item}`);
            });
            li.appendChild(a);
            menu.appendChild(li);
        });

        dropdown.appendChild(button);
        dropdown.appendChild(menu);
        col.appendChild(dropdown);
        container.appendChild(col);
    });

    return container;
}

// ========================================
// 6. INTERACTIVE DROPDOWN WITH STATE MANAGEMENT
// ========================================

/**
 * Creates an interactive dropdown with state management
 */
function createInteractiveDropdown() {
    const container = document.createElement('div');
    container.className = 'mb-4';

    // Create dropdown
    const dropdown = document.createElement('div');
    dropdown.className = 'dropdown';

    const button = document.createElement('button');
    button.className = 'btn btn-success dropdown-toggle';
    button.type = 'button';
    button.id = 'interactiveDropdown';
    button.setAttribute('data-bs-toggle', 'dropdown');
    button.textContent = 'Interactive Dropdown';

    const menu = document.createElement('ul');
    menu.className = 'dropdown-menu';
    menu.setAttribute('aria-labelledby', 'interactiveDropdown');

    const options = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];
    options.forEach(option => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.className = 'dropdown-item';
        a.href = '#';
        a.textContent = option;
        a.addEventListener('click', (e) => {
            e.preventDefault();
            handleDropdownSelection(option);
            updateButtonText(button, option);
        });
        li.appendChild(a);
        menu.appendChild(li);
    });

    dropdown.appendChild(button);
    dropdown.appendChild(menu);

    // Create result display
    const resultDiv = document.createElement('div');
    resultDiv.className = 'mt-3 p-3 bg-light border rounded';
    resultDiv.innerHTML = '<strong>Selected:</strong> <span id="selectedOption">None</span>';

    container.appendChild(dropdown);
    container.appendChild(resultDiv);

    return container;
}

// ========================================
// 7. FORM DROPDOWN WITH VALIDATION
// ========================================

/**
 * Creates a form dropdown with validation
 */
function createFormDropdown() {
    const form = document.createElement('form');
    form.id = 'dropdownForm';

    // Country dropdown
    const countryGroup = document.createElement('div');
    countryGroup.className = 'mb-3';

    const countryLabel = document.createElement('label');
    countryLabel.className = 'form-label';
    countryLabel.textContent = 'Select Country:';
    countryLabel.setAttribute('for', 'countrySelect');

    const countryDropdown = document.createElement('div');
    countryDropdown.className = 'dropdown';

    const countryButton = document.createElement('button');
    countryButton.className = 'btn btn-outline-secondary dropdown-toggle w-100';
    countryButton.type = 'button';
    countryButton.id = 'countrySelect';
    countryButton.setAttribute('data-bs-toggle', 'dropdown');
    countryButton.textContent = 'Choose Country';

    const countryMenu = document.createElement('ul');
    countryMenu.className = 'dropdown-menu w-100';

    const countries = ['United States', 'Canada', 'United Kingdom', 'Germany', 'France', 'Japan', 'Australia'];
    countries.forEach(country => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.className = 'dropdown-item';
        a.href = '#';
        a.textContent = country;
        a.addEventListener('click', (e) => {
            e.preventDefault();
            selectCountry(country);
        });
        li.appendChild(a);
        countryMenu.appendChild(li);
    });

    countryDropdown.appendChild(countryButton);
    countryDropdown.appendChild(countryMenu);
    countryGroup.appendChild(countryLabel);
    countryGroup.appendChild(countryDropdown);

    // Category dropdown
    const categoryGroup = document.createElement('div');
    categoryGroup.className = 'mb-3';

    const categoryLabel = document.createElement('label');
    categoryLabel.className = 'form-label';
    categoryLabel.textContent = 'Select Category:';
    categoryLabel.setAttribute('for', 'categorySelect');

    const categoryDropdown = document.createElement('div');
    categoryDropdown.className = 'dropdown';

    const categoryButton = document.createElement('button');
    categoryButton.className = 'btn btn-outline-primary dropdown-toggle w-100';
    categoryButton.type = 'button';
    categoryButton.id = 'categorySelect';
    categoryButton.setAttribute('data-bs-toggle', 'dropdown');
    categoryButton.textContent = 'Choose Category';

    const categoryMenu = document.createElement('ul');
    categoryMenu.className = 'dropdown-menu w-100';

    // Technology section
    const techHeader = document.createElement('li');
    const techHeaderText = document.createElement('h6');
    techHeaderText.className = 'dropdown-header';
    techHeaderText.textContent = 'Technology';
    techHeader.appendChild(techHeaderText);
    categoryMenu.appendChild(techHeader);

    const techItems = ['Web Development', 'Mobile Apps', 'Data Science'];
    techItems.forEach(item => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.className = 'dropdown-item';
        a.href = '#';
        a.textContent = item;
        a.addEventListener('click', (e) => {
            e.preventDefault();
            selectCategory(item);
        });
        li.appendChild(a);
        categoryMenu.appendChild(li);
    });

    // Divider
    const divider = document.createElement('li');
    const hr = document.createElement('hr');
    hr.className = 'dropdown-divider';
    divider.appendChild(hr);
    categoryMenu.appendChild(divider);

    // Business section
    const businessHeader = document.createElement('li');
    const businessHeaderText = document.createElement('h6');
    businessHeaderText.className = 'dropdown-header';
    businessHeaderText.textContent = 'Business';
    businessHeader.appendChild(businessHeaderText);
    categoryMenu.appendChild(businessHeader);

    const businessItems = ['Marketing', 'Sales', 'Finance'];
    businessItems.forEach(item => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.className = 'dropdown-item';
        a.href = '#';
        a.textContent = item;
        a.addEventListener('click', (e) => {
            e.preventDefault();
            selectCategory(item);
        });
        li.appendChild(a);
        categoryMenu.appendChild(li);
    });

    categoryDropdown.appendChild(categoryButton);
    categoryDropdown.appendChild(categoryMenu);
    categoryGroup.appendChild(categoryLabel);
    categoryGroup.appendChild(categoryDropdown);

    // Submit button
    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.className = 'btn btn-primary';
    submitButton.textContent = 'Submit Form';

    form.appendChild(countryGroup);
    form.appendChild(categoryGroup);
    form.appendChild(submitButton);

    // Add form submission handler
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = {
            country: document.getElementById('countrySelect').textContent,
            category: document.getElementById('categorySelect').textContent
        };
        console.log('Form submitted:', formData);
        alert(`Form submitted!\nCountry: ${formData.country}\nCategory: ${formData.category}`);
    });

    return form;
}

// ========================================
// 8. DROPDOWN EVENT HANDLERS
// ========================================

/**
 * Handles dropdown selection events
 */
function handleDropdownSelection(option) {
    console.log(`Dropdown selection: ${option}`);
    
    // Update the result display
    const selectedOptionElement = document.getElementById('selectedOption');
    if (selectedOptionElement) {
        selectedOptionElement.textContent = option;
    }
    
    // You can add more logic here, such as:
    // - Updating other UI elements
    // - Making API calls
    // - Storing in localStorage
    // - Triggering other functions
}

/**
 * Updates button text after selection
 */
function updateButtonText(button, text) {
    button.textContent = text;
}

/**
 * Handles country selection
 */
function selectCountry(country) {
    const countryButton = document.getElementById('countrySelect');
    if (countryButton) {
        countryButton.textContent = country;
        console.log(`Country selected: ${country}`);
    }
}

/**
 * Handles category selection
 */
function selectCategory(category) {
    const categoryButton = document.getElementById('categorySelect');
    if (categoryButton) {
        categoryButton.textContent = category;
        console.log(`Category selected: ${category}`);
    }
}

// ========================================
// 9. DROPDOWN UTILITY FUNCTIONS
// ========================================

/**
 * Utility function to create dropdown items
 */
function createDropdownItem(text, onClick) {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.className = 'dropdown-item';
    a.href = '#';
    a.textContent = text;
    a.addEventListener('click', (e) => {
        e.preventDefault();
        if (onClick) onClick(text);
    });
    li.appendChild(a);
    return li;
}

/**
 * Utility function to create dropdown header
 */
function createDropdownHeader(text) {
    const li = document.createElement('li');
    const h6 = document.createElement('h6');
    h6.className = 'dropdown-header';
    h6.textContent = text;
    li.appendChild(h6);
    return li;
}

/**
 * Utility function to create dropdown divider
 */
function createDropdownDivider() {
    const li = document.createElement('li');
    const hr = document.createElement('hr');
    hr.className = 'dropdown-divider';
    li.appendChild(hr);
    return li;
}

/**
 * Utility function to create a complete dropdown
 */
function createDropdown(config) {
    const {
        buttonText,
        buttonClass = 'btn-secondary',
        direction = 'dropdown',
        items = [],
        headers = [],
        dividers = []
    } = config;

    const container = document.createElement('div');
    container.className = direction;

    const button = document.createElement('button');
    button.className = `btn ${buttonClass} dropdown-toggle`;
    button.type = 'button';
    button.setAttribute('data-bs-toggle', 'dropdown');
    button.textContent = buttonText;

    const menu = document.createElement('ul');
    menu.className = 'dropdown-menu';

    // Add headers, items, and dividers in order
    const allElements = [...headers, ...items, ...dividers];
    allElements.forEach(element => {
        if (typeof element === 'string') {
            menu.appendChild(createDropdownItem(element));
        } else {
            menu.appendChild(element);
        }
    });

    container.appendChild(button);
    container.appendChild(menu);

    return container;
}

// ========================================
// 10. INITIALIZATION AND DEMO SETUP
// ========================================

/**
 * Initializes all dropdown examples
 */
function initializeDropdownExamples() {
    console.log('🚀 Initializing Bootstrap Dropdown Examples...');
    
    // Check if Bootstrap is loaded
    if (typeof bootstrap === 'undefined') {
        console.error('❌ Bootstrap is not loaded. Please include Bootstrap CSS and JS files.');
        return;
    }
    
    console.log('✅ Bootstrap is loaded successfully');
    
    // You can call these functions to create dropdowns programmatically
    // Example usage:
    
    // const basicDropdown = createBasicDropdown();
    // document.body.appendChild(basicDropdown);
    
    // const styledDropdowns = createStyledDropdowns();
    // document.body.appendChild(styledDropdowns);
    
    // const organizedDropdown = createOrganizedDropdown();
    // document.body.appendChild(organizedDropdown);
    
    // const splitButton = createSplitButtonDropdown();
    // document.body.appendChild(splitButton);
    
    // const directionalDropdowns = createDirectionalDropdowns();
    // document.body.appendChild(directionalDropdowns);
    
    // const interactiveDropdown = createInteractiveDropdown();
    // document.body.appendChild(interactiveDropdown);
    
    // const formDropdown = createFormDropdown();
    // document.body.appendChild(formDropdown);
}

/**
 * Demo function to show all dropdown types
 */
function showAllDropdownExamples() {
    const container = document.createElement('div');
    container.className = 'container mt-5';
    container.innerHTML = '<h1 class="text-center mb-5">Bootstrap Dropdown Examples</h1>';
    
    // Add all examples
    const examples = [
        { title: 'Basic Dropdown', element: createBasicDropdown() },
        { title: 'Styled Dropdowns', element: createStyledDropdowns() },
        { title: 'Organized Dropdown', element: createOrganizedDropdown() },
        { title: 'Split Button Dropdown', element: createSplitButtonDropdown() },
        { title: 'Directional Dropdowns', element: createDirectionalDropdowns() },
        { title: 'Interactive Dropdown', element: createInteractiveDropdown() },
        { title: 'Form Dropdown', element: createFormDropdown() }
    ];
    
    examples.forEach((example, index) => {
        const section = document.createElement('div');
        section.className = 'mb-5 p-3 border rounded';
        section.innerHTML = `<h3>${index + 1}. ${example.title}</h3>`;
        section.appendChild(example.element);
        container.appendChild(section);
    });
    
    document.body.appendChild(container);
}

// ========================================
// 11. EXPORT FUNCTIONS (for module usage)
// ========================================

// If using modules, you can export these functions
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        createBasicDropdown,
        createStyledDropdowns,
        createOrganizedDropdown,
        createSplitButtonDropdown,
        createDirectionalDropdowns,
        createInteractiveDropdown,
        createFormDropdown,
        handleDropdownSelection,
        selectCountry,
        selectCategory,
        createDropdownItem,
        createDropdownHeader,
        createDropdownDivider,
        createDropdown,
        initializeDropdownExamples,
        showAllDropdownExamples
    };
}

// ========================================
// 12. AUTO-INITIALIZATION
// ========================================

// Auto-initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('📋 Bootstrap Dropdown Examples JS loaded');
    console.log('💡 Use showAllDropdownExamples() to display all examples');
    console.log('💡 Use initializeDropdownExamples() to initialize the system');
});

// ========================================
// 13. USAGE EXAMPLES AND DOCUMENTATION
// ========================================

/**
 * USAGE EXAMPLES:
 * 
 * 1. Basic Usage:
 *    const dropdown = createBasicDropdown();
 *    document.body.appendChild(dropdown);
 * 
 * 2. Custom Dropdown:
 *    const customDropdown = createDropdown({
 *        buttonText: 'Custom Dropdown',
 *        buttonClass: 'btn-primary',
 *        items: ['Item 1', 'Item 2', 'Item 3']
 *    });
 *    document.body.appendChild(customDropdown);
 * 
 * 3. Show All Examples:
 *    showAllDropdownExamples();
 * 
 * 4. Event Handling:
 *    dropdown.addEventListener('click', (e) => {
 *        console.log('Dropdown clicked');
 *    });
 * 
 * KEY FEATURES:
 * - Programmatic dropdown creation
 * - Event handling and state management
 * - Form integration with validation
 * - Multiple dropdown directions
 * - Split button functionality
 * - Organized menus with headers and dividers
 * - Utility functions for easy customization
 * - Bootstrap 5 compatibility
 * 
 * REQUIREMENTS:
 * - Bootstrap 5 CSS and JS
 * - Modern browser with ES6+ support
 * - Popper.js (included with Bootstrap bundle)
 */

