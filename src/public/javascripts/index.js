window.onbeforeunload = function () {
    sessionStorage.setItem("searchResult", $('#searchResult').val());
};
window.onload = function () {
    sessionStorage.removeItem("searchResult");
}