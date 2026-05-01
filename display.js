function setupSort() {
    const tableEl = document.querySelector(".table1");
    const headers = tableEl.querySelectorAll("th");

    let lastCol = null;
    let asc = false;

    headers.forEach((th, colIndex) => {
        th.addEventListener("click", () => {
            const tbody = tableEl.querySelector("tbody");
            const rows = Array.from(tbody.querySelectorAll("tr"));

            if (lastCol === colIndex) {
                asc = !asc;
            } else {
                asc = false;
            }

            lastCol = colIndex;

            rows.sort((a, b) => {
                let A = a.children[colIndex].innerText.trim();
                let B = b.children[colIndex].innerText.trim();

                if (A.includes("～")) A = A.split("～")[1];
                if (B.includes("～")) B = B.split("～")[1];

                const sideOrder = ["Lephon", "Achromic", "Conflict", "Light"];

                if (headers[colIndex].classList.contains("side")) {
                    return asc
                        ? sideOrder.indexOf(A) - sideOrder.indexOf(B)
                        : sideOrder.indexOf(B) - sideOrder.indexOf(A);
                }

                if (headers[colIndex].classList.contains("level")) {

                    const levelValue = (str) => {
                        if (str.endsWith("+")) {
                            return Number(str.slice(0, -1)) + 0.5;
                        }
                        return Number(str);
                    };

                    return asc
                        ? levelValue(A) - levelValue(B)
                        : levelValue(B) - levelValue(A);
                }

                const numA = Number(A);
                const numB = Number(B);

                if (!isNaN(numA) && !isNaN(numB)) {
                    return asc ? numA - numB : numB - numA;
                }

                return asc
                    ? A.localeCompare(B, "ja")
                    : B.localeCompare(A, "ja");
            });

            tbody.innerHTML = "";
            rows.forEach(row => tbody.appendChild(row));
        });
    });
}

const tbody = document.querySelector("tbody");

async function data() {
    const json = await fetch("https://mattyakyou.github.io/ArcaeaData/data.json");
    return await json.json();
};

function getConst(row, key) {
    return row.data?.[key]?.const;
}

function formatConst(val) {
    if (val === undefined || val === null) return "";
    return Number(val).toFixed(1);
}

function time_fix(val) {
    if (val >= 60) {
        if (val - Math.trunc(val / 60) * 60 < 10) {
            return Math.trunc(val / 60) + ":0" + (val - Math.trunc(val / 60) * 60);
        } else {
            return Math.trunc(val / 60) + ":" + (val - Math.trunc(val / 60) * 60);
        }
    } else {
        return "0:" + val;
    }
}

function translate_side(side) {
    let en_side = ["Light", "Conflict", "Colorless"]
}

const row_data = data();

let currentMode = "All";

function switchTab(index) {
    const tabs = document.querySelectorAll(".tab");
    const modes = ["All", "Past", "Present", "Future", "Eternal", "Beyond"];

    tabs.forEach(tab => tab.classList.remove("active"));
    tabs[index].classList.add("active");

    currentMode = modes[index];

    renderTable();
}

async function renderTable() {
    const thead = document.querySelector("thead");
    const tbody = document.querySelector("tbody");

    tbody.innerHTML = "";

    //thead
    if (currentMode === "All") {
        thead.innerHTML = `
        <tr>
            <th>曲名</th>
            <th class="composer">作曲</th>
            <th class="diff">Past</th>
            <th class="diff">Present</th>
            <th class="diff">Future</th>
            <th class="diff">Eternal</th>
            <th class="diff">Beyond</th>
            <th class="bpm">BPM</th>
            <th class="length">Length</th>
        </tr>
    `;
    } else {
        thead.innerHTML = `
        <tr>
            <th class="pack">パック</th>
            <th class="title">曲名</th>
            <th class="composer">作曲</th>
            <th class="chart">chart</th>
            <th class="level">レベル</th>
            <th class="diff">定数</th>
            <th class="diff">ノーツ数</th>
            <th class="version">バージョン</th>
            <th class="diff">リリース日</th>
            <th class="side">side</th>
            <th class="bpm">BPM</th>
            <th class="length">Length</th>
        </tr>
    `;
    }

    const a = await row_data;

    //tbody
    a.forEach(row => {
        let html = "";
        const bpmMin = row.meta["bpm_min"];
        const bpmMax = row.meta["bpm_max"];
        const bpmText = bpmMin === bpmMax
            ? bpmMin
            : `${bpmMin}～${bpmMax}`;

        if (currentMode === "All") {
            html = `
                <tr>
                    <td>${row.meta.title}</td>
                    <td>${row.meta.composer}</td>
                    <td>${formatConst(getConst(row, "Past"))}</td>
                    <td>${formatConst(getConst(row, "Present"))}</td>
                    <td>${formatConst(getConst(row, "Future"))}</td>
                    <td>${formatConst(getConst(row, "Eternal"))}</td>
                    <td>${formatConst(getConst(row, "Beyond"))}</td>
                    <td>${bpmText}</td>
                    <td>${time_fix(row.meta.length)}</td>
                </tr>
                `;
        } else {
            const diffData = row.data[currentMode];
            if (!diffData) return;
            html = `
                <tr>
                    <td>${row.meta.pack}</td>
                    <td>${row.meta.title}</td>
                    <td>${row.meta.composer}</td>
                    <td>${row.data[currentMode].chart}</td>
                    <td>${row.data[currentMode].level}</td>
                    <td>${formatConst(getConst(row, currentMode))}</td>
                    <td>${row.data[currentMode].notes}</td>
                    <td>${row.meta.update_version}</td>
                    <td>${row.meta.release}</td>
                    <td>${row.meta.side}</td>
                    <td>${bpmText}</td>
                    <td>${time_fix(row.meta.length)}</td>
                </tr>
                `;
        }

        tbody.insertAdjacentHTML("beforeend", html);
    });
    setupSort();
}

renderTable();