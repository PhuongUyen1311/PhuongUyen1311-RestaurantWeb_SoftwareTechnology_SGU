# MÔ HÌNH MVP CỦA NHÀ HÀNG TUI ❤️

Đây là mô hình triển khai ban đầu của hệ thống nhà hàng mình. Chứa các chức năng cơ bản như menu chính, thêm giỏ hàng, thanh toán qua nhiều phương thức. Hy vọng bạn sẽ có trải nghiệm tốt khi xem dự án mình🥰. 

## Các Thành Phần Chính

1. **Frontend**:
   - Xây dựng bằng **React**.
   - Cung cấp giao diện người dùng cho khách hàng  chọn món ăn, thêm vào giỏ hàng và thanh toán.

2. **Backend**:
   - Xây dựng bằng **NestJS**.
   - Up dữ liệu từ file json lên local storage.
## Partner của mình ❤️
- 3122410461 : [Uyên k24](https://github.com/PhuongUyen1311)
- 3119480093 : [Trân k21](https://github.com/trannguyen5801)
- 3122410253 : [Nam k24](https://github.com/NhatNam15151515)
- 3122410132 : [Hoành k24](https://github.com/hoanhviplengend)
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

- **Docker** (optional, nếu bạn muốn sử dụng Docker)
- **Truyền thống** (optional, nếu bạn muốn sử dụng Docker Compose)

### Bước 1: Clone Dự Án từ github của mình 🤣 nếu hay cho mình 1 sao nhá 

```bash
git clone https://github.com/hoanhviplengend/Assigment_CNPM.git
```
### Bước 2: Chạy dự án.
#### Tiếp cận bằng docker.
- Yêu cần bạn phải có docker
- Cài đặt [Docker Desktop](https://www.docker.com/products/docker-desktop/)
##### Từ thư mục gốc để built :
```bash
docker-compose up --build
```
##### Từ thư mục gốc để run 🏃:
```bash
docker-compose up
```
#### Tiếp cận thông thường.
##### Từ Thư mục frontend
- cài đặt npm ⚙️
```bash
npm install
```
- chạy Front end 🛠️
```bash
npm start
```
##### Từ Thư mục backend
- cài đặt npm ⚙️
```bash
npm install
```
- Chạy Back end 🛠️
```bash
npm run start
```
