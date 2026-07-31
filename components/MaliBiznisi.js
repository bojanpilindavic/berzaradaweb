import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const projects = [
  {
    id: "1",
    title: "Salon ljepote „Vladana Butulija“",
    description: `Salon ljepote VB jedan je od deset novoosnovanih poslovnih subjekata pokrenutih uz finansijsku podršku projekta LEP II Istočno Sarajevo „Korak do posla“. Zahvaljujući dodijeljenom grantu, preduzetnička ideja Vladane Butulije dobila je priliku da preraste u uspješan i održiv biznis.

Od samog osnivanja, salon bilježi kontinuiran rast i razvoj. Za samo godinu dana poslovanja izrastao je u prepoznatljiv beauty centar koji danas zapošljava pet radnika, potvrđujući da kvalitet, stručnost i posvećenost predstavljaju najbolju preporuku.

Klijentima je na raspolaganju širok spektar profesionalnih usluga, uključujući šminkanje, nadogradnju noktiju, pedikir, trajnu šminku, iscrtavanje obrva i nadogradnju trepavica. Prateći savremene trendove i primjenjujući najviše standarde kvaliteta, salon je stekao povjerenje velikog broja zadovoljnih klijenata, što je rezultiralo stalnim povećanjem obima poslovanja.

Rast potražnje uslovio je i proširenje poslovnih kapaciteta, pa salon danas posluje u znatno većem, moderno opremljenom prostoru koji omogućava još kvalitetniju uslugu i ugodniji boravak klijenata.

Uspješna priča salona ljepote „Vladana Butulija“ pokazuje koliko ciljano usmjerena podrška razvoju preduzetništva može doprinijeti stvaranju održivih poslovnih poduhvata i novih radnih mjesta. Istovremeno, ona potvrđuje da se uz hrabrost, predan rad i adekvatnu podršku poslovna ideja može razviti u uspješan i prepoznatljiv lokalni brend.`,
    images: [
      require("../assets/mali-biznisi/vladana/vladana1.jpg"),
      require("../assets/mali-biznisi/vladana/vladana2.jpg"),
      require("../assets/mali-biznisi/vladana/vladana3.jpg"),
    ],
  },
  {
    id: "2",
    title: "Stomatološka ordinacija „Dental Room“",
    description: `Stomatološka ordinacija „Dental Room“ jedan je od deset novoosnovanih poslovnih subjekata pokrenutih uz finansijsku podršku projekta LEP II Istočno Sarajevo „Korak do posla“. Zahvaljujući dodijeljenom grantu, ordinacija je započela rad sa ciljem pružanja savremenih i kvalitetnih stomatoloških usluga stanovnicima Istočnog Sarajeva.

Smještena u Istočnom Novom Sarajevu, ordinacija danas okuplja stručan tim koji čine doktori stomatologije dr Vesna Pržulj Bartula i dr Bojana Zečević, uz stomatološkog asistenta Sanju Kuljanin. Posvećenost kvalitetu rada, kontinuirano stručno usavršavanje i primjena savremene opreme predstavljaju osnovu njihovog svakodnevnog rada.

„Dental Room“ pruža širok spektar usluga iz oblasti preventivne, dijagnostičke i terapijske stomatologije. U ponudi su preventivni pregledi, uklanjanje zubnog kamenca, liječenje karijesa, endodontski zahvati, estetske rekonstrukcije zuba, protetski radovi, vađenje zuba, kao i savjetovanje o pravilnoj oralnoj higijeni i prevenciji bolesti usne šupljine.

Posebna pažnja posvećena je individualnom pristupu svakom pacijentu, uz primjenu najviših standarda higijene, sigurnosti i profesionalne njege.

Pokretanjem ove ordinacije obogaćena je ponuda zdravstvenih usluga na području Istočnog Sarajeva, a istovremeno su stvorena i nova radna mjesta. Priča stomatološke ordinacije „Dental Room“ potvrđuje da podrška razvoju preduzetništva, u kombinaciji sa stručnim znanjem, profesionalnim pristupom i jasnom vizijom, doprinosi razvoju kvalitetnih i održivih poslovnih poduhvata.`,
    images: [
      require("../assets/mali-biznisi/dental/dental1.jpeg"),
      require("../assets/mali-biznisi/dental/dental2.jpeg"),
      require("../assets/mali-biznisi/dental/dental3.jpeg"),
    ],
  },
  {
    id: "3",
    title: "Poljoprivredno gazdinstvo Bojan Čolović",
    description: `Poljoprivredno gazdinstvo Bojan Čolović jedan je od deset novoosnovanih poslovnih subjekata pokrenutih uz finansijsku podršku projekta LEP II Istočno Sarajevo „Korak do posla“. Zahvaljujući dodijeljenom grantu, porodična poslovna ideja prerasla je u organizovanu poljoprivrednu proizvodnju usmjerenu na plasman kvalitetnih domaćih proizvoda.

Gazdinstvo se nalazi na području opštine Sokolac, u srcu Romanije, gdje su 2025. godine postavljeni temelji za razvoj održive porodične farme. Osnovna djelatnost je uzgoj koka nosilja i proizvodnja svježih konzumnih jaja, uz poseban fokus na kvalitet, sigurnost proizvoda i odgovoran odnos prema životinjama.

U svakodnevnom radu posebna pažnja posvećuje se dobrobiti koka nosilja, održavanju visokih higijenskih standarda i primjeni kvalitetne ishrane, čime se obezbjeđuje proizvod koji ispunjava očekivanja savremenih potrošača.

Cjelokupan proces, od uzgoja i njege do pakovanja i distribucije jaja, organizovan je kroz angažman članova porodice, što ovom gazdinstvu daje dodatnu vrijednost i autentičnost.

Vizija gazdinstva usmjerena je ka kontinuiranom razvoju i proširenju proizvodnih kapaciteta, unapređenju uslova uzgoja i izgradnji prepoznatljivog brenda domaćih jaja. Istovremeno, cilj je uspostavljanje dugoročne saradnje sa trgovinama, ugostiteljskim objektima i drugim partnerima širom regije.

Priča Poljoprivrednog gazdinstva Bojan Čolović potvrđuje da ulaganje u lokalnu poljoprivredu i podrška razvoju porodičnih biznisa predstavljaju važan doprinos jačanju domaće proizvodnje, stvaranju novih ekonomskih prilika i održivom razvoju ruralnih područja.`,
    images: [
      require("../assets/mali-biznisi/bojan/bojan1.jpg"),
      require("../assets/mali-biznisi/bojan/bojan2.jpg"),
      require("../assets/mali-biznisi/bojan/bojan3.jpg"),
    ],
  },
  {
    id: "4",
    title: "Poljoprivredno gazdinstvo Dara Aranaut",
    description: `Porodično poljoprivredno gazdinstvo Dara Aranaut jedno je od deset novoosnovanih poslovnih subjekata pokrenutih uz finansijsku podršku projekta LEP II Istočno Sarajevo „Korak do posla“. Zahvaljujući dodijeljenom grantu i nabavci poljoprivredne mehanizacije, gazdinstvo je unaprijedilo proizvodne kapacitete i stvorilo kvalitetnije uslove za dalji razvoj porodične poljoprivredne proizvodnje.

Smješteno na području Istočnog Sarajeva, gazdinstvo je nastalo iz dugogodišnje tradicije bavljenja poljoprivredom, ljubavi prema zemlji i opredjeljenja da kupcima ponudi svježe, domaće i kvalitetne proizvode. Poslovanje se zasniva na odgovornom odnosu prema prirodi, očuvanju tradicionalnog načina proizvodnje i kontinuiranom unapređenju proizvodnih procesa.

Osnovnu djelatnost čini proizvodnja različitih vrsta povrća, među kojima su luk, krompir, zelena salata, buranija, paradajz i krastavac, uz primjenu prirodnih metoda uzgoja i posebnu brigu o očuvanju plodnosti zemljišta i zdravlju biljaka.

Pored povrtarske proizvodnje, gazdinstvo se bavi i uzgojem ovaca koje se hrane stočnom hranom proizvedenom na vlastitom imanju i veći dio godine borave na prirodnoj ispaši, čime se obezbjeđuje visok kvalitet proizvoda.

Proizvodi ovog gazdinstva plasiraju se direktno krajnjim kupcima, prvenstveno po narudžbi i putem preporuka zadovoljnih potrošača, čime se gradi dugoročno povjerenje i potvrđuje kvalitet domaće proizvodnje.

Nabavkom nove poljoprivredne mehanizacije kroz projekat dodatno su unaprijeđeni efikasnost rada, produktivnost i uslovi proizvodnje, stvarajući osnov za dalji rast i proširenje poslovanja.

Priča Porodičnog poljoprivrednog gazdinstva Dara Aranaut potvrđuje da ulaganje u domaću poljoprivredu, uz podršku razvoju preduzetništva i predan rad, doprinosi jačanju lokalne proizvodnje, očuvanju porodičnih gazdinstava i stvaranju održivih poslovnih prilika u ruralnim sredinama.`,
    images: [
      require("../assets/mali-biznisi/dara/dara1.jpg"),
      require("../assets/mali-biznisi/dara/dara2.jpg"),
      require("../assets/mali-biznisi/dara/dara3.jpg"),
    ],
  },
  {
    id: "5",
    title: "Poljoprivredno gazdinstvo Danijela Čvoro",
    description: `Poljoprivredno gazdinstvo Danijela Čvoro jedno je od deset novoosnovanih poslovnih subjekata pokrenutih uz finansijsku podršku projekta LEP II Istočno Sarajevo „Korak do posla“. Zahvaljujući dodijeljenom grantu, razvijena je proizvodnja prirodnog organskog đubriva koje predstavlja inovativno i ekološki održivo rješenje za savremenu poljoprivredu.

Osnovna djelatnost gazdinstva je proizvodnja i prodaja humusa kalifornijskih glista – visokokvalitetnog organskog đubriva koje nastaje preradom organskog materijala uz pomoć kalifornijskih glista.

Ovaj prirodni proizvod bogat je hranjivim materijama i korisnim mikroorganizmima, poboljšava strukturu zemljišta, povećava njegovu plodnost i doprinosi zdravijem rastu i razvoju biljaka.

Proizvodi gazdinstva namijenjeni su širokom krugu korisnika, uključujući poljoprivredne proizvođače, voćare, povrtlare, rasadnike, plasteničku proizvodnju, cvjećare, vrtlare i sve koji se opredjeljuju za prirodna i održiva rješenja u uzgoju biljaka.

Poseban akcenat stavljen je na kvalitet proizvoda, očuvanje prirodnih resursa i promociju ekološki odgovorne proizvodnje.

Kroz razvoj ovog poslovnog poduhvata doprinosi se unapređenju organske poljoprivrede i podizanju svijesti o značaju primjene prirodnih preparata u biljnoj proizvodnji. Istovremeno, gazdinstvo promoviše održive modele poslovanja koji imaju pozitivan uticaj na zaštitu životne sredine i dugoročno očuvanje kvaliteta zemljišta.

Priča Poljoprivrednog gazdinstva Danijela Čvoro potvrđuje da inovativne poslovne ideje, zasnovane na principima održivog razvoja i zaštite životne sredine, uz odgovarajuću podršku mogu prerasti u uspješne i perspektivne poslovne poduhvate sa značajnim potencijalom za dalji razvoj.`,
    images: [
      require("../assets/mali-biznisi/danijela/danijela1.jpg"),
      require("../assets/mali-biznisi/danijela/danijela2.jpg"),
      require("../assets/mali-biznisi/danijela/danijela3.jpg"),
    ],
  },
  {
    id: "6",
    title: "Techno Shop „LM“",
    description: `Techno Shop „LM“ jedan je od deset novoosnovanih poslovnih subjekata pokrenutih uz finansijsku podršku projekta LEP II Istočno Sarajevo „Korak do posla“. Zahvaljujući dodijeljenom grantu, preduzetnička ideja dobila je priliku da preraste u stabilan i održiv poslovni poduhvat.

Osnivanje radnje predstavljalo je prvi korak ka razvoju vlastitog biznisa, a podrška obezbijeđena kroz projekat omogućila je stvaranje kvalitetnih uslova za početak poslovanja.

Pored finansijske pomoći, ovaj vid podrške predstavljao je i dodatni podsticaj za razvoj preduzetničke inicijative i ostvarivanje dugoročnih poslovnih ciljeva.

Nakon gotovo godinu dana uspješnog poslovanja, Techno Shop „LM“ posluje stabilno i kontinuirano razvija svoju djelatnost, potvrđujući opravdanost ulaganja u razvoj malih biznisa i lokalnog preduzetništva.

Kroz posvećen rad, odgovoran pristup i kvalitetnu uslugu, radnja je izgradila temelje za dalji rast i jačanje svoje pozicije na tržištu.

Priča Techno Shopa „LM“ pokazuje da pravovremena podrška preduzetnicima može biti ključan podsticaj za realizaciju poslovnih ideja i razvoj održivih poslovnih poduhvata. Ujedno potvrđuje da ulaganje u lokalno preduzetništvo doprinosi ekonomskom razvoju zajednice, otvaranju novih mogućnosti i stvaranju uspješnih poslovnih priča.`,
    images: [
      require("../assets/mali-biznisi/lm/lm1.jpeg"),
      require("../assets/mali-biznisi/lm/lm2.jpeg"),
      require("../assets/mali-biznisi/lm/lm3.jpeg"),
    ],
  },
  {
    id: "7",
    title: "Stone Craft",
    description: `Stone Craft jedan je od deset novoosnovanih poslovnih subjekata pokrenutih uz finansijsku podršku projekta LEP II Istočno Sarajevo „Korak do posla“. Zahvaljujući dodijeljenom grantu, obezbijeđeni su uslovi za pokretanje poslovanja, nabavku neophodne opreme i uspostavljanje kvalitetne osnove za dalji razvoj preduzeća.

Od samog osnivanja, kompanija je usmjerena na razvoj poslovanja kroz ulaganje u kvalitet, savremenu opremu i unapređenje proizvodnih kapaciteta. Podrška ostvarena kroz projekat predstavljala je važan podsticaj u početnoj fazi poslovanja i omogućila stabilan početak rada.

Nakon gotovo godinu dana poslovanja, Stone Craft uspješno posluje i bilježi kontinuiran razvoj, potvrđujući da ulaganje u preduzetništvo i razvoj malih preduzeća doprinosi stvaranju održivih poslovnih modela i jačanju lokalne privrede.

Kontinuiranim unapređenjem poslovanja i odgovornim pristupom radu, preduzeće gradi čvrste temelje za dalji rast i razvoj.

Priča kompanije Stone Craft potvrđuje da pravovremena podrška preduzetnicima može biti ključni pokretač realizacije poslovnih ideja. Istovremeno, predstavlja primjer uspješnog razvoja malog preduzeća koje kroz predan rad, ulaganje i jasnu poslovnu viziju doprinosi razvoju privrede Istočnog Sarajeva.`,
    images: [
      require("../assets/mali-biznisi/stone/stone1.jpeg"),
      require("../assets/mali-biznisi/stone/stone2.jpeg"),
      require("../assets/mali-biznisi/stone/stone3.jpeg"),
    ],
  },
  {
    id: "8",
    title: "Bravarska radnja „VAR Komlenović“",
    description: `Bravarska radnja „VAR Komlenović“ jedan je od deset novoosnovanih poslovnih subjekata pokrenutih uz finansijsku podršku projekta LEP II Istočno Sarajevo „Korak do posla“. Zahvaljujući dodijeljenom grantu, stvoreni su uslovi za pokretanje poslovanja i razvoj preduzetničke djelatnosti u oblasti bravarskih usluga.

Od samog osnivanja, radnja je usmjerena na pružanje kvalitetnih bravarskih usluga, uz poštovanje dogovorenih rokova i visokih standarda izrade i ugradnje proizvoda.

Pored finansijske podrške, značajan doprinos razvoju poslovanja predstavljale su stručne obuke i kontinuirana savjetodavna podrška Gradske razvojne agencije Istočno Sarajevo, koja je nastavljena i nakon završetka projektnih aktivnosti.

Takva saradnja omogućila je lakše praćenje novih razvojnih prilika i učešće na programima podrške namijenjenim malim i srednjim preduzećima.

U proteklom periodu radnja je uspješno odgovorila na zahtjeve tržišta, realizujući najveći broj poslova na području opštine Sokolac, ali i širom Bosne i Hercegovine.

Razvoj poslovanja dodatno je unaprijeđen korištenjem digitalnih kanala promocije i preporukama zadovoljnih klijenata, što je doprinijelo širenju baze korisnika i povećanju obima posla.

Kontinuirani rast potražnje stvorio je osnov za dalje proširenje poslovnih kapaciteta kroz nabavku nove opreme i alata, čime će biti omogućeno povećanje proizvodnih mogućnosti i otvaranje novih radnih mjesta.

Priča bravarske radnje „VAR Komlenović“ pokazuje da kvalitet rada, kontinuirano usavršavanje i dugoročna institucionalna podrška predstavljaju važne preduslove za razvoj održivog preduzetništva i uspješno pozicioniranje na zahtjevnom tržištu.`,
    images: [
      require("../assets/mali-biznisi/komlenovic/komlenovic1.jpg"),
      require("../assets/mali-biznisi/komlenovic/komlenovic2.jpg"),
      require("../assets/mali-biznisi/komlenovic/komlenovic3.jpg"),
    ],
  },
  {
    id: "9",
    title: "Pekoteka „K'o kod kuće“",
    description: `Pekoteka „K'o kod kuće“ jedan je od deset novoosnovanih poslovnih subjekata pokrenutih uz finansijsku podršku projekta LEP II Istočno Sarajevo „Korak do posla“. Zahvaljujući dodijeljenom grantu, porodična poslovna ideja prerasla je u prepoznatljiv lokalni brend koji svojim proizvodima spaja tradicionalne vrijednosti i savremene kulinarske inspiracije.

Smještena u opštini Sokolac, pekoteka je nastala iz želje da se iskustva stečena u Francuskoj pretoče u autentičnu ponudu prilagođenu domaćem tržištu.

Inspirisana francuskim pekarstvom, ali vođena domaćom tradicijom i ukusima, razvila je koncept koji kupcima nudi kvalitetne proizvode pripremljene od pažljivo odabranih sastojaka.

U ponudi se nalaze svježe pečeni domaći hljeb, slatka i slana peciva, kao i usluge keteringa za različite svečanosti i događaje.

Poseban akcenat stavljen je na ručnu pripremu proizvoda, kvalitet izrade i posvećenost svakom detalju, čime se kupcima pruža autentičan domaći ukus i osjećaj topline.

Od samog početka poslovanja, pekoteka je usmjerena na izgradnju povjerenja sa kupcima kroz kvalitet, ljubaznu uslugu i prepoznatljiv identitet.

Kombinacijom međunarodnog iskustva i lokalne tradicije stvorena je jedinstvena ponuda koja doprinosi obogaćivanju gastronomske ponude opštine Sokolac.

Priča Pekoteke „K'o kod kuće“ pokazuje da inovativne ideje, inspirisane iskustvima iz svijeta, uz odgovarajuću podršku i predan rad mogu prerasti u uspješan porodični biznis koji doprinosi razvoju lokalne zajednice i promociji domaćeg preduzetništva.`,
    images: [
      require("../assets/mali-biznisi/pekoteka/pekoteka1.jpeg"),
      require("../assets/mali-biznisi/pekoteka/pekoteka2.jpeg"),
      require("../assets/mali-biznisi/pekoteka/pekoteka3.jpeg"),
    ],
  },
  {
    id: "10",
    title: "Iskop Plus",
    description: `Iskop Plus jedan je od deset novoosnovanih poslovnih subjekata pokrenutih uz finansijsku podršku projekta LEP II Istočno Sarajevo „Korak do posla“. Zahvaljujući podršci Lokalnog partnerstva za zapošljavanje Istočno Sarajevo, poslovna ideja uspješno je realizovana, čime su stvoreni uslovi za razvoj održivog preduzeća u oblasti građevinskih usluga.

Od samog osnivanja, Iskop Plus usmjeren je na pružanje kvalitetnih i pouzdanih usluga, uz profesionalan pristup i odgovorno izvršavanje svih ugovorenih poslova.

Kontinuiranim radom, ulaganjem u razvoj poslovanja i jačanjem povjerenja klijenata, preduzeće je izgradilo stabilne temelje za dalji rast i razvoj.

Kroz svoje poslovanje, Iskop Plus doprinosi razvoju lokalne privrede, jačanju preduzetništva i stvaranju novih poslovnih prilika na području Istočnog Sarajeva.

Posebnu potvrdu kvaliteta poslovne ideje i ostvarenih rezultata predstavlja osvajanje prvog mjesta na takmičenju „Mali biznisi, velike priče“, na kojem su predstavljeni najuspješniji poslovni poduhvati podržani kroz projekat LEP II Istočno Sarajevo „Korak do posla“.

Priča preduzeća Iskop Plus potvrđuje da kvalitetna poslovna ideja, uz odgovarajuću institucionalnu podršku, predan rad i jasnu razvojnu viziju, može prerasti u uspješan i konkurentan poslovni poduhvat.

Istovremeno, predstavlja primjer dobre prakse kako ulaganje u razvoj lokalnog preduzetništva doprinosi stvaranju održivih biznisa.`,
    images: [
      require("../assets/mali-biznisi/iskop/iskop1.jpg"),
      require("../assets/mali-biznisi/iskop/iskop2.jpg"),
      require("../assets/mali-biznisi/iskop/iskop3.jpg"),
    ],
  },
];

const MaliBiznisi = ({ onClose }) => {
  const [selectedProject, setSelectedProject] = useState(null);

  const handleClose = () => {
    setSelectedProject(null);

    if (onClose) {
      onClose();
    }
  };

  const renderDescription = (description) => {
    return description
      .split("\n\n")
      .filter((paragraph) => paragraph.trim())
      .map((paragraph, index) => (
        <Text key={index} style={styles.paragraph}>
          {paragraph.trim()}
        </Text>
      ));
  };

  if (selectedProject) {
    const [coverImage, ...otherImages] = selectedProject.images;

    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.detailsContent}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.detailsTitle}>{selectedProject.title}</Text>

          <View style={styles.galleryContainer}>
            <Image
              source={coverImage}
              style={styles.coverImage}
              resizeMode="cover"
            />

            <View style={styles.smallImagesRow}>
              {otherImages.map((image, index) => (
                <Image
                  key={`${selectedProject.id}-${index}`}
                  source={image}
                  style={[
                    styles.smallImage,
                    index === 0 && styles.smallImageLeft,
                  ]}
                  resizeMode="cover"
                />
              ))}
            </View>
          </View>

          <View style={styles.descriptionBox}>
            {renderDescription(selectedProject.description)}
          </View>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => setSelectedProject(null)}
            accessibilityRole="button"
            accessibilityLabel="Nazad"
          >
            <Ionicons name="arrow-back" size={19} color="#FFFFFF" />
            <Text style={styles.actionButtonText}>Nazad</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.mainTitle}>Mali biznisi, velike priče</Text>

        <Text style={styles.introTitle}>Uspješno realizovani projekti</Text>

        <Text style={styles.introText}>
          U sklopu projekta LEP II Istočno Sarajevo „Korak do posla“ uspješno je
          realizovano 10 projekata. U nastavku možete pogledati priče o malim
          biznisima, njihovim idejama, razvoju i ostvarenim rezultatima.
        </Text>

        <View style={styles.projectsContainer}>
          {projects.map((project, index) => (
            <TouchableOpacity
              key={project.id}
              style={styles.projectCard}
              onPress={() => setSelectedProject(project)}
              accessibilityRole="button"
              accessibilityLabel={`Otvori ${project.title}`}
            >
              <Image
                source={project.images[0]}
                style={styles.cardImage}
                resizeMode="cover"
              />

              <View style={styles.cardOverlay}>
                <View style={styles.cardNumber}>
                  <Text style={styles.cardNumberText}>{index + 1}</Text>
                </View>

                <View style={styles.cardTextContainer}>
                  <Text style={styles.cardTitle}>{project.title}</Text>
                </View>

                <Ionicons name="chevron-forward" size={24} color="#FFFFFF" />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={handleClose}
          accessibilityRole="button"
          accessibilityLabel="Zatvori"
        >
          <Ionicons name="close" size={19} color="#FFFFFF" />
          <Text style={styles.actionButtonText}>Zatvori</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#F4F8FB",
  },

  scrollView: {
    flex: 1,
  },

  listContent: {
    width: "100%",
    maxWidth: 720,
    alignSelf: "center",
    paddingHorizontal: 16,
    paddingTop: 28,
    paddingBottom: 50,
  },

  mainTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "#1B3A57",
    textAlign: "center",
    marginBottom: 10,
  },

  introTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#397093",
    textAlign: "center",
    marginBottom: 14,
  },

  introText: {
    fontSize: 16,
    lineHeight: 25,
    color: "#4A6072",
    textAlign: "center",
    marginBottom: 28,
  },

  projectsContainer: {
    width: "100%",
  },

  projectCard: {
    width: "100%",
    height: 150,
    backgroundColor: "#DCEAF4",
    borderRadius: 14,
    overflow: "hidden",
    marginBottom: 14,
  },

  cardImage: {
    width: "100%",
    height: "100%",
  },

  cardOverlay: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    minHeight: 66,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: "rgba(27, 58, 87, 0.82)",
  },

  cardNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#A8E6CF",
    marginRight: 10,
  },

  cardNumberText: {
    fontSize: 14,
    fontWeight: "800",
    color: "#1B3A57",
  },

  cardTextContainer: {
    flex: 1,
    marginRight: 8,
  },

  cardTitle: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "700",
    color: "#FFFFFF",
  },

  detailsContent: {
    width: "100%",
    maxWidth: 720,
    alignSelf: "center",
    paddingHorizontal: 16,
    paddingTop: 28,
    paddingBottom: 50,
  },

  detailsTitle: {
    fontSize: 27,
    lineHeight: 34,
    fontWeight: "800",
    color: "#1B3A57",
    textAlign: "center",
    marginBottom: 22,
  },

  galleryContainer: {
    width: "100%",
    marginBottom: 24,
  },

  coverImage: {
    width: "100%",
    height: 310,
    borderRadius: 15,
    marginBottom: 10,
  },

  smallImagesRow: {
    width: "100%",
    flexDirection: "row",
  },

  smallImage: {
    flex: 1,
    height: 170,
    borderRadius: 13,
  },

  smallImageLeft: {
    marginRight: 10,
  },

  descriptionBox: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    paddingHorizontal: 18,
    paddingTop: 20,
    paddingBottom: 6,
    borderWidth: 1,
    borderColor: "#DFE9F0",
  },

  paragraph: {
    fontSize: 16,
    lineHeight: 27,
    color: "#354A5F",
    marginBottom: 17,
  },

  actionButton: {
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#274E6D",
    paddingHorizontal: 28,
    paddingVertical: 12,
    borderRadius: 9,
    marginTop: 26,
  },

  actionButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    marginLeft: 7,
  },
});

export default MaliBiznisi;
