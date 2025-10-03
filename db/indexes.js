db.tasks.createIndex({ title: 1 }); // untuk search
db.tasks.createIndex({ completed: 1 }); // untuk filter
db.tasks.createIndex({ createdAt: -1 }); // untuk sort terbaru
