const errorShow = error => {
// Function to show an error message.
	$('#request').html('')
	$('#errorMsg').attr('style','display: block')
	$('#errorMsg').html(`<span class='text-danger'>${error}</span>`)
	$('#copiar').click(() => $('#Copied').attr('class','d-none'));
}

const copyCDNLink = () => {
// Function to copy the CDN link
	var $temp = $('<input>')
	$('body').append($temp);
	$temp.val($('#linkCDN').val()).select();
	document.execCommand('copy');
	$temp.remove();
	$('#Copied').attr('class','p-2')
}

const openCDNLink = () => {
// Function to open the CDN link
	try {$('#Copied').attr('class','d-none')
	}catch(err) {}
	window.open($('#linkCDN').val(), '_blank');
	return false;
}

const linkCDNShow =_link => {
// Function to show the CDN link
	var requestHTML=`<div class='input-group mb-3'>`
	requestHTML += `<input type='text' id='linkCDN' value='${_link}'' type='text' class='text-center form-control' readonly>`
	requestHTML += `<div class='input-group-append'>`
	requestHTML += `<button title='Copy' id='copy' class='btn btn-success' type='button'>`
	requestHTML += `<span id='Copied' class='d-none'>Copied</span><i class='far fa-clone'></i></button>`
	requestHTML += `<button title='Open Archive' id='openArchive' class='btn btn-primary' type='button'>`
	requestHTML += `<i class='far fa-download'></i></button>`
	requestHTML += `</div></div>`
	$('#errorMsg').attr('style','display: none')
	$('#request').attr('style','display: block')
	$('#request').html(requestHTML)
	$('#copy').click(copyCDNLink);
	$('#openArchive').click(openCDNLink);
	$('#linkCDN').click( () => $('#linkCDN').select());
}

const getCDNLink = () => {
// Function to get the CDN Link
	
	// We get the link from the GitHub file that the user wants
	var linkArchive = $('#linkArchive').val().toLowerCase()
	
	if(linkArchive === ''){
	// Error message because there is no link to search
		errorShow('Please, insert a file link')
		return false
	}

	// We removed the blob folder from the linkArchive since they will not be used
	var linkCDN = linkArchive.replace('/blob/master/', '/master/')

	// We separate the folders in an Array to go through them later
	folders = linkCDN.split('/')

	// We replace github with the raw direction
	linkCDN = linkCDN.replace('github.com', 'raw.githubusercontent.com')

	// Variable to know if the user's link belongs to github
	var isGitSite = false

	for (var i = 2; i >= 0; i--) {
	// Investigate if the file is from GitHub to be able to approve
		if (folders) {
			if(folders[i] === 'github.com'){
				isGitSite = true
			}
		}
	}

	if (!isGitSite) {
		// Error message because it is not a GitHub link
		errorShow('Please, insert a file link of GitHub')
		return false
	}

	// We send the link to show
	linkCDNShow(linkCDN)
}

$('#getCDN').click(getCDNLink);

$('#linkArchive').click( () => {
	try {$('#Copied').attr('class','d-none')
	}catch(err) {}
	$('#linkArchive').select()
});

$('#linkArchive').keypress( (event) => {
	var keycode = (event.keyCode ? event.keyCode : event.which);
	if(keycode === 13){getCDNLink()}
});