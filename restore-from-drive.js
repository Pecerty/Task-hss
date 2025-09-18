
const fs = require('fs');
const { google } = require('googleapis');
const path = require('path');

const auth = new google.auth.GoogleAuth({
  keyFile: './has-task-credentials.json',
  scopes: ['https://www.googleapis.com/auth/drive.readonly']
});

async function downloadBackup() {
  const client = await auth.getClient();
  const drive = google.drive({ version: 'v3', auth: client });

  const folderId = '1K4VC6Iq-zN0KZH4GQ5g56tuKIa3at6fZ';
  const query = `name='tasks.json' and '${folderId}' in parents`;
  const res = await drive.files.list({ q: query, fields: 'files(id, name)' });

  if (!res.data.files.length) {
    console.error('❌ Nessun file di backup trovato.');
    return;
  }

  const fileId = res.data.files[0].id;
  const dest = fs.createWriteStream(path.join(__dirname, 'tasks.json'));

  const fileRes = await drive.files.get(
    { fileId, alt: 'media' },
    { responseType: 'stream' }
  );

  fileRes.data.pipe(dest);
  dest.on('finish', () => console.log('✅ Ripristino completato da Google Drive.'));
}

downloadBackup().catch(console.error);
