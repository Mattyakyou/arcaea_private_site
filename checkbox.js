const dlcList = document.querySelector("div.checkbox");

for (let i = 1; i <= 13; i++) {
    dlcList.insertAdjacentHTML(
        "beforeend",
        `<div>
            <input type="checkbox" id="DLC${i}" name="DLC${i}" checked>
            <label for="DLC${i}">DLC${i}</label>
        </div>`
    );
}

document.querySelector(".all_on").onclick = () => {
    document.querySelectorAll('input[type="checkbox"]').forEach(box => {
        box.checked = true;
    });
};

document.querySelector(".all_off").onclick = () => {
    document.querySelectorAll('input[type="checkbox"]').forEach(box => {
        box.checked = false;
    });
};