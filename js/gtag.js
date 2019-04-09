// Set to the same value as the web property used on the site
var gaProperty = 'UA-24449159-3';

// Disable tracking if the opt-out cookie exists.
var disableStr = 'ga-disable-' + gaProperty;
if (document.cookie.indexOf(disableStr + '=true') > -1) {
    window[disableStr] = true;
} else if (document.cookie.indexOf(disableStr + '=false') > -1) {
    window[disableStr] = false;
} else {
    window[disableStr] = true;
    window.onload = showPopUp();
}

// Listeners for cookie actions
$('body').on('click', '#gaAccept', gaAccept);
$('body').on('click', '#gaOptout', gaOptout);

// Opt-out function
function gaOptout() {
    var expires = new Date();
    expires.setMonth(expires.getMonth() + 12);
    document.cookie = disableStr + '=true; expires=' + expires.toUTCString() + '; path=/';
    window[disableStr] = true;
    $('#cookie-banner').remove();
}

// Accept function
function gaAccept() {
    var expires = new Date();
    expires.setMonth(expires.getMonth() + 12);
    document.cookie = disableStr + '=false; expires=' + expires.toUTCString() + '; path=/';
    $('#cookie-banner').remove();
}

// Pop-up display
function showPopUp() {
    if ($('#cookie-banner').length == 0) {
        $('body').append('<div id="cookie-banner" style="width:100%;position:fixed;bottom:0;background:rgba(0,0,0,0.9);left:0;color:white;text-align:center;z-index:20">');
    }
    var content = '<div style="padding:20px">';
    content += 'Nous utilisons des cookies pour vous garantir la meilleure exp&eacute;rience sur notre site. ';
    content += 'Si vous continuez &Agrave; utiliser ce dernier, nous consid&eacute;rerons que vous acceptez l&#39;utilisation des cookies. ';
    content += '<button type="button" id="gaAccept" style="background-color:#429ab4;border:none;color:#fff;border-radius:2px;padding:2.5px 10px;margin:0 10px;cursor:pointer">OK</button><br>';
    content += 'Pour s&#39;opposer &Agrave; l&#39;utilisation des cookies, vous pouvez cliquer <a href="#" id="gaOptout" style="color:#429ab4;">ici</a> ';
    content += 'et pour en savoir plus, rendez-vous sur le site de la <a href="https://www.cnil.fr/fr/cookies-traceurs-que-dit-la-loi" target="_blank" style="color:#429ab4;">CNIL</a></div>';
    $('#cookie-banner').html(content);
}

// Global site tag (gtag.js) - Google Analytics 
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}

gtag('js', new Date());
gtag('config', gaProperty);


