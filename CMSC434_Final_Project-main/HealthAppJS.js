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

function addMeal(mealType) {
    const foodInput = document.getElementById(`${mealType}-food`);
    const calorieSlider = document.getElementById(`${mealType}-calories`);
    const food = foodInput.value;
    const calories = parseInt(calorieSlider.value);

    if (!food) {
        alert('Please enter a food item');
        return;
    }

    const profiles = JSON.parse(localStorage.getItem('profiles'));
    const profile = profiles[currentProfile - 1];

    if (!profile.meals) {
        profile.meals = {};
    }
    if (!profile.meals[mealType]) {
        profile.meals[mealType] = [];
    }

    const date = new Date().toISOString().split('T')[0];
    profile.meals[mealType].push({
        date: date,
        food: food,
        calories: calories
    });

    localStorage.setItem('profiles', JSON.stringify(profiles));
    updateMealList(mealType);
    updateCalorieProgress();

    // Reset inputs
    foodInput.value = '';
    calorieSlider.value = 0;
    document.getElementById(`${mealType}-cal-value`).textContent = '0';
}

function updateMealList(mealType) {
    const profiles = JSON.parse(localStorage.getItem('profiles'));
    const profile = profiles[currentProfile - 1];
    const mealList = document.getElementById(`${mealType}-list`);
    mealList.innerHTML = '';

    if (profile.meals && profile.meals[mealType]) {
        const today = new Date().toISOString().split('T')[0];
        const todaysMeals = profile.meals[mealType].filter(meal => meal.date === today);

        todaysMeals.forEach((meal, index) => {
            const li = document.createElement('li');
            li.textContent = `${meal.food} - ${meal.calories} calories`;
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.onclick = () => removeMeal(mealType, index);
            li.appendChild(removeButton);
            mealList.appendChild(li);
        });
    }
}

function removeMeal(mealType, index) {
    const profiles = JSON.parse(localStorage.getItem('profiles'));
    const profile = profiles[currentProfile - 1];
    const today = new Date().toISOString().split('T')[0];
    
    profile.meals[mealType] = profile.meals[mealType].filter((meal, i) => 
        meal.date !== today || i !== index
    );
    
    localStorage.setItem('profiles', JSON.stringify(profiles));
    updateMealList(mealType);
    updateCalorieProgress();
}

function updateCalorieProgress() {
    const profiles = JSON.parse(localStorage.getItem('profiles'));
    const profile = profiles[currentProfile - 1];
    const today = new Date().toISOString().split('T')[0];
    let totalCalories = 0;

    if (profile.meals) {
        ['breakfast', 'lunch', 'dinner'].forEach(mealType => {
            if (profile.meals[mealType]) {
                totalCalories += profile.meals[mealType]
                    .filter(meal => meal.date === today)
                    .reduce((sum, meal) => sum + meal.calories, 0);
            }
        });
    }

    const progress = document.getElementById('calorie-progress');
    const display = document.getElementById('calorie-display');
    progress.value = totalCalories;
    display.textContent = `${totalCalories}/2000 calories`;
}

function addWater() {
    const waterSlider = document.getElementById('water-slider');
    const amount = parseInt(waterSlider.value);
    
    const profiles = JSON.parse(localStorage.getItem('profiles'));
    const profile = profiles[currentProfile - 1];
    
    if (!profile.waterIntake) {
        profile.waterIntake = [];
    }

    const today = new Date().toISOString().split('T')[0];
    profile.waterIntake.push({
        date: today,
        amount: amount
    });

    localStorage.setItem('profiles', JSON.stringify(profiles));
    updateWaterProgress();
    waterSlider.value = 0;
    document.getElementById('water-value').textContent = '0';
}

function updateWaterProgress() {
    const profiles = JSON.parse(localStorage.getItem('profiles'));
    const profile = profiles[currentProfile - 1];
    const today = new Date().toISOString().split('T')[0];
    
    let totalWater = 0;
    if (profile.waterIntake) {
        totalWater = profile.waterIntake
            .filter(entry => entry.date === today)
            .reduce((sum, entry) => sum + entry.amount, 0);
    }

    const progress = document.getElementById('water-progress');
    const display = document.getElementById('water-display');
    progress.value = totalWater;
    display.textContent = `${totalWater}/128 oz`;
}

function progressChart() {
    updateProgressChart();
}

function updateProgressChart() {
    const option = document.getElementById('progressOption').value;
    const timeRange = document.getElementById('timeRange').value;
    const profiles = JSON.parse(localStorage.getItem('profiles'));
    const profile = profiles[currentProfile - 1];
    
    let data = [];
    let labels = [];
    let title = '';
    let yAxisLabel = '';

    const endDate = new Date();
    let startDate = new Date();
    
    switch(timeRange) {
        case 'week':
            startDate.setDate(endDate.getDate() - 7);
            break;
        case 'month':
            startDate.setMonth(endDate.getMonth() - 1);
            break;
        case 'year':
            startDate.setFullYear(endDate.getFullYear() - 1);
            break;
    }

    switch(option) {
        case 'calories':
            title = 'Daily Calorie Intake';
            yAxisLabel = 'Calories';
            data = getDailyCalories(profile, startDate, endDate);
            break;
        case 'water':
            title = 'Daily Water Intake';
            yAxisLabel = 'Ounces';
            data = getDailyWater(profile, startDate, endDate);
            break;
        case 'cardio':
            title = 'Daily Miles Walked';
            yAxisLabel = 'Miles';
            data = getDailyDistance(profile, startDate, endDate);
            break;
        case 'strength':
            title = 'Strength Progress';
            yAxisLabel = 'Total Weight × Reps';
            data = getStrengthProgress(profile, startDate, endDate);
            break;
    }

    const ctx = document.getElementById('progressChart').getContext('2d');
    if (window.progressChartInstance) {
        window.progressChartInstance.destroy();
    }

    window.progressChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.map(d => d.date),
            datasets: [{
                label: title,
                data: data.map(d => d.value),
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: yAxisLabel
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Date'
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: title
                }
            }
        }
    });
}

// Helper functions for data processing
function getDailyCalories(profile, startDate, endDate) {
    const data = [];
    if (!profile.meals) return data;

    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
        const date = d.toISOString().split('T')[0];
        let dailyTotal = 0;

        ['breakfast', 'lunch', 'dinner'].forEach(mealType => {
            if (profile.meals[mealType]) {
                dailyTotal += profile.meals[mealType]
                    .filter(meal => meal.date === date)
                    .reduce((sum, meal) => sum + meal.calories, 0);
            }
        });

        data.push({ date: date, value: dailyTotal });
    }
    return data;
}

function getDailyWater(profile, startDate, endDate) {
    const data = [];
    if (!profile.waterIntake) return data;

    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
        const date = d.toISOString().split('T')[0];
        const dailyTotal = profile.waterIntake
            .filter(entry => entry.date === date)
            .reduce((sum, entry) => sum + entry.amount, 0);

        data.push({ date: date, value: dailyTotal });
    }
    return data;
}

function getDailyDistance(profile, startDate, endDate) {
    const data = [];
    if (!profile.distances) return data;

    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
        const date = d.toISOString().split('T')[0];
        const dailyTotal = profile.distances
            .filter(entry => entry.date === date)
            .reduce((sum, distance) => sum + parseFloat(distance), 0);

        data.push({ date: date, value: dailyTotal });
    }
    return data;
}

function getStrengthProgress(profile, startDate, endDate) {
    const data = [];
    if (!profile.exercises) return data;

    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
        const date = d.toISOString().split('T')[0];
        let dailyTotal = 0;

        const dayExercises = profile.exercises.filter(ex => ex.date === date);
        dayExercises.forEach(exercise => {
            // Calculate total weight lifted (weight × sets × reps)
            dailyTotal += exercise.weightUsed * exercise.sets * exercise.reps;
        });

        data.push({ date: date, value: dailyTotal });
    }
    return data;
}

// Event listeners for sliders
document.addEventListener('DOMContentLoaded', function() {
    // Meal calorie sliders
    ['breakfast', 'lunch', 'dinner'].forEach(mealType => {
        const slider = document.getElementById(`${mealType}-calories`);
        const output = document.getElementById(`${mealType}-cal-value`);
        
        slider.oninput = function() {
            output.textContent = this.value;
        }
    });

    // Water intake slider
    const waterSlider = document.getElementById('water-slider');
    const waterOutput = document.getElementById('water-value');
    
    waterSlider.oninput = function() {
        waterOutput.textContent = this.value;
    }

    // Initialize progress displays
    updateCalorieProgress();
    updateWaterProgress();
});

// Modify the existing addExercise function to include date
function addExercise() {
    const exercise = document.getElementById('exercise').value;
    const sets = document.getElementById('sets').value;
    const reps = document.getElementById('reps').value;
    const weightUsed = document.getElementById('weightUsed').value;

    if (!exercise || sets <= 0 || reps <= 0 || weightUsed < 0) {
        alert('Please enter valid values for all fields');
        return;
    }

    const profiles = JSON.parse(localStorage.getItem('profiles'));
    const profile = profiles[currentProfile - 1];

    if (!profile.exercises) {
        profile.exercises = [];
    }

    profile.exercises.push({
        exercise,
        sets,
        reps,
        weightUsed,
        date: new Date().toISOString().split('T')[0]
    });

    localStorage.setItem('profiles', JSON.stringify(profiles));
    loadExercises();
    document.getElementById('fitnessForm').reset();
}

// Modify the existing logDistance function to include date
function logDistance() {
    const distance = document.getElementById('distance').value;

    if (distance <= 0) {
        alert('Please enter a valid positive number for distance.');
        return;
    }

    const profiles = JSON.parse(localStorage.getItem('profiles'));
    const profile = profiles[currentProfile - 1];

    if (!profile.distances) {
        profile.distances = [];
    }

    profile.distances.push({
        distance: parseFloat(distance),
        date: new Date().toISOString().split('T')[0]
    });

    localStorage.setItem('profiles', JSON.stringify(profiles));
    loadDistances();
    document.getElementById('distance').value = '';
}
