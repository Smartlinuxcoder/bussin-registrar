document.addEventListener("DOMContentLoaded", function() {
    let tlds = [];
    const inputField = document.getElementById("doavIn");
    const checkButton = document.getElementById("doavCheck");
    const resultDiv = document.getElementById("result");
    fetch('https://corsproxy.io/?https://api.buss.lol/tlds')
        .then(response => response.json())
        .then(data => {
            tlds = data;
        })
        .catch(error => {
            console.error('Error fetching TLDs:', error);
        });

    checkButton.addEventListener("click", function(event) {
        event.preventDefault();
        checkButton.classList.add('is-loading');
        resultDiv.innerHTML = '';
        const inputValue = inputField.value;
        const [name, tld] = splitDomain(inputValue);
        checkAvailability(name, tld);
    });

    function splitDomain(domain) {
        for (let tld of tlds) {
            if (domain.endsWith(tld)) {
                const name = domain.slice(0, domain.length - tld.length).replace(/\./g, '');
                return [name, tld];
            }
        }
        return [domain.replace(/\./g, ''), tlds[0]]; // Default to the first TLD if none is specified
    }

    function checkAvailability(name, tld) {

        if (name && tld) {
            const url = `https://corsproxy.io/?https://api.buss.lol/domain/${name}/${tld}`;
            fetch(url)
                .then(response => {
                    if (response.ok) {
                        displayResult(false, `${name}.${tld}`);
                    } else {
                        throw new Error('Domain unavailable');
                    }
                })
                .catch(error => {
                    console.error('Error checking domain availability:', error);
                    displayResult(true, `${name}.${tld}`);
                })
                .finally(() => {
                    displayAlternativeTLDs(name);
                });
        }
    }

    function displayResult(isAvailable, domain) {
        const article = document.createElement('article');
        article.classList.add('message');
        article.classList.add(isAvailable ? 'is-primary' : 'is-danger');
        article.style.maxWidth = '300px';
        const header = document.createElement('div');
        header.classList.add('message-header');
        header.innerHTML = `<p>${domain}</p>`;

        const body = document.createElement('div');
        body.classList.add('message-body');
        body.innerText = `${domain} ${isAvailable ? 'is available!' : 'is unavailable'}`;

        article.appendChild(header);
        article.appendChild(body);

        resultDiv.appendChild(article);
    }

    function displayAlternativeTLDs(name) {
        tlds.forEach(tld => {
            const url = `https://corsproxy.io/?https://api.buss.lol/domain/${name}/${tld}`;
            fetch(url)
                .then(response => {
                    if (!response.ok) {
                        const domain = `${name}.${tld}`;
                        displayResult(true, domain);
                    } else {
                        const domain = `${name}.${tld}`;
                        displayResult(false, domain);
                    }
                })
                .catch(error => {
                    console.error('Error checking alternative domain availability:', error);
                });
        });

        checkButton.classList.remove('is-loading');
    }
});
