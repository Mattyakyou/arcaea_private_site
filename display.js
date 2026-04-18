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

        const past = row.data?.Past?.const ?? "";
        const present = row.data?.Present?.const ?? "";
        const future = row.data?.Future?.const ?? "";
        const eternal = row.data?.Eternal?.const ?? "";
        const beyond = row.data?.Beyond?.const ?? "";

        table.insertAdjacentHTML(
            "beforeend",
            `<tr>
                <td>${row.meta.title}</td>
                <td>${past}</td>
                <td>${present}</td>
                <td>${future}</td>
                <td>${eternal}</td>
                <td>${beyond}</td>
                <td>${bpmText}</td>
            </tr>`
        );
    });
});