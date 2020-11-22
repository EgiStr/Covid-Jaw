document.addEventListener('click', function (e) {
    if (e.target.classList.contains('showdata')) {
        showdata()
    }

})


function showdata() {
    $.ajax({

        url: `https://api.rootnet.in/covid19-in/stats/latest`,

        success: (m) => {
            let data = m.data.summary;
            let dataNegara = m.data.regional;
            card = ""
            card += `<h2>death case :${data.deaths}</h2>
                <h2>discharged case:${data.discharged}</h2>
                <h2>total case:${data.total}</h2>
        `
            dataNegara.forEach(m => {
                card += `
                <h2>location case:${m.loc} </h2>
                <h2>death case :${m.deaths}</h2>
                <h2>discharged case:${m.discharged}</h2>
                <h2>total case:${m.totalConfirmed}</h2>
        `
            });
            $('.dataCovid').html(card)
        },
        error: (e) => {
            alert(e);
        }


    })
}
