# BAO CAO BAI 2: TAI CAU TRUC LICH SU COMMIT BANG INTERACTIVE REBASE

**Ho va ten hoc vien:** Nguyen Phuc  
**Email:** phuchb24@gmail.com  
**Duong dan nop bai tren GitHub:** `homework/session_05/ex2/`

---

## 1. Muc tieu bai thuc hanh

- Su dung **Interactive Rebase** (`git rebase -i`) de tai cau truc lich su commit cuc bo.
- **Squash** (gop) nhieu commit nho le thanh 1 commit duy nhat co y nghia.
- **Drop** (xoa) commit chua file rac khong can thiet.
- Ket qua: Lich su commit sach se, ro rang truoc khi day len remote.

---

## 2. Cac buoc thuc hien

### Buoc 1: Tao nhanh lam viec

```bash
git checkout -b feature/authentication
```

### Buoc 2: Tao 4 commits thu nghiem

#### Commit 1 - `feat: khoi tao module auth`

```bash
git add homework/session_05/ex2/auth.js
git commit -m "feat: khoi tao module auth"
```

#### Commit 2 - `fix typo`

```bash
git add homework/session_05/ex2/auth.js
git commit -m "fix typo"
```

#### Commit 3 - `adds utility functions`

```bash
git add homework/session_05/ex2/auth.js
git commit -m "adds utility functions"
```

#### Commit 4 - `add temp file for debug` *(file rac)*

```bash
git add homework/session_05/ex2/temp.txt
git commit -m "add temp file for debug"
```

### Lich su commit TRUOC khi Rebase:

```
06c5da2 add temp file for debug      <- can DROP
46e95ce adds utility functions        <- can SQUASH
b74e811 fix typo                      <- can SQUASH
38e6555 feat: khoi tao module auth   <- PICK (giu nguyen)
f9a7865 chore: initial project setup
```

---

### Buoc 3: Chay Interactive Rebase

```bash
git rebase -i HEAD~4
```

### Buoc 4: Giao dien trinh soan thao Interactive Rebase (BAN DAU)

Khi trinh soan thao mo ra, giao dien hien thi:

```
pick 38e6555 feat: khoi tao module auth
pick b74e811 fix typo
pick 46e95ce adds utility functions
pick 06c5da2 add temp file for debug

# Rebase f9a7865..06c5da2 onto f9a7865 (4 commands)
#
# Commands:
# p, pick <commit> = use commit
# r, reword <commit> = use commit, but edit the commit message
# e, edit <commit> = use commit, but stop for amending
# s, squash <commit> = use commit, but meld into previous commit
# f, fixup [-C | -c] <commit> = like "squash" but keep only the previous
#                    commit log message
# d, drop <commit> = remove commit
```

### Buoc 5: CAU HINH SAU KHI CHINH SUA (Giao dien sau khi thay doi)

```
pick   38e6555 feat: khoi tao module auth    <- GIU NGUYEN (pick)
squash b74e811 fix typo                       <- GOP vao commit truoc (squash)
squash 46e95ce adds utility functions         <- GOP vao commit truoc (squash)
drop   06c5da2 add temp file for debug        <- XOA BO hoan toan (drop)
```

> **Giai thich:**
> - `pick`   -> Giu nguyen commit dau tien lam base
> - `squash` -> Gop commit nay vao commit phia tren, gop ca message
> - `drop`   -> Xoa hoan toan commit, khong giu lai noi dung

### Buoc 6: Chinh sua thong diep commit sau khi gop

Git mo trinh soan thao de chinh sua commit message tong hop.
Xoa toan bo noi dung cu va nhap:

```
feat: hoan thien module authentication
```

Luu va dong trinh soan thao de hoan tat.

---

## 3. Ket qua sau Interactive Rebase

### Lich su commit sau Rebase (`git log --oneline`):

```
c86712f feat: hoan thien module authentication
f9a7865 chore: initial project setup
```

> [OK] Chi con 1 commit sach se dai dien cho toan bo tinh nang authentication.
> [OK] File `temp.txt` da bi xoa hoan toan khoi lich su (commit `drop` khong con ton tai).
> [OK] Commit message dung yeu cau: `feat: hoan thien module authentication`

### Chi tiet commit cuoi cung (`git show --stat HEAD`):

```
commit c86712f69acb75f3fff26467854c0c6e13c2178f
Author: Nguyen Phuc <phuchb24@gmail.com>
Date:   Sun Oct 4 21:25:35 2026 +0700

    feat: hoan thien module authentication

 homework/session_05/ex2/auth.js | 27 +++++++++++++++++++++++++++
 1 file changed, 27 insertions(+)
```

---

## 4. Noi dung file auth.js sau Rebase

```javascript
// Module Authentication - hoan chinh
const crypto = require('crypto');

function authenticate(username, password) {
    if (!username || !password) {
        throw new Error('Username and password are required');
    }
    console.log('Authenticating user:', username);
    return verifyPassword(username, password);
}

function hashPassword(password) {
    return crypto.createHash('sha256').update(password).digest('hex');
}

function verifyPassword(username, password) {
    const hashed = hashPassword(password);
    // TODO: compare with stored hash
    console.log('Verifying password for:', username);
    return true;
}

function generateToken(username) {
    return crypto.randomBytes(32).toString('hex');
}

module.exports = { authenticate, hashPassword, verifyPassword, generateToken };
```

---

## 5. Tong ket ky nang hoc duoc

| Lenh Rebase    | Chuc nang                 | Ket qua                                  |
|----------------|---------------------------|------------------------------------------|
| `pick`         | Giu nguyen commit         | Commit duoc ap dung binh thuong          |
| `squash` / `s` | Gop vao commit truoc      | Noi dung + message duoc hop nhat         |
| `reword` / `r` | Doi ten message           | Commit giu nguyen, chi sua message       |
| `drop` / `d`   | Xoa bo commit             | Commit va noi dung bi loai hoan toan     |

### Loi ich cua Interactive Rebase:

- **Lich su sach se**: Loai bo cac commit "fix typo", "temp", "WIP" truoc khi push len remote
- **De review**: PR/MR chi co cac commit co y nghia, de dang cho code reviewer  
- **Khong anh huong remote**: Chi thuc hien tren nhanh cuc bo **truoc khi push**

> **LUU Y QUAN TRONG**: Interactive Rebase KHONG NEN thuc hien tren cac commit
> da duoc push len remote (shared history), vi no viet lai lich su va gay conflict
> cho cac thanh vien khac.
