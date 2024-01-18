async function searchCountry() {
    const findCountryInput = document.getElementById('find-country')
    const country = findCountryInput.value

    if (!country) {
        alert('Tolong Masukkan Negara Yang Diinginkan.')
        return;
    }

    const url = 'https://covid-193.p.rapidapi.com/statistics?country=' + country
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '',
            'X-RapidAPI-Host': 'covid-193.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options)
        const data = await response.json()

        if (response.ok && data.response && data.response.length > 0) {
            const statistics = data.response[0]

            console.log('data statistic: ', data)

            updateCard('Active-Cases', statistics.cases.active || 0)
            updateCard('New-Cases', statistics.cases.new || 0)
            updateCard('Recovered-Cases', statistics.cases.recovered || 0)
            updateCard('Total-Cases', statistics.cases.total || 0)
            updateCard('Total-Death', statistics.deaths.total || 0)
            updateCard('Total-Test', statistics.tests.total || 0)

            alert(`Data negara ${country} berhasil ditemukan`)
        } else {
            alert('Data tidak ditemukan. Mohon coba lagi.')
        }
    } catch (error) {
        alert(error)
    }
}

function updateCard(cardTitle, value) {
    const cardElement = document.querySelector(`[data-title="${cardTitle}"]`)

    if (cardElement) {
        const cardTextElement = cardElement.querySelector('[data-stat]')
        if (cardTextElement) {
            cardTextElement.textContent = `Total: ${value}`
        }
    }
}