// import RandomName from "./randomName.js";

// let input = document.getElementById("input");
// let btn = document.getElementById("btn");
// let rndBtn = document.getElementById("rndBtn");
// let rndName = document.getElementById("rndName");
// let removeBtn = document.getElementById("removeBtn");

// let nameArray = [];

// // Checking to see if names already exists within local storage
// if(localStorage.getItem("names")) {
//     // If names exists then it pulls the data and converts the JSON string to its value
//     // and saves it into nameArray
//     nameArray = JSON.parse(localStorage.getItem("names"));
// }

// btn.addEventListener('click', function() {
//     // If input value is blank, function returns nothing and ends
//     if(input.value == "") return;

//     // Adds inputted name into our nameArray
//     nameArray.push(input.value);

//     // Resets input
//     input.value = "";

//     // Converts nameArray into a JSON string and saves it into local storage
//     localStorage.setItem("names", JSON.stringify(nameArray));
// });

// rndBtn.addEventListener('click', function() {
//     // Calls our imported RandomName function
//     rndName.innerText = RandomName(nameArray);
// });

// removeBtn.addEventListener('click', function() {
//     // .indexOf() method returns the position of the first occurrence of a value in a string
//     let index = nameArray.indexOf(input.value);

//     if(index == -1) return;
    
//     // .splice() is an array method that can remove elements by changing the array
//     // we are giving two arguments, the index to start at, and how many elements to remove
//     nameArray.splice(index, 1);
//     input.value = "";

//     localStorage.setItem("names", JSON.stringify(nameArray));
// });




const names = JSON.parse(localStorage.getItem('names')) || [];
    const inputElement = document.getElementById('input');
    const addNameBtn = document.getElementById('addNameBtn');
    const randomGroupBtn = document.getElementById('randomGroupBtn');
    const groupSizeRange = document.getElementById('groupSizeRange');
    const totalNamesElement = document.getElementById('totalNames');
    const outputName = document.getElementById('outputName');
    
    // For displaying selected or removed name
    // - Access the totalNamesElement's innerHTML property
    // - Set it to display a string that includes the total number of names in the names array
    // - Concatenate the names array, joined by a comma and a space, to list all names
    
    function updateNamesDisplay() {
        totalNamesElement.innerHTML = `Total Names: ${names.length}<br>` + names.join(', ');
    }
    // - Declared a variable name and assign it the trimmed value from the inputElement
    // - If name is not empty and is not already included in the names array
    //   - Push the new name into the names array
    //   - Update the names in local storage by converting the names array to a string
    //   - Clear the inputElement value
    //   - Call updateNamesDisplay() to refresh the displayed list of names
    
    function addName() {
        const name = inputElement.value.trim();
        if (name && !names.includes(name)) {
            names.push(name);
            localStorage.setItem('names', JSON.stringify(names));
            inputElement.value = '';
            updateNamesDisplay();
        }
    }
    // - Find the index of the name to be removed in the names array
    // - If the index is found (index is not -1)
    //   - Remove the name from the names array using splice
    //   - Update the names in local storage to reflect this change
    //   - Call updateNamesDisplay() to update the frontEnd
    function removeName(name) {
        const index = names.indexOf(name);
        if (index !== -1) {
            names.splice(index, 1);
            localStorage.setItem('names', JSON.stringify(names));
            updateNamesDisplay();
        }
    }
    // - If there is at least one name in the names array
    // - Calculate a random index based on the length of the names array
    // - Display an alert with a randomly selected name using the random index
    function pickRandomName() {
        if (names.length > 0) {
            const randomIndex = Math.floor(Math.random() * names.length);
            alert(`Random Name: ${names[randomIndex]}`);
        }
    }
    // - Parse the value of groupSizeRange as an integer and store it in groupSize
    // - Copy and shuffle the names array, storing it in shuffledNames
    // - Initialize an empty array called groups
    // - While there are still names in shuffledNames
    //   - Splice the first 'groupSize' names from shuffledNames and push them as a new group into groups
    // - Handle the odd person out scenario:
    //   - If the last group has only one person and there is more than one group
    //     - Remove the last group and add its member(s) to the second last group
    // - Display an alert showing the generated groups in JSON format
    
    function generateRandomGroups() {
        const groupSize = parseInt(groupSizeRange.value, 10);
        let shuffledNames = [...names].sort(() => 0.5 - Math.random());
        let groups = [];
        while (shuffledNames.length > 0) {
            groups.push(shuffledNames.splice(0, groupSize));
        }
        // Handle the odd person out scenario
        if (groups[groups.length - 1].length === 1 && groups.length > 1) {
            const lastGroup = groups.pop();
            groups[groups.length - 1].push(...lastGroup);
        }
        alert(`Groups: ${JSON.stringify(groups)}`);
    }

    addNameBtn.addEventListener('click', addName);
    randomGroupBtn.addEventListener('click', generateRandomGroups);

    // Example of removing a name, adjust logic for dynamic removal based on your UI
    document.getElementById('removeBtn').addEventListener('click', function() {
        removeName(outputName.innerText); // Assuming 'outputName' shows the name to remove
    });


