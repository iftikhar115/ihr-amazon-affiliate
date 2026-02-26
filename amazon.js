let totalclicks = [];
// clicks data array
let clickCounts = {
    airpad1: 0,
    airpad2: 0,
    airpad3: 0,
    phone1: 0,
    phone2: 0,
    phone3: 0,
    phone4:0,
    cover1: 0,
    cover2: 0,
    cover3: 0
};

// saving data
let saveddata = localStorage.getItem('myclicks');
if(saveddata) {
    totalclicks = JSON.parse(saveddata)
}

// saved clicks
let savedClicks = localStorage.getItem('clickCounts')
if(savedClicks) {
    clickCounts = JSON.parse(savedClicks)
}

// PEHLE FUNCTION DEFINE KARO
function addClickCounters() {
    const products = [
        { id: 'airpad1', name: 'Airpad 1' },
        { id: 'airpad2', name: 'Airpad 2' },
        { id: 'airpad3', name: 'Airpad 3' },
        { id: 'phone1', name: 'Phone 1' },
        { id: 'phone2', name: 'Phone 2' },
        { id: 'phone3', name: 'Phone 3' },
        {id : 'phone4', name: 'phone 4'},
        { id: 'cover1', name: 'Cover 1' },
        { id: 'cover2', name: 'Cover 2' },
        { id: 'cover3', name: 'Cover 3' }
    ];
    
    products.forEach(product => {
        const button = document.getElementById(product.id)
        if(button) {
            let counterDiv = button.parentElement.querySelector('.click-counter');
            if(!counterDiv) {
                counterDiv = document.createElement('div');
                counterDiv.className = 'click-counter';
                counterDiv.id = 'counter-' + product.id;
                counterDiv.innerHTML = '<span id="click-number-' + product.id + '">0</span> clicks';
                button.parentElement.appendChild(counterDiv)
            }
        }
    });
}

function updateCount(productId) {
    let countspan = document.getElementById('click-number-' + productId);
    if(countspan) {
        countspan.textContent = clickCounts[productId]
    }
}

function updateAllCounts() {
    for(let productId in clickCounts) {
        updateCount(productId)
    }
}

// dom content - FUNCTION CALL KARO
document.addEventListener('DOMContentLoaded', function() {
    const amazonairpad1 = document.getElementById('airpad1')
    const amazonairpad2 = document.getElementById('airpad2')
    const amazonairpad3 = document.getElementById('airpad3');
    const amazonphone1 = document.getElementById('phone1');
    const amazonphone2 = document.getElementById('phone2')
    const amazonphone3 = document.getElementById('phone3');
    const amazonphone4 = document.getElementById('phone4');
    const amazoncover1 = document.getElementById('cover1')
    const amazoncover2 = document.getElementById('cover2')
    const amazoncover3 = document.getElementById('cover3');
    
    // FUNCTION CALL KARO
    addClickCounters();
    updateAllCounts();

    function trackClicks(productId, productName) {
        totalclicks.push({
            product: productName,
            time: new Date().toString(),
            page: window.location.href
        })
        clickCounts[productId]++;
        localStorage.setItem('myclicks', JSON.stringify(totalclicks));
        localStorage.setItem('clickCounts', JSON.stringify(clickCounts))
        updateCount(productId)
        console.log(productName + ' clicked !totalclicks ' + totalclicks.length)
        console.log(productName + ' click count ' + clickCounts[productId])
    }

    if(amazonairpad1) {
        amazonairpad1.addEventListener('click', function() {
            trackClicks('airpad1', 'Airpad 1');
            window.location.href = "https://amzn.to/4tSffgI"
        });
    }
    if(amazonairpad2) {
        amazonairpad2.addEventListener('click', function() {
            trackClicks('airpad2','Airpad 2');
            window.location.href = "https://amzn.to/4aYJDyp"
        })
    };
    if(amazonairpad3) {
        amazonairpad3.addEventListener('click', function() {
            trackClicks('airpad3','Airpad 3');
            window.location.href = "https://amzn.to/3OSUVLU"
        })
    };
    if(amazonphone1) {
        amazonphone1.addEventListener('click', function() {
            trackClicks('phone1','phone 1');
            window.location.href = "https://amzn.to/4sodXsn"
        })
    };
    if(amazonphone2) {
        amazonphone2.addEventListener('click', function() {
            trackClicks('phone2','phone 2');
            window.location.href = "https://amzn.to/4kLcg5q"
        })
    };
    if(amazonphone3) {
        amazonphone3.addEventListener('click', function()  {
            trackClicks('phone3','phone 3');
            window.location.href = "https://amzn.to/40mIFpz"
        })
    };
    if(amazonphone4) {
        amazonphone4.addEventListener('click', function() {
            window.location.href= "https://amzn.to/4s9YVpE";
        })
    }
    if(amazoncover1) {
        amazoncover1.addEventListener('click', function() {
            trackClicks('cover1','cover 1');
            window.location.href = "https://amzn.to/4758uhA"
        })
    };
    if(amazoncover2) {
        amazoncover2.addEventListener('click', function() {
            trackClicks('cover2','cover 2');
            window.location.href = "https://amzn.to/4kOr1nZ"
        })
    };
    if(amazoncover3) {
        amazoncover3.addEventListener('click', function() {
            trackClicks('cover3','cover 3');
            window.location.href = "https://amzn.to/4awSabG"
        })
    }
});

function showData() {
    console.log('total clicks: ' + totalclicks.length)
    console.log('total data:', totalclicks)
    console.log('click counts by product:', clickCounts)
    return {totalclicks, clickCounts};
}

function exportData() {
    const datastr = JSON.stringify({totalclicks, clickCounts} , null, 2)
    const blob = new Blob([datastr], {type: 'application/json'})
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url;
    a.download = 'my-clicks.json';
    a.click();
};

function resetcounts() {
    if(confirm("Clear all counts?")) {
        totalclicks = [];
        for(let id in clickCounts) {
            clickCounts[id] = 0;
        }
        localStorage.setItem('myclicks' , JSON.stringify(totalclicks))
        localStorage.setItem('clickCounts' , JSON.stringify(clickCounts))
        location.reload();
    }
}
// YAHAN KOI EXTRA CURLY BRACKET NAHI HONA CHAHIYE