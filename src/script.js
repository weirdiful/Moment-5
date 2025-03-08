
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
 
 * @throws {Error} felmeddelande om API anropet misslyckas
 */

async function fetchCourseData() {
  try {
      let response = await fetch('https://studenter.miun.se/~mallar/dt211g/');
      let data = await response.json();
      return data;
  } catch (error) {
      console.error('Error fetching data:', error);
  }
}

function createCoursesChart(coursesData) {
  let topCourses = coursesData
      .filter(item => item.type === "Kurs")
      .sort((a, b) => b.applicantsTotal - a.applicantsTotal)
      .slice(0, 6);

  let labels = topCourses.map(course => course.name);
  let applicants = topCourses.map(course => course.applicantsTotal);

  let ctx = document.getElementById('coursesChart').getContext('2d');
  new Chart(ctx, {
      type: 'bar',
      data: {
          labels: labels,
          datasets: [{
              label: 'Antal sökande',
              data: applicants,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1
          }]
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

function createProgramChart(programsData) {
  let topPrograms = programsData
      .filter(item => item.type === "Program")
      .sort((a, b) => b.applicantsTotal - a.applicantsTotal)
      .slice(0, 5);

  let labels = topPrograms.map(program => program.name);
  let applicants = topPrograms.map(program => program.applicantsTotal);

  let ctx = document.getElementById('programChart').getContext('2d');
  new Chart(ctx, {
      type: 'pie',
      data: {
          labels: labels,
          datasets: [{
              data: applicants,
              backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#FF9F40'],
          }]
      }
  });
}

document.addEventListener('DOMContentLoaded', async () => {
  let data = await fetchCourseData();
  
  if (data) {
      createCoursesChart(data); 
      createProgramChart(data);
  }
});