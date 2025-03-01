# MODLOFF Programlama Dili

MODLOFF, Node.js üzerinde çalışan, Türkçe anahtar kelimeler kullanan modern bir programlama dilidir.

## Kurulum

```bash
npm install
npm link  # CLI aracını global olarak kullanılabilir yapar
```

## Özellikler

- 🇹🇷 Türkçe anahtar kelimeler
- 🚀 Node.js ile tam uyumluluk
- 📦 Modern JavaScript özellikleri
- 🎯 Kolay ve anlaşılır sözdizimi
- 🛠️ Yerleşik web sunucusu desteği
- 🔧 Debug modu
- 📁 Proje oluşturma araçları
- 📦 Özel paket yönetim sistemi

## Komutlar

```bash
# Temel Komutlar
modloff run <dosya>      # MODLOFF dosyasını çalıştır
modloff new <proje>      # Yeni proje oluştur
modloff list [dizin]     # Dosyaları listele
modloff info             # Bilgi göster
modloff --version        # Versiyon göster

# Paket Yönetimi
modloff ekle <paket>     # Yeni paket ekle
modloff kaldir <paket>   # Paket kaldır
modloff yukle           # Tüm bağımlılıkları yükle
```

### Komut Seçenekleri

- `run` komutu için:
  - `-d, --debug`: Hata ayıklama modunda çalıştır
- `list` komutu için:
  - `-r, --recursive`: Alt dizinleri de tara
- `ekle` komutu için:
  - `-k, --kaydet`: Paketi modloff.json dosyasına kaydet
- `kaldir` komutu için:
  - `-k, --kaydet`: Paketi modloff.json dosyasından da kaldır

## Paket Yönetimi

MODLOFF, kendi paket yönetim sistemini kullanır. Paketler `modloff.json` dosyasında saklanır.

### Örnek modloff.json
```json
{
  "paketler": {},
  "bagimliliklar": {
    "express": "^4.18.2",
    "chalk": "^4.1.2"
  }
}
```

### Paket Yönetimi Örnekleri
```bash
# Express paketini ekle ve modloff.json'a kaydet
modloff ekle express -k

# Chalk paketini kaldır ve modloff.json'dan sil
modloff kaldir chalk -k

# Tüm bağımlılıkları yükle
modloff yukle
```

## Anahtar Kelimeler

### Temel İşlemler
- `yazdir` → console.log
- `yaz` → console.log
- `oku` → prompt

### Değişkenler ve Veri Tipleri
- `degisken` → let
- `sabit` → const
- `dizi` → Array
- `nesne` → Object
- `metin` → String
- `sayi` → Number
- `mantiksal` → Boolean

### Boolean Değerler
- `dogru` → true
- `yanlis` → false
- `bos` → null
- `tanimsiz` → undefined

### Kontrol Yapıları
- `eger` → if
- `degilse` → else
- `yoksa` → else
- `ve` → &&
- `veya` → ||
- `degildir` → !

### Döngüler
- `dongu` → for
- `iken` → while
- `her` → forEach

### Fonksiyonlar
- `fonksiyon` → function
- `geriDon` → return
- `devam` → continue
- `dur` → break

### Sınıf Yapıları
- `sinif` → class
- `yeniNesne` → new
- `kalitim` → extends
- `kapsulleme` → private
- `genel` → public
- `statik` → static
- `ust` → super

### Hata Yönetimi
- `dene` → try
- `yakala` → catch
- `sonunda` → finally
- `hataFirlat` → throw

### Modül Sistemi
- `disaAktar` → export
- `iceAktar` → import
- `varsayilan` → default

### Asenkron İşlemler
- `bekle` → await
- `esZamanli` → async

## Örnek Kodlar

### Basit Örnek
```modloff
// Değişken tanımlama
degisken mesaj = "Merhaba Dünya!";
yazdir(mesaj);

// Fonksiyon tanımlama
fonksiyon selamla(isim) {
    geriDon "Merhaba, " + isim + "!";
}

// Koşul yapısı
eger (mesaj.length > 5) {
    yazdir("Uzun mesaj");
} degilse {
    yazdir("Kısa mesaj");
}
```

### Web Sunucusu Örneği
```modloff
sabit express = require('express');
sabit uygulama = express();

uygulama.get('/', fonksiyon(istek, yanit) {
    yanit.send('Merhaba MODLOFF!');
});

uygulama.listen(3000, fonksiyon() {
    yazdir('Web sunucusu çalışıyor: http://localhost:3000');
});
```

## Proje Yapısı

Yeni bir proje oluşturduğunuzda (`modloff new proje-adi`), aşağıdaki yapı oluşturulur:

```
proje-adi/
├── src/
│   └── main.modloff
└── README.md
```

## Geliştirme

MODLOFF sürekli gelişmekte olan bir dildir. Katkıda bulunmak için:

1. Bu depoyu fork edin
2. Yeni bir branch oluşturun (`git checkout -b yeni-ozellik`)
3. Değişikliklerinizi commit edin (`git commit -am 'Yeni özellik eklendi'`)
4. Branch'inizi push edin (`git push origin yeni-ozellik`)
5. Pull Request oluşturun

## Lisans

MIT 