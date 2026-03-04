//Fire speedBump
function speedBump(externalUrl, companyName) {

    let speedBumpModal = document.getElementById('speedbump-modal');

    if (!companyName) {
        companyName = "an external partner"
    }
    speedBumpModal.querySelectorAll('.speedBumpCompanyNameLabel').forEach(function (el) {
        el.innerText = companyName;
    });
    speedBumpModal.querySelector('#speedBumpLink').href = externalUrl;
    // set the company name and href within the modal template

    //open the modal
    MicroModal.show('speedbump-modal');
}

(function () {
    document.querySelectorAll('a[data-speedbump]').forEach(function (el) {
        el.onclick = function (event) {
            event.preventDefault();
            //alert("el ToString: " + el.toString() + ", el.href: " + el.href + ", ToString: " + event.target.toString() + ", Html: " + event.target.innerHTML + ", Href: " + event.target.href + ", externalCompany = " + event.target.getAttribute('data-speedbump-company-name'));
            var externalHref = el.href,
                externalCompany = el.getAttribute('data-speedbump-company-name');
            speedBump(externalHref, externalCompany);
        }
    });
})();

