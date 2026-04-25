const table = document.querySelector("tbody");

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

var a = data();

a.then((jsonData) => {
    jsonData.forEach(row => {

        const bpmMin = row.meta["bpm_min"];
        const bpmMax = row.meta["bpm_max"];

        const bpmText = bpmMin === bpmMax
            ? bpmMin
            : `${bpmMin}～${bpmMax}`;

        table.insertAdjacentHTML(
            "beforeend",
            `<tr>
                <td>${row.meta.title}</td>
                <td>${formatConst(getConst(row, "Past"))}</td>
                <td>${formatConst(getConst(row, "Present"))}</td>
                <td>${formatConst(getConst(row, "Future"))}</td>
                <td>${formatConst(getConst(row, "Eternal"))}</td>
                <td>${formatConst(getConst(row, "Beyond"))}</td>
                <td>${bpmText}</td>
            </tr>`
        );
    });
});