# Kellokortti

## Käynnistys ohjeet

Käynnistääksesi sovelluksen paikallisesti, seuraa näitä ohjeita:

1. Git repositorion kloonaaminen

    - Avaa CMD/Terminaali
    - Syötä komento ```git clone https://github.com/SanteriMertakorpi/Vork_ennakko.git```
    - Repositorio löytyy navigoimalla kansioon "Vork_ennakko".
    - Sovelluksen käynnistämistä varten, terminaalissa tulee avata polku "Vork_ennakko/backend ```cd Vork_ennakko/backend```.

2. Riippuvuuksien asentaminen

    Asenna riippuvuudet komennolla ```npm install```. HUOM! riippuvuuksien asentaminen tulee tapahtua
    ```/backend``` kansiossa.

3. Sovelluksen käynnistäminen

    Käynnistä sovellus komennolla ```node server.js```. HUOM! sovelluksen käynnistäminen tulee tapahtua
    ```/backend``` kansiossa.

## Sovelluksen toiminta

Sovellus avautuu työaikasivulle, jossa käyttäjälle näkyy kalenteri, joka ilmoittaa kyseisen kuukauden, viikon ja päivän. Tällä sivulla, käyttäjällä on mahdollisuus käynnistää kellokortti painamalla "Aloita työpäivä" nappia.

Kun työaika aloitetaan, työaikakello käynnistyy ja kulunut työaika näkyy käyttäjälle reaaliajassa. Työajan aloittamishetkestä otetaan myös aikaleima ylös. Työajan käynnistettyään, käyttäjän on mahdollista kirjautua työmaalle, tauottaa työaika, sekä lopettaa työaika.

Työajan lopetettuaan, käyttäjälle avautuu sivu, jossa hän voi tarkistaa ja muokata työpäivän tietoja, kuten aloitus- ja lopetusajat, tauon aloitus ja lopetus, ylityötuntien määrä (h ja min), matkustusaika, sekä valita tuleeko käyttäjälle maksaa kokopäiväraha, osapäiväraha, ateriakorvaus tai oliko käyttäjä sairaana. Käyttäjä voi hyväksyä tai peruuttaa tietojen tallennuksen.

Hyväksyttyään työpäivän tiedot, avautuu käyttäjälle vielä yhteenveto sivu tiedoista ja nämä tiedot lähetetään sovelluksen backendiin ja tallennetaan "tietokantaan", joka sovelluksen demoluonteisuuden vuoksi on yksittäinen JSON tiedosto backend kansiossa. Peruuttaessaan tietojen tallennuksen, käyttäjälle avautuu uudestaan työaikasivu.

Käyttäjä voi myös tarkastella kuukausittaista yhteenvetoa "Koonti"-sivulta. Koonti sivulla käyttäjälle esitetään taulukko, jossa ylimmällä rivillä on yhteenveto koko kuukauden työtunneista, matkustusajoista, ylitöistä, päivärahoista ja sairauspäivistä. Alemmilla riveillä on jokisen tallennetun työpäivän yksittäiset tiedot.

## Missä onnistuin parhaiten?

Parhaiten koin onnistuneeni yhteenveto sivun kanssa. Suuren datamäärän näyttäminen mahdollisimman selkeästi ja käyttäjäystävällisesti mobiililaitteella oli haaste, mutta koin siinä onnistuneeni hyvin.

Myös yhteenveto sivuun tarvittava datan formatointi ja hakeminen backendissä onnistui mielestäni erittäin hyvin.
