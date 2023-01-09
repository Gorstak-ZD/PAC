/////////////////////////////////////////////////////////////////////
// Proxy AutoConfiguration (PAC) File for Ad-Blocking
// written by Sheryl Canter - 1 July 2004
//
// USAGE NOTES:
// ------------
// Blocking JavaScript-based ads will generate script errors on a
// page. Make sure that your browser is not set to display or debug
// script errors or you'll be bothered by numerous script error
// notifications. In IE's Advanced Options, check "Disable script
// debugging" and uncheck "Display notification about every script 
// error".
// 
// If you're having problems viewing a site that you want to see,
// turn on the alert in the "blocked" section to see the blocked URL,
// then find the JavaScript code that's filtering it and edit.
// If the desired URL is being blocked by a complicated regular
// expression, adding an exception (AND NOT x) is the easiest approach.
//
// If you are seeing ads that you don't want to see, add the URL
// for the ad to the filter list.
// 
// Never point at someone else's PAC file. Always load from your 
// own copy, or you don't know where you'll end up.
// 
// CODING NOTES:
// -------------
// PAC files contain a JavaScript called FindProxyForURL() that is 
// called for every URL the browser tries to access. The return value
// of the function tells the browser how to access that URL. There
// are three possible return strings:
//
// DIRECT
// Make connection directly, no proxies. Same as returning null.
//
// PROXY host:port
// Use the specified proxy
//
// SOCKS host:port
// Use the specified SOCKS server
//
// The return value can contain any number of these strings, separated
// by semi-colons. If there are multiple strings, the browser will try
// each, from left-to-right, until it's able to establish a connection.
//
// The FindProxyForURL function calls some special JavaScript functions
// for determining how to handle each URL encountered:
//
// Hostname-based conditions, true iff:
//   isPlainHostName(host) - no domain name (no dots - e.g. "www")
//   dnsDomainIs(host, domain) - domain matches domain of host ("www.abc.com", "abc.com")
//   localHostOrDomainIs(host, hostdom) - hostdom matches host (host may omit domain)
//   isResolvable(host) - DNS can resolve host
//   isInNet(host, pattern, mask) - host is DNS name or IP, pattern is IP, mask for IP
//
// Related utility functions:
//   dnsResolve(host) - resolves given DNS hostname and returns IP address
//   myIpAddress() - returns the IP address of the host the browser is running on
//   dnsDomainLevels(host) - returns number of DNS domain levels (dots) in hostname
//
// URL/hostname-based conditions, true iff:
//   shExpMatch(str, shexp) - string (e.g. URL or hostname) matches shell expression
//
// Time-based conditions:
//   weekdayRange(wd1, wd2, gmt) - SUN MON TUE WED THU FRI SAT, then GMT
//      only wd1 required, second param can be GMT, local timezone used if no GMT
//   dateRange() - parameters can be various combinations of day, month, year, zone
//   timeRange() - parameters can be various combinations of hour, minute, second, zone
//

/////////////////////////////////////////////////////////////////////
// Variable for toggling use of the black hole proxy on and off.
var isActive = 1;

/////////////////////////////////////////////////////////////////////
// Sites on the "pass list" are directly accessed.
// Filtered sites go to the blackhole (handled by BlackHoleProxy at port 3421).
var normal = "DIRECT";
var blackhole = "PROXY localhost:3421";

/////////////////////////////////////////////////////////////////////
// Regular expressions can be used to make the list to check shorter.
// Using JavaScript regular expression literals in the form /.../ 
// rather than the constructors in the form 'new RegExp()'
// insures that the regexps will be compiled as the PAC file is loaded.
//

////////////////////////////////////////////////////////////////////
// These match strings frequently found in ad URLs.
//
var re_string01 =   /(\.|-|=|\/|_|\?)ad([svx]|(s)?[0-9])?(\.|-|=|\/|_|\?)/i;
var re_string02 =   /(\.|-|=|\/|_|\?)ad(_)?(bin|banner|bot|center|centric|click|client|controller|count|engine)?(s)?(\.|-|=|\/|_|\?)/i;
var re_string03 =   /(\.|-|=|\/|_|\?)ad(_)?(force|frame|gif|graph|id|iframe|image|img|info|jump|link|log|man|media|mem)?(s)?(\.|-|=|\/|_|\?)/i;
var re_string04 =   /(\.|-|=|\/|_|\?)ad(_)?(net|optimizer|pics|popup|proof|redir|rot|(s)?rotator|runner)(s)?(\.|-|=|\/|_|\?)/i;
var re_string05 =   /(\.|-|=|\/|_|\?)ad(_)?(sadclient|sale|script|serv(ant|er|ice)?|smart|space|spc|srv|stream|swap|sv)(s)?(\.|-|=|\/|_|\?)/i;
var re_string06 =   /(\.|-|=|\/|_|\?)ad(_)?(track|vernet|vertis(ing|ement)|vert(pro)?|view|vt)(s)?(\.|-|=|\/|_|\?)/i;
var re_string07 =   /(\.|-|=|\/|_|\?)(3rdparty|active|adult|geo|click|html|live|logoshow|page|remote|rotate|sync|us|view|web)ad(s)?(\.|-|=|\/|_|\?)/i;
var re_string08 =   /(\.|-|=|\/|_|\?)banner(_)?(ad|exchange|farm|graphic|image|img|lynx|media|net|power|s|smsg|solution|swap|women)?(s)?(\.|-|=|\/|_|\?)/i;
var re_string09 =   /(\.|-|=|\/|_|\?)(action|_house|get|hyper|j|js|member|rotate|show|smart|view|video|web)banner(s)?(\.|-|=|\/|_|\?)/i;
var re_string10 =   /(\.|-|=|\/|_|\?)(click([0-9]|100|ad|cash|ii|it|over|s|thru)|pagecount|count(er|ed)|net(ads|adsrv))(\.|-|=|\/|_|\?)/i;
var re_string11 =   /(\.|-|=|\/|_|\?)(home)?pop(_)?(down|under|up)(s)?(\.|-|=|\/|_|\?)/i;
var re_string12 =   /(\.|-|=|\/|_|\?)(staticads|aff(art|il(iate)?|istat|l)(s)?)(\.|-|=|\/|_|\?)/i;
var re_string13 =   /(\.|-|=|\/|_|\?)web(advert(s)?|affects|audit(s)?|connect|gif|measure|trends)(\.|-|=|\/|_|\?)/i;
var re_string14 =   /(\.|-|=|\/|_|\?)(ajrotator|banclk|banman|banclk|banrgifs|banserv|bdredirect|branding|cash|cgiadman)(\.|-|=|\/|_|\?)/i;
var re_string15 =   /(\.|-|=|\/|_|\?)(cliq|clix|cmtgroup|cobrands|exapps|gsanet|gtplacer|hotlog|iidest|iplace|mktcode)(\.|-|=|\/|_|\?)/i;
var re_string16 =   /(\.|-|=|\/|_|\?)(ngadclient|nph-(bounce|load|redir)|pagecount|partner(s)?|promo(s|te|tions)?)(\.|-|=|\/|_|\?)/i;
var re_string17 =   /(\.|-|=|\/|_|\?)(radiate|realnetworks|reklama|rotateart|servedby|sponsor(edby|s)?)(\.|-|=|\/|_|\?)/i;
var re_string18 =   /(\.|-|=|\/|_|\?)(toto|trafficx|wadredir)(\.|-|=|\/|_|\?)/i;

////////////////////////////////////////////////////////////////////////////////
// These are ad servers. When they are serving ads, the URL usually starts
// with a subdomain like "stats", "view", or their client company. So the
// regexp's look for a string of 4+ characters and a dot before the domain name.
//
var re_server01 =  /.{4,}\.ad(-flow|bureau|butler|club|interax|juggler|max(imize)?|monitor|ready|roar|smart|software|t ech|tegrity|trix|ultrevenueservice)\.(com|net)/i;
var re_server02 =  /.{4,}\.(1-2-free|247media|actionsplash|allhits|atdmt|asiad|atwola|avenuea)\.(com|net)/i;
var re_server03 =  /.{4,}\.(banner(bank|brokers|cast|dice|exchange|mall|pool|power|space|swap)|(123|hyper|great)banner)\.(com|net)/i;
var re_server04 =  /.{4,}\.(bfast|bidclix|(bigbang|blacklight)media|bluestreak|bravenet|bridgetrack|burstnet)\.(com|net)/i;
var re_server05 =  /.{4,}\.click(ability|adhere|agents|broker(s)?|bank|cash|edyclick|finders|house|trade|xchange)\.(com|net)/i;
var re_server06 =  /.{4,}\.((dimeper|discount|double|go|human|just|rmb|value)click|(dime|offshore|smart)clicks)\.(com|net)/i;
var re_server07 =  /.{4,}\.((123|cash)count|commission-junction|contentzone|coremetrics|count4all|criticalmass|cyber(first|one)|cybereps)\.(com|net)/i;
var re_server08 =  /.{4,}\.(datais|dealtime|dirtycash|divineimages|engage|etracking|everyone|exitdirect|ezpic|fastclick|flycast|focalink)\.(com|net)/i;
var re_server09 =  /.{4,}\.((add)?freestats|globaltrack|hightrafficads|hit(box|cents|exchange))\.(com|net)/i;
var re_server10 =  /.{4,}\.(gator|globaltrack|iadnet|iagency|imgis|interadnet|imaginemedia|internetfuel|justwebads)\.(com|net)/i;
var re_server11 =  /.{4,}\.(link(4ads|4link|buddies|counter|exchange|synergy|trader)|livestat)\.(com|net)/i;
var re_server12 =  /.{4,}\.(marketspace|mediaplex|memberprize|net(gravity|-on|shelter|vertising)|ngadcenter|orbitalbranding)\.(com|net)/i;
var re_server13 =  /.{4,}\.(paycounter|paypopup|pennyweb|permissionmedia|porntrack|postmasterdirect)\.(com|net)/i;
var re_server14 =  /.{4,}\.popup(ad|money|nation|savings|traffic)\.(com|net)/i;
var re_server15 =  /.{4,}\.(qkimg|rampidads|rankyou|realmedia|realtracker|right(serve|stats)|rn11|ru4)\.(com|net)/i;
var re_server16 =  /.{4,}\.(sabela|safe-audit|savethis|searchbarcash|sex(tracker|spy)|site(-)?stats|sitetracker|spylog|streamingcash|superstats)\.(com|net)/i;
var re_server17 =  /.{4,}\.(targetnet|theadstop|thecounter|track4|thinkdirectmarketing|top(clicks|list)|tradedoubler|trafficmp)\.(com|net)/i;
var re_server18 =  /.{4,}\.(trafficwave|treeloot|tribalfusion|vibrantmedia|virtumondo)\.(com|net)/i;
var re_server19 =  /.{4,}\.(web(clients|connect|power|sitesponsor|sponsors|-stat|trends(live)?)|wtlive|a1\.yimg|zedo)\.(com|net)/i;

////////////////////////////////////////////////////////////////////////////////
// These are subdomain names frequently found leading ad URLs
//
var re_hostsub =   /^(adcreative(s)?|imageserv|media(mgr)?|stats|switch|track(2|er)?|view)\./i;

///////////////////////////////////////////////////////////////////////////////
// Matches common names for blank gifs - used for Web bugs
//
var re_webbug = /(\/1|blank|\/b|clear|pixel|transp|spacer)\.gif/i;

///////////////////////////////////////////////////////////////////////////////
// Matches flash
//
var re_flash = /$\.swf/i;

function FindProxyForURL(url, host)
{
  /////////////////////////////////////////////////////////////
  // debugging code - change to '1' to test,
  //   displays an alert for each URL checked
  /////////////////////////////////////////////////////////////
  if (0)
      alert("Checking...\n\nURL: " + url + "\n\nHost: " + host);

  /////////////////////////////////////////////////////////////
  // To toggle proxy on and off, navigate to "bhp" (black hole proxy)
  /////////////////////////////////////////////////////////////
  if (shExpMatch(host, "bhp"))
  {
    isActive = 1 - isActive;
    alert("isActive = " + isActive);
    return blackhole;
  }

  if (!isActive)
    return normal;

  // Note: All shExpMatch rules below must be lowercase!
  url = url.toLowerCase();
  host = host.toLowerCase();

  ///////////////////////////////////////////////////////////
  // Pass List. These URLs are not checked for ads.
  // Note: This section must precede the Filter List.
  ///////////////////////////////////////////////////////////
  if (0
  // To add a domain to the pass list, add a line such as:
  //	|| dnsDomainIs(host, "permutations.com")
  // or for a single host
  //	|| (host == "webdesign.permutations.com")
  // Computers on my home network
  //	|| isInNet(host, "192.168.1.0", "255.255.255.0")
  //	|| shExpMatch(host, "192.168.1.*")
  // Not sure what this is, but it's white-listed in other lists
	|| shExpMatch(url, "*.apple.com/switch/ads/*")
  // John LoVerso's no-ads site: http://www.schooner.com/~loverso/no-ads/
	|| shExpMatch(host, "*schooner.com*")
  // Citibank Business Access - no ads here, but triggering strings
	|| shExpMatch(url, "https://citibusinessonline.da-us.citibank.com*")
  // Citibank Business Access - whitelist "branding" for this URL
	|| shExpMatch(url, "*.citibank.com/us/citibusinessonline/scripts/branding.js")
  // Citibank Direct Access - no ads here, but triggering strings
	|| shExpMatch(url, "https://web.da-us.citibank.com*")
  // Serves Citibank DA pages, many URLs contain "popup" but are not ads
	|| shExpMatch(url, "https://a248.e.akamai.net*")
  // eBay's "advanced search" page
	|| shExpMatch(url, "http://pages.ebay.com/search/items/search_adv.html")
  // Yahoo Groups login page (has a blank promo field)
	|| shExpMatch(url, "*promo=&*")
      )
  {
    /////////////////////////////////////////////////////////////
    // debugging code - change to '1' to test,
    //   displays an alert for each URL on pass list
    /////////////////////////////////////////////////////////////
    if (0)
      alert("on pass list: " + url);

    return normal;

  } // end Pass List.

  ///////////////////////////////////////////////////////
  // Filter List - blocked sites
  ///////////////////////////////////////////////////////
  if (0
      ///////////////////////////////////////////////
      // Regular expression tests
      ///////////////////////////////////////////////
	|| re_string01.test(url)
	|| re_string02.test(url)
	|| re_string03.test(url)
	|| re_string04.test(url)
	|| re_string05.test(url)
	|| re_string06.test(url)
	|| re_string07.test(url)
	|| re_string08.test(url)
	|| re_string09.test(url)
	|| re_string10.test(url)
	|| re_string11.test(url)
	|| re_string12.test(url)
	|| re_string13.test(url)
	|| re_string14.test(url)
	|| re_string15.test(url)
	|| re_string16.test(url)
	|| re_string17.test(url)
	|| re_string18.test(url)
	|| re_server01.test(url)
	|| re_server02.test(url)
	|| re_server03.test(url)
	|| re_server04.test(url)
	|| re_server05.test(url)
	|| re_server06.test(url)
	|| re_server07.test(url)
	|| re_server08.test(url)
	|| re_server09.test(url)
	|| re_server10.test(url)
	|| re_server11.test(url)
	|| re_server12.test(url)
	|| re_server13.test(url)
	|| re_server14.test(url)
	|| re_server15.test(url)
	|| re_server16.test(url)
	|| re_server17.test(url)
	|| re_server18.test(url)
	|| re_server19.test(url)
	|| re_hostsub.test(host)
	|| re_webbug.test(url)
	|| re_flash.test(url)

      ///////////////////////////////////////////////
	// Not matched elsewhere...
	///////////////////////////////////////////////
      || dnsDomainIs(host, "a.mktw.net")	
	|| shExpMatch(url, "yahoo.com/categoryid=0")
	|| shExpMatch(url, "yahoo.com/m=")
	|| shExpMatch(url, "toolbar.aol.com")
	|| shExpMatch(url, "futuresite.register.com")

      ///////////////////////////////////////////////
      // Blocks custom icon so sites don't know you've 
	// bookmarked them (IE only)
      ///////////////////////////////////////////////
      // || shExpMatch(url, "*favicon.ico*")
      )
  {
    /////////////////////////////////////////////////////////////
    // debugging code - change to '1' to test,
    //   displays an alert for each URL blocked
    /////////////////////////////////////////////////////////////
    if (0)
      alert("Blocked...\n\nURL: " + url + "\n\nHost: " + host);

    return blackhole;

  } // end Filter List.

  ///////////////////////////////////////////////////////////////
  // Pseudo-DNS Cache. Return a URL's IP address as its proxy.
  ///////////////////////////////////////////////////////////////
  if (shExpMatch(url, "http://www.pacificnet.net*"))
    return "PROXY 207.171.0.253:80";

  /////////////////////////////////////////////////////////////
  // debugging code - change to '1' to test,
  //   displays an alert for each URL not blocked
  /////////////////////////////////////////////////////////////
  if (0)
      alert("Not Blocked...\n\nURL: " + url + "\n\nHost: " + host);

  return normal;

} // end FindProxyForURL()


/////////////////////////////////////////////////////////////
// debugging code - change to '1' to test,
//   displays an alert when browser first loads PAC file
/////////////////////////////////////////////////////////////
if (0)
  alert("PAC file loaded, isActive = " + isActive);

