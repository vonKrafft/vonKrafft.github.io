// D'après la CNIL
// http://www.cnil.fr/vos-obligations/sites-web-cookies-et-autres-traceurs/outils-et-codes-sources/la-mesure-daudience/#c5584

var disable_str = 'ga-disable-' + google_analytics;
if (document.cookie.indexOf('hasConsent=false') > -1)
{
    window[disable_str] = true;
}

function getCookieExpireDate()
{
    var date = new Date();
    date.setTime(date.getTime() + 34214400000);
    return date.toGMTString();
}

function createDiv()
{
    var div = document.getElementById('cookie-banner');
    if (div == null)
    {
        var div = document.createElement('div');
        div.setAttribute('id', 'cookie-banner');
        div.setAttribute('style', 'width:100%; position:fixed; bottom:0; background:rgba(0,0,0,0.9); left:0; color:white; text-align:center; z-index: 20;');
        var bodytag = document.getElementsByTagName('body')[0];
        bodytag.insertBefore(div,bodytag.firstChild);
    }
    return div;
}

function askConsent()
{
    var div = createDiv();
    div.innerHTML =  '<div style="padding:20px">Nous utilisons des cookies pour vous garantir la meilleure expérience sur notre site. Si vous continuez à utiliser ce dernier, nous considérerons que vous acceptez l\'utilisation des cookies. <button type="button" onclick="javascript:acceptCookies();" style="background-color: #429ab4; border: none; color: #fff; border-radius: 2px; padding: 2.5px 10px; margin: 0 10px; cursor: pointer;">OK</button><br>Pour s\'opposer à l\'utilisation des cookies, vous pouvez cliquer <a href="javascript:refuseCookies()" style="color: #429ab4;">ici</a> et pour en savoir plus, rendez-vous sur le site de la <a href="https://www.cnil.fr/fr/cookies-traceurs-que-dit-la-loi" target="_blank" style="color: #429ab4;">CNIL</a></div>';
}

function getCookie(name)
{
    if (document.cookie.length > 0)
    {
        begin = document.cookie.indexOf(name+"=");
        if (begin != -1)
        {
            begin += name.length+1;
            end = document.cookie.indexOf(" ;", begin);
            if (end == -1) end = document.cookie.length;
            return unescape(document.cookie.substring(begin, end));
        }
    }
    return null;
}

function delCookie(name)
{
    document.cookie = name + '=; expires=Thu, 01-Jan-1970 00:00:01 GMT; path=/; domain=' + document.location.hostname;
}

function deleteAnalyticsCookies()
{
    var ga_cookies = [" __utma","__utmb","__utmc","__utmz","_ga"]
    for (var i = ga_cookies.length - 1; i >= 0; i--)
    {
        delCookie(ga_cookies[i])
    };
}

function refuseCookies()
{
    document.cookie = disable_str + '=true; expires='+ getCookieExpireDate() +'; path=/';
    document.cookie = 'hasConsent=false; expires='+ getCookieExpireDate() +'; path=/';
    var div = createDiv();
    div.innerHTML = '<div style="padding:20px">Vous vous êtes opposé à l\'utilisation des cookies <button type="button" onclick="javascript:acceptCookies();" style="background-color: #429ab4; border: none; color: #fff; border-radius: 2px; padding: 2.5px 10px; margin: 0 10px; cursor: pointer;">Je change d\'avis</button></div>'
    window[disable_str] = true;
    deleteAnalyticsCookies();
}

function acceptCookies()
{
    document.cookie = 'hasConsent=true; expires='+ getCookieExpireDate() +'; path=/';
    window[disable_str] = false;
    document.getElementById('cookie-banner').remove();
}

if (getCookie('hasConsent') == null)
{
    window[disable_str] = true;
    window.onload = askConsent();
}
else if (getCookie('hasConsent') == 'false')
{
    refuseCookies();
}
