# MÔ HÌNH MVP CỦA NHÀ HÀNG TUI ❤️

Đây là mô hình triển khai ban đầu của hệ thống nhà hàng mình.Chứa các chức năng cơ bản như menu chính, thêm giỏ hàng, thanh toán qua nhiều phương thức.Dự án mình chưa có database hoàn chỉnh. Hiện đang dùng json để load dữ liệu lên local storage. Hy vọng, trong tương lại dự án này sẽ được hoàn chỉnh. Hy vọng bạn sẽ có trải nghiệm tốt khi xem dự án mình🥰. 
## Các Thành Phần Chính

1. **Frontend**:
   - Xây dựng bằng **React**.
   - Cung cấp giao diện người dùng cho khách hàng chọn món ăn, thêm vào giỏ hàng và thanh toán.

2. **Backend**:
   - Xây dựng bằng **NestJS**.
   - Up dữ liệu từ file json lên local storage.
## Partner của mình ❤️
- 3122410461 : [Uyên 2k4](https://github.com/PhuongUyen1311)
- 3119480093 : [Trân 2k1](https://github.com/trannguyen5801)
- 3122410253 : [Nam 2k4](https://github.com/NhatNam15151515)
- 3122410132 : [Hoành 2k4](https://github.com/hoanhviplengend)
## 📁 Cấu trúc thư mục

```
.
├── backend
│   ├── Docker_Nest -->docker
│   ├── src --> thư mục chính
│   ├── package.json --> Thư viện chính
│   └── ...
├── frontend
│   ├── Docker_React --> docker
│   ├── src --> thư mục chính
│   ├── package.json  --> thư viện chính 
│   └── ... -
├── docker-compose.yml --> docker
└── README.md --> Mô tả
```

## Cài Đặt Dự Án

### Bạn có thể build dự án thông qua hai cách.

- **Docker** (optional, nếu bạn muốn nhanh dễ dùng dễ chạy 😍)
- **Truyền thống** (optional, nếu bạn muốn tách front và back 😍)

### Bước 1: Clone Dự Án từ github của mình 🤣 nếu hay cho mình 1 sao nhá 

```bash
git clone https://github.com/hoanhviplengend/Assigment_CNPM.git
```
### Bước 2: Chạy dự án.
#### Tiếp cận bằng docker.
- Yêu cần bạn phải có docker
- Cài đặt [Docker Desktop](https://www.docker.com/products/docker-desktop/)
##### Từ thư mục gốc để build :
```bash
docker-compose up --build
```
##### Từ thư mục gốc để run 🏃:
```bash
docker-compose up
```
#### Tiếp cận thông thường.
- Bạn cần chia đôi terminal để chạy song song nhá ❤️
##### Từ Thư mục frontend
- chuyển hướng từ thư mục gốc tới thư mục frontend (nếu chưa chuyển) ➡️
```bash
cd frontend
```
- cài đặt npm ⚙️
```bash
npm install
```
- chạy Front end 🛠️
```bash
npm start
```
##### Từ Thư mục backend
- chuyển hướng từ thư mục gốc tới thư mục backend (nếu chưa chuyển) ➡️
```bash
cd backend
```
- cài đặt npm ⚙️
```bash
npm install
```
- Chạy Back end 🛠️
```bash
npm run start
```
