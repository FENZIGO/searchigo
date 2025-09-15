const sources = [
    "https://hydralinks.pages.dev/sources/atop-games.json",
"https://hydralinks.pages.dev/sources/steamrip.json",
"https://hydralinks.pages.dev/sources/dodi.json",
"https://hydralinks.pages.dev/sources/empress.json",
"https://hydralinks.pages.dev/sources/fitgirl.json",
"https://hydralinks.pages.dev/sources/kaoskrew.json",
"https://hydralinks.pages.dev/sources/onlinefix.json",
"https://hydralinks.pages.dev/sources/tinyrepacks.json",
"https://hydralinks.pages.dev/sources/xatab.json",
"https://raw.githubusercontent.com/KekitU/rutracker-hydra-links/main/all_categories.json",
"https://davidkazumi-github-io.pages.dev/fontekazumi.json",
"https://hydrasources.su/hydra.json",
"https://raw.githubusercontent.com/Shisuiicaro/source/refs/heads/main/shisuyssource.json",
"https://hydralinks.pages.dev/sources/gog.json",
"https://raw.githubusercontent.com/Wkeynhk/Rutor/refs/heads/main/rutor.json",
"https://hydrasources.su/sources/atop-games.json",
"https://hydrasources.su/sources/steamrip.json",
"https://hydrasources.su/sources/dodi.json",
"https://hydrasources.su/sources/empress.json",
"https://hydrasources.su/sources/fitgirl.json",
"https://hydrasources.su/sources/kaoskrew.json",
"https://hydrasources.su/sources/onlinefix.json",
"https://hydrasources.su/sources/tinyrepacks.json",
"https://hydrasources.su/sources/xatab.json",
"https://hydrasources.su/sources/gog.json",
"https://raw.githubusercontent.com/s0d4lite52spb/sodalite-hydralinks/refs/heads/main/erotorrent.ru_list.json",
"https://raw.githubusercontent.com/Wexdor/thelastgame/refs/heads/main/games.json",
"https://raw.githubusercontent.com/Wkeynhk/RuTracker-Linux/refs/heads/main/rutrackerlinux.json",
"https://ggvv13.github.io/Linux-Games.json",
"https://hydrasources.su/nnmclub.json",
"https://hydrasources.su/freetp.json",
"https://trash-xrl.github.io/Fonte%20teste.json",
"https://raw.githubusercontent.com/ewx12344/Gestapo-Source/refs/heads/main/gestaposource.json",
"https://bumyy32.github.io/bumyysoftware.json",
"https://vxvulgooficial.github.io/vxvulgooficial/vxvulgo.json",
"https://wpnnt.github.io/sources/warph_collection.json",
"https://konthe1.github.io/DenuvoPubSource.json",
"https://nexusbuildcompany.github.io/nexus.json",
"https://raw.githubusercontent.com/irisihrz/json/refs/heads/main/irishub.json",
"https://raw.githubusercontent.com/vinikjkkj/game-links-collection/refs/heads/master/jsons/steamrip.json",
"https://raw.githubusercontent.com/vinikjkkj/game-links-collection/refs/heads/master/jsons/fitgirl.json",
"https://raw.githubusercontent.com/Wkeynhk/Rutor/refs/heads/main/steamgg.json"
];

const fetchJson = async () => {
    const query = document.getElementById("searchInput").value.toLowerCase();
    const resultDiv = document.getElementById("results");
    const preResultDiv = document.getElementById("preResults");
    resultDiv.innerHTML = "";

    let allMatches = [];
    let progress = 0;
    try {
        for (const url of sources) {

            progress ++;
            preResultDiv.innerHTML = `
            <p>Przeszukiwane ${progress}/${sources.length}:</p>
            <p>${url}</p>
            `;


            try {
                const resp = await fetch(url);
                if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
                const sourceData = await resp.json();

                if (!sourceData.downloads) continue;

                const matches = sourceData.downloads
                .filter(entry => entry.title.toLowerCase().includes(query))
                .map(entry => ({ ...entry, sourceName: sourceData.name }));

                allMatches.push(...matches);
            } catch (err) {
                console.warn("Błąd przy źródle:", url, err);

            }
        }


        resultDiv.innerHTML = "";

        if (allMatches.length === 0) {
            resultDiv.innerHTML = "<p>Brak wyników.</p>";
        } else {
            allMatches.forEach(entry => {
                const linksHtml = (entry.uris || [])
                .map(uri => `<a href="${uri}" target="_blank">Pobierz</a>`)
                .join(" | ");

                const div = document.createElement("div");
                div.classList.add("item");
                div.innerHTML = `
                <div class="title">${entry.title}</div>
                <div>Źródło: ${entry.sourceName || "brak danych"}</div>
                <div>Rozmiar: ${entry.fileSize || "brak danych"}</div>
                <div>Data dodania: ${entry.uploadDate ? new Date(entry.uploadDate).toLocaleDateString() : "brak"}</div>
                <div>${linksHtml}</div>
                <hr>
                `;
                resultDiv.appendChild(div);
            });
        }
    } catch (err) {
        console.error("Błąd globalny:", err);
        resultDiv.innerHTML = "<p>Wystąpił błąd podczas wyszukiwania.</p>";
    }
};


document.getElementById("searchBtn").addEventListener("click", fetchJson);
document.getElementById("searchInput").addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        fetchJson();
    }
});
