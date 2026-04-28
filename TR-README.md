# Elektrikli Araç (EV) Şarj İstasyonları Haritası

Bu proje, açık kaynaklı verileri kullanarak dünya çapındaki elektrikli araç şarj istasyonlarını harita üzerinde gösteren, akıllı filtreleme sistemine sahip bir web uygulamasıdır. 

Sistem iki parçadan oluşur: Verileri çekip coğrafi hataları düzelten akıllı bir **Node.js Botu** ve bu verileri kullanıcıya şık bir şekilde sunan **Leaflet.js tabanlı Arayüz**.

---

##  Kurulum ve Kullanım (Geliştiriciler İçin)                                    

-Projeyi kendi bilgisayarınızda çalıştırmak ve güncel verileri çekmek için aşağıdaki adımları izleyin.

### 1. Gereksinimler (Prerequisites)
-Veri çekme botunu (veri-botu.js) çalıştırabilmeniz için bilgisayarınızda **Node.js** yüklü olmalıdır.
(LTS versiyonunu kurmanız tavsiye edilir).

#### 2. API Anahtarını Al
-Open Charge Map üzerinden ücretsiz API anahtarınızı alın
-API anahtarını veri-botu.js dosyasında dördüncü satırdaki gerekli yere yapıştırın

##### 3. Projeyi İndirin
-Projeyi dosyalarını bilgisayarınıza klonlayın veya ZIP olarak indirin:   
-index.html , veri-botu.js , veriler.js dosyalarını bir kalasörün içine koyun.
-Klasör içinde PoweShell penceresini açın ve "npm install @turf/turf" yazıp enter bas
-veri-botu.js dosyasını çalıştırmak için yine klasör içinde açtığımız PowerShell de "node veri-botu.js" yazıp enter bas
-Tüm verileri yaklaşık 1-2 dakika içinde çekip filtreleyerek veriler .js dosyasının içine tüm veriler gelmiş olacak 

#### ÇALIŞTIR
-index.html dosyasını çift tıklayarak açtıktan sonra haritayı görüntüleyebilirsiniz.

##### NOT
-veri-botu.js dosyasında oynaa yaparak daha fazla ülkeden veri çekebilirsiniz
