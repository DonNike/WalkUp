//initial references
let timerRef = document.querySelector(".timer-display");
const hourInput = document.getElementById("hourInput");
const minuteInput = document.getElementById("minuteInput");
const activeAlarms = document.querySelector(".activeAlarm");
const setAlarm = document.getElementById("set");
let alarmsArray = [];
let alarmSound = new Audio("alarm.mp3");

let initialHour = 0,
  initialMinute = 0,
  alarmIndex = 0;

//Append Zeroes for single digit
const appendZero = (value) => (value < 10 ? "0" + value : value);

//Search for value in object
const searchObject = (parameter, value) => {
  let alarmObject,
    objIndex,
    exists = false;
  alarmsArray.forEach((alarm, index) => {
    if (alarm[parameter] == value) {
      exists = true;
      alarmObject = alarm;
      objIndex = index;
      return false;
    }
  });
  return [exists, alarmObject, objIndex];
};

//Display time
function displayTimer() {
  let date = new Date();
  let [hours, minutes, seconds] = [
      appendZero(date.getHours()),
      appendZero(date.getMinutes()),
      appendZero(date.getSeconds()),
  ];

//Display time
timerRef.innerHTML = `${hours}:${minutes}:${seconds}`;

//Alarm
alarmsArray.forEach((alarm, index) => {
                if (alarm.isActive) {
                    if (`${alarm.alarmHour}:${alarm.alarmMinute}` === `${hours}:${minutes}`) {
                        // Redirect to the alarm page
                        window.location.href = `alarm.html?alarmId=${alarm.id}`;
                    }
                }
            });
        }

const inputCheck = (inputValue) => {
  inputValue = parseInt(inputValue);
  if(inputValue < 10){
    inputValue = appendZero(inputValue);
  }
  return inputValue;
};

hourInput.addEventListener("input", () => {
  hourInput.value = inputCheck(hourInput.value);
});

minuteInput.addEventListener("input", () => {
  minuteInput.value = inputCheck(minuteInput.value);
});

//Creating alarm div
const createAlarm = (alarmObj) =>{
  //Keys from object
  const {id, alarmHour, alarmMinute} = alarmObj;
  //Alarm div
  let alarmDiv = document.createElement("div");
  alarmDiv.classList.add("alarm");
  alarmDiv.setAttribute("data-id", id);
  alarmDiv.innerHTML = `<span>${alarmHour}:${alarmMinute}</span>`;

  //checkbox
  let checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");
  checkbox.addEventListener("click", (e) => {
    if(e.target.checked){
      startAlarm(e);
    } else{
      stopAlarm(e);
    }
  });
  alarmDiv.appendChild(checkbox);
  //Delete button
  let deleteButton = document.createElement("button");
  deleteButton.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
  deleteButton.classList.add("deleteButton");
  deleteButton.addEventListener("click", (e) => deleteAlarm(e));
  alarmDiv.appendChild(deleteButton);
  activeAlarms.appendChild(alarmDiv)
};

//Set alarm 
setAlarm.addEventListener("click", () => {
  alarmIndex += 1;

  //alarmObject
  let alarmObj = {};
  alarmObj.id = `${alarmIndex}_${hourInput.value}_${minuteInput.value}`;
  alarmObj.alarmHour = hourInput.value;
  alarmObj.alarmMinute = minuteInput.value;
  alarmObj.isActive = false;
  console.log(alarmObj);
  alarmsArray.push(alarmObj);
  createAlarm(alarmObj);
  hourInput.value = appendZero(initialHour);
  minuteInput.value = appendZero(initialMinute);
});

//Start Alarm
const startAlarm = (e) => {
  let searchId = e.target.parentElement.getAttribute("data-id");
  let[exists, obj, index] = searchObject("id", searchId);
  if(exists){
    alarmsArray[index].isActive = true;
  }
};

//Stop Alarm
const stopAlarm = (e) => {
  let searchId = e.target.parentElement.getAttribute("data-id");
  let [exists, obj, index] = searchObject("id", searchId);
  if(exists){
    alarmsArray[index].isActive = false;
    alarmSound.pause();
  }
};

//Delete alarm
const deleteAlarm = (e) =>{
  let searchId = e.target.parentElement.parentElement.getAttribute("data-id");
  let [exists, obj, index] = searchObject("id", searchId);
  if(exists){
    e.target.parentElement.parentElement.remove();
    alarmsArray.splice(index, 1);
  }
};

// Code to stop the alarm when redirected back
window.onload = () => {
  setInterval(displayTimer, 1000);
  initialHour = 0;
  initialMinute = 0;
  alarmIndex = 0;
  alarmsArray = [];
  hourInput.value = appendZero(initialHour);
  minuteInput.value = appendZero(initialMinute);

  // Stop alarm if redirected back
  const urlParams = new URLSearchParams(window.location.search);
  const stopAlarmId = urlParams.get('stopAlarmId');
  if (stopAlarmId) {
      let [exists, obj, index] = searchObject("id", stopAlarmId);
      if (exists) {
          alarmsArray[index].isActive = false;
          alarmSound.pause();
      }
  }
};