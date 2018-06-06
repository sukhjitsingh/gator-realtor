window.onbeforeunload = function () {
    sessionStorage.setItem("searchResult", $('#searchResult').val());
};
window.onload = function () {
    let searchResult = sessionStorage.getItem("searchResult");
    if (searchResult !== null) {
        $('#searchResult').val(searchResult);
    }
}

function Clear() {
    clearRadioGroup("price");
    clearRadioGroup("bedrooms");
    clearRadioGroup("bathrooms")
}

function clearRadioGroup(GroupName) {
    let ele = document.getElementsByName(GroupName);
    for (let i = 0; i < ele.length; i++)
        ele[i].checked = false;
}