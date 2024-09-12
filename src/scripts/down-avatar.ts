import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';

const basePath = '/Users/weijialiu/fcd-data/';
const playerIdFileName = 'id.txt';
const BATCH_SIZE = 100;

function saveImage(imageBase64: string, i: number) {
    // Split images into folders, each folder contains 1000 images
    const folderIndex = Math.floor(i / 1000);
    const folderPath = path.join(basePath, `${folderIndex}`);
    const filePath = path.join(folderPath, `${i}.png`);

    // If folder doesn't exist, create it
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
    }

    // Save image to file
    const buffer = Buffer.from(imageBase64, 'base64');
    fs.writeFileSync(filePath, buffer);
}

async function extracted(i: number) {
    // image path example: https://cmtracker.fra1.cdn.digitaloceanspaces.com/DB/24/heads/p239085.png
    const res = await fetch(`https://cmtracker.fra1.cdn.digitaloceanspaces.com/DB/24/heads/p${i}.png`);
    if (res.status === 200) {
        console.log(i);
        const imageBase64 = Buffer.from(await res.arrayBuffer()).toString('base64');
        // save into file
        saveImage(imageBase64, i);
    } else {
        console.log(`Image ${i} not found`);
    }
}

async function main() {
    console.log('Start');
    // Get start id from file if exists: c.txt
    let startId = 0;
    if (fs.existsSync(path.join(basePath, playerIdFileName))) {
        startId = parseInt(fs.readFileSync(path.join(basePath, playerIdFileName), 'utf-8'));
    }

    const promises = [];
    for (let i = startId; i < 280000; i++) {
        promises.push(extracted(i));
        if (promises.length >= BATCH_SIZE) {
            await Promise.all(promises);
            promises.length = 0;
            fs.writeFileSync(path.join(basePath, playerIdFileName), i.toString());
        }
        // Save current id to file
    }
    if (promises.length > 0) {
        await Promise.all(promises);
    }
}

main()
    .then(() => {
        console.log('Done');
        process.exit(0);
    })
    .catch((e) => {
        console.error(e);
        process.exit(1);
    });
