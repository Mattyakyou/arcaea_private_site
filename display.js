const table = document.querySelector("tbody");

async function data() {
    const json = await fetch("https://mattyakyou.github.io/ArcaeaData/data.json");
    return await json.json();
};

function getConst(row, key) {
    return row.data?.[key]?.const ?? "";
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
                <td>${getConst(row, "Past")}</td>
                <td>${getConst(row, "Present")}</td>
                <td>${getConst(row, "Future")}</td>
                <td>${getConst(row, "Eternal")}</td>
                <td>${getConst(row, "Beyond")}</td>
                <td>${bpmText}</td>
            </tr>`
        );
    });
});