/* Set the width of the side navigation to 250px and the left margin of the page content to 250px and add a black background color to body */
var menuOpen = false;
function openNav() {
    if (menuOpen) closeNav();
    else {
        document.getElementById("mySidenav").style.width = "170px";
        document.getElementById("main").style.marginLeft = "170px";
        var newWidth = $('#main').width();
        document.getElementById("main").style.width = (newWidth - 170) + "px";
        menuOpen = true;
    }
  //  document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0, and the background color of body to white */
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
    var newWidth = $('#main').width();
    document.getElementById("main").style.width = (newWidth +170) + "px";
    menuOpen = false;
   // document.body.style.backgroundColor = "white";
}/**
 * Created by neil on 11/08/16.
 */
