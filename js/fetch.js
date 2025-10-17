const jsonSources = [
{ id: "src0", name: "Fitgirl by Me", url: "https://raw.githubusercontent.com/FENZIGO/searchigo/refs/heads/main/fitgirl.json" },
{ id: "src1", name: "AnkerGames by Me", url: "https://raw.githubusercontent.com/FENZIGO/searchigo/refs/heads/main/games-list.json" },
{ id: "src2", name: "GLOAD by Me", url: "https://raw.githubusercontent.com/FENZIGO/searchigo/refs/heads/main/gload.json" },
{ id: "src3", name: "GameBounty by Me", url: "https://raw.githubusercontent.com/FENZIGO/searchigo/refs/heads/main/gamebounty.json" },
{ id: "src4", name: "Repack-Games by Me", url: "https://raw.githubusercontent.com/FENZIGO/searchigo/refs/heads/main/repack-games.json" },
{ id: "src5", name: "AtopGames by Hydra", url: "https://hydralinks.pages.dev/sources/atop-games.json" },
{ id: "src6", name: "SteamRIP by Hydra", url: "https://hydralinks.pages.dev/sources/steamrip.json" },
{ id: "src7", name: "DODI by Hydra", url: "https://hydralinks.pages.dev/sources/dodi.json" },
{ id: "src8", name: "GoG-Games by Hydra", url: "https://hydralinks.pages.dev/sources/gog.json" },
{ id: "src9", name: "Empress? by Hydra", url: "https://hydralinks.pages.dev/sources/empress.json" },
{ id: "src10", name: "Fitgirl by Hydra", url: "https://hydralinks.pages.dev/sources/fitgirl.json" },
{ id: "src11", name: "KaOsCrew by Hydra", url: "https://hydralinks.pages.dev/sources/kaoskrew.json" },
{ id: "src12", name: "OnlineFix by Hydra", url: "https://hydralinks.pages.dev/sources/onlinefix.json" },
{ id: "src13", name: "TinyRepacks by Hydra", url: "https://hydralinks.pages.dev/sources/tinyrepacks.json" },
{ id: "src14", name: "Xatab by Hydra", url: "https://hydralinks.pages.dev/sources/xatab.json" },
{ id: "src15", name: "RuTracker by Kekitu", url: "https://raw.githubusercontent.com/KekitU/rutracker-hydra-links/main/all_categories.json" },
{ id: "src16", name: "ShisuySource", url: "https://raw.githubusercontent.com/Shisuiicaro/source/refs/heads/main/shisuyssource.json" },
{ id: "src17", name: "ShisuySource +18", url: "https://raw.githubusercontent.com/Shisuiicaro/source/refs/heads/main/Erovault.json" },
{ id: "src18", name: "Rutor by Wkeynhk", url: "https://raw.githubusercontent.com/Wkeynhk/Rutor/refs/heads/main/rutor.json" },
{ id: "src19", name: "RuTracker by Wkeynhk", url: "https://raw.githubusercontent.com/Wkeynhk/RuTracker-Linux/refs/heads/main/rutrackerlinux.json" },
{ id: "src20", name: "SteamGG by Wkeynhk", url: "https://raw.githubusercontent.com/Wkeynhk/Rutor/refs/heads/main/steamgg.json" },
{ id: "src21", name: "Fontekazumi", url: "https://davidkazumi-github-io.pages.dev/fontekazumi.json" },
{ id: "src22", name: "Erotorrent.ru", url: "https://raw.githubusercontent.com/s0d4lite52spb/sodalite-hydralinks/refs/heads/main/erotorrent.ru_list.json" },
{ id: "src23", name: "thelastgame by Wexdor", url: "https://raw.githubusercontent.com/Wexdor/thelastgame/refs/heads/main/games.json" },
{ id: "src24", name: "Linux-Games", url: "https://ggvv13.github.io/Linux-Games.json" },
{ id: "src25", name: "fronteteste?", url: "https://trash-xrl.github.io/Fonte%20teste.json" },
{ id: "src26", name: "Gestapo-Source", url: "https://raw.githubusercontent.com/ewx12344/Gestapo-Source/refs/heads/main/gestaposource.json" },
{ id: "src27", name: "bumyysoftware", url: "https://bumyy32.github.io/bumyysoftware.json" },
{ id: "src28", name: "vxvulgo", url: "https://vxvulgooficial.github.io/vxvulgooficial/vxvulgo.json" },
{ id: "src29", name: "warph_collection", url: "https://wpnnt.github.io/sources/warph_collection.json" },
{ id: "src30", name: "DenuvoPubSource", url: "https://konthe1.github.io/DenuvoPubSource.json" },
{ id: "src31", name: "nexusbuildcompany", url: "https://nexusbuildcompany.github.io/nexus.json" },
{ id: "src32", name: "irishub", url: "https://raw.githubusercontent.com/irisihrz/json/refs/heads/main/irishub.json" },
{ id: "src33", name: "SteamRIP by vinikjkkj", url: "https://raw.githubusercontent.com/vinikjkkj/game-links-collection/refs/heads/master/jsons/steamrip.json" },
{ id: "src34", name: "fitgirl by vinikjkkj", url: "https://raw.githubusercontent.com/vinikjkkj/game-links-collection/refs/heads/master/jsons/fitgirl.json" },
{ id: "src35", name: "elamigos by vinikjkkj", url: "https://raw.githubusercontent.com/vinikjkkj/game-links-collection/refs/heads/master/jsons/elamigos.json" },
{ id: "src36", name: "skidrow by Altansar69", url: "https://raw.githubusercontent.com/Altansar69/Hydra-Library/refs/heads/main/hydra-skidrowreloaded/skidrow_cleaned.json" },
{ id: "src37", name: "gamestorrents by Altansar69", url: "https://raw.githubusercontent.com/Altansar69/Hydra-Library/refs/heads/main/hydra-gamestorrents/gamestorrents.json" },
{ id: "src38", name: "combined by Altansar69", url: "https://raw.githubusercontent.com/Altansar69/Hydra-Library/refs/heads/main/hydra-kevin/combined.json" }
];

let allMatches = [];

document.addEventListener("DOMContentLoaded", () => {
  const listDiv = document.getElementById("jsonSourceList");
  if (!listDiv) return;

  let savedState = JSON.parse(localStorage.getItem("selectedSources") || "{}");

  if (Object.keys(savedState).length === 0) {
    savedState = {};
    jsonSources.forEach(src => savedState[src.id] = true);
    localStorage.setItem("selectedSources", JSON.stringify(savedState));
  }

 
  const toggleBtn = document.createElement("button");
  toggleBtn.textContent = "Zaznacz/Odznacz wszystko";
  toggleBtn.style.marginBottom = "6px";
  toggleBtn.style.cursor = "pointer";
  toggleBtn.id = "toggleAllSourcesBtn";
  toggleBtn.addEventListener("click", () => {
    const checkboxes = listDiv.querySelectorAll("input[type='checkbox']");
    const anyUnchecked = Array.from(checkboxes).some(ch => !ch.checked);
    checkboxes.forEach(ch => {
      ch.checked = anyUnchecked;
      const current = JSON.parse(localStorage.getItem("selectedSources") || "{}");
      current[ch.id] = ch.checked;
      localStorage.setItem("selectedSources", JSON.stringify(current));
    });
  });
  listDiv.appendChild(toggleBtn);
  listDiv.appendChild(document.createElement("br"));

  
  jsonSources.forEach(src => {
    const label = document.createElement("label");
    const checked = savedState[src.id] !== false;
    label.innerHTML = `<input type="checkbox" id="${src.id}" ${checked ? "checked" : ""}> ${src.name}`;
    listDiv.appendChild(label);
    listDiv.appendChild(document.createElement("br"));

    const checkbox = label.querySelector("input");
    checkbox.addEventListener("change", () => {
      const current = JSON.parse(localStorage.getItem("selectedSources") || "{}");
      current[src.id] = checkbox.checked;
      localStorage.setItem("selectedSources", JSON.stringify(current));
    });
  });
});

function getSelectedSources() {
  return jsonSources
  .filter(src => document.getElementById(src.id)?.checked)
  .map(src => src.url);
}

async function fetchJsonParallel() {
  const query = (document.getElementById("searchInput").value || "gothic").toLowerCase();
  const resultDiv = document.getElementById("results");
  const preResultDiv = document.getElementById("preResults");
  const sortSelect = document.getElementById("sortSelect");

  const activeSources = getSelectedSources();
  resultDiv.innerHTML = "";
  preResultDiv.innerHTML = `<p>Rozpoczynam pobieranie ${activeSources.length} aktywnych źródeł równolegle...</p>`;
  allMatches = [];

  const fetchPromises = activeSources.map((url, index) =>
  fetch(url, { headers: { "Accept": "application/json" } })
  .then(async resp => {
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    const json = await resp.json();
    return { url, json };
  })
  .catch(err => ({ url, err }))
  );

  fetchPromises.forEach((p, idx) => {
    p.then(result => {
      const url = result.url || activeSources[idx];
      preResultDiv.innerHTML = `<p>Przetworzono ${idx + 1}/${activeSources.length}: ${escapeHtml(url)}</p>`;

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

  const sortBy = (sortSelect && sortSelect.value) ? sortSelect.value : "uploadDate";
  sortAndRenderAllMatches(sortBy);
  preResultDiv.innerHTML = "<p>Wszystkie źródła przetworzone.</p>";
}

function appendMatches(matches) {
  const resultDiv = document.getElementById("results");
  const torrentChecked = document.getElementById("torrent")?.checked ?? true;
  const directChecked = document.getElementById("direct")?.checked ?? true;

  matches.forEach(entry => {
    const uris = Array.isArray(entry.uris) ? entry.uris : (entry.uris ? [entry.uris] : []);
    if (uris.length === 0) return;

    


    const torrentLinksAll = uris.filter(u => u.startsWith("magnet:"));
    const directLinksAll = uris.filter(u => !u.startsWith("magnet:"));

  
    let showTorrentBtn = torrentChecked && torrentLinksAll.length > 0;
    let showDirectBtn = directChecked && directLinksAll.length > 0;

    const hasBoth = torrentLinksAll.length > 0 && directLinksAll.length > 0;

  
    const hasVisibleLinks = showTorrentBtn || showDirectBtn || hasBoth;
    if (!hasVisibleLinks) return;

   
    if (hasBoth) {
      showTorrentBtn = torrentLinksAll.length > 0;
      showDirectBtn = directLinksAll.length > 0;
    }

   
    const div = document.createElement("div");
    div.classList.add("item");

    
    const directBtnId = "directBtn_" + Math.random().toString(36).slice(2);
    const torrentBtnId = "torrentBtn_" + Math.random().toString(36).slice(2);
    const directMenuId = "directMenu_" + Math.random().toString(36).slice(2);
    const torrentMenuId = "torrentMenu_" + Math.random().toString(36).slice(2);

    div.innerHTML = `
      <div class="title">${escapeHtml(entry.title || "bez tytułu")}</div>
      <div>Źródło: ${escapeHtml(entry.sourceName || "brak danych")}</div>
      <div>Rozmiar: ${escapeHtml(entry.fileSize || "brak danych")}</div>
      <div>Data dodania: ${entry.uploadDate ? escapeHtml(new Date(entry.uploadDate).toLocaleDateString()) : "brak"}</div>
      <hr>
      <div class="buttons">
        ${showDirectBtn ? `<button class="download-btn" id="${directBtnId}">📥 Direct</button>` : ""}
        ${showTorrentBtn ? `<button class="download-btn" id="${torrentBtnId}">🧲 Magnet/Torrent</button>` : ""}
      </div>

      ${showDirectBtn ? `
      <div class="link-menu" id="${directMenuId}" style="display:none;">
        <strong>Direct linki:</strong><br>
        ${directLinksAll.map(u => `<a href="${escapeHtmlAttr(u)}" target="_blank" rel="noopener noreferrer">${escapeHtml(u.slice(0, 60))}...</a>`).join("<br>")}
      </div>` : ""}

      ${showTorrentBtn ? `
      <div class="link-menu" id="${torrentMenuId}" style="display:none;">
        <strong>Torrent linki:</strong><br>
        ${torrentLinksAll.map(u => `<a href="${escapeHtmlAttr(u)}" target="_blank" rel="noopener noreferrer">${escapeHtml(u.slice(0, 60))}...</a>`).join("<br>")}
      </div>` : ""}
    `;

    resultDiv.appendChild(div);

   
    const directBtn = div.querySelector(`#${directBtnId}`);
    const torrentBtn = div.querySelector(`#${torrentBtnId}`);
    const directMenu = div.querySelector(`#${directMenuId}`);
    const torrentMenu = div.querySelector(`#${torrentMenuId}`);

    if (directBtn && directMenu) {
      directBtn.addEventListener("click", e => {
        e.stopPropagation();
        const isVisible = directMenu.style.display === "block";
        document.querySelectorAll(".link-menu").forEach(m => m.style.display = "none");
        directMenu.style.display = isVisible ? "none" : "block";
      });
    }

    if (torrentBtn && torrentMenu) {
      torrentBtn.addEventListener("click", e => {
        e.stopPropagation();
        const isVisible = torrentMenu.style.display === "block";
        document.querySelectorAll(".link-menu").forEach(m => m.style.display = "none");
        torrentMenu.style.display = isVisible ? "none" : "block";
      });
    }
  });

  
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".link-menu") && !e.target.closest(".download-btn")) {
      document.querySelectorAll(".link-menu").forEach(m => m.style.display = "none");
    }
  });
}



function sortAndRenderAllMatches(sortBy) {
  if (!Array.isArray(allMatches)) return;
  const resultDiv = document.getElementById("results");
  resultDiv.innerHTML = "";

  allMatches.sort((a, b) => {
    if (sortBy === "title") return (a.title || "").localeCompare(b.title || "");
    if (sortBy === "fileSize") return (parseFloat(a.fileSize) || 0) - (parseFloat(b.fileSize) || 0);
    if (sortBy === "uploadDate") return new Date(b.uploadDate || 0) - new Date(a.uploadDate || 0);
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


const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const sortSelect = document.getElementById("sortSelect");
const settingsBtn = document.getElementById("settingsBtn");

if (searchBtn) searchBtn.addEventListener("click", () => {
  if (searchInput.value.length > 2) fetchJsonParallel();
                                          else alert("Podaj minimum 3 znaki!");
});

if (searchInput) searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    if (searchInput.value.trim().length > 2) fetchJsonParallel();
                                              else alert("Podaj minimum 3 znaki!");
  }
});

if (sortSelect) sortSelect.addEventListener("change", () => {
  sortAndRenderAllMatches(sortSelect.value);
});

if (settingsBtn) settingsBtn.addEventListener("click", () => {
  const menu = document.getElementById("settingsMenu");
  if (!menu) return;
                                              menu.style.display = (menu.style.display === "block") ? "none" : "block";
});

if (typeof module !== "undefined" && module.exports) {
  module.exports = { fetchJsonParallel };
}
