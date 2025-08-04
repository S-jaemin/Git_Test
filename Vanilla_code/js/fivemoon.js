const applicationId ='ef2042a0-de69-49e0-8286-14266ebd4ea3'
const applicationSecret = '39a727bf4d3a408fa9dbfb0ecfe394213e919f1a0a0e4d6676c80cdca279d12cb59e0347d4dd93ad020ff9864aa3949c7595a4b842a09e5e741b606e8b5b290feaf4d383d0f2f6190f8bbc01b19e88089f5d3394e87a57a3e205ec4741483f152a3b1fece75a397d5c8fc03b6598d3cd'
const authString = btoa(`${applicationId}:${applicationSecret}`);

function geotrue(position){
    const lat = position.coords.latitude;
    const long = position.coords.longitude;
    const date = new Date().toISOString().split("T")[0]

    const payload = {
        format: "png",
        style: {
            moonStyle: "default",
            backgroundStyle: "solid",
            backgroundColor: "#f2f2f3",
            headingColor: "black",
            textColor: "black"
        },
        observer: {
            latitude: lat,
            longitude: long,
            date: date
        },
        view: {
            type: "portrait-simple",
            orientation: "south-up"
        }
    };

    fetch("https://api.astronomyapi.com/api/v2/studio/moon-phase", {
        method: "POST",
        headers: {
            "Authorization": `Basic ${authString}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })
    .then(response => response.json())
    .then(data => {
        const moonpic = document.querySelector("#picture");
        moonpic.innerHTML = `
            <img src="${data.data.imageUrl}" style="max-width: 180px;">
        `;
    })
    .catch(err => {
        console.error(err);
        alert("uploading data failed.");
    });
}

function geofalse() {
    alert("we don't know you're position.");
}

navigator.geolocation.getCurrentPosition(geotrue, geofalse);

/*
    fetch(`https://api.astronomyapi.com/api/v2/moon-phase?latitude=${lat}&longitude=${lon}&date=${date}`, {
        method: "GET",
        headers: {
            "Authorization": `Basic ${authString}`
        }
    })
    .then(res => res.json())
    .then(data => {
        const phase = data.data.phase.name;
        const moontext = document.querySelector("#text")
        moontext.innerText = `${phase}`;
    })
    .catch(err => {
        console.error(err);
        text.innerText = "Data loading failed.";
    });

function geofalse() {
    alert("We cannot use position.");
}

navigator.geolocation.getCurrentPosition(geotrue, geofalse);
*/