$(window).scroll(function () {
    let scroll = $(window).scrollTop();
    console.log(scroll)

    if (scroll > 250) {

        $('.navbar').addClass('bg-dark');

    } else {
        $('.navbar').removeClass('bg-dark');
    }

})


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
            // card berfungsi untuk menampung data api kedalam html
            card = ""
            // template literal berfungsi menampung data kedalam html atau membuat tag html dan menyimpan data di html
            card +=
                `
            <div class="card w-100" style="width: 18rem;">
                    <div class="card-body">
                        <h4 class="card-title"> total : ${data.total}</h4>
                        <h6 class="card-subtitle mb-2 text-muted">discharged :${data.discharged}</h6>
                        <h6 class="card-subtitle mb-2 text-muted">death :${data.deaths}</h6>
                    </div>
            </div>
            `
            //  ini sama tetapi yang ini perlu di looping
            dataNegara.forEach(m => {
                card +=
                    `
                <div class="col-md-4 my-5 mx-n5">
                    <div class="card w-75" style="width: 18rem;">
                        <div class="card-body">
                            <h4 class="card-title">location :${m.loc}</h4>
                            <h6 class="card-subtitle mb-2 text-muted">total :${m.totalConfirmed}</h6>
                            <h6 class="card-subtitle mb-2 text-muted">death :${m.deaths}</h6>
                            <h6 class="card-subtitle mb-2 text-muted">discharged :${m.discharged}</h6>
                           <a href="#" class="btn btn-primary modal-detail" data-toggle="modal" data-target="#modalTriger" data-id= "${m.imdbID}">Show detail</a>
                        </div>
                    </div>
                </div>
                `
            })
            //  menampilkan data html yang sudah dirakit ke html aslinya
            //  $(dataCovid) adalah class / jquery pan
            $('.dataCovid').html(card)
        },
        error: (e) => {
            alert(e);
        }

    })
}