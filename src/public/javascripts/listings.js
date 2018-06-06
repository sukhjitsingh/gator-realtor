window.onbeforeunload = function () {
    sessionStorage.setItem("address", $('#inputAddress').val());
    sessionStorage.setItem("address2", $('#inputAddress2').val());
    sessionStorage.setItem("city", $('#inputCity').val());
    sessionStorage.setItem("state", $('#inputState').val());
    sessionStorage.setItem("zipcode", $('#inputZipcode').val());
    sessionStorage.setItem("bathrooms", $('#inputBathrooms').val());
    sessionStorage.setItem("bedrooms", $('#inputBedrooms').val());
    sessionStorage.setItem("year", $('#inputYear').val());
    sessionStorage.setItem("price", $('#inputPrice').val());
    sessionStorage.setItem("lotSize", $('#inputLotSize').val());
};

window.onload = function () {
    let currentPage = document.getElementById("createListing");
    currentPage.className += " active";

    let city = sessionStorage.getItem("city");
    if (city !== null) {
        $('#inputCity').val(city);
    }

    let address = sessionStorage.getItem("address");
    if (address !== null) {
        $('#inputAddress').val(address);
    }

    let address2 = sessionStorage.getItem("address2");
    if (address2 !== null) {
        $('#inputAddress2').val(address2);
    }

    let state = sessionStorage.getItem("state");
    if (state !== null) {
        $('#inputState').val(state);
    }

    let zipcode = sessionStorage.getItem("zipcode");
    if (zipcode !== null) {
        $('#inputZipcode').val(zipcode);
    }

    let bathrooms = sessionStorage.getItem("bathrooms");
    if (bathrooms !== null) {
        $('#inputBathrooms').val(bathrooms);
    }

    let bedrooms = sessionStorage.getItem("bedrooms");
    if (bedrooms !== null) {
        $('#inputBedrooms').val(bedrooms);
    }

    let price = sessionStorage.getItem("price");
    if (price !== null) {
        $('#inputPrice').val(price);
    }

    let year = sessionStorage.getItem("year");
    if (year !== null) {
        $('#inputYear').val(year);
    }

    let lotSize = sessionStorage.getItem("lotSize");
    if (lotSize !== null) {
        $('#inputLotSize').val(lotSize);
    }

    //Year printout
    let startYear = new Date().getFullYear();
    let endYear = 1800;
    let options = "<option selected disabled> Choose the year built </option>";

    for (let year = startYear; year >= endYear; year--) {
        options += "<option>" + year + "</option>";
    }
    document.getElementById("builtYear").innerHTML = options;
}

