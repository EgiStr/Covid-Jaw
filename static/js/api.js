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
        url: 'https://api.rootnet.in/covid19-in/stats/latest',
        success: (m) => {
            let summary = m.data.summary
            let region = m.data.regional
            txt = ""
            txt += `<tr><td>total</td><td> ${summary.total} </td></tr>
                         <tr><td>confirmed Cases Indian</td><td> ${summary.confirmedCasesIndian} </td></tr>
                         <tr><td>confirmed Cases Foreign</td><td> ${summary.confirmedCasesForeign} </td></tr>
                         <tr><td>discharged</td><td> ${summary.discharged} </td></tr>
                         <tr><td>deaths</td><td> ${summary.deaths} </td></tr>
                         <tr><td>confirmed But Location Unidentified</td><td> ${summary.confirmedButLocationUnidentified} </td></tr>`
            $('#table').html(txt);

            document.getElementById("app").innerHTML = `
            ${region.map((region, key) => {
                return `<tr>
                            <td>${key + 1}</td>
                            <td>${region.loc}</td>
                            <td>${region.confirmedCasesIndian}</td>
                            <td>${region.confirmedCasesForeign}</td>
                            <td>${region.discharged}</td>
                            <td>${region.deaths}</td>
                            <td>${region.totalConfirmed}</td>
                         </tr>`
            }).join('')}`
        }
    });
});
