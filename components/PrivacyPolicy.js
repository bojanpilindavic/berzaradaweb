import React from "react";
import { ScrollView, Text, StyleSheet } from "react-native";

const PrivacyPolicy = () => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>Politika privatnosti</Text>

      <Text style={styles.text}>Poslednje ažuriranje: [UPIŠI_DATUM]</Text>

      <Text style={styles.subtitle}>0. Ko upravlja podacima (kontrolor)</Text>
      <Text style={styles.text}>
        Aplikacija “Berza rada” razvijena je u okviru aktivnosti Lokalnog
        partnerstva za zapošljavanje (LPZ) Istočno Sarajevo i projekta “Podrška
        Evropske unije lokalnim partnerstvima za zapošljavanje – Faza II (LEP
        II)”.
      </Text>
      <Text style={styles.text}>
        Kontrolor (odgovorno lice/organizacija za obradu podataka): Gradska
        razvojna agencija – RAIS (Istočno Sarajevo).
      </Text>
      <Text style={styles.text}>
        Kontakt za pitanja i zahtjeve u vezi privatnosti: [DODAJ_EMAIL]
      </Text>

      <Text style={styles.subtitle}>1. Uvod</Text>
      <Text style={styles.text}>
        Ova politika objašnjava koje podatke prikupljamo, zašto ih prikupljamo,
        kako ih koristimo i koja su vaša prava. Podatke koristimo isključivo
        radi omogućavanja funkcionalnosti aplikacije i poboljšanja korisničkog
        iskustva.
      </Text>

      <Text style={styles.subtitle}>2. Podaci koji se prikupljaju</Text>
      <Text style={styles.text}>
        Aplikacija može prikupljati sljedeće kategorije podataka:
      </Text>
      <Text style={styles.text}>
        • Podaci o nalogu i identitetu: ime i prezime (ako se unosi), email
        adresa, tip korisnika (poslodavac ili tražilac posla).{"\n"}• Podaci o
        profilu i sadržaju: podaci koje korisnik unosi u profilu,
        poruke/komunikacija unutar aplikacije (ako postoji).{"\n"}• Dokumenti:
        biografije (CV) i drugi dokumenti koje korisnik dobrovoljno otpremi.
        {"\n"}• Podaci o korišćenju: tehnički podaci nužni za rad aplikacije
        (npr. osnovni logovi grešaka), u mjeri u kojoj ih koriste servisi za
        hosting/infrastrukturu.
      </Text>

      <Text style={styles.subtitle}>
        3. Svrha obrade (zašto koristimo podatke)
      </Text>
      <Text style={styles.text}>Podatke koristimo da bismo:</Text>
      <Text style={styles.text}>
        • omogućili registraciju i prijavu korisnika{"\n"}• prikazivali oglase i
        omogućili prijave na oglase{"\n"}• povezali poslodavce i tražioce posla
        {"\n"}• prikazivali podatke unutar korisničkog profila{"\n"}• omogućili
        da poslodavac vidi CV kandidata samo kada se kandidat prijavi na njegov
        oglas{"\n"}• unaprijedili stabilnost i bezbjednost aplikacije (npr.
        otkrivanje grešaka)
      </Text>

      <Text style={styles.subtitle}>4. Pravni osnov</Text>
      <Text style={styles.text}>Podatke obrađujemo na osnovu:</Text>
      <Text style={styles.text}>
        • izvršavanja usluge (kako bi aplikacija funkcionisala){"\n"}• vaše
        saglasnosti (npr. kada dobrovoljno otpremite CV ili unesete dodatne
        podatke){"\n"}• legitimnog interesa (npr. osnovna bezbjednost sistema i
        otklanjanje grešaka)
      </Text>

      <Text style={styles.subtitle}>5. Način čuvanja podataka</Text>
      <Text style={styles.text}>
        Podaci se prikupljaju putem formulara unutar aplikacije i čuvaju se
        koristeći Google Firebase servise (npr. Firebase Authentication,
        Firestore i Firebase Storage). Firebase koristi standardne bezbjednosne
        mjere (npr. enkripciju u prenosu i druge sigurnosne mehanizme).
      </Text>

      <Text style={styles.subtitle}>6. Dijeljenje podataka i treće strane</Text>
      <Text style={styles.text}>
        Podatke ne prodajemo niti dijelimo trećim licima u marketinške svrhe.
        Podaci mogu biti obrađivani od strane provajdera infrastrukture koje
        koristimo za rad aplikacije (npr. Google Firebase), isključivo radi
        pružanja usluge i hostinga.
      </Text>

      <Text style={styles.subtitle}>
        7. Period čuvanja podataka (retention)
      </Text>
      <Text style={styles.text}>
        Podatke čuvamo onoliko dugo koliko je potrebno za funkcionisanje
        aplikacije:
      </Text>
      <Text style={styles.text}>
        • Podaci naloga i profila čuvaju se dok je nalog aktivan.{"\n"}• Nakon
        brisanja naloga, podaci se brišu ili anonimizuju u razumnom roku, osim
        ako zakonske obaveze zahtijevaju drugačije.{"\n"}• Rezervne kopije
        (backup) mogu postojati ograničeno vrijeme nakon brisanja.
      </Text>

      <Text style={styles.subtitle}>8. Sigurnost podataka</Text>
      <Text style={styles.text}>
        Primjenjujemo razumno potrebne tehničke i organizacione mjere kako bismo
        zaštitili podatke od neovlašćenog pristupa, otkrivanja ili zloupotrebe.
      </Text>

      <Text style={styles.subtitle}>9. Prava korisnika</Text>
      <Text style={styles.text}>
        Imate pravo da zatražite uvid, ispravku ili brisanje svojih podataka,
        kao i ograničenje obrade, u skladu sa važećim propisima. Zahtjev možete
        poslati na: [DODAJ_EMAIL]
      </Text>

      <Text style={styles.subtitle}>10. Brisanje naloga i podataka</Text>
      <Text style={styles.text}>
        Brisanje naloga možete zatražiti putem aplikacije (ako je opcija
        dostupna) ili slanjem zahtjeva na: [DODAJ_EMAIL]. Nakon verifikacije,
        obradićemo zahtjev u razumnom roku.
      </Text>

      <Text style={styles.subtitle}>11. Prenos podataka</Text>
      <Text style={styles.text}>
        Zbog korišćenja provajdera infrastrukture (npr. Firebase/Google), podaci
        mogu biti skladišteni ili obrađivani na serverima koji se nalaze van
        Bosne i Hercegovine. Preduzimamo razumne mjere da obrada bude zaštićena
        odgovarajućim standardima.
      </Text>

      <Text style={styles.subtitle}>12. Maloljetni korisnici</Text>
      <Text style={styles.text}>
        Aplikacija nije namijenjena osobama mlađim od 16 godina. Ne prikupljamo
        svjesno podatke od maloljetnih lica. Ako smatrate da je maloljetno lice
        dostavilo lične podatke, kontaktirajte nas na: [DODAJ_EMAIL] kako bismo
        uklonili podatke.
      </Text>

      <Text style={styles.subtitle}>13. Izmjene politike</Text>
      <Text style={styles.text}>
        Politiku privatnosti možemo povremeno ažurirati. O značajnim izmjenama
        korisnici će biti obaviješteni putem aplikacije. Nastavak korišćenja
        aplikacije nakon izmjena znači prihvatanje nove verzije.
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

export default PrivacyPolicy;
