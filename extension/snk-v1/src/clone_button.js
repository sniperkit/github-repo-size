/*
var osList= {
	WIN : { ClassName : "mini-icon-windows", URL : "github-windows:", text : "Clone in Windows" },
	MAC : { ClassName : "mini-icon-apple", URL : "github-mac:", text : " Clone in Mac" }
};

function createCloneInOSButton() {
	// Check OS first before we do anything else. This way we can support multiple OS's.
	if ( navigator.appVersion.indexOf("Windows") > 0 ) {
		OS = "WIN";
	} else if ( navigator.appVersion.indexOf("Mac") > 0 ) {
		OS = "MAC";
	} else
		return;

	// Make sure we should really be putting a button on this page.
	if (document.getElementsByClassName(osList[OS].ClassName).length !=1 ) return;
	if (document.getElementsByClassName("BtnGroup").length != 1) return;

	var githubURL = osList[OS].URL+"//openRepo/" + window.location.origin + window.location.pathname;
	var nativeClones = document.getElementsByClassName("BtnGroup")[0];
	var link = nativeClones.getElementsByTagName("a")[0];

	link.href = githubURL;
}

createCloneInOSButton();
*/

