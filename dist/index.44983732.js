function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}
/**
 * Hämta kursdata från API
 * 
 * @async
 * @function fetchCourseData
 * @returns {Promise<Object[]>} array av objekt med information om kurser och program
 * @throws {Error} felmeddelande om API anropet misslyckas
 */ async function fetchCourseData() {
    try {
        let response = await fetch('https://studenter.miun.se/~mallar/dt211g/');
        let data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
/**
 * Skapar ett stapeldiagram med de 6 mest sökta kurserna
 * @function createCoursesChart
 * @param {Object[]} coursesData - array av kurserna 
 */ function createCoursesChart(coursesData) {
    let topCourses = coursesData.filter((item)=>item.type === "Kurs").sort((a, b)=>b.applicantsTotal - a.applicantsTotal).slice(0, 6);
    let labels = topCourses.map((course)=>course.name);
    let applicants = topCourses.map((course)=>course.applicantsTotal);
    let ctx = document.getElementById('coursesChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: "Antal s\xf6kande",
                    data: applicants,
                    backgroundColor: [
                        '#FF8FA3'
                    ],
                    borderColor: [
                        '#EA638C'
                    ],
                    borderWidth: 2
                }
            ]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
/**
 * Skapar ett cirkeldiagram med de 5 mest sökta programmen
 * @function createProgramChart
 * @param {Object[]} programsData - array av programmen
 */ function createProgramChart(programsData) {
    let topPrograms = programsData.filter((item)=>item.type === "Program").sort((a, b)=>b.applicantsTotal - a.applicantsTotal).slice(0, 5);
    let labels = topPrograms.map((program)=>program.name);
    let applicants = topPrograms.map((program)=>program.applicantsTotal);
    let ctx = document.getElementById('programChart').getContext('2d');
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [
                {
                    data: applicants,
                    backgroundColor: [
                        '#6050DC',
                        ' #D52DB7',
                        '#FF2E7E',
                        '#FF6B45',
                        '#FFAB05'
                    ]
                }
            ]
        }
    });
}
/**
 * Hämta data och skapa diagram när sidan laddats
 */ document.addEventListener('DOMContentLoaded', async ()=>{
    let data = await fetchCourseData();
    if (data) {
        createCoursesChart(data);
        createProgramChart(data);
    }
});
var map = L.map('map').setView([
    51.505,
    -0.09
], 13);

//# sourceMappingURL=index.44983732.js.map
