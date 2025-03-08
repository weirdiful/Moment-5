
function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
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