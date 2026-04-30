function setupSort() {
    const tableEl = document.querySelector(".table1");
    const headers = tableEl.querySelectorAll("th");

    let lastCol = null;     // 最後に押した列
    let asc = false;        // 現在の順序（false = 降順スタート）

    headers.forEach((th, colIndex) => {
        th.addEventListener("click", () => {
            const tbody = tableEl.querySelector("tbody");
            const rows = Array.from(tbody.querySelectorAll("tr"));

            // 同じ列かどうか判定
            if (lastCol === colIndex) {
                asc = !asc; // 同じ列なら反転
            } else {
                asc = false; // 別列なら必ず降順スタート
            }

            lastCol = colIndex;

            rows.sort((a, b) => {
                let A = a.children[colIndex].innerText.trim();
                let B = b.children[colIndex].innerText.trim();

                if (A.includes("～")) A = A.split("～")[1];
                if (B.includes("～")) B = B.split("～")[1];

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
        return Math.trunc(val / 60) + ":" + (val - Math.trunc(val / 60));
    } else {
        return "0:" + val;
    }
}

var a = data();

a.then((jsonData) => {
    jsonData.forEach(row => {

        const bpmMin = row.meta["bpm_min"];
        const bpmMax = row.meta["bpm_max"];

        const bpmText = bpmMin === bpmMax
            ? bpmMin
            : `${bpmMin}～${bpmMax}`;

        tbody.insertAdjacentHTML(
            "beforeend",
            `<tr>
                <td>${row.meta.title}</td>
                <td>${row.meta.composer}</td>
                <td>${formatConst(getConst(row, "Past"))}</td>
                <td>${formatConst(getConst(row, "Present"))}</td>
                <td>${formatConst(getConst(row, "Future"))}</td>
                <td>${formatConst(getConst(row, "Eternal"))}</td>
                <td>${formatConst(getConst(row, "Beyond"))}</td>
                <td>${bpmText}</td>
                <td>${time_fix(row.meta.length)}</td>
            </tr>`
        );
    });

    setupSort();
});