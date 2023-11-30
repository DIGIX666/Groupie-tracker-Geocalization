const matchList = document.getElementById('match-list');
const search = document.getElementById('myInput')
const searchNames = async (searchText) => {
  const res = await fetch("/data/data.json");
  const data = await res.json();
  console.log(data);
  data.forEach((element) => {
    element.creationDate = element.creationDate.toString();
  });
  // Get matches to current text input

  // Partie à modifier pour changer l'ordre de print par rapport aux membres et group
  let matches = data.filter((name) => {
    const regex = new RegExp(`${searchText}`, "gi");
    let members = "";
    let loca = "";
    if (search.value.length > 1) {
      for (let i = 0; i <= name.members.length - 1; i++) {
        members = name.members[i];
        if (members.match(regex)) {
          return members;
        }
      }
      for (let o = 0; o <= name.locations.length - 1; o++) {
        let newstrings = "";
        newstrings = name.locations[o].replaceAll("_", " ");
        loca = newstrings;
        if (loca.match(regex)) {
          return loca;
        }
      }
    }
    
   
    return (
      name.name.match(regex) ||
      name.firstAlbum.match(regex) ||
      name.creationDate.match(regex)
    );
  });
  // Fin de la partie 


  console.log(matches)
  outputHtml(matches);
};

// Show Results in HTML

const outputHtml = (matches) => {
  if (matches.length >= 0) {
    const html = matches
      .map((match) => {
        let box = "";
        let boxloc = "";
        let news = "";
       for (let b = 0; b < match.members.length; b++) {
          box += `<li style="color: balck;">${match.members[b]}</li>`;
        }
        for (let c = 0; c < match.locations.length; c++) {
          news = match.locations[c].replaceAll("_", " ");
          finalstring = news.replaceAll("-", " ");
          boxloc += `<li style="color: black;">${finalstring}</li>`;
        }
        return `
            <div id="search-list-box" class="result result-body">
            <div class="search-list-left">
            <img id="search-list-image" src="${match.image}"/>
            </div>
            <div class="search-list-right">
            <h3>${match.name} ${match.creationDate}  </h4>
            <h5>Premier Album: ${match.firstAlbum}</h5>
            <br>
            <h4 style="color: black;"> MEMBERS:${box} </h3>
            <br>
            <h4 style="color: black;"> LOCATIONS:${boxloc} </h3>
            </div>
            </div>
        `;
      })
      .join('');

    matchList.innerHTML = html;
  }
};

search.addEventListener('input', () => searchNames(search.value));












// const artitsList = document.getElementById("artistsList");
// const searchBar = document.getElementById("searchBar");
// let hpArtists = [];

// searchBar.addEventListener("keyup", (e) => {
//   const searchString = e.target.value.toLowerCase();

//   const filteredArtists = hpArtists.filter((artist) => {
//     return (
//       artist.name.toLowerCase().includes(searchString)
//       // || artist.house.toLowerCase().includes(searchString)
//     );
//   });
//   displayArtists(filteredArtists);
// });

// const loadArtists = async () => {
//   try {
//     const res = await fetch(
//       "https://groupietrackers.herokuapp.com/api/artists");
//     hpArtists = await res.json();
//     displayArtists(hpArtists);
//   } catch (err) {
//     console.error(err);
//   }
// };

// const displayArtists = (artists) => {
//   const htmlString = artists
//     .map((artist) => {
//       return `
//             <li class="artist">
//                 <h2>${artist.name}</h2>
//                 <p>House: ${artist.house}</p>
//                 <img src="${artist.image}"></img>
//             </li>
//         `;
//     })
//     .join("");
//   artistsList.innerHTML = htmlString;
// };

// loadArtists();
