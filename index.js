const axios = require('axios')
const cheerio = require('cheerio')
const fs = require('fs')

console.log("hi")
const url = 'https://www.dpi.nsw.gov.au/fishing/fish-species'

axios.get(url)
    .then(response => {
        const html = response.data
        const $ = cheerio.load(html)
        console.log("trying to get images")
        const images = $('td[headers="table40698r1c1"]').find('img');
        console.log("trying to get water type")
        const water = $('td[headers="table40698r1c3"]')

        console.log(water[0])
        
        let species = []
        
        for (let i = 0; i < images.length; i++) {
            let currentSpecies = {}
            currentSpecies.img_th = images[i].attribs.src
            currentSpecies.name = images[i].attribs.alt
            currentSpecies.water_type = water[i].children[0].data

            species.push(currentSpecies)
        }

        fs.writeFile('test.txt', JSON.stringify(species), (err) => {
            if (err) throw err;
            console.log('The file has been saved!');
          });
    })
    .catch(error => {
        console.log(error)
    })
