function showTab(tabName) {
    document.querySelectorAll('.tab').forEach(tab => {
        tab.style.display = 'none';
    });
    document.querySelectorAll('nav button').forEach(button => {
        button.classList.remove('active');
    });
    document.getElementById(tabName).style.display = 'block';
    document.querySelectorAll('nav button').forEach(button => {
            if (button.querySelector(".nav-icon").getAttribute("alt") == tabName) button.classList.add("active");
    })
}

function saveProfile() {
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const weight = document.getElementById('weight').value;
    const height_ft = document.getElementById('height_ft').value;
    const height_in = document.getElementById('height_inches').value;
    alert(`Profile Saved!\nName: ${name}, Age: ${age}, Weight: ${weight}, Height: ${height_ft}\'${height_in}`);
}

function addGoal() {
    const goalDescription = document.getElementById('goalDescription').value;
    const goalDate = document.getElementById('goalDate').value;
    const goalList = document.getElementById('goalList');

    const li = document.createElement('li');
    li.textContent = `Goal: ${goalDescription} - Target Date: ${goalDate}`;
    goalList.appendChild(li);
    document.getElementById('goalForm').reset();
}

function addExercise() {
    const exercise = document.getElementById('exercise').value;
    const sets = document.getElementById('sets').value;
    const reps = document.getElementById('reps').value;
    const weightUsed = document.getElementById('weightUsed').value;
    const fitnessList = document.getElementById('fitnessList');

    const li = document.createElement('li');
    li.textContent = `Exercise: ${exercise}, Sets: ${sets}, Reps: ${reps}, Weight: ${weightUsed} lbs`;
    fitnessList.appendChild(li);
    document.getElementById('fitnessForm').reset();
}

function logDistance() {
    const distance = document.getElementById('distance').value;
    const distanceList = document.getElementById('distanceList');

    const li = document.createElement('li');
    li.textContent = `Distance: ${distance} miles`;
    distanceList.appendChild(li);
    document.getElementById('distance').value = '';
}

// Show the Profile tab by default
showTab('profile');