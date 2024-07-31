const distanceDisplay = document.getElementById('distance');
const startButton = document.getElementById('startButton');

let watchId;
let previousPosition = null;
let totalDistance = 0;
const distanceThreshold = 1000; // Distance in meters to trigger the alarm

function calculateDistance(pos1, pos2) {
    const R = 6371e3; // Earth's radius in meters
    const lat1 = pos1.coords.latitude * (Math.PI / 180);
    const lat2 = pos2.coords.latitude * (Math.PI / 180);
    const deltaLat = (pos2.coords.latitude - pos1.coords.latitude) * (Math.PI / 180);
    const deltaLon = (pos2.coords.longitude - pos1.coords.longitude) * (Math.PI / 180);

    const a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
              Math.cos(lat1) * Math.cos(lat2) *
              Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
}

function updatePosition(position) {
    if (previousPosition) {
        const distance = calculateDistance(previousPosition, position);
        totalDistance += distance;
        distanceDisplay.textContent = `Distance walked: ${totalDistance.toFixed(2)} meters`;

        if (totalDistance >= distanceThreshold) {
            alert('You have reached your distance goal!');
            stopTracking();
        }
    }
    previousPosition = position;
}

function startTracking() {
    if (navigator.geolocation) {
        watchId = navigator.geolocation.watchPosition(updatePosition, error => {
            console.error(error);
        }, {
            enableHighAccuracy: true,
            maximumAge: 0,
            timeout: 5000
        });
    } else {
        alert('Geolocation is not supported by your browser.');
    }
}

function stopTracking() {
    if (watchId) {
        navigator.geolocation.clearWatch(watchId);
        watchId = null;
    }
}

startButton.addEventListener('click', () => {
    if (watchId) {
        stopTracking();
        startButton.textContent = 'Start Tracking';
    } else {
        startTracking();
        startButton.textContent = 'Stop Tracking';
    }
});
