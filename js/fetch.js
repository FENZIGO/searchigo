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

let allMatches = []; 

async function fetchJsonParallel() {
  const query = (document.getElementById("searchInput").value || "gothic").toLowerCase();
  const resultDiv = document.getElementById("results");
  const preResultDiv = document.getElementById("preResults");
  const sortSelect = document.getElementById("sortSelect");

  resultDiv.innerHTML = "";
  preResultDiv.innerHTML = `<p>Rozpoczynam pobieranie ${sources.length} źródeł równolegle...</p>`;
  allMatches = [];

 
  const fetchPromises = sources.map((url, index) =>
    fetch(url, { headers: { 'Accept': 'application/json' } })
      .then(async resp => {
        if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
        const json = await resp.json();
        return { url, json };
      })
      .catch(err => ({ url, err }))
  );

  
  fetchPromises.forEach((p, idx) => {
    p.then(result => {
      const url = result.url || sources[idx];
      preResultDiv.innerHTML = `<p>Przetworzono ${idx + 1}/${sources.length}: ${escapeHtml(url)}</p>`;

      if (result.err) {
        console.warn("Błąd przy źródle:", url, result.err);
        return;
      }

      const sourceData = result.json;
      if (!sourceData || !Array.isArray(sourceData.downloads)) return;

     
      const matches = sourceData.downloads
        .filter(entry => (entry.title || "").toLowerCase().includes(query))
        .map(entry => ({ ...entry, sourceName: sourceData.name || url }));

      if (matches.length > 0) {
        allMatches.push(...matches);
        appendMatches(matches);
      }
    });
  });

 
  await Promise.allSettled(fetchPromises);

  
  if (allMatches.length === 0) {
    resultDiv.innerHTML = "<p>Brak wyników.</p>";
    preResultDiv.innerHTML = "<p>Wszystkie źródła przetworzone.</p>";
    return;
  }

  const sortBy = (sortSelect && sortSelect.value) ? sortSelect.value : 'uploadDate';
  sortAndRenderAllMatches(sortBy);
  preResultDiv.innerHTML = "<p>Wszystkie źródła przetworzone.</p>";
}

function appendMatches(matches) {
  const resultDiv = document.getElementById("results");
  const torrentChecked = document.getElementById("torrent") ? document.getElementById("torrent").checked : true;
  const directChecked = document.getElementById("direct") ? document.getElementById("direct").checked : true;

  matches.forEach(entry => {
    const linksHtml = (entry.uris || [])
      .filter(uri => {
        if ((uri || "").startsWith("magnet:") && torrentChecked) return true;
        if (!(uri || "").startsWith("magnet:") && directChecked) return true;
        return false;
      })
      .map(uri => {
        const label = (uri || "").startsWith("magnet:") ? "Pobierz Torrent" : "Pobierz Direct";
        return `<a href="${escapeHtmlAttr(uri)}" target="_blank" rel="noopener noreferrer" class="download-btn">${label}</a>`

      })
      .join(" | ");

    if (!linksHtml) return;

    const div = document.createElement("div");
    div.classList.add("item");
    div.innerHTML = `
      <div class="title">${escapeHtml(entry.title || "bez tytułu")}</div>
      <div>Źródło: ${escapeHtml(entry.sourceName || "brak danych")}</div>
      <div>Rozmiar: ${escapeHtml(entry.fileSize || "brak danych")}</div>
      <div>Data dodania: ${entry.uploadDate ? escapeHtml(new Date(entry.uploadDate).toLocaleDateString()) : "brak"}</div>
      <hr>
      <div>${linksHtml}</div>
      
    `;
    resultDiv.appendChild(div);
  });
}

function sortAndRenderAllMatches(sortBy) {
  if (!Array.isArray(allMatches)) return;
  const resultDiv = document.getElementById("results");
  resultDiv.innerHTML = "";

  allMatches.sort((a, b) => {
    if (sortBy === "title") return (a.title || "").localeCompare(b.title || "");
    if (sortBy === "fileSize") {
      const sizeA = parseFloat(a.fileSize) || 0;
      const sizeB = parseFloat(b.fileSize) || 0;
      return sizeA - sizeB;
    }
    if (sortBy === "uploadDate") {
      const dateA = new Date(a.uploadDate || 0);
      const dateB = new Date(b.uploadDate || 0);
      return dateB - dateA; 
    }
    return 0;
  });

  
  appendMatches(allMatches);
}


function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
function escapeHtmlAttr(str) {
  return escapeHtml(str).replace(/\n/g, "");
}


const searchBtn = document.getElementById("searchBtn");
if (searchBtn) {
    searchBtn.addEventListener("click", (event) => {
        if (searchInput.value.length > 2) fetchJsonParallel();
        else alert("Podaj minimum 3 znaki!");
    });
}

const searchInput = document.getElementById("searchInput");
if (searchInput) {
  searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      if (searchInput.value.trim().length > 2) {
        fetchJsonParallel();
      } else {
        alert("Podaj minimum 3 znaki!");
      }
    }
  });
}


const sortSelect = document.getElementById("sortSelect");
if (sortSelect) {
  sortSelect.addEventListener("change", () => {
    sortAndRenderAllMatches(sortSelect.value);
  });
}

const settingsBtn = document.getElementById("settingsBtn");
if (settingsBtn) {
  settingsBtn.addEventListener("click", () => {
    const menu = document.getElementById("settingsMenu");
    if (!menu) return;
    menu.style.display = (menu.style.display === "block") ? "none" : "block";
  });
}


if (typeof module !== 'undefined' && module.exports) {
  module.exports = { fetchJsonParallel };
}
