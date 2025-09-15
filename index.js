const ICONS = [
    "deskcalendar-138014.medium", "hexpot-48161.large", "joyfulbundle-22281.medium", 
];

const SYMBOL_MAP = {
    1: "deskcalendar-138014.medium",
    2: "hexpot-48161.large", 
    3: "joyfulbundle-22281.medium",
};


/**
 * @type {number} The minimum spin time in seconds
 */
const BASE_SPINNING_DURATION = 2.7;

/**
 * @type {number} The additional duration to the base duration for each row (in seconds).
 * It makes the typical effect that the first reel ends, then the second, and so on...
 */
const COLUMN_SPINNING_DURATION = 0.3;


var cols;


window.addEventListener('DOMContentLoaded', function(event) {
    cols = document.querySelectorAll('.col');

    setInitialItems();
});

function setInitialItems() {
    let baseItemAmount = 40;

    for (let i = 0; i < cols.length; ++i) {
        let col = cols[i];
        let amountOfItems = baseItemAmount + (i * 3); // Increment the amount for each column
        let elms = '';
        let firstThreeElms = '';

        for (let x = 0; x < amountOfItems; x++) {
            let icon = getRandomIcon();
            let item = '<div class="icon" data-item="' + icon + '"><img src="' + icon + '.jpg"></div>';
            elms += item;

            if (x < 3) firstThreeElms += item; // Backup the first three items because the last three must be the same
        }
        col.innerHTML = elms + firstThreeElms;
    }
}

/**
 * Called when the start-button is pressed.
 *
 * @param elem The button itself
 */
async function spin(elem) {
   

      const data = ''

  let wh_col = 1;  
  let duration = BASE_SPINNING_DURATION + randomDuration(wh_col);
    
    for (let col of cols) {
        duration += COLUMN_SPINNING_DURATION + randomDuration(wh_col);
        col.style.animationDuration = duration + "s";
        wh_col+=1
    }

    elem.setAttribute('disabled', true);

    document.getElementById('container').classList.add('spinning');

    window.setTimeout(setResult(data), BASE_SPINNING_DURATION * 1000 / 2);

    window.setTimeout(function () {
        document.getElementById('container').classList.remove('spinning');
        elem.removeAttribute('disabled');
    }.bind(elem), duration * 1000);
}

function setResult(dtt) {
  let ccs = 0;
    for (let col of cols) {
        
        let results = [
            getRandomIcon(),
            getRandomIcon(),
            getRandomIcon()
        ];
        ccs+=1
        let icons = col.querySelectorAll('.icon img');
        // replace the first and last three items of each column with the generated items
        for (let x = 0; x < 3; x++) {
            icons[x].setAttribute('src',  results[x] + '.jpg');
            icons[(icons.length - 3) + x].setAttribute('src',  results[x] + '.jpg');
        }
    }
}
const btt = document.getElementById("asda");
btt.addEventListener("click", (e) => {
  spin(btt);
})
function getRandomIcon() {
    return ICONS[Math.floor(Math.random() * ICONS.length)];
}

/**
 * @returns {number} 0.00 to 0.09 inclusive
 */
function randomDuration(wh_coll) {
    return (wh_coll-1) * 0.9
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


