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
        labels: [
            'Red',
            'Blue',
            'Yellow',
            'Green',
            'Purple',
            'Orange'
        ],
        datasets: [
            {
                label: '# of Votes',
                data: [
                    12,
                    19,
                    3,
                    5,
                    2,
                    3
                ],
                borderWidth: 1
            }
        ]
    }
}); // https://studenter.miun.se/~mallar/dt211g/

//# sourceMappingURL=index.44983732.js.map
