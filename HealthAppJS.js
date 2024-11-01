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

    if (tabName = "progress") {progressChart();}
}

// Initialize profiles in localStorage if they don't exist
if (!localStorage.getItem('profiles')) {
    localStorage.setItem('profiles', JSON.stringify([
        { name: '', age: '', weight: '', height: '' },
        { name: '', age: '', weight: '', height: '' },
        { name: '', age: '', weight: '', height: '' },
        { name: '', age: '', weight: '', height: '' }
    ]));
}

let currentProfile = 1;

function switchProfile(profileNum) {
    currentProfile = profileNum;
    
    // Update active button
    document.querySelectorAll('.profile-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`.profile-btn:nth-child(${profileNum})`).classList.add('active');
    
    // Update current profile heading
    document.getElementById('currentProfileHeading').textContent = `Current Profile: Profile ${profileNum}`;
    
    // Load profile data
    const profiles = JSON.parse(localStorage.getItem('profiles'));
    const profile = profiles[profileNum - 1];
    
    document.getElementById('name').value = profile.name;
    document.getElementById('age').value = profile.age;
    document.getElementById('weight').value = profile.weight;
    document.getElementById('height').value = profile.height;

    // Load goals, exercises, and distances for the current profile
    loadGoals();
    loadExercises();
    loadDistances();
}

function saveProfile() {
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const weight = document.getElementById('weight').value;
    const height = document.getElementById('height').value;
    
    // Validate inputs
    if (!name || !age || !weight || !height) {
        alert('Please fill in all fields');
        return;
    }
    
    if (age < 0 || weight < 0 || height < 0) {
        alert('Please enter valid positive numbers');
        return;
    }
    
    // Save to localStorage
    const profiles = JSON.parse(localStorage.getItem('profiles'));
    profiles[currentProfile - 1] = {
        name: name,
        age: age,
        weight: weight,
        height: height
    };
    localStorage.setItem('profiles', JSON.stringify(profiles));
    
    alert('Profile saved successfully!');
}

function addGoal() {
    const goalDescription = document.getElementById('goalDescription').value;
    const goalDate = document.getElementById('goalDate').value;
    
    if (!goalDescription || !goalDate) {
        alert('Please provide both a goal description and a final date.');
        return;
    }

    const profiles = JSON.parse(localStorage.getItem('profiles'));
    const profile = profiles[currentProfile - 1];

    if (!profile.goals) {
        profile.goals = [];
    }

    profile.goals.push({ description: goalDescription, date: goalDate });
    localStorage.setItem('profiles', JSON.stringify(profiles));

    loadGoals();
    document.getElementById('goalForm').reset();
}

function loadGoals() {
    const profiles = JSON.parse(localStorage.getItem('profiles'));
    const profile = profiles[currentProfile - 1];
    const goalList = document.getElementById('goalList');
    goalList.innerHTML = '';

    if (profile.goals) {
        profile.goals.forEach(goal => {
            const li = document.createElement('li');
            li.textContent = `Goal: ${goal.description} - Target Date: ${goal.date}`;
            goalList.appendChild(li);
        });
    }
}

function clearGoals() {
    const profiles = JSON.parse(localStorage.getItem('profiles'));
    const profile = profiles[currentProfile - 1];
    profile.goals = [];
    localStorage.setItem('profiles', JSON.stringify(profiles));
    loadGoals();
}

function addExercise() {
    const exercise = document.getElementById('exercise').value;
    const sets = document.getElementById('sets').value;
    const reps = document.getElementById('reps').value;
    const weightUsed = document.getElementById('weightUsed').value;

    if (sets < 0 || reps < 0 || weightUsed < 0) {
        alert('Please enter valid positive numbers for sets, reps, and weight.');
        return;
    }

    const profiles = JSON.parse(localStorage.getItem('profiles'));
    const profile = profiles[currentProfile - 1];

    if (!profile.exercises) {
        profile.exercises = [];
    }

    profile.exercises.push({ exercise, sets, reps, weightUsed });
    localStorage.setItem('profiles', JSON.stringify(profiles));

    loadExercises();
    document.getElementById('fitnessForm').reset();
}

function loadExercises() {
    const profiles = JSON.parse(localStorage.getItem('profiles'));
    const profile = profiles[currentProfile - 1];
    const fitnessList = document.getElementById('fitnessList');
    fitnessList.innerHTML = '';

    if (profile.exercises) {
        profile.exercises.forEach((exercise, index) => {
            const li = document.createElement('li');
            li.textContent = `Exercise: ${exercise.exercise}, Sets: ${exercise.sets}, Reps: ${exercise.reps}, Weight: ${exercise.weightUsed} lbs`;
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.onclick = () => removeExercise(index);
            li.appendChild(removeButton);
            fitnessList.appendChild(li);
        });
    }
}

function removeExercise(index) {
    const profiles = JSON.parse(localStorage.getItem('profiles'));
    const profile = profiles[currentProfile - 1];
    profile.exercises.splice(index, 1);
    localStorage.setItem('profiles', JSON.stringify(profiles));
    loadExercises();
}

function logDistance() {
    const distance = document.getElementById('distance').value;

    if (distance < 0) {
        alert('Please enter a valid positive number for distance.');
        return;
    }

    const profiles = JSON.parse(localStorage.getItem('profiles'));
    const profile = profiles[currentProfile - 1];

    if (!profile.distances) {
        profile.distances = [];
    }

    profile.distances.push(distance);
    localStorage.setItem('profiles', JSON.stringify(profiles));

    loadDistances();
    document.getElementById('distance').value = '';
}

function loadDistances() {
    const profiles = JSON.parse(localStorage.getItem('profiles'));
    const profile = profiles[currentProfile - 1];
    const distanceList = document.getElementById('distanceList');
    distanceList.innerHTML = '';

    if (profile.distances) {
        profile.distances.forEach((distance, index) => {
            const li = document.createElement('li');
            li.textContent = `Distance: ${distance} miles`;
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.onclick = () => removeDistance(index);
            li.appendChild(removeButton);
            distanceList.appendChild(li);
        });
    }
}

function removeDistance(index) {
    const profiles = JSON.parse(localStorage.getItem('profiles'));
    const profile = profiles[currentProfile - 1];
    profile.distances.splice(index, 1);
    localStorage.setItem('profiles', JSON.stringify(profiles));
    loadDistances();
}

// Load exercises and distances for the current profile on page load
window.addEventListener('load', () => {
    loadExercises();
    loadDistances();
});

function progressChart() {

    const xyValues = [
        {x:10, y:10},
        {x:20, y:20},
        {x:30, y:25},
        {x:40, y:30},
        {x:50, y:40},
        {x:60, y:45},
        {x:70, y:50},
        {x:80, y:60},
        {x:90, y:65},
        {x:95, y:70},
        {x:100, y:80}
    ];
      
    new Chart("progressChart", {

        type: "scatter",
        data: {
          datasets: [{
            pointRadius: 4,
            pointBackgroundColor: "rgb(0,0,255)",
            data: xyValues
          }]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Progress Chart', // Chart title
                    /* Personal styling of chart title */
                    color: 'green',
                    font: {
                        weight: 'bold',
                        size: 24
                    }
                }
            },
            legend: {display: true},
            scales: {
                xAxes: [{ticks: {min: 0, max:100}}],
                yAxes: [{ticks: {min: 0, max:100}}],
            }
        }
    });
}

// Show the Profile tab by default
showTab('profile');