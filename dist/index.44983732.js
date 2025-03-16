function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}
/**
 * Hämta kursdata från API
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
//KARTA
/**
 * Väntar tills DOM-innehållet laddats innan koden kör
 */ document.addEventListener("DOMContentLoaded", function() {
    //skapar leaflet-karta och sätter koordinaterna till Stockholm
    let map = L.map('map').setView([
        59.3327,
        18.0656
    ], 13);
    //OpenStreetMap-bakgrundskartan
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    //Sökfält och sökknapp
    let searchBtn = document.getElementById("search-btn");
    let searchInput = document.getElementById("search-input");
    /**
 * Lyssnar efter klick på sökknappen för att göra en API-förfrågan till Nominatim
 */ searchBtn.addEventListener("click", function() {
        let query = searchInput.value.trim(); //hämtar inmatning och tar borta eventuella extra mellanslag
        if (query.length > 0) //Anropar nominatim API för att söka efter plats
        fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${query}`).then((response)=>{
            if (!response.ok) throw new Error("N\xe4tverksfel vid s\xf6kning");
            return response.json();
        }).then((data)=>{
            if (data.length > 0) {
                let lat = parseFloat(data[0].lat); //Omvandlar longitud och latitud till tal
                let lon = parseFloat(data[0].lon);
                //Flyttar kartans vy till den sökta platsen
                map.setView([
                    lat,
                    lon
                ], 13);
                //Skapar markör för plats och lägger till namn som popup
                L.marker([
                    lat,
                    lon
                ]).addTo(map).bindPopup(`<b>${data[0].display_name}</b>`).openPopup();
            } else alert("Platsen hittades inte. F\xf6rs\xf6k igen.");
        }).catch((error)=>{
            console.error("Fel vid s\xf6kning:", error);
            alert("Ett fel uppstod vid s\xf6kning. Kontrollera din internetanslutning.");
        });
        else alert("Ange en plats att s\xf6ka efter.");
    });
});

//# sourceMappingURL=index.44983732.js.map
