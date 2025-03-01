#!/usr/bin/env node

const { program } = require('commander');
const { readFileSync, readdirSync, writeFileSync, existsSync, mkdirSync, unlinkSync } = require('fs');
const { runModloff } = require('./interpreter');
const chalk = require('chalk');
const path = require('path');
const { execSync } = require('child_process');

// Modloff ASCII logo
const logo = `
Developed by MODLOFF
`;

const welcomeMessage = `
🚀 Modloff Programlama Dili v1.0.0
📝 Türkçe Anahtar Kelimelerle Programlama
`;

// Dosya ikonları
const fileIcons = {
    running: '🚀',
    success: '✅',
    error: '❌',
    file: '📄',
    folder: '📁',
    new: '✨',
    config: '⚙️'
};

program
    .version(chalk.cyan('Modloff v1.0.0'), '-v, --version')
    .description(chalk.yellow('Modloff programlama dili yorumlayıcısı'));

program
    .command('run <file>')
    .description('Modloff dosyasını çalıştır')
    .option('-d, --debug', 'Hata ayıklama modunda çalıştır')
    .action((file, options) => {
        try {
            console.log(chalk.cyan(logo));
            console.log(chalk.yellow(welcomeMessage));
            
            if (!file.endsWith('.modloff')) {
                console.error(chalk.red(`${fileIcons.error} Hata: Dosya .modloff uzantılı olmalıdır`));
                process.exit(1);
            }

            // Dosya yolunu tam yola çevir
            const fullPath = path.resolve(file);

            console.log(chalk.yellow(`${fileIcons.running} Çalıştırılıyor: ${file}\n`));
            const content = readFileSync(fullPath, 'utf-8');
            
            if (options.debug) {
                console.log(chalk.blue('\n🔍 Debug Modu Aktif\n'));
            }
            
            // Dosya yolunu interpreter'a ilet
            runModloff(content, fullPath);
            console.log(chalk.green(`\n${fileIcons.success} Program başarıyla tamamlandı!`));
        } catch (error) {
            console.error(chalk.red(`${fileIcons.error} Hata: ${error.message}`));
            process.exit(1);
        }
    });

program
    .command('new <name>')
    .description('Yeni bir Modloff projesi oluştur')
    .action((name) => {
        try {
            console.log(chalk.cyan(logo));
            const projectPath = path.join(process.cwd(), name);
            
            // Proje klasörünü oluştur
            const fs = require('fs');
            if (!fs.existsSync(projectPath)) {
                fs.mkdirSync(projectPath);
                fs.mkdirSync(path.join(projectPath, 'src'));
                
                // Örnek dosya oluştur
                const exampleCode = `// Modloff Örnek Dosya
yazdir("Merhaba, Modloff!");

degisken sayi = 42;
eger (sayi > 40) {
    yazdir("Sayı 40'tan büyük!");
}`;
                
                writeFileSync(path.join(projectPath, 'src', 'main.modloff'), exampleCode);
                
                // README oluştur
                const readme = `# ${name}

Bu bir Modloff projesidir.

## Çalıştırma

\`\`\`bash
modloff run src/main.modloff
\`\`\`
`;
                writeFileSync(path.join(projectPath, 'README.md'), readme);
                
                console.log(chalk.green(`${fileIcons.new} Yeni Modloff projesi oluşturuldu: ${name}`));
                console.log(chalk.yellow('\nProjeyi çalıştırmak için:'));
                console.log(chalk.white(`cd ${name}`));
                console.log(chalk.white('modloff run src/main.modloff'));
            } else {
                console.error(chalk.red(`${fileIcons.error} Hata: ${name} klasörü zaten mevcut`));
            }
        } catch (error) {
            console.error(chalk.red(`${fileIcons.error} Hata: ${error.message}`));
            process.exit(1);
        }
    });

program
    .command('list [directory]')
    .description('Dizindeki Modloff dosyalarını listele')
    .option('-r, --recursive', 'Alt dizinleri de tara')
    .action((directory = '.', options) => {
        try {
            console.log(chalk.cyan(logo));
            console.log(chalk.yellow(`${fileIcons.folder} Dizin: ${directory}\n`));
            
            function listFiles(dir) {
                const files = readdirSync(dir, { withFileTypes: true });
                files.forEach(file => {
                    const fullPath = path.join(dir, file.name);
                    if (file.isDirectory() && options.recursive) {
                        console.log(chalk.blue(`\n${fileIcons.folder} ${fullPath}`));
                        listFiles(fullPath);
                    } else if (file.name.endsWith('.modloff')) {
                        console.log(chalk.green(`${fileIcons.file} ${fullPath}`));
                    }
                });
            }
            
            listFiles(directory);
        } catch (error) {
            console.error(chalk.red(`${fileIcons.error} Hata: ${error.message}`));
            process.exit(1);
        }
    });

program
    .command('info')
    .description('Modloff dili hakkında bilgi')
    .action(() => {
        console.log(chalk.cyan(logo));
        console.log(chalk.yellow('Modloff Programlama Dili Bilgileri:'));
        console.log(chalk.white('\nAnahtar Kelimeler:'));
        console.log(chalk.green('- yazdir    → console.log'));
        console.log(chalk.green('- yaz       → console.log'));
        console.log(chalk.green('- degisken  → let'));
        console.log(chalk.green('- sabit     → const'));
        console.log(chalk.green('- eger      → if'));
        console.log(chalk.green('- degilse   → else'));
        console.log(chalk.green('- dongu     → for'));
        console.log(chalk.green('- iken      → while'));
        console.log(chalk.green('- fonksiyon → function'));
        console.log(chalk.green('- sinif     → class'));
        console.log(chalk.green('- dene      → try'));
        console.log(chalk.green('- yakala    → catch'));
        
        console.log(chalk.white('\nKomutlar:'));
        console.log(chalk.green('- modloff run <dosya>     → Modloff dosyasını çalıştır'));
        console.log(chalk.green('- modloff new <proje>     → Yeni proje oluştur'));
        console.log(chalk.green('- modloff list [dizin]    → Dosyaları listele'));
        console.log(chalk.green('- modloff info            → Bilgi göster'));
        console.log(chalk.green('- modloff --version       → Versiyon göster'));
    });

// Paket yönetimi komutları
program
    .command('ekle <paket>')
    .description('Yeni bir paket ekle')
    .option('-k, --kaydet', 'Paketi modloff.json dosyasına kaydet')
    .action((paket, options) => {
        try {
            console.log(chalk.cyan(logo));
            console.log(chalk.yellow(`${fileIcons.running} Paket yükleniyor: ${paket}\n`));

            // modloff.json dosyasını kontrol et veya oluştur
            const modloffJsonPath = path.join(process.cwd(), 'modloff.json');
            let modloffJson = {
                paketler: {},
                bagimliliklar: {}
            };

            if (existsSync(modloffJsonPath)) {
                modloffJson = JSON.parse(readFileSync(modloffJsonPath, 'utf-8'));
            } else {
                // modloff.json dosyası yoksa oluştur
                writeFileSync(modloffJsonPath, JSON.stringify(modloffJson, null, 2));
                console.log(chalk.blue(`${fileIcons.new} modloff.json dosyası oluşturuldu`));
            }

            // node_modules klasörünü kontrol et
            const nodeModulesPath = path.join(process.cwd(), 'node_modules');
            if (!existsSync(nodeModulesPath)) {
                mkdirSync(nodeModulesPath);
            }

            // Geçici package.json oluştur
            const tempPackageJson = {
                name: "modloff-temp",
                version: "1.0.0",
                private: true
            };
            const packageJsonPath = path.join(process.cwd(), 'package.json');
            const packageJsonExisted = existsSync(packageJsonPath);
            const oldPackageJson = packageJsonExisted ? JSON.parse(readFileSync(packageJsonPath, 'utf-8')) : null;
            
            writeFileSync(packageJsonPath, JSON.stringify(tempPackageJson, null, 2));

            try {
                // Paketi yükle
                execSync(`npm install ${paket} --no-package-lock --no-save`, { stdio: 'inherit' });

                // Eğer --kaydet seçeneği kullanıldıysa modloff.json'a ekle
                if (options.kaydet) {
                    try {
                        const installedPackageJson = JSON.parse(readFileSync(path.join(nodeModulesPath, paket, 'package.json'), 'utf-8'));
                        modloffJson.bagimliliklar[paket] = `^${installedPackageJson.version}`;
                        writeFileSync(modloffJsonPath, JSON.stringify(modloffJson, null, 2));
                        console.log(chalk.blue(`${fileIcons.config} Paket modloff.json dosyasına eklendi`));
                    } catch (err) {
                        console.error(chalk.red(`${fileIcons.error} Paket versiyonu alınamadı: ${err.message}`));
                    }
                }
            } finally {
                // Geçici package.json'ı temizle
                if (!packageJsonExisted) {
                    // Eğer önceden package.json yoksa sil
                    unlinkSync(packageJsonPath);
                } else {
                    // Varolan package.json'ı geri yükle
                    writeFileSync(packageJsonPath, JSON.stringify(oldPackageJson, null, 2));
                }
            }

            console.log(chalk.green(`\n${fileIcons.success} Paket başarıyla eklendi: ${paket}`));
        } catch (error) {
            console.error(chalk.red(`${fileIcons.error} Hata: ${error.message}`));
            process.exit(1);
        }
    });

program
    .command('kaldir <paket>')
    .description('Bir paketi kaldır')
    .option('-k, --kaydet', 'Paketi modloff.json dosyasından da kaldır')
    .action((paket, options) => {
        try {
            console.log(chalk.cyan(logo));
            console.log(chalk.yellow(`${fileIcons.running} Paket kaldırılıyor: ${paket}\n`));

            // modloff.json dosyasını kontrol et
            const modloffJsonPath = path.join(process.cwd(), 'modloff.json');
            if (!existsSync(modloffJsonPath)) {
                console.log(chalk.yellow(`${fileIcons.warning} modloff.json dosyası bulunamadı, oluşturuluyor...`));
                const modloffJson = {
                    paketler: {},
                    bagimliliklar: {}
                };
                writeFileSync(modloffJsonPath, JSON.stringify(modloffJson, null, 2));
            }

            // Geçici package.json oluştur
            const tempPackageJson = {
                name: "modloff-temp",
                version: "1.0.0",
                private: true
            };
            const packageJsonPath = path.join(process.cwd(), 'package.json');
            const packageJsonExisted = existsSync(packageJsonPath);
            const oldPackageJson = packageJsonExisted ? JSON.parse(readFileSync(packageJsonPath, 'utf-8')) : null;
            
            writeFileSync(packageJsonPath, JSON.stringify(tempPackageJson, null, 2));

            try {
                // Paketi kaldır
                execSync(`npm uninstall ${paket} --no-save`, { stdio: 'inherit' });

                // Eğer --kaydet seçeneği kullanıldıysa modloff.json'dan kaldır
                if (options.kaydet) {
                    const modloffJson = JSON.parse(readFileSync(modloffJsonPath, 'utf-8'));
                    if (modloffJson.bagimliliklar[paket]) {
                        delete modloffJson.bagimliliklar[paket];
                        writeFileSync(modloffJsonPath, JSON.stringify(modloffJson, null, 2));
                        console.log(chalk.blue(`${fileIcons.config} Paket modloff.json dosyasından kaldırıldı`));
                    }
                }
            } finally {
                // Geçici package.json'ı temizle
                if (!packageJsonExisted) {
                    // Eğer önceden package.json yoksa sil
                    unlinkSync(packageJsonPath);
                } else {
                    // Varolan package.json'ı geri yükle
                    writeFileSync(packageJsonPath, JSON.stringify(oldPackageJson, null, 2));
                }
            }

            console.log(chalk.green(`\n${fileIcons.success} Paket başarıyla kaldırıldı: ${paket}`));
        } catch (error) {
            console.error(chalk.red(`${fileIcons.error} Hata: ${error.message}`));
            process.exit(1);
        }
    });

program
    .command('yukle')
    .description('Tüm bağımlılıkları yükle')
    .action(() => {
        try {
            console.log(chalk.cyan(logo));
            console.log(chalk.yellow(`${fileIcons.running} Bağımlılıklar yükleniyor...\n`));

            const modloffJsonPath = path.join(process.cwd(), 'modloff.json');
            if (!existsSync(modloffJsonPath)) {
                console.log(chalk.yellow(`${fileIcons.warning} modloff.json dosyası bulunamadı, oluşturuluyor...`));
                const modloffJson = {
                    paketler: {},
                    bagimliliklar: {}
                };
                writeFileSync(modloffJsonPath, JSON.stringify(modloffJson, null, 2));
                console.log(chalk.blue(`${fileIcons.new} Yeni modloff.json dosyası oluşturuldu`));
                return;
            }

            const modloffJson = JSON.parse(readFileSync(modloffJsonPath, 'utf-8'));
            
            // node_modules klasörünü kontrol et
            const nodeModulesPath = path.join(process.cwd(), 'node_modules');
            if (!existsSync(nodeModulesPath)) {
                mkdirSync(nodeModulesPath);
            }

            // Bağımlılık sayısını kontrol et
            const bagimlilikSayisi = Object.keys(modloffJson.bagimliliklar).length;
            if (bagimlilikSayisi === 0) {
                console.log(chalk.yellow(`${fileIcons.warning} Yüklenecek bağımlılık bulunamadı`));
                return;
            }

            // Geçici package.json oluştur
            const tempPackageJson = {
                name: "modloff-temp",
                version: "1.0.0",
                private: true
            };
            const packageJsonPath = path.join(process.cwd(), 'package.json');
            const packageJsonExisted = existsSync(packageJsonPath);
            const oldPackageJson = packageJsonExisted ? JSON.parse(readFileSync(packageJsonPath, 'utf-8')) : null;
            
            writeFileSync(packageJsonPath, JSON.stringify(tempPackageJson, null, 2));

            try {
                // Tüm bağımlılıkları yükle
                for (const [paket, versiyon] of Object.entries(modloffJson.bagimliliklar)) {
                    console.log(chalk.blue(`📦 Yükleniyor: ${paket}@${versiyon}`));
                    execSync(`npm install ${paket}@${versiyon.replace('^', '')} --no-package-lock --no-save`, { stdio: 'inherit' });
                }
            } finally {
                // Geçici package.json'ı temizle
                if (!packageJsonExisted) {
                    // Eğer önceden package.json yoksa sil
                    unlinkSync(packageJsonPath);
                } else {
                    // Varolan package.json'ı geri yükle
                    writeFileSync(packageJsonPath, JSON.stringify(oldPackageJson, null, 2));
                }
            }

            console.log(chalk.green(`\n${fileIcons.success} Tüm bağımlılıklar başarıyla yüklendi!`));
        } catch (error) {
            console.error(chalk.red(`${fileIcons.error} Hata: ${error.message}`));
            process.exit(1);
        }
    });

// Eğer hiçbir komut verilmemişse
program.on('command:*', () => {
    console.error(chalk.red(`${fileIcons.error} Geçersiz komut`));
    console.log(chalk.yellow('\nKullanılabilir komutlar:'));
    console.log('  - modloff run <dosya>     → Modloff dosyasını çalıştır');
    console.log('  - modloff new <proje>     → Yeni proje oluştur');
    console.log('  - modloff list [dizin]    → Dosyaları listele');
    console.log('  - modloff info            → Bilgi göster');
    console.log('  - modloff --version       → Versiyon göster');
    process.exit(1);
});

if (!process.argv.slice(2).length) {
    console.log(chalk.cyan(logo));
    console.log(chalk.yellow(welcomeMessage));
    program.help();
}

program.parse(process.argv); 