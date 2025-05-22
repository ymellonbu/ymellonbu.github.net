const express = require('express');
const fs = require('fs');
const bcrypt = require('bcrypt');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public'));

const USERS_FILE = path.join(__dirname, 'users.json');

function loadUsers() {
    if (!fs.existsSync(USERS_FILE)) return {};
    return JSON.parse(fs.readFileSync(USERS_FILE));
}

function saveUsers(users) {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users));
}

app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const users = loadUsers();
    if (users[username]) return res.status(400).json({ message: '이미 존재하는 사용자입니다.' });
    const hashed = await bcrypt.hash(password, 10);
    users[username] = { password: hashed };
    saveUsers(users);
    res.json({ message: '회원가입 성공!' });
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const users = loadUsers();
    const user = users[username];
    if (!user) return res.status(400).json({ message: '사용자가 존재하지 않습니다.' });
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: '비밀번호가 틀렸습니다.' });
    res.json({ message: '로그인 성공!', token: 'example-token' });
});

app.listen(PORT, () => {
    console.log('서버 실행 중 http://localhost:' + PORT);
});
