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