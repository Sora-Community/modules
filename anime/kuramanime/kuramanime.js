async function searchResults(keyword) {
    const response = await fetchv2(`https://v6.kuramanime.run/anime?search=${keyword}&order_by=oldest`);
    const html = await response.text();
    const results = [];

    const animeEntryRegex = /<div class="product__item">[\s\S]*?<a href="([^"]+)"[\s\S]*?data-setbg="([^"]+)"[\s\S]*?<h5><a[^>]*>([^<]+)<\/a><\/h5>/g;

    const entries = html.matchAll(animeEntryRegex);
    for (const entry of entries) {
        const href = entry[1].trim();
        const imageUrl = entry[2].trim();
        const title = entry[3].trim();

        if (href && imageUrl && title) {
            results.push({
                title: title,
                href: href,
                image: imageUrl
            });
        }
    }

    console.log(JSON.stringify(results));
    return JSON.stringify(results);
}

async function extractDetails(url) {
    const response = await fetchv2(url);
    const html = await response.text();

    const details = [];
    const descriptionMatch = html.match(/<p id="synopsisField"[^>]*>([\s\S]*?)<\/p>/);

    const description = descriptionMatch ?
        descriptionMatch[1]
        .replace(/<\/?[^>]+(>|$)/g, '')
        .replace(/\s+/g, ' ')
        .trim() :
        'N/A';

    details.push({
        description: description,
        aliases: 'N/A',
        airdate: 'N/A'
    });

    console.log(details);
    return JSON.stringify(details);
}

async function extractEpisodes(url) {
    const response = await fetchv2(url);
    const html = await response.text();
    const episodes = [];

    const episodeLinks = [...html.matchAll(/<a\s+class=['"]btn btn-sm btn-danger mb-1 mt-1['"]\s*href=['"]([^'"]+)['"][^>]*>\s*Ep\s*(\d+)/g)];

    for (const match of episodeLinks) {
        episodes.push({
            href: match[1],
            number: parseInt(match[2], 10)
        });
    }

    console.error("Extracted episodes:" + JSON.stringify(episodes));
    return JSON.stringify(episodes);
}

async function extractStreamUrl(url) {
    const response = await fetchv2(url);
    const html = await response.text();
    const firstCodeMatch = /data-kps="([^"]+)"/.exec(html);

    if (!firstCodeMatch) return null;

    const firstCode = firstCodeMatch[1];

    const responseTwo = await fetchv2(`https://v6.kuramanime.run/assets/js/${firstCode}.js`);
    const htmlTwo = await responseTwo.text();

    const authRouteMatch = /MIX_AUTH_ROUTE_PARAM:\s*'([^']+)'/.exec(htmlTwo);
    const pageTokenMatch = /MIX_PAGE_TOKEN_KEY:\s*'([^']+)'/.exec(htmlTwo);
    const streamServerMatch = /MIX_STREAM_SERVER_KEY:\s*'([^']+)'/.exec(htmlTwo);

    const authRouteParam = authRouteMatch ? authRouteMatch[1] : null;
    const pageTokenKey = pageTokenMatch ? pageTokenMatch[1] : null;
    const streamServerKey = streamServerMatch ? streamServerMatch[1] : null;

    const responseThree = await fetchv2(`https://v6.kuramanime.run/assets/${authRouteParam}`);
    const thirdRandomAssCode = await responseThree.text();
    const fullUrl = `${url}?${pageTokenMatch}=${thirdRandomAssCode}&${streamServerMatch}=kuramadrive&page=1`

    const fullUrlClean = cleanUrl(fullUrl); //idk how to fix the regex dawgggg, might aswell do it like this then idgaf
    console.error(fullUrlClean);

    const responseFour = await fetchv2(fullUrlClean);
    const actualHtml = await responseFour.text();
    //console.error(actualHtml);

    const kdriveMp4480pMatch = /kuramadrive\.com\/kdrive\/[^"]+(?=.*MP4 480p.*Hardsub)/s.exec(actualHtml);

    const kdriveUrl = kdriveMp4480pMatch ?
        `https://${kdriveMp4480pMatch[0]}` :
        null;

    console.error(kdriveUrl);

    const kdriveFileCode = kdriveUrl.split('/').pop();
    const kdriveApiUrl = `https://kuramadrive.com/api/v1/drive/file/${kdriveFileCode}/check`;

    console.error(kdriveApiUrl);


    const responseFive = await fetchv2(kdriveUrl);
    const actualActualHtml = await responseFive.text();

    const domainMatch = actualActualHtml.match(/data-domain="([^"]+)"/);
    const domain = domainMatch ? domainMatch[1] : null;

    console.error(domain);

    const bearerResponse = await fetchv2(`https://kuramadrive.com/api/v1/var/js/master.js`);
    const bearerHtml = await bearerResponse.text();

    const bearerTokenMatch = /globalBearerToken:\s*'([^']+)'/.exec(bearerHtml);

    const bearerToken = bearerTokenMatch ? bearerTokenMatch[1] : null;
    console.error(bearerToken);

    const postData = {
        domain: `${domain}`,
        token: ""
    };

    const headers = {
        "Authorization": `Bearer ${bearerToken}`,
        "Origin": "https://kuramadrive.com",
        "Referer": `${kdriveUrl}`,
        "Alt-Used": "kuramadrive.com",
        "Content-Type": "application/json"
    };

    try {
        const responseText = await fetchv2(kdriveApiUrl, headers, "POST", postData);
        const responseData = await responseText.text();
        console.error(responseData);
        let finalUrl = null;
        try {
            const urlMatch = responseData.match(/"url":"(https:\\\/\\\/[^"]+)"/);

            if (urlMatch && urlMatch[1]) {
                finalUrl = urlMatch[1].replace(/\\\//g, '/');
            } else {
                console.error("error mf");
            }
        } catch (parseError) {}

        console.error(finalUrl);
        return finalUrl;
    } catch (error) {
        return null;
    }
}

function cleanUrl(url) {
    return url.replace(/MIX_PAGE_TOKEN_KEY:\s*'[^']+',/, '')
        .replace(/MIX_STREAM_SERVER_KEY:\s*'[^']+',/, '')
        .replace(/:\s*'[^']+'/, '');
}
