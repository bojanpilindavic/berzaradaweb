import React from "react";
import { ScrollView, Text, StyleSheet } from "react-native";

const TermsOfService = () => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>Uslovi korišćenja</Text>

      <Text style={styles.text}>Poslednje ažuriranje: 25.03.2026.</Text>

      <Text style={styles.subtitle}>1. Uvod</Text>
      <Text style={styles.text}>
        Dobrodošli u aplikaciju “Berza rada”. Korišćenjem aplikacije potvrđujete
        da ste pročitali, razumjeli i prihvatili ove Uslove korišćenja. Ako se
        ne slažete sa uslovima, molimo vas da ne koristite aplikaciju.
      </Text>

      <Text style={styles.subtitle}>2. Ko upravlja aplikacijom</Text>
      <Text style={styles.text}>
        Aplikacija je razvijena i koristi se u okviru aktivnosti Lokalnog
        partnerstva za zapošljavanje (LPZ) Istočno Sarajevo i projekta “Podrška
        Evropske unije lokalnim partnerstvima za zapošljavanje – Faza II (LEP
        II)”. Organizacija koja upravlja aplikacijom: Gradska razvojna agencija
        – RAIS (Istočno Sarajevo).
      </Text>

      <Text style={styles.subtitle}>3. Svrha aplikacije</Text>
      <Text style={styles.text}>
        Aplikacija služi za povezivanje poslodavaca i osoba koje traže posao
        (pregled i objavu oglasa, prijave na oglase, komunikaciju i razmjenu
        dokumenata poput CV-a). Zabranjeno je korišćenje aplikacije u druge
        svrhe, uključujući spam, prevare, zloupotrebu podataka ili bilo kakve
        nezakonite aktivnosti.
      </Text>

      <Text style={styles.subtitle}>4. Registracija i korisnički nalozi</Text>
      <Text style={styles.text}>
        Prilikom registracije obavezni ste da unesete tačne i potpune podatke.
        Odgovorni ste za aktivnosti koje se obavljaju preko vašeg naloga i za
        čuvanje pristupnih podataka. Ako sumnjate na neovlašćen pristup nalogu,
        obavijestite nas putem: raislpz66@gmail.com
      </Text>

      <Text style={styles.subtitle}>
        5. Pravila ponašanja i zabranjeni sadržaj
      </Text>
      <Text style={styles.text}>
        Korisnici ne smiju objavljivati ili slati sadržaj koji je:
      </Text>
      <Text style={styles.text}>
        • netačan, obmanjujući ili lažan{"\n"}• uvredljiv, prijeteći,
        diskriminatorski ili uznemirujući{"\n"}• nezakonit, krši prava trećih
        lica ili autorska prava{"\n"}• spam, oglasi nepovezani sa
        zapošljavanjem, lančane poruke{"\n"}• sadržaj koji pokušava prikupiti
        tuđe podatke ili prevariti korisnike
      </Text>

      <Text style={styles.subtitle}>6. Sadržaj koji korisnici objavljuju</Text>
      <Text style={styles.text}>
        Vi ste odgovorni za sadržaj koji objavljujete (oglasi, poruke, opis
        posla, CV i sl.). Aplikacija ne garantuje tačnost sadržaja korisnika.
        Zadržavamo pravo da, bez prethodne najave, uklonimo ili ograničimo
        sadržaj koji krši ove uslove ili važeće propise.
      </Text>

      <Text style={styles.subtitle}>7. CV i dokumenti</Text>
      <Text style={styles.text}>
        Ako otpremate CV ili druge dokumente, potvrđujete da imate pravo da ih
        dijelite i da ne sadrže osjetljive informacije koje ne želite da budu
        dostupne poslodavcima. CV dokumenti su dostupni poslodavcima samo u
        slučaju kada se korisnik prijavi na njihov oglas, u okviru
        funkcionalnosti aplikacije.
      </Text>

      <Text style={styles.subtitle}>8. Suspenzija i ukidanje naloga</Text>
      <Text style={styles.text}>
        Zadržavamo pravo da privremeno ili trajno ograničimo pristup,
        suspendujemo ili ukinemo nalog u slučaju kršenja ovih uslova, sumnje na
        prevaru, zloupotrebu ili radi zaštite drugih korisnika i sistema.
        Korisnik može zatražiti brisanje naloga putem: raislpz66@gmail.com
      </Text>

      <Text style={styles.subtitle}>9. Privatnost</Text>
      <Text style={styles.text}>
        Vaša privatnost je važna. Obrada podataka vrši se u skladu sa našom{" "}
        <Text style={{ fontWeight: "bold" }}>Politikom privatnosti</Text>{" "}
        dostupnom u aplikaciji.
      </Text>

      <Text style={styles.subtitle}>10. Ograničenje odgovornosti</Text>
      <Text style={styles.text}>
        Aplikacija ne garantuje da će korisnik pronaći posao ili da će
        poslodavac zaposliti kandidata. Ne odgovaramo za sadržaj, ponašanje ili
        postupke drugih korisnika, niti za eventualnu štetu koja može nastati
        usled korišćenja aplikacije. Aplikaciju koristite na sopstvenu
        odgovornost.
      </Text>

      <Text style={styles.subtitle}>11. Dostupnost i izmjene aplikacije</Text>
      <Text style={styles.text}>
        Nastojimo da aplikacija bude dostupna i stabilna, ali ne garantujemo
        neprekidan rad bez grešaka. Možemo mijenjati, unapređivati ili
        privremeno obustaviti pojedine funkcije radi održavanja i razvoja.
      </Text>

      <Text style={styles.subtitle}>12. Izmjene uslova</Text>
      <Text style={styles.text}>
        Zadržavamo pravo izmjene ovih uslova u bilo kom trenutku. O značajnim
        izmjenama korisnici mogu biti obaviješteni putem aplikacije. Nastavak
        korišćenja aplikacije nakon izmjena smatraće se prihvatanjem novih
        uslova.
      </Text>

      <Text style={styles.subtitle}>13. Mjerodavno pravo</Text>
      <Text style={styles.text}>
        Na ove uslove primjenjuje se pravo Bosne i Hercegovine, u skladu sa
        važećim propisima.
      </Text>

      <Text style={styles.subtitle}>14. Kontakt</Text>
      <Text style={styles.text}>
        Za pitanja, prijave zloupotrebe ili pritužbe možete nas kontaktirati
        putem opcije “Kontakt” u aplikaciji ili putem email adrese:
        raislpz66@gmail.com
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#B6D8F7",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#274E6D",
    marginBottom: 20,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#274E6D",
    marginTop: 20,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: "#333",
    marginBottom: 15,
    lineHeight: 24,
  },
});

export default TermsOfService;
