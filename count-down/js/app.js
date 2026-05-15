// Birth date
const birthDate = new Date("June 24, 2004 07:00:00");

// Update every second
setInterval(() => {

    // Current date
    const now = new Date();

    // Calculate years
    let years = now.getFullYear() - birthDate.getFullYear();

    // Calculate months
    let months = now.getMonth() - birthDate.getMonth();

    // Calculate days
    let days = now.getDate() - birthDate.getDate();

    // Adjust negative days
    if (days < 0) {
        months--;

        // Days in previous month
        const previousMonth = new Date(
            now.getFullYear(),
            now.getMonth(),
            0
        ).getDate();

        days += previousMonth;
    }

    // Adjust negative months
    if (months < 0) {
        years--;
        months += 12;
    }

    // Time calculations
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    // Display values
    document.getElementById("years").innerHTML = years;
    document.getElementById("months").innerHTML = months;
    document.getElementById("days").innerHTML = days;
    document.getElementById("hours").innerHTML = hours;
    document.getElementById("minutes").innerHTML = minutes;
    document.getElementById("seconds").innerHTML = seconds;

}, 1000);