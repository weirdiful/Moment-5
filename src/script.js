
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
 * @returns {Promise<Object[]>} Promise som är kopplad till array av kursdata
 * @throws {Error} felmeddelande om API anropet misslyckas
 */

async function fetchCourseData() {
  try {
      const response = await fetch("https://studenter.miun.se/~mallar/dt211g/");
      if (!response.ok) throw new Error("Fel vid hämtning: " + response.status);
      return await response.json();
  } catch (error) {
      console.error("Fel vid hämtning av data:", error);
      return [];
  }
}

const ctx = document.getElementById('myChart');
new Chart(ctx, {
type: 'bar',
data: {
labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
datasets: [{
label: '# of Votes',
data: [12, 19, 3, 5, 2, 3],
borderWidth: 1
}]
},
  options: {
    backgroundColor: ["#89023E","blue","yellow", "green", "purple", "orange"]
  }
});


// https://studenter.miun.se/~mallar/dt211g/