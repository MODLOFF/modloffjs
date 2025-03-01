# 📚 MODLOFF Programlama Dili Dokümantasyonu

## 📥 Kurulum

### Windows için Kurulum
1. `install-modloff.bat` dosyasını indirin
2. Dosyaya çift tıklayın
3. Kurulum otomatik olarak tamamlanacaktır

### Gereksinimler
- Node.js (v12 veya üzeri)
- Git

### Manuel Kurulum
```bash
git clone https://github.com/MODLOFF/modloffjs.git
cd modloff
npm install
npm link
```

## 🚀 Başlangıç

### İlk MODLOFF Projesi
```bash
# Yeni proje oluştur
modloff new ilk-proje

# Proje dizinine git
cd ilk-proje

# Projeyi çalıştır
modloff run src/main.modloff
```

### Örnek Kod
```modloff
// Değişken tanımlama
degisken mesaj = "Merhaba MODLOFF!";
yazdir(mesaj);

// Fonksiyon tanımlama
fonksiyon selamla(isim) {
    geriDon "Merhaba, " + isim + "!";
}

// Koşul yapısı
eger (mesaj.length > 10) {
    yazdir("Uzun mesaj");
} degilse {
    yazdir("Kısa mesaj");
}
```

## 📦 Paket Yönetimi

### Paket Komutları
```bash
# Paket ekle
modloff ekle express -k

# Paket kaldır
modloff kaldir express -k

# Tüm bağımlılıkları yükle
modloff yukle
```

### modloff.json Örneği
```json
{
  "paketler": {},
  "bagimliliklar": {
    "express": "^4.18.2",
    "chalk": "^4.1.2"
  }
}
```

## 🔍 Komut Referansı

### Temel Komutlar
| Komut | Açıklama | Seçenekler |
|-------|----------|------------|
| `modloff run <dosya>` | MODLOFF dosyasını çalıştır | `-d, --debug`: Hata ayıklama modu |
| `modloff new <proje>` | Yeni proje oluştur | - |
| `modloff list [dizin]` | Dosyaları listele | `-r, --recursive`: Alt dizinleri tara |
| `modloff info` | Dil bilgilerini göster | - |
| `modloff --version` | Versiyon bilgisi | - |

### Paket Komutları
| Komut | Açıklama | Seçenekler |
|-------|----------|------------|
| `modloff ekle <paket>` | Paket ekle | `-k, --kaydet`: modloff.json'a kaydet |
| `modloff kaldir <paket>` | Paket kaldır | `-k, --kaydet`: modloff.json'dan kaldır |
| `modloff yukle` | Bağımlılıkları yükle | - |

## 📝 Dil Referansı

### Temel İşlemler
```modloff
yazdir("Mesaj");  // Console.log
yaz("Mesaj");     // Console.log alternatifi
oku();            // Kullanıcıdan girdi al
```

### Değişkenler ve Veri Tipleri
```modloff
degisken x = 42;        // let
sabit PI = 3.14;        // const
degisken dizi = [1,2];  // Array
degisken nesne = {};    // Object
```

### Kontrol Yapıları
```modloff
eger (kosul) {
    // kod
} degilse {
    // kod
}

dongu (degisken i = 0; i < 10; i++) {
    // kod
}

iken (kosul) {
    // kod
}
```

### Fonksiyonlar
```modloff
fonksiyon topla(a, b) {
    geriDon a + b;
}

// Ok fonksiyonu
degisken carp = (a, b) => a * b;
```

### Sınıflar
```modloff
sinif Araba {
    yapici(marka, model) {
        this.marka = marka;
        this.model = model;
    }

    bilgiGoster() {
        yazdir(this.marka + " " + this.model);
    }
}
```

### Hata Yönetimi
```modloff
dene {
    // riskli kod
} yakala (hata) {
    yazdir("Hata:", hata);
} sonunda {
    // her durumda çalışacak kod
}
```

## 🌐 Web Sunucusu Örneği
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

## 🔧 Hata Ayıklama

### Debug Modu
```bash
modloff run dosya.modloff -d
```

Debug modunda:
- Daha detaylı hata mesajları
- Değişken değerlerini izleme
- Çalışma zamanı bilgileri

## 📁 Proje Yapısı

Tipik bir MODLOFF projesi:
```
proje-adi/
├── src/
│   ├── main.modloff
│   └── moduller/
├── modloff.json
└── README.md
```

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun
3. Değişikliklerinizi commit edin
4. Branch'inizi push edin
5. Pull Request açın

## 📄 Lisans

MIT Lisansı altında dağıtılmaktadır.

## 🆘 Yardım ve Destek

- GitHub Issues: [https://github.com/MODLOFF/modloffjs/issues](https://github.com/MODLOFF/modloffjs/issues)
- E-posta: destek@modloff.com

## 🔄 Sürüm Geçmişi

### v1.0.0
- İlk kararlı sürüm
- Temel dil özellikleri
- Paket yönetim sistemi
- Web sunucusu desteği 