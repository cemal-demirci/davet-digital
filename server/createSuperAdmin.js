const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();

const createSuperAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/wedding-website', {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    console.log('MongoDB bağlantısı başarılı');

    // Access collection directly
    const SuperAdminModel = mongoose.connection.collection('superadmins');

    // Check if super admin already exists
    const existingAdmin = await SuperAdminModel.findOne({ username: 'cemal' });

    if (existingAdmin) {
      console.log('⚠️  Super admin zaten mevcut!');
      console.log('Mevcut admin:', {
        username: existingAdmin.username,
        email: existingAdmin.email,
        createdAt: existingAdmin.createdAt
      });

      console.log('\n💡 Şifreyi güncellemek isterseniz, mevcut admini silin ve tekrar çalıştırın.');
      process.exit(0);
    }

    // Hash password manually
    const hashedPassword = await bcrypt.hash('Cemal2024!', 10);

    // Create new super admin
    await SuperAdminModel.insertOne({
      username: 'cemal',
      email: 'cemal@davet.digital',
      password: hashedPassword,
      role: 'super-admin',
      loginAttempts: [],
      createdAt: new Date(),
      updatedAt: new Date()
    });

    console.log('\n✅ Super Admin başarıyla oluşturuldu!');
    console.log('\n📝 Giriş Bilgileri:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🌐 URL: https://www.davet.digital/cemalogin');
    console.log('👤 Kullanıcı Adı: cemal');
    console.log('🔑 Şifre: Cemal2024!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('\n⚠️  ÖNEMLİ: İlk girişten sonra şifrenizi değiştirin!');
    console.log('\n🎉 Artık Super Admin paneline erişebilirsiniz!');

    process.exit(0);
  } catch (error) {
    console.error('❌ Hata oluştu:', error.message);
    process.exit(1);
  }
};

createSuperAdmin();
