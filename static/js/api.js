$(window).scroll(() => {
    let scroll = $(window).scrollTop();
    if (scroll > 250) {

        $('.navbar').addClass('bg-secondary navbar-dark');
        $('#btn').addClass('btn-primary').removeClass('btn-outline-primary');
    } else {
        $('.navbar').removeClass('bg-secondary navbar-dark');
        $('#btn').removeClass('btn-primary').addClass('btn-outline-primary');

    }

})

$(function () {
    $.ajax({
        type: 'GET',
        url: 'https://api.covid19api.com/summary',
        success: (m) => {
            let summary = m.Global
            let region = m.Countries
            txt = ""
            txt += `    
            <tr><td>NEW COMFIRMED</td><td> ${summary.NewConfirmed} </td></tr>
            <tr><td>total</td><td> ${summary.TotalConfirmed} </td></tr>
                         <tr><td>new Deaths</td><td> ${summary.NewDeaths} </td></tr>
                         <tr><td>new Recoveryed</td><td> ${summary.NewRecovered} </td></tr>
                         <tr><td>deaths</td><td> ${summary.TotalDeaths} </td></tr>
                         `
            $('#table').html(txt);
            let temp = `
            <thead class="thead-dark">
                <tr>
                  <th scope="col">No</th>
                  <th scope="col">Date</th>
                  <th scope="col">Country</th>
                  <th scope="col">NewConfirmed</th>
                  <th scope="col">TotalConfirmed</th>
                  <th scope="col">NewDeaths</th>
                  <th scope="col">TotalDeaths</th>
                  <th scope="col">NewRecovered</th>
                  <th scope="col">TotalRecovered</th>
                </tr>
            </thead>
            `


            region.map((m, key) => {

                temp += `<tr>
                           
                            <td>${key + 1}</td>
                            <td>${m.Date}</td>
                            <td>${m.Country}</td>
                            <td>${m.NewConfirmed}</td>
                            <td>${m.TotalConfirmed}</td>
                            <td>${m.NewDeaths}</td>
                            <td>${m.TotalDeaths}</td>
                            <td>${m.NewRecovered}</td>
                            <td>${m.TotalRecovered}</td>
                         </tr>`

                return temp
            })
            document.getElementById("app").innerHTML = temp

        }
    });
});
