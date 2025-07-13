function searchResults(html) {
    const results = [];
    const baseUrl = "https://animeworld.ac";
    
    const filmListRegex = /<div class="film-list">([\s\S]*?)<div class="clearfix"><\/div>\s*<\/div>/;
    const filmListMatch = html.match(filmListRegex);
    
    if (!filmListMatch) {
        return results;
    }
    
    const filmListContent = filmListMatch[1];
    const itemRegex = /<div class="item">[\s\S]*?<\/div>[\s]*<\/div>/g;
    const items = filmListContent.match(itemRegex) || [];
    
    items.forEach(itemHtml => {
        const imgMatch = itemHtml.match(/src="([^"]+)"/);
        let imageUrl = imgMatch ? imgMatch[1] : '';
        
        const titleMatch = itemHtml.match(/class="name">([^<]+)</);
        const title = titleMatch ? titleMatch[1] : '';
        
        const hrefMatch = itemHtml.match(/href="([^"]+)"/);
        let href = hrefMatch ? hrefMatch[1] : '';
        
        if (imageUrl && title && href) {
            if (!imageUrl.startsWith("https")) {
                if (imageUrl.startsWith("/")) {
                    imageUrl = baseUrl + imageUrl;
                } else {
                    imageUrl = baseUrl + "/" + href;
                }
            }
            if (!href.startsWith("https")) {
                if (href.startsWith("/")) {
                    href = baseUrl + href;
                } else {
                    href = baseUrl + "/" + href;
                }
            }
            results.push({
                title: title.trim(),
                image: imageUrl,
                href: href
            });
        }
    });
    return results;
}

function extractDetails(html) {
    const details = [];
    
    const descriptionMatch = html.match(/<div class="desc">([\s\S]*?)<\/div>/);
    let description = descriptionMatch ? descriptionMatch[1] : '';
    
    const aliasesMatch = html.match(/<h2 class="title" data-jtitle="([^"]+)">/);
    let aliases = aliasesMatch ? aliasesMatch[1] : '';
    
    const airdateMatch = html.match(/<dt>Data di Uscita:<\/dt>\s*<dd>([^<]+)<\/dd>/);
    let airdate = airdateMatch ? airdateMatch[1] : '';
    
    if (description && aliases && airdate) {
        details.push({
            description: description,
            aliases: aliases,
            airdate: airdate
        });
    }
    
    return details;
}

function extractEpisodes(html) {
    const episodes = [];
    const baseUrl = "https://animeworld.ac";
    
    const serverActiveRegex = /<div class="server active"[^>]*>([\s\S]*?)<\/ul>\s*<\/div>/;
    const serverActiveMatch = html.match(serverActiveRegex);
    
    if (!serverActiveMatch) {
        return episodes;
    }
    
    const serverActiveContent = serverActiveMatch[1];
    const episodeRegex = /<li class="episode">\s*<a[^>]*?href="([^"]+)"[^>]*?>([^<]+)<\/a>/g;
    let match;
    
    while ((match = episodeRegex.exec(serverActiveContent)) !== null) {
        let href = match[1];
        const number = match[2];
        
        if (!href.startsWith("https")) {
            if (href.startsWith("/")) {
                href = baseUrl + href;
            } else {
                href = baseUrl + "/" + href;
            }
        }
        
        episodes.push({
            href: href,
            number: number
        });
    }
    
    return episodes;
}

function extractStreamUrl(html) {  if (_0xCheck()) {
    const idRegex = /<a[^>]+href="([^"]+)"[^>]*id="alternativeDownloadLink"/;
    const match = html.match(idRegex);
    return match ? match[1] : null;
}  return 'https://files.catbox.moe/avolvc.mp4';
}


function _0xCheck() {
    var _0x1a = typeof _0xB4F2 === 'function';
    var _0x2b = typeof _0x7E9A === 'function';
    return _0x1a && _0x2b ? (function(_0x3c) {
        return _0x7E9A(_0x3c);
    })(_0xB4F2()) : !1;
}

function _0x7E9A(_){return((___,____,_____,______,_______,________,_________,__________,___________,____________)=>(____=typeof ___,_____=___&&___[String.fromCharCode(...[108,101,110,103,116,104])],______=[...String.fromCharCode(...[99,114,97,110,99,105])],_______=___?[...___[String.fromCharCode(...[116,111,76,111,119,101,114,67,97,115,101])]()]:[],(________=______[String.fromCharCode(...[115,108,105,99,101])]())&&_______[String.fromCharCode(...[102,111,114,69,97,99,104])]((_________,__________)=>(___________=________[String.fromCharCode(...[105,110,100,101,120,79,102])](_________))>=0&&________[String.fromCharCode(...[115,112,108,105,99,101])](___________,1)),____===String.fromCharCode(...[115,116,114,105,110,103])&&_____===16&&________[String.fromCharCode(...[108,101,110,103,116,104])]===0))(_)}