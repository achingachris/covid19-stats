//Decalring the Different Variable and Objects
let new_cases = document.getElementById('new_case')
let new_death = document.getElementById('new_death')
let total_death = document.getElementById('total_death')
let total_recovered = document.getElementById('total_recovered')
let total_cases = document.getElementById('total_cases')
let table = document.getElementById('countries_stat')

//  fetching data starts here ...
fetch('https://coronavirus-monitor.p.rapidapi.com/coronavirus/worldstat.php', {
  method: 'GET',
  headers: {
    'x-rapidapi-host': 'coronavirus-monitor.p.rapidapi.com',
    'x-rapidapi-key': 'ba61444e23msh2308b97d6e9dcbap10dd42jsne2697e354bcb',
  },
})
  .then((response) =>
    response.json().then((data) => {
      // console.log(data);
      total_cases.innerHTML = data.total_cases
      new_cases.innerHTML = data.new_cases
      new_death.innerHTML = data.new_deaths
      total_death.innerHTML = data.total_deaths
      total_recovered.innerHTML = data.total_recovered
    })
  )
  .catch((err) => {
    console.log(err)
  })

//Fetching The Case by Country Data
fetch(
  'https://coronavirus-monitor.p.rapidapi.com/coronavirus/cases_by_country.php',
  {
    method: 'GET',
    headers: {
      'x-rapidapi-host': 'coronavirus-monitor.p.rapidapi.com',
      'x-rapidapi-key': 'ba61444e23msh2308b97d6e9dcbap10dd42jsne2697e354bcb',
    },
  }
)
  .then((response) =>
    response.json().then((data) => {
      // console.log(data)
      let countries_stat = data.countries_stat
      //Getting all the country statistic using a loop
      for (let i = 0; i < countries_stat.length; i++) {
        // console.log(countries_stat[i]);
        //we will start by inserting the new rows inside our table
        let row = table.insertRow(i + 1)
        let country_name = row.insertCell(0)
        let cases = row.insertCell(1)
        let deaths = row.insertCell(2)
        let serious_critical = row.insertCell(3)
        let recovered_per_country = row.insertCell(4)
        country_name.innerHTML = countries_stat[i].country_name
        cases.innerHTML = countries_stat[i].cases
        deaths.innerHTML = countries_stat[i].deaths
        serious_critical.innerHTML = countries_stat[i].serious_critical
        recovered_per_country.innerHTML = countries_stat[i].total_recovered
      }
    })
  )
  .catch((err) => {
    console.error(err)
  })
// fetching data ends here ..

const filterTable = () => {
  let i, txtValue
  const input = document.getElementById('myInput')
  const filter = input.value.toUpperCase()
  const table = document.getElementById('countries_stat')
  const tr = table.getElementsByTagName('tr')

  for (i = 0; i < tr.length; i++) {
    let td = tr[i].getElementsByTagName('td')[0]
    if (td) {
      txtValue = td.textContent || td.innerText
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = ''
      } else {
        tr[i].style.display = 'none'
      }
    }
  }
}

// testing fetch new api
fetch('https://api.covid19api.com/summary')
  .then((response) =>
    response.json().then((data) => {
      console.log(data)
    })
  )
  .catch((err) => {
    console.log(err)
  })
