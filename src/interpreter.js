const vm = require('vm');
const path = require('path');

// JavaScript özel kelimeleri
const JS_KEYWORDS = {
  'const': true,
  'true': true,
  'false': false,
  'null': null,
  'undefined': undefined,
  'this': this,
  'new': 'new',
  'class': 'class',
  'extends': 'extends',
  'static': 'static',
  'super': 'super',
  'import': 'import',
  'export': 'export',
  'default': 'default',
  'try': 'try',
  'catch': 'catch',
  'finally': 'finally',
  'throw': 'throw'
};

// Node.js global değişkenleri
const NODE_GLOBALS = {
  __dirname: process.cwd(),
  __filename: 'app.modloff',
  module: module,
  exports: exports,
  global: global,
  process: process
};

// Modloff dili anahtar kelimeleri
const KEYWORDS = {
  // Temel işlemler
  yazdir: 'console.log',
  yaz: 'console.log',
  oku: 'prompt',
  
  // Değişken ve veri tipleri
  degisken: 'let',
  sabit: 'const',
  dizi: 'Array',
  nesne: 'Object',
  metin: 'String',
  sayi: 'Number',
  mantiksal: 'Boolean',
  
  // Boolean değerler
  dogru: 'true',
  yanlis: 'false',
  bos: 'null',
  tanimsiz: 'undefined',
  
  // Kontrol yapıları
  eger: 'if',
  degilse: 'else',
  yoksa: 'else',
  ve: '&&',
  veya: '||',
  degildir: '!',
  
  // Döngüler
  dongu: 'for',
  iken: 'while',
  her: 'forEach',
  
  // Fonksiyonlar
  fonksiyon: 'function',
  geriDon: 'return',
  devam: 'continue',
  dur: 'break',
  
  // Sınıf yapıları
  sinif: 'class',
  yeniNesne: 'new',
  kalitim: 'extends',
  kapsulleme: 'private',
  genel: 'public',
  statik: 'static',
  ust: 'super',
  
  // Hata yönetimi
  dene: 'try',
  yakala: 'catch',
  sonunda: 'finally',
  hataFirlat: 'throw',
  
  // Modül sistemi
  disaAktar: 'export',
  iceAktar: 'import',
  varsayilan: 'default',
  
  // Asenkron işlemler
  bekle: 'await',
  esZamanli: 'async'
};

function translateToJavaScript(modloffCode) {
  let jsCode = modloffCode;

  // Modloff anahtar kelimelerini JavaScript karşılıklarına çevir
  Object.entries(KEYWORDS).forEach(([modloffKeyword, jsKeyword]) => {
    const regex = new RegExp(`\\b${modloffKeyword}\\b`, 'g');
    jsCode = jsCode.replace(regex, jsKeyword);
  });

  return jsCode;
}

function runModloff(code, filePath = 'app.modloff') {
  try {
    // Node.js yerleşik modüllerine erişim sağla
    const context = {
      console,
      require,
      process,
      Buffer,
      setTimeout,
      setInterval,
      clearTimeout,
      clearInterval,
      Array,
      Object,
      String,
      Number,
      Boolean,
      Error,
      Promise,
      JSON,
      Math,
      Date,
      ...JS_KEYWORDS, // JavaScript özel kelimelerini context'e ekle
      ...NODE_GLOBALS, // Node.js global değişkenlerini ekle
      __dirname: path.dirname(path.resolve(filePath)), // Doğru dizin yolunu ayarla
      __filename: path.resolve(filePath) // Tam dosya yolunu ayarla
    };

    // Modloff kodunu JavaScript'e çevir
    const jsCode = translateToJavaScript(code);

    // Kodu çalıştır
    const script = new vm.Script(jsCode);
    const vmContext = vm.createContext(context);
    script.runInContext(vmContext);
  } catch (error) {
    throw new Error(`Modloff çalıştırma hatası: ${error.message}`);
  }
}

module.exports = { runModloff }; 