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

if (!localStorage.getItem('profiles')) {
    localStorage.setItem('profiles', JSON.stringify([
        {name: '', sex: '', age: '', weight: '', height: ''},
        {name: '', sex: '', age: '', weight: '', height: ''},
        {name: '', sex: '', age: '', weight: '', height: ''},
        {name: '', sex: '', age: '', weight: '', height: ''}]));
}

let currentProfile = 1;

function switchProfile(profileNum) {
    currentProfile = profileNum;
    document.querySelectorAll('.profile-btn').forEach(btn => {btn.classList.remove('active');});
    document.querySelector(`.profile-btn:nth-child(${profileNum})`).classList.add('active');
    document.getElementById('currentProfileHeading').textContent = `Current Profile: Profile ${profileNum}`;
    const pros = JSON.parse(localStorage.getItem('profiles'));
    const p = pros[profileNum-1];
    document.getElementById('name').value = p.name;
    document.getElementById('sex').value = p.sex;
    document.getElementById('age').value = p.age;
    document.getElementById('weight').value = p.weight;
    document.getElementById('height').value = p.height;

    loadGoals();
    loadExercises();
    loadDistances();
}


function saveProfile() {
    const name = document.getElementById('name').value;
    const sex = document.getElementById('sex').value;
    const age = document.getElementById('age').value;
    const weight = document.getElementById('weight').value;
    const height = document.getElementById('height').value;
    
    if (!name||!sex||!age||!weight||!height) {
        alert('You must fill in all fields');
        return;
    }
    
    if (age<0||weight<0||height<0) {
        alert('You must enter valid positive numbers');
        return;
    }
    
    const profiles = JSON.parse(localStorage.getItem('profiles'));
    profiles[currentProfile-1] = {name: name, sex: sex, age: age, weight: weight, height: height};
    localStorage.setItem('profiles', JSON.stringify(profiles));
    alert('Your profile has been saved!');
}

function addGoal() {
    const goalD = document.getElementById('goalDescription').value;
    const goalDate = document.getElementById('goalDate').value; 
    if (!goalD||!goalDate) {
        alert('Please give a goal description and a final date.');
        return;
    }
    const pros = JSON.parse(localStorage.getItem('profiles'));
    const p = pros[currentProfile-1];
    if (!p.goals) {p.goals = [];}
    p.goals.push({description: goalD, date: goalDate, completed: false, completedDate: null});
    localStorage.setItem('profiles', JSON.stringify(pros));
    loadGoals();
    document.getElementById('goalForm').reset();
}


function loadGoals() {
    const pros = JSON.parse(localStorage.getItem('profiles'));
    const p = pros[currentProfile-1];
    const goalList = document.getElementById('goalList');
    goalList.innerHTML = '';

    if (p.goals) {
        p.goals.forEach((goal, index) => {
            const l = document.createElement('li');
            l.className = goal.completed?'completed-goal':'';
            const goalc = document.createElement('div');
            goalc.className = 'goal-content';
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = goal.completed;
            checkbox.onchange = () => toggleGoalCompletion(index);
            const goalText = document.createElement('span');
            goalText.textContent = `Goal: ${goal.description} - Target Date: ${goal.date}`;
            if (goal.completed) {
                goalText.style.textDecoration = 'line-through';
                goalText.style.color = '#677';
            }
            let completionm = '';
            if (goal.completed && goal.completedDate) {
                completionm = document.createElement('span');
                completionm.className = 'completion-date';
                completionm.textContent = ` (Completed: ${goal.completedDate})`;
            }
            const delButton = document.createElement('button');
            delButton.textContent = 'Delete';
            delButton.onclick = () => removeGoal(index);
            goalc.appendChild(checkbox);
            goalc.appendChild(goalText);
            if (completionm) {
                goalc.appendChild(completionm);
            }
            goalc.appendChild(delButton);
            l.appendChild(goalc);
            goalList.appendChild(l);
        });
    }
}

function toggleGoalCompletion(index) {
    const pros = JSON.parse(localStorage.getItem('profiles'));
    const p = pros[currentProfile-1];
    if (p.goals[index]) 
        {
        p.goals[index].completed = !p.goals[index].completed;
        if (p.goals[index].completed) 
            {
            p.goals[index].completedDate = new Date().toISOString().split('T')[0];
        } else 
        {
            p.goals[index].completedDate = null;
        }
    }
    localStorage.setItem('profiles', JSON.stringify(pros));
    loadGoals();
}

function removeGoal(i) {
    const pros = JSON.parse(localStorage.getItem('profiles'));
    const p = pros[currentProfile-1];
    p.goals.splice(i, 1);
    localStorage.setItem('profiles', JSON.stringify(pros));
    loadGoals();
}

function clearGoals() {
    const pros = JSON.parse(localStorage.getItem('profiles'));
    const p = pros[currentProfile-1];
    p.goals = [];
    localStorage.setItem('profiles', JSON.stringify(pros));
    loadGoals();
}

function addExercise() {
    const exercise = document.getElementById('exercise').value;
    const sets = document.getElementById('sets').value;
    const reps = document.getElementById('reps').value;
    const weightUsed = document.getElementById('weightUsed').value;
    if (sets<0||reps<0||weightUsed<0) {
        alert('You must enter valid positive values for sets, reps, and weight.');
        return;
    }
    const pros = JSON.parse(localStorage.getItem('profiles'));
    const p = pros[currentProfile-1];
    if (!p.exercises) {
        p.exercises = [];
    }
    profile.exercises.push({exercise, sets, reps, weightUsed});
    localStorage.setItem('profiles', JSON.stringify(pros));
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
        alert('You must enter a valid positive number for distance.');
        return;
    }
    const profiles = JSON.parse(localStorage.getItem('profiles'));
    const profile = profiles[currentProfile-1];
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
    const profile = profiles[currentProfile-1];
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

function removeDistance(i) {
    const profiles = JSON.parse(localStorage.getItem('profiles'));
    const profile = profiles[currentProfile-1];
    profile.distances.splice(i, 1);
    localStorage.setItem('profiles', JSON.stringify(profiles));
    loadDistances();
}

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
        alert('You must enter a food item');
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
    let totalCals = 0;
    if (profile.meals) {
        ['breakfast', 'lunch', 'dinner'].forEach(mealType => {
            if (profile.meals[mealType]) {
                totalCals += profile.meals[mealType]
                    .filter(meal => meal.date === today)
                    .reduce((sum, meal) => sum + meal.calories, 0);
            }
        });
    }
    const progress = document.getElementById('calorie-progress');
    const display = document.getElementById('calorie-display');
    progress.value = totalCals;
    display.textContent = `${totalCals}/2000 calories`;
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

function progressChart() {
    updateProgressChart();
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



function updateProgressChart() {
    const option = document.getElementById('progressOption').value;
    const timeRange = document.getElementById('timeRange').value;
    const profiles = JSON.parse(localStorage.getItem('profiles'));
    const profile = profiles[currentProfile - 1];
    let data = [];
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


function getDailyCalories(profile, startDate, endDate) {
    const data = [];
    if (!profile.meals) return data;

    for (let i = new Date(startDate); i <= endDate; i.setDate(i.getDate()+1)) {
        const date = i.toISOString().split('T')[0];
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

    for (let i = new Date(startDate); i <= endDate; i.setDate(i.getDate()+1)) {
        const date = i.toISOString().split('T')[0];
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

    for (let i = new Date(startDate); i <= endDate; i.setDate(i.getDate()+1)) {
        const date = i.toISOString().split('T')[0];
        const dailyTotal = profile.distances
            .filter(entry => entry.date === date)
            .reduce((sum, distance) => sum+parseFloat(distance), 0);

        data.push({ date: date, value: dailyTotal });
    }
    return data;
}

function getStrengthProgress(profile, startDate, endDate) {
    const data = [];
    if (!profile.exercises) return data;
    for (let i = new Date(startDate); i <= endDate; i.setDate(i.getDate()+1)) {
        const date = i.toISOString().split('T')[0];
        let dailyTotal = 0;

        const dayExercises = profile.exercises.filter(exe => exe.date === date);
        dayExercises.forEach(exercise => {            
            dailyTotal += exercise.weightUsed * exercise.sets * exercise.reps;
        });
        data.push({ date: date, value: dailyTotal });
    }
    return data;
}

document.addEventListener('DOMContentLoaded', function() {    
    ['breakfast', 'lunch', 'dinner'].forEach(mealType => {
        const slider = document.getElementById(`${mealType}-calories`);
        const output = document.getElementById(`${mealType}-cal-value`); 
        slider.oninput = function() {
            output.textContent = this.value;
        }
    });
    const waterS = document.getElementById('water-slider');
    const waterO = document.getElementById('water-value');
    waterS.oninput = function() {
        waterO.textContent = this.value;
    }
    updateCalorieProgress();
    updateWaterProgress();
});


function addExercise() {
    const exercise = document.getElementById('exercise').value;
    const sets = document.getElementById('sets').value;
    const reps = document.getElementById('reps').value;
    const weightUsed = document.getElementById('weightUsed').value;
    if (!exercise||sets<=0||reps<=0||weightUsed<0) {
        alert('You must enter valid values for all fields');
        return;
    }
    const profiles = JSON.parse(localStorage.getItem('profiles'));
    const profile = profiles[currentProfile - 1];
    if (!profile.exercises) {
        profile.exercises = [];}
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


function logDistance() {
    const distance = document.getElementById('distance').value;
    if (distance <= 0) {
        alert('You must enter a valid positive number');
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
