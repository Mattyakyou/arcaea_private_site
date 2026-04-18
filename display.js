const table = document.querySelector("tbody");

async function data() {
    const json = await fetch("https://mattyakyou.github.io/ArcaeaData/data.json");
    return await json.json();
};

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
                <td>${row.meta.chapter}</td>
                <td>${row.meta.title}</td>
                <td>${row.data.E}</td>
                <td>${row.data.N}</td>
                <td>${row.data.H}</td>
                <td>${row.data.L}</td>
                <td>${bpmText}</td>
            </tr>`
        );
    });
});

