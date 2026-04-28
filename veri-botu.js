const fs = require("fs");

// Kendi API Anahtarını buraya yapıştır
const API_KEY = "INSERT THE API KEY YOU OBTAINED FROM THE OPEN CHARGE MAP HERE. | BURAYA OPEN CHARGE MAP' TEN ALDIĞIN API ANAHTARINI KOY"; 

// =========================================================
// ÜLKE LİSTESİ
// =========================================================
const ulkeKodlari = {
    "Türkiye": "TR",
    "İngiltere": "GB",
    "Fransa": "FR",
    "Danimarka": "DK",
    "İspanya": "ES",
    "Polonya": "PL",
    "Rusya": "RU",
    "Yunanistan": "GR",
    "İtalya": "IT",
    "Almanya": "DE",
    "Norveç": "NO",
    "İsveç": "SE",
    "Finlandiya": "FI",
    "Amerika": "US",
    "Kanada": "CA",
    "Meksika": "MX"
};

// =========================================================
// TÜRKİYE İÇİN AKILLI İLÇE GRUPLANDIRMASI
// =========================================================
const sehirIlceListesi = {
"İSTANBUL": ["ŞİLE","ÜMRANİYE","ÇEKMEKÖY","ÇATALCA","ZEYTİNBURNU","SİLİVRİ","SARIYER","SANCAKTEPE","MALTEPE","KÜÇÜKÇEKMECE","KÂĞITHANE","KARTAL","ESENLER","DİLİSKELESİ","BÜYÜKÇEKMECE","BOSTANCI","BEYLİKDÜZÜ","BEYKOZ","BAĞCILAR","BAŞAKŞEHİR","BASAKSEHIR","34860","BEŞİKTAŞ", "KADIKÖY", "ŞİŞLİ", "ÜSKÜDAR", "BEYOĞLU","BAKIRKÖY", "PENDİK", "ATAŞEHİR", "ISTANBUL"],
"ADANA": ["ALADAĞ","CEYHAN","ÇUKUROVA","FEKE","İMAMOĞLU","KARAİSALI","KARATAŞ","KOZAN","POZANTI","SAİMBEYLİ","SARIÇAM","SEYHAN","TUFANBEYLİ","YÜREĞİR"],
"ADIYAMAN": ["ADİYAMAN","BESNİ","ÇELİKHAN","GERGER","GÖLBAŞI","KAHTA","SAMSAT","SİNCİK","TUT"],
"AFYONKARAHİSAR": ["SANDIKLI/AFYON","AFYONKARAHİSAR MERKEZ","AFYON","BAŞMAKÇI","BAYAT","BOLVADİN","ÇAY","ÇOBANLAR","DAZKIRI","DİNAR","EMİRDAĞ","EVCİLER","HOCALAR","İHSANİYE","İSCEHİSAR","KIZILÖREN","SANDIKLI","SİNANPAŞA","SULTANDAĞI","ŞUHUT"],
"AĞRI": ["DİYADİN","DOĞUBAYAZIT","ELEŞKİRT","HAMUR","PATNOS","TAŞLIÇAY","TUTAK"],
"AKSARAY": ["AĞAÇÖREN","ESKİL","GÜLAĞAÇ","GÜZELYURT","ORTAKÖY","SARIYAHŞİ","SULTANHANI"],
"AMASYA": ["GÖYNÜCEK","GÜMÜŞHACIKÖY","HAMAMÖZÜ","MERZİFON","SULUOVA","TAŞOVA"],
"ANKARA": ["دپ",,"ÇANKAYA/ANKARA","BALÂ","AKYURT","ALTINDAĞ","AYAŞ","BALA","BEYPAZARI","ÇAMLIDERE","ÇANKAYA","ÇUBUK","ELMADAĞ","ETİMESGUT","EVREN","GÖLBAŞI","GÜDÜL","HAYMANA","KAHRAMANKAZAN","KALECİK","KEÇİÖREN","KIZILCAHAMAM","MAMAK","NALLIHAN","POLATLI","PURSAKLAR","SİNCAN","ŞEREFLİKOÇHİSAR","YENİMAHALLE"],
"ANTALYA": ["KEMER/ANTALYA","SERİK/ANTALYA","MURATPAŞA/ANTALYA","MANAVGAT/ANTALYA","MANAVGAT / ANTALYA","KUMLUCA / ANTALYA","KONYAALTI/ANTALYA","KAMER/ANTALYA","DÖŞEMEALTI/ANTALYA","DÖŞEMEALTI ANTALYA","DÖŞEMEALTI / ANTALYA","ANTALYA/ALANYA","AKSU/ANTALYA","AKSEKİ","AKSU","ALANYA","DEMRE","DÖŞEMEALTI","ELMALI","FİNİKE","GAZİPAŞA","GÜNDOĞMUŞ","İBRADI","KAŞ","KEMER","KEPEZ","KONYAALTI","KORKUTELİ","KUMLUCA","MANAVGAT","MURATPAŞA","SERİK"],
"ARDAHAN": ["ÇILDIR","DAMAL","GÖLE","HANAK","POSOF"],
"ARTVİN": ["ARDANUÇ","ARHAVİ","BORÇKA","HOPA","KEMALPAŞA","MURGUL","ŞAVŞAT","YUSUFELİ"],
"AYDIN": ["TİRE","KUŞADASI AYDIN","BOZDOĞAN","BUHARKENT","ÇİNE","DİDİM","EFELER","GERMENCİK","İNCİRLİOVA","KARACASU","KARPUZLU","KOÇARLI","KÖŞK","KUŞADASI","NAZİLLİ","SÖKE","SULTANHİSAR","YENİPAZAR"],
"BALIKESİR": ["BALİKESİR","BALIKESİR AYVALIK","SAVASTEPE","NALIKESİR","BALİKESİR AYVALIK","ALTIEYLÜL","AYVALIK","BALYA","BANDIRMA","BİGADİÇ","BURHANİYE","DURSUNBEY","EDREMİT","ERDEK","GÖMEÇ","GÖNEN","HAVRAN","İVRİNDİ","KARESİ","KEPSUT","MANYAS","MARMARA","SAVAŞTEPE","SINDIRGI","SUSURLUK"],
"BARTIN": ["AMASRA","KURUCAŞİLE","ULUS"],
"BATMAN": ["BEŞİRİ","GERCÜŞ","HASANKEYF","KOZLUK","SASON"],
"BAYBURT": ["AYDINTEPE","DEMİRÖZÜ","MERKEZ"],
"BİLECİK": ["BOZÜYÜK","GÖLPAZARI","İNHİSAR","OSMANELİ","PAZARYERİ","SÖĞÜT","YENİPAZAR"],
"BİNGÖL": ["ADAKLI","GENÇ","KARLIOVA","KİĞI","SOLHAN","YAYLADERE","YEDİSU"],
"BİTLİS": ["ADİLCEVAZ","AHLAT","GÜROYMAK","HİZAN","MUTKİ","TATVAN"],
"BOLU": ["MERKEZ/BOLU","ELMALIK","DÖRTDİVAN","GEREDE","GÖYNÜK","KIBRISCIK","MENGEN","MUDURNU","SEBEN","YENİÇAĞA"],
"BURDUR": ["AĞLASUN","ALTINYAYLA","BUCAK","ÇAVDIR","ÇELTİKÇİ","GÖLHİSAR","KARAMANLI","KEMER","TEFENNİ","YEŞİLOVA"],
"BURSA": ["İNEGÖL/BURSA","TAŞPINAR","MARMARA BÖLGESİ","BURSA PROVİNCE","BÜYÜKORHAN","GEMLİK","GÜRSU","HARMANCIK","İNEGÖL","İZNİK","KARACABEY","KELES","KESTEL","MUDANYA","MUSTAFAKEMALPAŞA","NİLÜFER","ORHANELİ","ORHANGAZİ","OSMANGAZİ","YENİŞEHİR","YILDIRIM"],
"ÇANAKKALE": ["CANAKKALE","AYVACIK","BAYRAMİÇ","BİGA","BOZCAADA","ÇAN","ECEABAT","EZİNE","GELİBOLU","GÖKÇEADA","LAPSEKİ","YENİCE"],
"ÇANKIRI": ["CANKİRİ","ATKARACALAR","BAYRAMÖREN","ÇERKEŞ","ELDİVAN","ILGAZ","KIZILIRMAK","KORGUN","KURŞUNLU","ORTA","ŞABANÖZÜ","YAPRAKLI"],
"ÇORUM": ["CORUM","ALACA","BAYAT","BOĞAZKALE","DODURGA","İSKİLİP","KARGI","LAÇİN","MECİTÖZÜ","OĞUZLAR","ORTAKÖY","OSMANCIK","SUNGURLU","UĞURLUDAĞ"],
"DENİZLİ": ["ACIPAYAM","BABADAĞ","BAKLAN","BEKİLLİ","BEYAĞAÇ","BOZKURT","BULDAN","ÇAL","ÇAMELİ","ÇARDAK","ÇİVRİL","GÜNEY","HONAZ","KALE","MERKEZEFENDİ","PAMUKKALE","SARAYKÖY","SERİNHİSAR","TAVAS"],
"DİYARBAKIR": ["DİYARBAKİR","BAĞLAR","BİSMİL","ÇERMİK","ÇINAR","ÇÜNGÜŞ","DİCLE","EĞİL","ERGANİ","HANİ","HAZRO","KAYAPINAR","KOCAKÖY","KULP","LİCE","SİLVAN","SUR","YENİŞEHİR"],
"DÜZCE": ["AKÇAKOCA","CUMAYERİ","ÇİLİMLİ","GÖLYAKA","GÜMÜŞOVA","KAYNAŞLI","YIĞILCA"],
"EDİRNE": ["EDİRNE MERKEZ","ENEZ","HAVSA","İPSALA","KEŞAN","LALAPAŞA","MERİÇ","SÜLOĞLU","UZUNKÖPRÜ"],
"ELAZIĞ": ["AĞIN","ALACAKAYA","ARICAK","BASKİL","KARAKOÇAN","KEBAN","KOVANCILAR","MADEN","PALU","SİVRİCE"],
"ERZİNCAN": ["ERZİNCAN MERKEZ","ÇAYIRLI","İLİÇ","KEMAH","KEMALİYE","OTLUKBELİ","REFAHİYE","TERCAN","ÜZÜMLÜ"],
"ERZURUM": ["AŞKALE","AZİZİYE","ÇAT","HINIS","HORASAN","İSPİR","KARAÇOBAN","KARAYAZI","KÖPRÜKÖY","NARMAN","OLTU","OLUR","PALANDÖKEN","PASİNLER","PAZARYOLU","ŞENKAYA","TEKMAN","TORTUM","UZUNDERE","YAKUTİYE"],
"ESKİŞEHİR": ["ODUNPAZARI/ESKİŞEHİR","SİVRİHİSAR/ESKİŞEHİR","ODUNPAZARVESKİŞEHİR","ESKİSEHİR","ALPU","BEYLİKOVA","ÇİFTELER","GÜNYÜZÜ","HAN","İNÖNÜ","MAHMUDİYE","MİHALGAZİ","MİHALIÇÇIK","ODUNPAZARI","SARICAKAYA","SEYİTGAZİ","SİVRİHİSAR","TEPEBAŞI"],
"GAZİANTEP": ["ARABAN","İSLAHİYE","KARKAMIŞ","NİZİP","NURDAĞI","OĞUZELİ","ŞAHİNBEY","ŞEHİTKAMİL","YAVUZELİ"],
"GİRESUN": ["ALUCRA","BULANCAK","ÇAMOLUK","ÇANAKÇI","DERELİ","DOĞANKENT","ESPİYE","EYNESİL","GÖRELE","GÜCE","KEŞAP","PİRAZİZ","ŞEBİNKARAHİSAR","TİREBOLU","YAĞLIDERE"],
"GÜMÜŞHANE": ["GÜMÜŞHAN","KELKİT","KÖSE","KÜRTÜN","ŞİRAN","TORUL"],
"HAKKARİ": ["ÇUKURCA","DERECİK","ŞEMDİNLİ","YÜKSEKOVA"],
"HATAY": ["ISKENDERUN","İSKENDERUN","ERZİN/HATAY","ALTINÖZÜ","ANTAKYA","ARSUZ","BELEN","DEFNE","DÖRTYOL","ERZİN","HASSA","İSKENDERUN","KIRIKHAN","KUMLU","PAYAS","REYHANLI","SAMANDAĞ","YAYLADAĞI"],
"IĞDIR": ["ARALIK","KARAKOYUNLU","TUZLUCA"],
"İZMİR": ["İZMİR FOÇA","ÇİĞLİ","ÇEŞME","URLA","TORBALI","SELÇUK","SEFERİHİSAR","NARLIDERE","MENEMEN","MENDERES","KINIK","KARŞIYAKA","IZMİR","GÜZELBAHÇE","GAZİEMİR","DİKİLİ","BURUNCUK MAHALLESİ","BORNOVA","BERGAMA","BALÇOVA"],
"ISPARTA": ["AKSU","ATABEY","EĞİRDİR","GELENDOST","GÖNEN","KEÇİBORLU","SENİRKENT","SÜTÇÜLER","ŞARKİKARAAĞAÇ","ULUBORLU","YALVAÇ","YENİŞARBADEMLİ"],
"KAHRAMANMARAŞ": ["AFŞİN","ANDIRIN","ÇAĞLAYANCERİT","DULKADİROĞLU","EKİNÖZÜ","ELBİSTAN","GÖKSUN","NURHAK","ONİKİŞUBAT","PAZARCIK","TÜRKOĞLU"],
"KARABÜK": ["EFLANİ","ESKİPAZAR","OVACIK","SAFRANBOLU","YENİCE"],
"KARAMAN": ["AYRANCI","BAŞYAYLA","ERMENEK","KAZIMKARABEKİR","SARIVELİLER"],
"KARS": ["AKYAKA","ARPAÇAY","DİGOR","KAĞIZMAN","SARIKAMIŞ","SELİM","SUSUZ"],
"KASTAMONU": ["MERKEZ/KASTAMONU","ABANA","AĞLI","ARAÇ","AZDAVAY","BOZKURT","CİDE","ÇATALZEYTİN","DADAY","DEVREKANİ","DOĞANYURT","HANÖNÜ","İHSANGAZİ","İNEBOLU","KÜRE","PINARBAŞI","SEYDİLER","ŞENPAZAR","TAŞKÖPRÜ","TOSYA"],
"KAYSERİ": ["TALAS/KAYSERİ","MELİKGAZİ/KAYSERİ","MELİKGAZİ /KAYSERİ","MELİKGAZİ / KAYSERİ","KOCASİNAN /KAYSERİ","KOCASİNAN/KAYSERİ","AKKIŞLA","BÜNYAN","DEVELİ","FELAHİYE","HACILAR","İNCESU","KOCASİNAN","MELİKGAZİ","ÖZVATAN","PINARBAŞI","SARIOĞLAN","SARIZ","TALAS","TOMARZA","YAHYALI","YEŞİLHİSAR"],
"KIRIKKALE": ["BAHŞILI","BALIŞEYH","ÇELEBİ","DELİCE","KARAKEÇİLİ","KESKİN","SULAKYURT","YAHŞİHAN"],
"KIRKLARELİ": ["BABAESKİ","DEMİRKÖY","KOFÇAZ","LÜLEBURGAZ","PEHLİVANKÖY","PINARHİSAR","VİZE"],
"KIRŞEHİR": ["AKÇAKENT","AKPINAR","BOZTEPE","ÇİÇEKDAĞI","KAMAN","MUCUR"],
"KİLİS": ["ELBEYLİ","MUSABEYLİ","POLATELİ"],
"KOCAELİ": ["BAŞİSKELE","ÇAYIROVA","DARICA","DERİNCE","DİLOVASI","GEBZE","GÖLCÜK","İZMİT","KANDIRA","KARAMÜRSEL","KARTEPE","KÖRFEZ"],
"KONYA": ["AHIRLI","AKÖREN","AKŞEHİR","ALTINEKİN","BEYŞEHİR","BOZKIR","CİHANBEYLİ","ÇELTİK","ÇUMRA","DERBENT","DEREBUCAK","DOĞANHİSAR","EMİRGAZİ","EREĞLİ","GÜNEYSINIR","HADİM","HALKAPINAR","HÜYÜK","ILGIN","KADINHANI","KARAPINAR","KARATAY","KULU","MERAM","SARAYÖNÜ","SELÇUKLU","SEYDİŞEHİR","TAŞKENT","TUZLUKÇU","YALIHÜYÜK","YUNAK"],
"KÜTAHYA": ["KUTAHYA","ALTINTAŞ","ASLANAPA","ÇAVDARHİSAR","DOMANİÇ","DUMLUPINAR","EMET","GEDİZ","HİSARCIK","PAZARLAR","SİMAV","ŞAPHANE","TAVŞANLI"],
"MALATYA": ["AKÇADAĞ","ARAPGİR","ARGUVAN","BATTALGAZİ","DARENDE","DOĞANŞEHİR","DOĞANYOL","HEKİMHAN","KALE","KULUNCAK","PÜTÜRGE","YAZIHAN","YEŞİLYURT"],
"MANİSA": ["ALİAĞA","AHMETLİ","AKHİSAR","ALAŞEHİR","DEMİRCİ","GÖLMARMARA","GÖRDES","KIRKAĞAÇ","KÖPRÜBAŞI","KULA","SALİHLİ","SARIGÖL","SARUHANLI","SELENDİ","SOMA","ŞEHZADELER","TURGUTLU","YUNUSEMRE"],
"MARDİN": ["ARTUKLU","DARGEÇİT","DERİK","KIZILTEPE","MAZIDAĞI","MİDYAT","NUSAYBİN","ÖMERLİ","SAVUR","YEŞİLLİ"],
"MERSİN": ["TAŞUCU","AKDENİZ","ANAMUR","AYDINCIK","BOZYAZI","ÇAMLIYAYLA","ERDEMLİ","GÜLNAR","MEZİTLİ","MUT","SİLİFKE","TARSUS","TOROSLAR","YENİŞEHİR"],
"MUĞLA": ["UĞLA","MUGLA","GÜVERCİNLİK","BODRUM","DALAMAN","DATÇA","FETHİYE","KAVAKLIDERE","KÖYCEĞİZ","MARMARİS","MENTEŞE","MİLAS","ORTACA","SEYDİKEMER","ULA","YATAĞAN"],
"MUŞ": ["BULANIK","HASKÖY","KORKUT","MALAZGİRT","VARTO"],
"NEVŞEHİR": ["ACIGÖL","AVANOS","DERİNKUYU","GÜLŞEHİR","HACIBEKTAŞ","KOZAKLI","ÜRGÜP"],
"NİĞDE": ["ALTUNHİSAR","BOR","ÇAMARDI","ÇİFTLİK","ULUKIŞLA"],
"ORDU": ["AKKUŞ","ALTINORDU","AYBASTI","ÇAMAŞ","ÇATALPINAR","ÇAYBAŞI","FATSA","GÖLKÖY","GÜLYALI","GÜRGENTEPE","İKİZCE","KABADÜZ","KABATAŞ","KORGAN","KUMRU","MESUDİYE","PERŞEMBE","ULUBEY","ÜNYE"],
"OSMANİYE": ["BAHÇE","DÜZİÇİ","HASANBEYLİ","KADİRLİ","SUMBAS","TOPRAKKALE"],
"RİZE": ["ARDEŞEN","ÇAMLIHEMŞİN","ÇAYELİ","DEREPAZARI","FINDIKLI","GÜNEYSU","HEMŞİN","İKİZDERE","İYİDERE","KALKANDERE","PAZAR"],
"SAKARYA": ["ADAPAZARI","AKYAZI","ARİFİYE","ERENLER","FERİZLİ","GEYVE","HENDEK","KARAPÜRÇEK","KARASU","KAYNARCA","KOCAALİ","PAMUKOVA","SAPANCA","SERDİVAN","SÖĞÜTLÜ","TARAKLI"],
"SAMSUN": ["ALAÇAM","ASARCIK","ATAKUM","AYVACIK","BAFRA","CANİK","ÇARŞAMBA","HAVZA","İLKADIM","KAVAK","LADİK","SALIPAZARI","TEKKEKÖY","TERME","VEZİRKÖPRÜ","YAKAKENT","19 MAYIS"],
"SİİRT": ["AYDINLAR","BAYKAN","ERUH","KURTALAN","PERVARİ","ŞİRVAN","TİLLO"],
"SİNOP": ["AYANCIK","BOYABAT","DİKMEN","DURAĞAN","ERFELEK","GERZE","SARAYDÜZÜ","TÜRKELİ"],
"SİVAS": ["AKINCILAR","ALTINYAYLA","DİVRİĞİ","DOĞANŞAR","GEMEREK","GÖLOVA","GÜRÜN","HAFİK","İMRANLI","KANGAL","KOYULHİSAR","SUŞEHRİ","ŞARKIŞLA","ULAŞ","YILDIZELİ","ZARA"],
"ŞANLIURFA": ["AKÇAKALE","BİRECİK","BOZOVA","CEYLANPINAR","EYYÜBİYE","HALFETİ","HALİLİYE","HARRAN","HİLVAN","KARAKÖPRÜ","SİVEREK","SURUÇ","VİRANŞEHİR"],
"ŞIRNAK": ["BEYTÜŞŞEBAP","CİZRE","GÜÇLÜKONAK","İDİL","SİLOPİ","ULUDERE"],
"TEKİRDAĞ": ["ÇERKEZKÖY","ÇORLU","ERGENE","HAYRABOLU","KAPAKLI","MALKARA","MARMARAEREĞLİSİ","MURATLI","SARAY","SÜLEYMANPAŞA","ŞARKÖY"],
"TOKAT": ["ALMUS","ARTOVA","BAŞÇİFTLİK","ERBAA","NİKSAR","PAZAR","REŞADİYE","SULUSARAY","TURHAL","YEŞİLYURT","ZİLE"],
"TRABZON": ["KARADENİZ BÖLGESİ","AKÇAABAT","ARAKLI","ARSİN","BEŞİKDÜZÜ","ÇARŞIBAŞI","ÇAYKARA","DERNEKPAZARI","DÜZKÖY","HAYRAT","KÖPRÜBAŞI","MAÇKA","OF","ORTAHİSAR","SÜRMENE","ŞALPAZARI","TONYA","VAKFIKEBİR","YOMRA"],
"TUNCELİ": ["ÇEMİŞGEZEK","HOZAT","MAZGİRT","NAZIMİYE","OVACIK","PERTEK","PÜLÜMÜR"],
"UŞAK": ["USAK","BANAZ","EŞME","KARAHALLI","SİVASLI","ULUBEY"],
"VAN": ["BAHÇESARAY","BAŞKALE","ÇALDIRAN","ÇATAK","EDREMİT","ERCİŞ","GEVAŞ","GÜRPINAR","İPEKYOLU","MURADİYE","ÖZALP","SARAY","TUŞBA"],
"YALOVA": ["ALTINOVA","ARMUTLU","ÇINARCIK","ÇİFTLİKKÖY","TERMAL"],
"YOZGAT": ["AKDAĞMADENİ","AYDINCIK","BOĞAZLIYAN","ÇANDIR","ÇAYIRALAN","ÇEKEREK","KADIŞEHRİ","SARAYKENT","SARIKAYA","ŞEFAATLİ","SORGUN","YENİFAKILI","YERKÖY"],
"ZONGULDAK": ["ALAPLI","ÇAYCUMA","DEVREK","EREĞLİ","GÖKÇEBEY","KİLİMLİ","KOZLU","MERKEZ"],
"AKSARAY": ["AĞAÇÖREN","ESKİL","GÜLAĞAÇ","GÜZELYURT","ORTAKÖY","SARIYAHŞİ","SULTANHANI"],
"KIRIKKALE": ["BAHŞILI","BALIŞEYH","ÇELEBİ","DELİCE","KARAKEÇİLİ","KESKİN","SULAKYURT","YAHŞİHAN"]
};

// Sunucuyu yormamak için bekleme fonksiyonu
const bekle = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function run() {
    console.log("🌍 Seçili 16 odak ülke için veri çekme işlemi başlıyor...\n");
    
    let globalVeriler = [];
    const ulkeListesi = Object.keys(ulkeKodlari);
    let sayac = 0;

    try {
        for (const turkceUlkeAdi of ulkeListesi) {
            sayac++;
            const isoKodu = ulkeKodlari[turkceUlkeAdi];
            
            console.log(`[${sayac}/${ulkeListesi.length}] ⏳ ${turkceUlkeAdi} (${isoKodu}) taranıyor...`);
            
            // Her ülke için en fazla 2000 istasyon çekerek haritayı temiz ve hızlı tutuyoruz
            const URL = `https://api.openchargemap.io/v3/poi/?output=json&countrycode=${isoKodu}&maxresults=1000000&key=${API_KEY}`;
            
            const res = await fetch(URL);
            if (!res.ok) {
                console.log(`   ❌ Hata oluştu, bu ülke atlanıyor.`);
                continue; 
            }
            
            const data = await res.json();
            
            if(data.length > 0) {
                console.log(`   ✅ ${data.length} istasyon bulundu.`);
                
                // Gelen verileri ayıklama
                data.forEach(item => {
                    if (item.AddressInfo && item.AddressInfo.Latitude != null && item.AddressInfo.Longitude != null) {
                        let maxGuc = 0;
                        let akimTurleri = [];
                        let soketler = [];
                        let toplamNokta = item.NumberOfPoints || 0; 

                        if (item.Connections) {
                            item.Connections.forEach(conn => {
                                if (conn.PowerKW && conn.PowerKW > maxGuc) maxGuc = conn.PowerKW;
                                if (conn.CurrentType && conn.CurrentType.Title && !akimTurleri.includes(conn.CurrentType.Title)) {
                                    akimTurleri.push(conn.CurrentType.Title.replace(" (Single Phase)", "").replace(" (Three Phase)", ""));
                                }
                                if (conn.ConnectionType && conn.ConnectionType.Title && !soketler.includes(conn.ConnectionType.Title)) {
                                    soketler.push(conn.ConnectionType.Title);
                                }
                                if (toplamNokta === 0 && conn.Quantity) {
                                    toplamNokta += conn.Quantity;
                                }
                            });
                        }

                        let akimSonuc = akimTurleri.join("/");
                        if (akimSonuc.includes("AC") && akimSonuc.includes("DC")) akimSonuc = "AC/DC";
                        if (akimSonuc === "") akimSonuc = "AC"; 
                        if (toplamNokta === 0) toplamNokta = "Bilinmiyor"; 

                        let sehirBilgisi = item.AddressInfo.StateOrProvince || item.AddressInfo.Town || "BİLİNMİYOR";
                        sehirBilgisi = String(sehirBilgisi).trim().toLocaleUpperCase('tr-TR');

                        // =======================================================
                        // EĞER ÇEKİLEN ÜLKE TÜRKİYE İSE, İLÇELERİ TEMİZLE!
                        // =======================================================
                        if (turkceUlkeAdi === "Türkiye") {
                            for (const [ilAdi, ilcelerListesi] of Object.entries(sehirIlceListesi)) {
                                if (ilcelerListesi.includes(sehirBilgisi)) {
                                    sehirBilgisi = ilAdi; 
                                    break; 
                                }
                            }
                        }

                        globalVeriler.push({
                            id: item.ID,
                            marka: item.OperatorInfo ? item.OperatorInfo.Title : "Bilinmeyen Operatör",
                            koordinat: [item.AddressInfo.Latitude, item.AddressInfo.Longitude],
                            ulke: turkceUlkeAdi.toUpperCase(), // Ülke adını menü için büyük harfle yaz
                            sehir: sehirBilgisi,
                            ozellikler: {
                                guc: maxGuc > 0 ? maxGuc + " kW" : "22 kW", 
                                akimTuru: akimSonuc,
                                konnektor: soketler.length > 0 ? soketler.join(", ") : "Tip 2",
                                noktaSayisi: toplamNokta
                            }
                        });
                    }
                });
            } else {
                console.log(`   ➖ İstasyon bulunamadı.`);
            }

            // API Bizi banlamasın diye her ülke arasında 1 saniye bekle
            await bekle(1000); 
        }

        console.log("\n🔄 Veriler derleniyor...");
        
        const jsDosyaIcerigi = `const istasyonVerileri = ${JSON.stringify(globalVeriler, null, 4)};`;
        fs.writeFileSync("veriler.js", jsDosyaIcerigi);
        
        console.log(`\n🎉 GÖREV TAMAMLANDI!`);
        console.log(`💾 Toplam ${globalVeriler.length} adet uluslararası istasyon başarıyla kaydedildi.`);

    } catch (hata) {
        console.error("\n❌ Veri çekilirken bir hata oluştu:", hata);
    }
}

run();